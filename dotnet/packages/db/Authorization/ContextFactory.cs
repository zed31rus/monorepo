using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Db.Authorization;

public class ContextFactory : IDesignTimeDbContextFactory<Context>
{
    public Context CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<Context>();
        
        optionsBuilder.UseNpgsql("Host=localhost;Database=db;Username=dev;Password=dev");

        return new Context(optionsBuilder.Options);
    }
}