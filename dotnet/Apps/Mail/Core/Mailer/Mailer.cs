using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using zed31rus.Options.Mail.Options;

namespace zed31rus.Apps.Mail.Core.Mailer;

internal sealed record EmailMessage(
    string To,
    string Subject,
    string HtmlBody,
    string? TextBody = null);


internal sealed class SmtpMailer(SmtpOption smtpOptions, ILogger<SmtpMailer> logger)
{

    public async Task SendAsync(EmailMessage email, CancellationToken ct = default)
    {
        var message = new MimeMessage();

        using var client = new SmtpClient();
        await client.ConnectAsync(smtpOptions.Host, smtpOptions.Port, smtpOptions.Security, ct);
        await client.AuthenticateAsync(smtpOptions.User, smtpOptions.Password, ct);
        await client.SendAsync(message, ct);
        logger.LogInformation("Mail sended to: {To}, subject: '{Subject}'", email.To, email.Subject);
        await client.DisconnectAsync(quit: true, ct);
    }
}