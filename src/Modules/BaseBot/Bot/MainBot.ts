import { Activity, TeamsInfo, TurnContext } from 'botbuilder';
import { ActivityHandler, MessageFactory, CardFactory, BotFrameworkAdapter } from 'botbuilder';
import { ConversationState, MemoryStorage, UserState, Storage,StatePropertyAccessor } from 'botbuilder';
import { DialogState } from 'botbuilder-dialogs';
import { ActivityTimeout } from '../../../CommonFile/Utils/SessionHandler/ActivityTimeout';
import { TimeoutHandler } from '../../../CommonFile/Utils/SessionHandler/TimeoutHandler';
import { RootDialog } from '../Dialogs/BotDialogs/RootDialog';
import { RequestData } from '../Models/RequestModel';
import { Adapter } from './Adapter';

export class MainBot extends ActivityHandler {
    private memoryStorage: Storage;
    private conversationState:ConversationState;
    private userState:UserState;
    private _adapter:Adapter;
    private userEmail : any;
    // private static memoryStorage = new MemoryStorage();
    private dialogState: StatePropertyAccessor<DialogState>;
    private activityTimeout : ActivityTimeout
    onMessage: any;
    onMembersAdded: any;
    onDialog: any;
    conversationReferences = {}


    

    constructor(private botName:string,
                private dialog?:RootDialog) {
       super();

       this.memoryStorage= new MemoryStorage();
       this.conversationState = new ConversationState(this.memoryStorage);
       this.userState = new UserState(this.memoryStorage);
       this.dialogState = this.conversationState.createProperty<DialogState>('DialogState');
       this.userEmail = this.userState.createProperty('UserEmail');

       
       if (dialog) {
        this.onMessage(async (context, next) => {
            console.log("base platform test-->", context.activity);
            this.addConversationReference(context.activity)

            // Run the Dialog with the new message Activity.
            const turnCtx: TurnContext = context as TurnContext;
            // turnCtx.activity.text
            await (this.dialog as RootDialog).run(context, this.dialogState);
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    // this.onConversationUpdate(async (context,next)=>{
    //     this.addConversationReference(context.activity);
    //     await next()
  
    //   })
     
 

       this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;

            console.log("members conversation id => ",context.activity.conversation.id)

            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    if(dialog) {

                        // const userEmail = await this.userEmail.get(context, {});

                        // if(context.activity.channelId == "directline"){
                        //     userEmail.email = dataObj.EmailId ? dataObj.EmailId : "integration@maxlife.com"
                        // }else{
                        //     userEmail.email = dataObj.EmailId ? dataObj.EmailId : "integration@maxlife.com"
                        //     const uuserdetails = await TeamsInfo.getMember(context, context.activity.from.id)
                        //     console.log("teams user details: ",uuserdetails)
                        // }


                        // await context.sendActivity(`name : ${data.name}`)
                        await (dialog as RootDialog).run(context, this.dialogState);

                    }

                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
       });
    

        this.onDialog(async (context, next) => {
            // Save any state changes. The load happened during the execution of the Dialog.
            await this.conversationState.saveChanges(context, false);
            await this.userState.saveChanges(context, false);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        // this.onMembersAdded(this.onMembersAddedInternal);
        // this.onTurn(this.onTurnInternal);
        // this.onEndOfConversation(this.onEndOfConversationInternal);
        // this.onTyping(this.onTurnInternal);
        // this.onUnrecognizedActivityType(this.onUnrecognizedActivityTypeInternal);
        // this.onDialog(this.onDialogInternal);
        // this.onMembersRemoved(this.onMembersRemovedInternal);
        this.activityTimeout = new ActivityTimeout(this)
    }

    addConversationReference(activity){

        const conversationReference = TurnContext.getConversationReference(activity)
        this.conversationReferences[conversationReference.conversation.id] = conversationReference 
    
      }

    get adapter():Adapter {
        return this._adapter;
      }

    set adapter(adapter:Adapter) {
        this._adapter = adapter;
      }
   
    public getBotName():string {
        return this.botName;
    }

    public getStorage():Storage{
        return this.memoryStorage;
    }

    public getConversationState():ConversationState{
        return this.conversationState;
    }
    
    public getUserState():UserState{
        return this.userState;
    }

    public getUserEmail():any{
        return this.userEmail
    }

    public getconversationReferences():any{
        return this.conversationReferences
    }

}