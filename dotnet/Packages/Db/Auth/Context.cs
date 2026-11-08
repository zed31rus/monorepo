global using IContext = Zed31rus.Packages.Db.Auth.IAuthDbContext;
global using Context = Zed31rus.Packages.Db.Auth.AuthDbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Zed31rus.Packages.Db.Auth.Models;

namespace Zed31rus.Packages.Db.Auth;

public interface IAuthDbContext
{
    public DbSet<User> Users { get; }
    public DbSet<RefreshToken> RefreshTokens { get; }
    public DbSet<OauthAccount> OauthAccounts { get; }
    public DbSet<VerificationCode> VerificationCodes { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    
    DatabaseFacade Database { get; }
}

internal class AuthDbContext(DbContextOptions<AuthDbContext> options) : DbContext(options), IAuthDbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<OauthAccount> OauthAccounts => Set<OauthAccount>();
    public DbSet<VerificationCode> VerificationCodes => Set<VerificationCode>();
    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("Authorization");

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AuthDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var modifiedEntries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Modified);

        foreach (var entry in modifiedEntries)
        {
            var property = entry.Properties.FirstOrDefault(p => p.Metadata.Name == "UpdatedAt");
            if (property != null) property.CurrentValue = DateTime.UtcNow;
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}