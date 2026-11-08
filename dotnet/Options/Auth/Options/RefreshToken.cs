namespace Zed31rus.Options.Auth.Options;

public interface IRefreshTokenOption
{
    public TimeSpan ExpiresIn { get; }
    public DateTime ExpiresAt { get; }
};

public class RefreshTokenOption: IRefreshTokenOption
{
    public required TimeSpan ExpiresIn { get; init; }
    public required DateTime ExpiresAt { get; init; }
}