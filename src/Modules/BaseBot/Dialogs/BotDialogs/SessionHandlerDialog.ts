import {
    ComponentDialog,
    ConfirmPrompt,
    TextPrompt,
    ChoicePrompt,
    NumberPrompt,
    ChoiceFactory,
    WaterfallDialog,
  } from "botbuilder-dialogs";
  import { CardTypes } from "../../BotCards";
import { CardHandler } from "../../CardHandler";
  import { BaseComponentDialog } from "../BaseComponentDialog";
  import { BaseDialog } from "../BaseDialog";
  
  export class SessionHandlerDialog extends BaseComponentDialog {
    public getNewInstance() {
      const instance = new SessionHandlerDialog(this.name);
      return instance;
    }
    constructor(id: string) {
      super(id || "bot.session.handler");
      this.addDialog(new TextPrompt(CardTypes.TEXT_PROMPT))
        .addDialog(new ConfirmPrompt(CardTypes.CONFIRM_PROMPT))
        .addDialog(new NumberPrompt(CardTypes.NUMBER_PROMPT))
        .addDialog(new ChoicePrompt(CardTypes.CHOICE_PROMPT))
        .addDialog(
          new WaterfallDialog(CardTypes.WATERFALL_DIALOG, [this.Step1.bind(this)])
        );
      this.initialDialogId = CardTypes.WATERFALL_DIALOG;
    }
  
    async Step1(stepContext) {
    //   await stepContext.context.sendActivity("Your session has been expired..");
      let message = "Your session has been expired.."
    //   return await stepContext.prompt(TextPrompt,"please type your query...")
      return await CardHandler.sendPrompt(stepContext,CardTypes.CHOICE_PROMPT,message,["Startnew convesation"])
    }

    async Step2(stepContext){
        return await stepContext.replaceDialog("bot.greeting")
    }
  }
  