using Microsoft.AspNetCore.Http;

namespace zed31rus.Apps.Authorization.Clients.Web.External.Options;

internal class SessionOptions
{
    public const string SectionName = "Session";

    public SessionCookies Cookies { get; set; } = new();
}

internal class SessionCookies
{
    public SessionCookie Refresh { get; set; } = new();
    public SessionCookie Access { get; set; } = new();
}

internal class SessionCookie
{
    public string Name { get; set; } = string.Empty;
    public CookieOptions Options { get; set; } = new();
}