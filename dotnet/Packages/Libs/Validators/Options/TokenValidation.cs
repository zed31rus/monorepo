using FluentValidation;
using Microsoft.IdentityModel.Tokens;

namespace zed31rus.Packages.Libs.Validators.Options;

public class TokenValidationOptionValidator: AbstractValidator<TokenValidationParameters>
{
    public TokenValidationOptionValidator()
    {
        {
            RuleFor(parameters => parameters.ValidateIssuerSigningKey);
            RuleFor(parameters => parameters.ValidateIssuer);
            RuleFor(parameters => parameters.ValidateAudience);
            RuleFor(parameters => parameters.ValidateLifetime);
            RuleFor(parameters => parameters.ClockSkew)
                .GreaterThan(TimeSpan.Zero)
                .WithMessage("ClockSkew must be greater than zero");
        }
    }
}