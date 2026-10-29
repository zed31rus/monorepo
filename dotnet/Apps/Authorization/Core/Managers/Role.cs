using Microsoft.Extensions.DependencyInjection;
using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;
using zed31rus.Apps.Authorization.Core.Exceptions;

namespace zed31rus.Apps.Authorization.Core.Managers;

public interface IRoleManager
{
    string[] ExpandRole(string roleName);
    BaseRole GetObj(string roleName);
}

[Manager(ServiceLifetime.Singleton)]
internal class RoleManager : IRoleManager
{   
    private readonly Dictionary<string, string[]> _roleChains;
    private readonly Dictionary<string, BaseRole> _roleObjs;

    public RoleManager(IEnumerable<BaseRole> roles)
    {
        var rolesArray = roles.ToArray();
        _roleChains = ResolveRoleChains(rolesArray);
        _roleObjs = ResolveRoleObjs(rolesArray);
    }

    public string[] ExpandRole(string roleName)
    {
        var roleChain = _roleChains.GetValueOrDefault(roleName);
        if (roleChain is null) throw new CoreBusinessErrors.InvalidRole();
        return roleChain;
    }

    public BaseRole GetObj(string roleName)
    {
        var roleObj = _roleObjs.GetValueOrDefault(roleName);
        if (roleObj is null) throw new CoreBusinessErrors.InvalidRole();
        return roleObj;
    }

    private Dictionary<string, string[]> ResolveRoleChains(IEnumerable<BaseRole> roles)
    {
        Dictionary<string, string[]> roleChains = new();
        foreach (var role in roles)
        {
            var roleChain = ResolveRoleChain(role);
            roleChains.Add(role.Name, roleChain);
        }

        return roleChains;
    }

    private Dictionary<string, BaseRole> ResolveRoleObjs(IEnumerable<BaseRole> roles)
    {
        Dictionary<string, BaseRole> roleObjs = new();
        foreach (var role in roles)
        {
            var roleName = role.Name;
            roleObjs.Add(roleName, role);
        }

        return roleObjs;
    }
    
    private string[] ResolveRoleChain(BaseRole startRole)
    {
        List<string> rolesChainList = [];

        for (var current = startRole; ;)
        {
            rolesChainList.Insert(0,current.Name);
            var parentRole = current.ParentRole;
            if (parentRole is null)
            {
                break;
            }

            current = parentRole;
        }

        return [.. rolesChainList];
    }
}