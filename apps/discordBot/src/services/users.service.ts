export default class UsersManager {
    constructor(client) {
        this.client = client
    }

    async getPublicUsers(guildId) {
        try {
            const guild = await this.client.guilds.fetch(guildId);
            const members = await guild.members.fetch();
            const serializedMembers = members.map(serializeMember)
            return serializedMembers
        } catch(e) {
            console.log(e)
            return [];
        }
    }
}

function serializeMember(member) {
  const u = member.user;

  return {
    id: member.id,
    guildId: member.guild.id,

    nickname: member.nickname,
    displayName:
      member.nickname ??
      u.globalName ??
      u.username,

    user: {
      id: u.id,
      username: u.username,
      globalName: u.globalName,
      discriminator: u.discriminator,
      avatar: u.avatar,
      bot: u.bot,
    },

    roles: [...member.roles.cache.keys()],

    joinedAt: member.joinedTimestamp,
    premiumSince: member.premiumSinceTimestamp,
    communicationDisabledUntil:
      member.communicationDisabledUntilTimestamp,

    isOwner: member.id === member.guild.ownerId,
  };
}