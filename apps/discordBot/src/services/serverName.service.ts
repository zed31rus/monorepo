import cron from 'node-cron';
import BaseService from '../base/service.base';

export default class MultiServerNameManager extends BaseService {
    private serverNames: Map<string, { name: string }> = new Map();

    constructor(...serviceBaseArgs: BaseService.Args) {
        super(...serviceBaseArgs);
        this.init();
    }

    private async init() {
        await this.refreshAllServerNames();
        this.createCronSchedule();
    }

    private async refreshAllServerNames() {
        try {
            const activeServers = await this.db.guilds.get.allActive(this.db.client);

            for (const guild of activeServers) {
                await this.updateSingleServerName(guild.id);
            }
        } catch (error) {
            this.logger.error('Failed to refresh server names:', error);
        }
    }

    public async updateSingleServerName(serverId: string) {
        const oldName = this.serverNames.get(serverId)?.name || '';
        let newServerName;

        do {
            newServerName = await this.db.serverName.get.random(this.db.client);
        } while (newServerName.name === oldName);

        this.serverNames.set(serverId, newServerName);

        this.events.emit('serverNameUpdate', { 
            serverId, 
            newName: newServerName.name 
        });
    }

    private createCronSchedule() {
        cron.schedule('*/10 * * * *', async () => {
            await this.refreshAllServerNames();
        }, {
            timezone: "Europe/Moscow"
        });
    }

    public getServerName(serverId: string) {
        return this.serverNames.get(serverId);
    }
}