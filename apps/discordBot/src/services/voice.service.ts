import { ChannelType, Guild, GuildBasedChannel } from "discord.js";
import { entersState, joinVoiceChannel, VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import BaseService from "../base/service.base";
import { Features } from "@zed31rus/types/features.discordBot.js";
import DiscordBotDB from "../../../../packages/db/src/discordBot/discordbot.db";

export default class VoiceService extends BaseService {

    private guilds: Map<String, {voiceConnection: VoiceConnection, guild: Guild}> = new Map();

    constructor(
        ...baseServiceArgs: BaseService.Args
    ) {
        super(...baseServiceArgs);
    }

    async init() {

        const activeGuilds = await this.db.guilds.get.whereFeature(this.db.client, Features.voice);

        for (const guild of activeGuilds) {
            this.connectOneServerVoice(guild)
        }

    }

    async connectOneServerVoice(guildRecord: DiscordBotDB.Guild.Model) {

        const guild = await this.client.guilds.fetch(guildRecord.guildId);
        const channel = guild.channels.fetch(guildRecord.features)

        if (!channel) throw this.errors.api.NotFound('channel not found');

        const connection = this.connect(guild, channel);

        this.guilds.set(guild.id, {voiceConnection: connection, guild: guild})

        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 30_000)
            this.logger.info("voiceChat");
        } catch(err) {
            console.error('Error:', err);
            connection.destroy();
        }

        connection.on(VoiceConnectionStatus.Disconnected, () => {
            console.log('BotDisconnected\nreconnecting');
            connection.destroy();
            this.connect(guild, channel)
        })
    }

    connect(guild: Guild, channel: GuildBasedChannel) {
        return joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false
        });
    }
}