using RazorLight;

namespace zed31rus.Apps.Mail.Core.Render;
using Mjml.Net;

internal class CsmjmlRenderer
{
    private readonly IRazorLightEngine _razorLightEngine = new RazorLightEngineBuilder().UseMemoryCachingProvider().Build();
    private readonly IMjmlRenderer _mjmlRenderer = new MjmlRenderer();

    public async Task<string> RenderTemplateAsync<T>(string key, string templateString, T model)
    {
        var razorHtml = await RenderRazorAsync(key, templateString, model);
        var html = RenderMjml(key, razorHtml);

        return html;
    }
    
    public async Task<string> RenderRazorAsync<T>(string key, string viewString, T model)
    {
        var razorCompiled = await _razorLightEngine.CompileRenderStringAsync(key, viewString, model);
        
        return razorCompiled;
    }

    public string RenderMjml(string key, string viewString)
    {
        var (html, errors) = _mjmlRenderer.Render(viewString);

        if (errors.Any())
        {
            var details = string.Join(Environment.NewLine, errors.Select(e => e.ToString()));
            throw new InvalidOperationException($"MJML errors in '{key}':{Environment.NewLine}{details}");
        }

        return html;
    }
}