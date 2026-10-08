using static Microsoft.EntityFrameworkCore.RelationalPropertyBuilderExtensions;
using EFCore =  Microsoft.EntityFrameworkCore;
using Builders = Microsoft.EntityFrameworkCore.Metadata.Builders;
using AuthModels = zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Packages.Db.Auth.Configurations;

internal class OauthAccountConfiguration : EFCore.IEntityTypeConfiguration<AuthModels.OauthAccount>
{
    public void Configure(Builders.EntityTypeBuilder<AuthModels.OauthAccount> builder)
    {
        builder.HasKey(oauthAccount => oauthAccount.Uuid);

        builder.HasIndex(oauthAccount => new { oauthAccount.Provider, oauthAccount.ProviderUserId }).IsUnique();
        builder.HasIndex(oauthAccount => new { oauthAccount.UserUuid, oauthAccount.Provider }).IsUnique();

        builder.Property(oauthAccount => oauthAccount.RawProfile).HasColumnType("jsonb");

        builder.HasOne(oauthAccount => oauthAccount.User)
            .WithMany(user => user.OauthAccounts)
            .HasForeignKey(oauthAccount => oauthAccount.UserUuid)
            .OnDelete(EFCore.DeleteBehavior.Cascade);
    }
}