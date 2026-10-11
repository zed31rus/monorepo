using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;

namespace zed31rus.Apps.Mail.Core.Mailer;

internal sealed record EmailMessage(
    string To,
    string Subject,
    string HtmlBody,
    string? TextBody = null);


internal sealed class SmtpMailer(IOptions<Options.SmtpOption> options, ILogger<SmtpMailer> logger)
{
    private readonly Options.SmtpOption _smtpOptions = options.Value;

    public async Task SendAsync(EmailMessage email, CancellationToken ct = default)
    {
        var message = new MimeMessage();

        using var client = new SmtpClient();
        await client.ConnectAsync(_smtpOptions.Host, _smtpOptions.Port, _smtpOptions.Security, ct);
        await client.AuthenticateAsync(_smtpOptions.User, _smtpOptions.Password, ct);
        await client.SendAsync(message, ct);
        logger.LogInformation("Mail sended to: {To}, subject: '{Subject}'", email.To, email.Subject);
        await client.DisconnectAsync(quit: true, ct);
    }
}