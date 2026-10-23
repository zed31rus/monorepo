using Microsoft.AspNetCore.Http;

namespace zed31rus.Options.Options;

public interface ISessionOption
{
    ISessionCookies Cookies { get; }
}

public interface ISessionCookies
{
    ISessionCookie Refresh { get; }
    ISessionCookie Access { get; }
}

public interface ISessionCookie
{
    string Name { get; }
    CookieOptions Options { get; }
}

internal class SessionOption : ISessionOption
{
    public required SessionCookies Cookies { get; init; }
    ISessionCookies ISessionOption.Cookies => Cookies;
}

internal class SessionCookies : ISessionCookies
{
    public required SessionCookie Refresh { get; init; }
    public required SessionCookie Access { get; init; }
    ISessionCookie ISessionCookies.Refresh => Refresh;
    ISessionCookie ISessionCookies.Access => Access;
}

internal class SessionCookie : ISessionCookie
{
    public required string Name { get; init; }
    public required CookieOptions Options { get; init; }
}