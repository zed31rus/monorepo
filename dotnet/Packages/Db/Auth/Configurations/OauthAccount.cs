using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Zed31rus.Packages.Db.Auth.Models;

namespace Zed31rus.Packages.Db.Auth.Configurations;

internal class OauthAccountConfiguration : IEntityTypeConfiguration<OauthAccount>
{
    public void Configure(EntityTypeBuilder<OauthAccount> builder)
    {
        builder.HasKey(oauthAccount => oauthAccount.Uuid);

        builder.HasIndex(oauthAccount => new { oauthAccount.Provider, oauthAccount.ProviderUserId }).IsUnique();
        builder.HasIndex(oauthAccount => new { oauthAccount.UserUuid, oauthAccount.Provider }).IsUnique();
        builder.Property(oauthAccount => oauthAccount.EncryptedRefreshToken).HasMaxLength(2048);
        builder.Property(oauthAccount => oauthAccount.Scope).HasMaxLength(128);
        builder.Property(oauthAccount => oauthAccount.Provider).HasMaxLength(128);
        builder.Property(oauthAccount => oauthAccount.ProviderUserId).HasMaxLength(256);
        
        builder.Property(oauthAccount => oauthAccount.Version).IsRowVersion();

        builder.HasOne(oauthAccount => oauthAccount.User)
            .WithMany(user => user.OauthAccounts)
            .HasForeignKey(oauthAccount => oauthAccount.UserUuid)
            .OnDelete(DeleteBehavior.Cascade);
    }
}