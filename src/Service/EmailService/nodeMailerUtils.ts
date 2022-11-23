import { Config } from "./utils/config";

const nodemailer = require("nodemailer")
export class NodeMailer{
    private static transport : any;
    public static async getTransporter(){
        if(NodeMailer.transport){
            return NodeMailer.transport
        }
        try{
            // details about transpoter....
            // https://nodemailer.com/smtp/
            NodeMailer.transport = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port:587,
                pool:true,
                secure:false,
                ignoreTLS:false,
                requireTLS:false,
                connectionTimeout:20000,
                greetingTimeout:5000,
                socketTimeout:20000,
                auth:{
                    user:Config.username,
                    pass:Config.password
                },
                tls:{
                    ciphers:"SSLv3",
                    // do not fail on invalid certs
                    // rejectUnauthorized: false,
                },
                debug:false,
                logger:false
            })
            return NodeMailer.transport
        }catch(error){
            console.log("nodemailer...error",error)
        }
    }
}