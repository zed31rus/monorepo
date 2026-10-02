namespace zed31rus.Apps.Authorization.Clients.Web.External.Options;

public class Session
{
    public Cookies cookies = new();

    public class Cookies
    {
        public Refresh refresh { get; set; } = new();
    
        public Access access { get; set; } = new();

        public class Refresh
        {
            public CookieOptions options = new();

            public string name { get; set; } = string.Empty;
        }

        public class Access
        {
            public CookieOptions options = new();

            public string name { get; set; } = string.Empty;
        }
    }
}

