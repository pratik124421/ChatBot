import { ImapService } from "../imap"

const cron = require("node-cron")
export class MailScheduler{
    public static StartMailScheduler(){
        cron.schedule("20 * * * * *",()=>{
            console.log("jo started...")
            ImapService.getInstance().runJob()
        })
    }
}