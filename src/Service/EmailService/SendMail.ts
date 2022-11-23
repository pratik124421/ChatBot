import { NodeMailer } from "./nodeMailerUtils"
import { Config } from "./utils/config"

const nodemailer = require("nodemailer")
export class SendMail{
    static instance : SendMail
    static transpoter : any

    public static getInstance(){
        if(SendMail.instance == null){
            SendMail.instance = new SendMail()
        }
        return SendMail.instance
    }

    // documentation to use nodemailer with other services like gmail,outlook and so on...
    // http://adilapapaya.com/docs/nodemailer/

    // https://nodemailer.com/about/
    // https://www.bacancytechnology.com/blog/send-email-using-nodemailer
    // https://community.nodemailer.com/
    public async sendMail(body:string,subject:any,sender:any,cc:any,mail:any,bot:any,attributes:any):Promise<any>{
        var mailOption = await this.getMailOptions(body,subject,sender,cc,mail)

        const transport = await NodeMailer.getTransporter()
        return transport.sendMail(mailOption,20)

    }

    public async getMailOptions(body:string,subject:any,sender:any,cc:any,mail:any){
        // https://nodemailer.com/message/
        return {
            from:Config.username,
            to:sender.address,
            subject:subject,
            html:body,
            cc:cc,
            mailbox:"Dummy"
        }
    }
}