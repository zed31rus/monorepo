namespace zed31rus.Shared;

public class Path
{
    public static string FindRepoRoot()
    {
        var dir = new DirectoryInfo(AppContext.BaseDirectory);
        while (dir is not null && !dir.GetFiles("*.sln*").Any())
            dir = dir.Parent;
        return dir?.FullName ?? throw new DirectoryNotFoundException("Не найден .sln выше " + AppContext.BaseDirectory);
    }
}