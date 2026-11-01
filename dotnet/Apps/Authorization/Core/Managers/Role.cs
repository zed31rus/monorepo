using System.Collections.Immutable;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;
using zed31rus.Apps.Authorization.Core.Exceptions;

namespace zed31rus.Apps.Authorization.Core.Managers;

public interface IRoleManager
{
    ImmutableArray<string> GetRoleChain(string roleName);
    BaseRole GetRole(string roleName);
    ImmutableArray<string> GetPermissions(string roleName);
    ImmutableArray<string> GetPermissions(IEnumerable<string> roleNames);
}

[Manager(ServiceLifetime.Singleton)]
internal class RoleManager : IRoleManager
{
    private readonly Dictionary<string, ImmutableArray<string>> _chainsByRoleName;
    private readonly Dictionary<string, BaseRole> _rolesByName;

    public RoleManager(IEnumerable<BaseRole> roles)
    {
        var rolesArray = roles.ToArray();
        _chainsByRoleName = BuildChainsByRoleName(rolesArray);
        _rolesByName = BuildRolesByName(rolesArray);
    }

    public ImmutableArray<string> GetRoleChain(string roleName)
    {
        var chain = _chainsByRoleName.GetValueOrDefault(roleName);
        if (chain.IsDefault) throw new CoreBusinessExceptions.InvalidRole();

        return chain;
    }

    public BaseRole GetRole(string roleName)
    {
        var role = _rolesByName.GetValueOrDefault(roleName);
        if (role is null) throw new CoreBusinessExceptions.InvalidRole();

        return role;
    }

    public ImmutableArray<string> GetPermissions(string roleName)
    {
        var role = GetRole(roleName);

        return role.Permissions
            .Select(permission => permission.Name)
            .ToImmutableArray();
    }

    public ImmutableArray<string> GetPermissions(IEnumerable<string> roleNames)
    {
        HashSet<string> permissions = new();

        foreach (var roleName in roleNames)
        {
            foreach (var permission in GetPermissions(roleName))
            {
                permissions.Add(permission);
            }
        }

        return permissions.ToImmutableArray();
    }

    private Dictionary<string, ImmutableArray<string>> BuildChainsByRoleName(IEnumerable<BaseRole> roles)
    {
        Dictionary<string, ImmutableArray<string>> chainsByRoleName = new();
        foreach (var role in roles)
        {
            chainsByRoleName.Add(role.Name, BuildChain(role));
        }

        return chainsByRoleName;
    }

    private Dictionary<string, BaseRole> BuildRolesByName(IEnumerable<BaseRole> roles)
    {
        Dictionary<string, BaseRole> rolesByName = new();
        foreach (var role in roles)
        {
            rolesByName.Add(role.Name, role);
        }

        return rolesByName;
    }

    private ImmutableArray<string> BuildChain(BaseRole startRole)
    {
        List<string> chain = [];

        for (var current = startRole; ;)
        {
            chain.Insert(0, current.Name);
            var parentRole = current.ParentRole;
            if (parentRole is null)
            {
                break;
            }

            current = parentRole;
        }

        return chain.ToImmutableArray();
    }
}