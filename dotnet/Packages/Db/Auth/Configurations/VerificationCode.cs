using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Packages.Db.Auth.Configurations;

internal class VerificationCodeConfiguration : IEntityTypeConfiguration<VerificationCode>
{
    public void Configure(EntityTypeBuilder<VerificationCode> builder)
    {
        builder.HasKey(verificationCode => verificationCode.Uuid);

        builder.HasIndex(verificationCode => new { verificationCode.UserUuid, verificationCode.Type }).IsUnique();

        builder.HasOne(verificationCode => verificationCode.User)
            .WithMany(verificationCode => verificationCode.VerificationCodes)
            .HasForeignKey(verificationCode => verificationCode.UserUuid)
            .OnDelete(DeleteBehavior.Cascade);
    }
}