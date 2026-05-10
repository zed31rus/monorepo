import { ChannelType } from "discord.js";
import { entersState, joinVoiceChannel, VoiceConnectionStatus } from "@discordjs/voice";

export default class VoiceManager {
    constructor(client) {
        this.client = client;
        this.connection = null;
        this.guildId = null;
        this.channelId = null;
    }

    async connect(channelId) {

        const channel = await this.client.channels.fetch(channelId);
        const guild = channel.guild;

        this.channelId = channel.id;
        this.guildId = guild.id

        if (!channel || channel.type !== ChannelType.GuildVoice) return

        this.connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false
        });

        try {
            await entersState(this.connection, VoiceConnectionStatus.Ready, 30_000)
            console.log("voiceChatConnected")
        } catch(err) {
            console.error('Error:', err);
            this.connection.destroy();
            this.connection = null;
        }

        this.connection.on(VoiceConnectionStatus.Disconnected, () => {
            console.log('BotDisconnected\nreconnecting');
            this.connection.destroy();
            this.connection = null;
            this.connect(channelId, guildId);
        })
    }
}