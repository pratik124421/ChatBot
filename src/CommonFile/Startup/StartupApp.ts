import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors'
import { EnvironmentConfig } from '../../EnvironmentConfig';
import { AdminRouter } from '../../Modules/Admin/Router/MainRouter';
import { BotRouter } from '../../Modules/BaseBot/Router/MainRouter';
import { BotConfig } from '../../Modules/BaseBot/Bot/BotConfig';
import { EmailRouter } from '../../Modules/Email/Router/MainRouter';

export class StartupApp{
    private static instance: StartupApp;
    private environment : EnvironmentConfig
    private botConfigObj:BotConfig;

    app = express()

    public static getInstance(): StartupApp {
      if (StartupApp.instance == null) {
        StartupApp.instance = new StartupApp();
      }
      return StartupApp.instance;
    }

    constructor(){
      this.environment = EnvironmentConfig.getInstance()
    }


    public initializeApp() {

      this.botConfigObj =new BotConfig();
      this.botConfigObj.Config();
        
      this.app.use(cors({
        origin: '*'
      }));

      this.app.use(express.json({ limit: '50mb' }));
      this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
      this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
      this.app.use(bodyParser.json());

      this.app.use("/admin",new AdminRouter().getRouter())
      this.app.use("/api",new BotRouter().getRouter())
      this.app.use("/email",new EmailRouter().getRouter())

      this.app.listen(8080, () => {
        console.log("service running on port 8080...")
      });
      

    }

}