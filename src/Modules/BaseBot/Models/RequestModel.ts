import { DialogContext, DialogSet } from 'botbuilder-dialogs';
import { WebRequest, WebResponse, TurnContext } from 'botbuilder';

export class RequestData {
    public Request: WebRequest;
    public Response: WebResponse;
    public turnContext: TurnContext;
    public dialogContext: DialogContext;
    public channelId:string;
    public userName:string;
    public reqBody:any;
    public intent:string;
    public name:string;
    public dialogSet : DialogSet

    public static instance:RequestData
    public static getInstance(){
        if(!RequestData.instance){
            RequestData.instance = new RequestData()
        }
        return RequestData.instance
    }  
}