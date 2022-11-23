import { config } from "dotenv";
import path = require("path");
import { Env } from "./CommonFile/enum";

export class EnvironmentConfig {

    public static instance : EnvironmentConfig

    public microsoftAppId: string;
    public microsoftAppPassword: string;
    public luisAppId: string;
    public luisAPIKey: string;
    public luisAPIHostName: string;   
    public storageType: string;
    public defaultLang:string;

    public serverPort:number;
    public Env:string;

    public keyvaultName:string;
    public keyvaultState:string;
    public logfile:string;
    public loglevel:string;
    public tenantConfigSrc:string; // tenant_config_src
    public BotName : string
    public senderEmail:string
    public senderEmailPassword : string

    public isDeploymentEnvLocal(): boolean {
        return (this.Env === Env.LOCAL);
    }

   
   
    public static getInstance(){
        if( ! EnvironmentConfig.instance ){
            EnvironmentConfig.instance = new EnvironmentConfig()
        }
        return EnvironmentConfig.instance;
    }

    constructor(){        

        const ENV_FILE = path.join(__dirname, '..', '.env');
        config({ path: ENV_FILE });
        
        this.microsoftAppId= process.env.MicrosoftAppId;
        this.microsoftAppPassword= process.env.MicrosoftAppPassword;
        this.luisAppId= process.env.LuisAppId;
        this.luisAPIKey= process.env.LuisAPIKey;
        this.luisAPIHostName= process.env.LuisAPIHostName;
        this.serverPort= Number(process.env.platform_service_port);
        this.storageType= process.env.StorageType;
        this.defaultLang=process.env.DefaultLanguage;
        this.Env= process.env.platform_deployment_env
        this.tenantConfigSrc= process.env.tenant_config_src
        this.keyvaultName = process.env.keyvaultName;
        this.keyvaultState = process.env.keyvaultState;
        this.logfile = process.env.logfile;
        this.loglevel = process.env.loglevel;
        this.BotName = process.env.BotName
        this.senderEmail = process.env.senderemail
        this.senderEmailPassword = process.env.senderemailpassword

    }


}
