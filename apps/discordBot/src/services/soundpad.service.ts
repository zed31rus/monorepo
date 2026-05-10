import EventEmitter from "events";
import { io } from 'socket.io-client';

export default class SoundpadManager extends EventEmitter {
    constructor() {
        
        super();
        this.soundList = [];
        this.current = {};
        this.history = [];

        this.percentage = 0;
        this.volume = 0;
        this.socket = io('https://soundpadapi.zed31rus.ru')

        this.socket.on('currentUpdated', (data) => {
            this.current = data;
            this.emit('currentUpdated', this.current)
        });

        this.socket.on('historyUpdated', (data) => {
            this.history = data;
            this.emit('historyUpdated', this.history)
        });

        this.socket.on('soundListUpdated', (data) => {
            this.soundList = data;
            this.emit('soundListUpdated', this.soundList)
        });

        this.socket.on('volumeUpdated', (data) => {
            this.volume = data;
            this.emit('volumeUpdated', this.volume)
        });
    }

    async play(soundId) {
        const reply = await fetch('https://soundpadapi.zed31rus.ru/soundpad/playSound', {
            method: 'POST',
            body: JSON.stringify({ soundId: soundId }),
            headers: { 'Content-Type': 'application/json' }
        });
        return reply
    }

    async stop() {
        const reply = await fetch('https://soundpadapi.zed31rus.ru/soundpad/stopSound', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        return reply
    }
}