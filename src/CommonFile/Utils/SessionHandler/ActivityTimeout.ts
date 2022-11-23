import { Activity, TurnContext } from "botbuilder";
import { MainBot } from "../../../Modules/BaseBot/Bot/MainBot";
import { TimeoutHandler } from "./TimeoutHandler";

export class ActivityTimeout{
    private timeout : TimeoutHandler= null

    constructor(Bot:MainBot){
        this.timeout = new TimeoutHandler()
        Bot.onConversationUpdate(async (context:TurnContext,next) => {
                this.timeout.onUpdate(context)
                await next();
            })
        
        Bot.onTurn(async (context:TurnContext,next) =>{
            if(context.activity.channelId == "msteams" && !this.timeout.TimeoutStorage.isValid(context.activity.conversation.id)){
                this.timeout.onUpdate(context)
            }

            if(context.activity.from.role == 'user' && context.activity.type=="message"){
                this.timeout.onReceive(context)
            }

            context.onSendActivities(async (stepContext:TurnContext,activities:Partial<Activity>[],nextstep)=>{
                activities.filter(a => a.type !== 'typing' && a.type !== 'endOfConversation').forEach(a=>{
                    this.timeout.onSend(context)
                })
                return nextstep()
            })
            await next()
        })
    }

}