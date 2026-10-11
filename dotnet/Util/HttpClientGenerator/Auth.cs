using Microsoft.Extensions.DependencyInjection;
using NSwag.CodeGeneration.CSharp;
using NSwag.Generation.AspNetCore;
using zed31rus.Apps.Authorization.Clients.External.Web;

namespace zed31rus.Util.HttpClientGenerator;

public static class AuthHttpClientGenerator
{
    private static async Task Main(string[] args)
    {
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");
        
        var app = WebExternalClient.CreateApp(
            args,
            mvc => mvc.AddApplicationPart(typeof(WebExternalClient).Assembly));

        var document = await new AspNetCoreOpenApiDocumentGenerator(new AspNetCoreOpenApiDocumentGeneratorSettings
                { Title = "Auth" }).GenerateAsync(app.Services);
        
        var settings = new CSharpClientGeneratorSettings
        {
            ClassName = "AuthClientInfra",
            InjectHttpClient = true,
            GenerateClientInterfaces = true,
            CSharpGeneratorSettings = { Namespace = "zed31rus.Infra.Clients.Auth" },
            GenerateDtoTypes = true
        };

        var outDir = Path.Combine(Shared.Path.FindRepoRoot(), "Packages", "Infra", "Clients", "Generated");
        
        Directory.CreateDirectory(outDir);
        await File.WriteAllTextAsync(Path.Combine(outDir, "Auth.g.cs"),
            new CSharpClientGenerator(document, settings).GenerateFile());
    }
}