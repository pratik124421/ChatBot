import { NextFunction, Request, Response } from 'express';
import { EnvironmentConfig } from '../../../EnvironmentConfig';
import { AppCache } from '../Bot/Cache';
import { MainBot } from '../Bot/MainBot';
import { RequestData } from '../Models/RequestModel';

export class BotController{

    public static async listen(req: Request, res: Response, next: NextFunction) {
        const botCache = AppCache.getInstance();
        const EnvConfig = EnvironmentConfig.getInstance()
        console.log("came here...")

        const data =  RequestData.getInstance();
        data.Request = req;
        data.Response = res;
        data.userName=req.body.from.name;
        data.reqBody=req.body;

        const bot:MainBot = botCache.getBot(EnvConfig.BotName);
        bot.adapter.process(req,res,async (context) => {
            await bot.run(context);
        });
    
    }
}