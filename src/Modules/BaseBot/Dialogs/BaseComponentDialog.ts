
import { InputHints, MessageFactory, StatePropertyAccessor, TurnContext } from 'botbuilder';


import {
    ComponentDialog,
    DialogContext,
    DialogSet,
    DialogState,
    DialogTurnResult,
    DialogTurnStatus,
    TextPrompt,
    WaterfallDialog,
    WaterfallStepContext
} from 'botbuilder-dialogs';
import { TimerCache } from '../../../CommonFile/Utils/SessionHandler/TimerCache';
import { BaseDialog } from './BaseDialog';


export abstract class BaseComponentDialog extends BaseDialog {

    public async onContinueDialog(innerDc: DialogContext): Promise<DialogTurnResult> {
        // PlatformApplicationContext.getInstance().getRequestData().dialogContext=innerDc;

        const isPromptTimerActive = TimerCache.getInstance().cache.has(innerDc.context.activity.conversation.id) ? (TimerCache.getInstance().cache.get(innerDc.context.activity.conversation.id)).isPromptTimerActive : false;

        if(isPromptTimerActive){
            TimerCache.getInstance().cache.set(innerDc.context.activity.conversation.id,{isPromptTimerActive:false});
            await innerDc.cancelAllDialogs();

            if(innerDc.context.activity.text == "Startnew convesation"){
                return await innerDc.replaceDialog("bot.greeting")
            }else{
                return await innerDc.replaceDialog("bot.greeting")
            }

        }

        const result = await this.interrupt(innerDc);
        if (result) {
            return result;
        }
        return await super.onContinueDialog(innerDc);
    }

    private async interrupt(innerDc: DialogContext): Promise<DialogTurnResult|undefined> {
        if (innerDc.context.activity.text) {
            const text = innerDc.context.activity.text.toLowerCase();

            switch (text) {
                case 'cancel':
                case 'quit':
                case 'exit':
                    const cancelMessageText = "Thank you for contacting the Maxlife Virtual Assistant. Have a great day!"
                    await innerDc.context.sendActivity(cancelMessageText, cancelMessageText, InputHints.IgnoringInput);
                    return await innerDc.cancelAllDialogs();
            }
        }
    }




}
