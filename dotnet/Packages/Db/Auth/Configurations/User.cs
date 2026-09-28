using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Packages.Db.Auth.Configurations;

internal class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(user => user.Uuid);

        builder.HasIndex(user => user.Login).IsUnique();
        builder.HasIndex(user => user.Email).IsUnique();

        builder.Property(user => user.Login).HasMaxLength(128);
        builder.Property(user => user.Email).HasMaxLength(255);
        builder.Property(user => user.Locale).HasMaxLength(10);
        builder.Property(user => user.Nickname).HasMaxLength(50);
        builder.Property(user => user.Avatar).HasMaxLength(1024);
        builder.Property(user => user.PasswordHash).HasMaxLength(256);
    }
}