export class Config{
    static username : string
    static password : string
    static Mailbox_SourcePath

    public static setCredentials(email:string,password:string,MailBox:string){
        Config.username = email
        Config.password = password
        Config.Mailbox_SourcePath=MailBox
    }

    public static IMAPConfig(){
        return {
            user:Config.username,
            password:Config.password,
            host:"imap.gmail.com",
            port:993,
            tls:true,
            tlsOptions:{rejectUnauthorized:false},
            keepAlive:{interval:60000}
        }
    }
}