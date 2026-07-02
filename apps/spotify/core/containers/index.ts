import InfraContainer from '@packages/infra';
import SpotifyApiInstance from '../instances/spotify.js';
import InstancesContainer from './instances.js';
import ServicesContainer from './services.js';
import Logger from '@shared/logger';
import ConfigContainer from '@shared/config';
import ErrorsContainer from '@shared/errors';
import LibContainer from '@packages/libs';
import PlaylistService from '../services/playlist.js';
import DbContainer from '@packages/db';
import ManagerContainer from './managers.js';
import DailyTrackManager from '../managers/dailyTrack.js';
import EmitterContainer from './emitter.js';
import DailyTrackSchedullerEmitter from '#core/emitters/schedullers/dailyTrack.js';

const errors = new ErrorsContainer(
	new ErrorsContainer.deps.ApiErrors(),
	new ErrorsContainer.deps.ConfigErrors(),
	new ErrorsContainer.deps.PrismaErrors(),
	new ErrorsContainer.deps.InternalErrors()
);

const configDeps = [errors] as const;

const configs = new ConfigContainer(new ConfigContainer.deps.EnvConfig(...configDeps));

const logger = new Logger('spotify').appLogger;

const packagesDeps = [configs, logger, ...configDeps] as const;

const infra = new InfraContainer(
	InfraContainer.deps.rabbitmq.getInstance(...packagesDeps),
	{
		oauth: new InfraContainer.deps.discord.oauth(...packagesDeps),
		users: new InfraContainer.deps.discord.users(...packagesDeps),
	},
	{
		auth: {
			users: new InfraContainer.deps.internal.auth.users(...packagesDeps),
		},
	},
	{
		oauth: new InfraContainer.deps.spotify.oauth(...packagesDeps),
	}
);

const libs = new LibContainer(
	new LibContainer.deps.Hash(...packagesDeps),
	new LibContainer.deps.JWT(...packagesDeps),
	new LibContainer.deps.Mail(...packagesDeps),
	new LibContainer.deps.RefreshToken(...packagesDeps),
	new LibContainer.deps.VerificationCode(...packagesDeps)
);

const db = new DbContainer.spotify(...packagesDeps);

const instancesDeps = [db, libs, infra, ...packagesDeps] as const;

const instances = new InstancesContainer(await SpotifyApiInstance.getInstance(...instancesDeps));

const managersDeps = [instances, ...instancesDeps] as const;

const managers = new ManagerContainer(new DailyTrackManager(...managersDeps));

const servicesDeps = [instances, managers, ...instancesDeps] as const;

const services = new ServicesContainer(new PlaylistService(...servicesDeps));

const emittersDeps = [services, ...servicesDeps] as const;

const emitters = new EmitterContainer({
	dailyTrack: new DailyTrackSchedullerEmitter(...emittersDeps),
});

const coreContainer = {
	emitters,
	services,
	managers,
	instances,
	db,
	libs,
	infra,
	logger,
	configs,
	errors,
};

export default coreContainer;
