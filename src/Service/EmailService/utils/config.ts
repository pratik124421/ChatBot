import { EnvironmentConfig } from "../../../EnvironmentConfig"

export class Config{
    static username : string
    static password : string
    static Mailbox_SourcePath : string
    public static IMAPConfig(){
        return {
            user:Config.username?Config.username:EnvironmentConfig.getInstance().senderEmail,
            password:Config.password?Config.password:EnvironmentConfig.getInstance().senderEmailPassword,
            host:"imap.gmail.com",
            port:993,
            tls:true,
            tlsOptions:{rejectUnauthorized:false},
            keepAlive:{interval:60000}
        }
    }
}