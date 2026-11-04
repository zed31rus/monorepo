using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;

namespace Zed31rus.Packages.Db.Auth;

public static class ServiceExtensions
{
    public static IServiceCollection AddAuthDb(
        this IServiceCollection services,
        Func<IServiceProvider, string> connectionString,
        Action<NpgsqlDbContextOptionsBuilder>? npgsqlOptions = null)
    {
        services.AddDbContext<AuthDbContext>((serviceProvider, options) =>
            options.UseNpgsql(connectionString(serviceProvider), builder =>
            {
                builder.MigrationsAssembly(typeof(AuthDbContext).Assembly.FullName);

                npgsqlOptions?.Invoke(builder);
            }));

        services.AddScoped<IAuthDbContext>(serviceProvider => serviceProvider.GetRequiredService<AuthDbContext>());

        return services;
    }
}