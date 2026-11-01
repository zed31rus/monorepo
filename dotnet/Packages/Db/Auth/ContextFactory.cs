using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using zed31rus.Options.Values;

namespace zed31rus.Packages.Db.Auth;

internal class ContextFactory : IDesignTimeDbContextFactory<Context>
{
    public Context CreateDbContext(string[] args)
    {
        var connectionString = OptionValues.Connection.Database;

        var optionsBuilder = new DbContextOptionsBuilder<Context>();
        optionsBuilder.UseNpgsql(connectionString);

        return new Context(optionsBuilder.Options);
    }
}