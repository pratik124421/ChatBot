import { Router, NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../../../CommonFile/BaseRouter';
import { EnvironmentConfig } from '../../../EnvironmentConfig';
import { EmailController } from '../Controller/EmailController';
import { Config } from '../utils/config';

export class EmailRouter extends BaseRouter {
    
    constructor() {
        let instance = EnvironmentConfig.getInstance()
        Config.setCredentials(instance.senderEmail,instance.senderEmailPassword,"INBOX")
        super();
    }

    private sendEmail(req,res){
        let email_ctrl = EmailController.getInstance()
        let info = email_ctrl.sendMail(req,res)
        res.send(info)
    }

    Routerinit(router: Router) {
        router.post('/sendMail', this.sendEmail)
       
        // throw new Error("Method not implemented.");
    }

}