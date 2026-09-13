using DotNetEnv;
using Config.configs;

namespace Authorization.Core.Util;

public class Development
{
    public class Server {
    
        public void UseDevelopment()
        {
        
        }
        
        private void loadEnvironment()
        {
            var solutionRoot = Paths.FindSolutionRoot();
            Env.Load(Path.Combine(solutionRoot, ".env"));
        }
    }
}