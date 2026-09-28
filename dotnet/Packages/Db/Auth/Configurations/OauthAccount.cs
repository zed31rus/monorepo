using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Packages.Db.Auth.Configurations;

internal class OauthAccountConfiguration : IEntityTypeConfiguration<OauthAccount>
{
    public void Configure(EntityTypeBuilder<OauthAccount> builder)
    {
        builder.HasKey(oauthAccount => oauthAccount.Uuid);

        builder.HasIndex(oauthAccount => new { oauthAccount.Provider, oauthAccount.ProviderUserId }).IsUnique();
        builder.HasIndex(oauthAccount => new { oauthAccount.UserUuid, oauthAccount.Provider }).IsUnique();

        builder.Property(oauthAccount => oauthAccount.RawProfile).HasColumnType("jsonb");

        builder.HasOne(oauthAccount => oauthAccount.User)
            .WithMany(user => user.OauthAccounts)
            .HasForeignKey(oauthAccount => oauthAccount.UserUuid)
            .OnDelete(DeleteBehavior.Cascade);
    }
}