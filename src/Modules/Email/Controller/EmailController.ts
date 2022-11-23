import { Request, Response } from 'express';
import { SendMail } from '../SendMail';

export class EmailController{

    private static instance: EmailController;

    private constructor() {
    }

    public static getInstance = () => {
        if (EmailController.instance == null) {
            EmailController.instance = new EmailController();
        }
        return EmailController.instance;
    }



    public async sendMail(req: Request, res: Response): Promise<any> {
        const MailObj =  SendMail.getInstance()
        let body = req.body.messageBody
        let subject = req.body.subject
        let sender = req.body.sender
        let reciever = req.body.reciever
        let cc = req.body.cc
        return MailObj.sendMail(body,subject,sender,reciever,cc)
    }
}
