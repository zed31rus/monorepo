using MailKit.Security;

namespace Zed31rus.Options.Mail.Options;

public class SmtpOption
{

    public string Host { get; init; } = "";
    public int Port { get; init; } = 587;
    public string User { get; init; } = "";
    public string Password { get; init; } = "";
    public SecureSocketOptions Security { get; init; } = SecureSocketOptions.StartTls;

}