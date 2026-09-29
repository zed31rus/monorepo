using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.Hash;

namespace zed31rus.Apps.Util;

public static class Program
{
    public static async Task Main(string[] args)
    {
        var argon = new Argon2();

        var hash = await argon.CreateAsync("dummy_password");

        Console.WriteLine(hash);
    }
}