namespace Db.Authorization;

using Microsoft.EntityFrameworkCore;

public class AuthorizationDbContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<OauthAccount> OauthAccounts => Set<OauthAccount>();
    public DbSet<VerificationCode> VerificationCodes => Set<VerificationCode>();

    public AuthorizationDbContext(DbContextOptions<AuthorizationDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(user => user.Uuid);
            
            entity.HasIndex(user => user.Login).IsUnique();
            entity.HasIndex(user => user.Email).IsUnique();

            entity.Property(user => user.UpdatedAt)
                  .ValueGeneratedOnAddOrUpdate()
                  .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
            entity.Property(user => user.Login).HasMaxLength(128);
            entity.Property(user => user.Email).HasMaxLength(255);
            entity.Property(user => user.Locale).HasMaxLength(10);
            entity.Property(user => user.Nickname).HasMaxLength(50);
            entity.Property(user => user.Avatar).HasMaxLength(255);
            entity.Property(user => user.PasswordHash).HasMaxLength(256);
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(refreshToken => refreshToken.Uuid);
            entity.HasIndex(refreshToken => refreshToken.HashedToken).IsUnique();

            entity.HasOne(refreshToken => refreshToken.User)
                  .WithMany(user => user.Tokens)
                  .HasForeignKey(refreshToken => refreshToken.UserUuid)
                  .OnDelete(DeleteBehavior.Cascade);
            
            entity.Property(refreshToken => refreshToken.HashedToken).HasMaxLength(256);
        });

        modelBuilder.Entity<OauthAccount>(entity =>
        {
            entity.HasKey(oauthAccount => oauthAccount.Uuid);

            entity.HasIndex(oauthAccount => new { oauthAccount.Provider, oauthAccount.ProviderUserId }).IsUnique();
            entity.HasIndex(oauthAccount => new { oauthAccount.UserUuid, oauthAccount.Provider }).IsUnique();

            entity.Property(oauthAccount => oauthAccount.RawProfile).HasColumnType("jsonb");

            entity.HasOne(oauthAccount => oauthAccount.User)
                  .WithMany(user => user.OauthAccounts)
                  .HasForeignKey(oauthAccount => oauthAccount.UserUuid)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.Property(oauthAccount => oauthAccount.UpdatedAt)
                  .ValueGeneratedOnAddOrUpdate()
                  .HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<VerificationCode>(entity =>
        {
            entity.HasKey(verificationCode => verificationCode.Uuid);

            entity.HasIndex(verificationCode => new { verificationCode.UserUuid, verificationCode.Type }).IsUnique();

            entity.HasOne(verificationCode => verificationCode.User)
                  .WithMany(user => user.VerificationCodes)
                  .HasForeignKey(verificationCode => verificationCode.UserUuid)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}