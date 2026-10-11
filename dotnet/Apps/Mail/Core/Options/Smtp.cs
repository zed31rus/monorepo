using MailKit.Security;

namespace zed31rus.Apps.Mail.Core.Options;

internal class SmtpOption
{
    public string Host { get; init; } = "";
    public int Port { get; init; } = 587;
    public string User { get; init; } = "";
    public string Password { get; init; } = "";
    public string FromAddress { get; init; } = "";
    public string FromName { get; init; } = "";
    public SecureSocketOptions Security { get; init; } = SecureSocketOptions.StartTls;
}