global using IContext = zed31rus.Packages.Db.Auth.IAuthDbContext;
global using Context = zed31rus.Packages.Db.Auth.AuthDbContext;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Packages.Db.Auth;

public interface IAuthDbContext
{
    DbSet<User> Users { get; }
    DbSet<RefreshToken> RefreshTokens { get; }
    DbSet<OauthAccount> OauthAccounts { get; }
    DbSet<VerificationCode> VerificationCodes { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

internal class AuthDbContext(DbContextOptions<Context> options) : DbContext(options), IContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<OauthAccount> OauthAccounts => Set<OauthAccount>();
    public DbSet<VerificationCode> VerificationCodes => Set<VerificationCode>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("Authorization");

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(Context).Assembly);

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