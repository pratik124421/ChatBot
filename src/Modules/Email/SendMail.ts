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
    public async sendMail(body:string,subject:any,sender:any,reciever:any,cc?:any):Promise<any>{
        try{
        var mailOption = await this.getMailOptions(body,subject,sender,reciever,cc)
        const transport = await NodeMailer.getTransporter()
        console.log("transpoter obj created...",JSON.stringify(mailOption),":::")
        const sentMail = await transport.sendMail(mailOption)
        return sentMail
        }catch(error){
            console.log("error",error)
        }
    }

    public async getMailOptions(body:string,subject:any,sender:any,reciever:any,cc?:any){
        // https://nodemailer.com/message/
        // let cc_list = cc.split(",") 
        return {
            from:sender,
            to:reciever,
            subject:subject,
            text:body,
            cc:cc,
            // mailbox:"Dummy"
        }
    }
}