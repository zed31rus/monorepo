using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Auth.Extensions.DI;
using Zed31rus.Options.Auth.Options;

namespace Zed31rus.Packages.Db.Auth;

internal class ContextFactory : IDesignTimeDbContextFactory<AuthDbContext>
{
    public AuthDbContext CreateDbContext(string[] args)
    {
        var container = new ServiceCollection();
        container.AddAuthOptions("dev");
        ServiceProvider provider = container.BuildServiceProvider();

        string connectionString = provider.GetRequiredService<IConnectionOption>().Database;

        var optionsBuilder = new DbContextOptionsBuilder<AuthDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new AuthDbContext(optionsBuilder.Options);
    }
}