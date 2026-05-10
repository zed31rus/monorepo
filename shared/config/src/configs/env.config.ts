import dotenv from 'dotenv';
import BaseConfig from '../config.base.js';

export default class EnvConfig extends BaseConfig {
    readonly DATABASE_URL: string;
    readonly SMTP_API_KEY: string;
    readonly PORT: string;
    readonly SMTP_HOST: string;
    readonly SMTP_USER: string;
    readonly JWT_SECRET: string;
    readonly SMTP_EMAIL: string;
    readonly AVATARS_PUBLIC_DIR_PATH: string;
    readonly PUBLIC_DIR_PATH: string;
    readonly AMQP_URL: string;
    readonly DISCORD_OAUTH_CLIENT_ID: string;
    readonly DISCORD_OAUTH_CLIENT_SECRET: string;
    readonly DISCORD_OAUTH_REDIRECT_URL: string;
    readonly SMTP_PORT: string;

    constructor(...baseArgs: BaseConfig.Args) {
        super(...baseArgs);
        this.DATABASE_URL = this.getEnv('DATABASE_URL');
        this.SMTP_API_KEY = this.getEnv('SMTP_API_KEY');
        this.PORT = this.getEnv('PORT');
        this.SMTP_HOST = this.getEnv('SMTP_HOST');
        this.SMTP_USER = this.getEnv('SMTP_USER');
        this.JWT_SECRET = this.getEnv('JWT_SECRET');
        this.SMTP_EMAIL = this.getEnv('SMTP_EMAIL');
        this.AVATARS_PUBLIC_DIR_PATH = this.getEnv('AVATARS_PUBLIC_DIR_PATH');
        this.PUBLIC_DIR_PATH = this.getEnv('PUBLIC_DIR_PATH');
        this.AMQP_URL = this.getEnv('AMQP_URL');
        this.DISCORD_OAUTH_CLIENT_ID = this.getEnv('DISCORD_CLIENT_ID');
        this.DISCORD_OAUTH_CLIENT_SECRET = this.getEnv('DISCORD_CLIENT_SECRET');
        this.DISCORD_OAUTH_REDIRECT_URL = this.getEnv('DISCORD_REDIRECT_URL');
        this.SMTP_PORT = this.getEnv('SMTP_PORT');
    }

    private getEnv(key: string): string {
        const value = process.env[key];
        if (!value) {
            throw this.errors.config.env(`Missing environment variable: ${key}`);
        }
        return value;
    }
}