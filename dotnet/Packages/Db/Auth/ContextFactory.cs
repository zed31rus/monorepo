using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Auth.Extensions.DI;
using Zed31rus.Options.Auth.Options;
using Zed31rus.Options.Shared.Constants;

namespace Zed31rus.Packages.Db.Auth;

internal class ContextFactory : IDesignTimeDbContextFactory<Context>
{
    public Context CreateDbContext(string[] args)
    {
        var container = new ServiceCollection();
        container.AddAuthOptions(Enum.GetName(ValueConstants.ValueTypes.Development));
        var provider = container.BuildServiceProvider();

        var connectionString = provider.GetRequiredService<IConnectionOption>().Database;

        var optionsBuilder = new DbContextOptionsBuilder<Context>();
        optionsBuilder.UseNpgsql(connectionString);

        return new Context(optionsBuilder.Options);
    }
}