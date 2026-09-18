using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;

namespace zed31rus.Packages.Db.Auth;

public static class ServiceExtensions
{
    public static IServiceCollection AddAuthDb(
        this IServiceCollection services,
        string connectionString,
        Action<NpgsqlDbContextOptionsBuilder>? npgsqlOptions = null)
    {
        services.AddDbContext<AuthDbContext>(options =>
            options.UseNpgsql(connectionString, npgsqlOptions));

        services.AddScoped<IAuthDbContext>(serviceProvider => serviceProvider.GetRequiredService<AuthDbContext>());

        return services;
    }
}