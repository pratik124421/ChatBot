import { TurnContext } from "botbuilder";
import { DialogSet } from "botbuilder-dialogs";
import { DialogFactory } from "../../../Modules/BaseBot/Dialogs/DialogFactory";
import { RequestData } from "../../../Modules/BaseBot/Models/RequestModel";
import { TimeoutStorage } from "./TimeoutStorage";

export class TimeoutHandler{
    public TimeoutStorage : TimeoutStorage

    constructor(){
        this.TimeoutStorage = new TimeoutStorage()
    }

    public onUpdate(context:TurnContext){
        const convoId = context.activity.conversation.id;
        this.TimeoutStorage.storeConvoIdAndSession(convoId,context)
    }

    public onReceive(context:TurnContext){
        this.clearTimeoutHandler(context.activity.conversation.id)
        this.resetHandler(context.activity.conversation.id)
    }

    public onSend(context:TurnContext){
        const convoId = context.activity.conversation.id;
        if(this.TimeoutStorage.isValid(convoId)){
            if(this.TimeoutStorage.getPromptHandlerFor(convoId) === false){
                this.startPromptTimer(context)
            }
        }
    }

    public clearTimeoutHandler(convId:string){
        if(this.TimeoutStorage.getPromptHandlerFor(convId) !== false){
            clearTimeout(this.TimeoutStorage.getPromptHandlerFor(convId))
        }
        if(this.TimeoutStorage.getEndConvoHandlerFor(convId) !== false){
            clearTimeout(this.TimeoutStorage.getEndConvoHandlerFor(convId))
        }

    }

    public resetHandler(convoId:string){
        this.TimeoutStorage.setPromptHandlerFor(convoId,false)
        this.TimeoutStorage.setEndConvoHandlerFor(convoId,false)
    }

    public startPromptTimer(context:TurnContext){
        const ConversationReference = TurnContext.getConversationReference(context.activity);

        context.adapter.continueConversation(ConversationReference,async (TurnContext:any)=>{
            await new Promise((resolve)=>{
                const handler = setTimeout(async(resolve)=>{
                    const dialogSet:DialogSet = RequestData.getInstance().dialogSet
                    dialogSet.add(DialogFactory.getRegistry().get('bot.session.handler'))

                    const dialogContext = await dialogSet.createContext(TurnContext)

                    dialogContext.replaceDialog("bot.session.handler")
                    dialogContext.cancelAllDialogs(true)

                },10000)
                this.TimeoutStorage.setPromptHandlerFor(context.activity.conversation.id,handler)
            })
        })
    }

    public startEndConvoTimer(context:TurnContext){
        const ConversationReference = TurnContext.getConversationReference(context.activity);

        context.adapter.continueConversation(ConversationReference,async (TurnContext:any)=>{
            await new Promise((resolve)=>{
                const handler = setTimeout(async(resolve)=>{
                    const dialogSet:DialogSet = RequestData.getInstance().dialogSet
                    dialogSet.add(DialogFactory.getRegistry().get('bot.session.handler'))

                    const dialogContext = await dialogSet.createContext(TurnContext)

                    dialogContext.replaceDialog("bot.session.handler")
                    dialogContext.cancelAllDialogs(true)

                },10000)
                this.TimeoutStorage.setEndConvoHandlerFor(context.activity.conversation.id,handler)
            })
        })
    }

    

}