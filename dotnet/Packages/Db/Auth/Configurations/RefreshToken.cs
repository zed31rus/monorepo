using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Packages.Db.Auth.Configurations;

internal class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.HasKey(refreshToken => refreshToken.Uuid);
        builder.HasIndex(refreshToken => refreshToken.HashedToken).IsUnique();
        builder.Property(refreshToken => refreshToken.HashedToken).HasMaxLength(256);

        builder.HasOne(refreshToken => refreshToken.User)
            .WithMany(user => user.Tokens)
            .HasForeignKey(refreshToken => refreshToken.UserUuid)
            .OnDelete(DeleteBehavior.Cascade);
    }
}