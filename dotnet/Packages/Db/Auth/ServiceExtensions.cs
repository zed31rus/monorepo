using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;

namespace zed31rus.Packages.Db.Auth;

public static class ServiceExtensions
{
    public static IServiceCollection AddAuthDb(
        this IServiceCollection services,
        Func<IServiceProvider, string> connectionString,
        Action<NpgsqlDbContextOptionsBuilder>? npgsqlOptions = null)
    {
        services.AddDbContext<Context>((serviceProvider, options) =>
            options.UseNpgsql(connectionString(serviceProvider), builder =>
            {
                builder.MigrationsAssembly(typeof(Context).Assembly.FullName);

                npgsqlOptions?.Invoke(builder);
            }));

        services.AddScoped<IContext>(serviceProvider => serviceProvider.GetRequiredService<Context>());

        return services;
    }
}