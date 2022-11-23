
import { ActivityHandler, BotFrameworkAdapter } from 'botbuilder';
import { ComponentDialog } from 'botbuilder-dialogs';
import { EnvironmentConfig } from '../../../EnvironmentConfig';
import { MainBot } from './MainBot';

export class AppCache {
    private static instance: AppCache;
    private DialogCache: Map<string,ComponentDialog>;
    private botCache: Map<string, MainBot>;
    public EnvConfig : EnvironmentConfig

 
    private constructor() { 
        this.DialogCache = new Map<string,ComponentDialog>();
        this.botCache = new Map<string,MainBot>();
        this.EnvConfig = EnvironmentConfig.getInstance();
    }

    public static getInstance(): AppCache {
        if (AppCache.instance == null) {
            AppCache.instance = new AppCache();
        }
        return AppCache.instance;
      }

    public getDialogCache(): Map<string, ComponentDialog> {
        return this.DialogCache;
    }

    public addBot(bot:MainBot){
        this.botCache.set(this.EnvConfig.BotName,bot)
    }

    public getBot(botId: string): MainBot {
        console.log(`[getBot] botId: ${botId}`);
        return this.botCache.get(botId);
    }

    // public addAdaptor(botId: string, adaptor: BotFrameworkAdapter) {
    //     // console.log(`[addBot] botId: ${botId}`);
    //     this.adaptorCache.set(botId, adaptor);
    //     // console.log(`[addBot] cache-size: ${this.cache.size}`);
    // }

    // public getAdaptor(botId: string): BotFrameworkAdapter {
    //     // console.log(`[getBot] botId: ${botId}`);
    //     return this.adaptorCache.get(botId);
    // }
}