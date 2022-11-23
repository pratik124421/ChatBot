import {
  ComponentDialog,
  ConfirmPrompt,
  TextPrompt,
  ChoicePrompt,
  NumberPrompt,
  ChoiceFactory,
  WaterfallDialog,
  Dialog,
} from "botbuilder-dialogs";
import { CardTypes } from "../../BotCards";
import { CardHandler } from "../../CardHandler";
import { BaseComponentDialog } from "../BaseComponentDialog";
import { BaseDialog } from "../BaseDialog";

export class GreetingDialog extends BaseComponentDialog {
  public getNewInstance() {
    const instance = new GreetingDialog(this.name);
    return instance;
  }
  constructor(id: string) {
    super(id || "bot.greeting");
    this.addDialog(new TextPrompt(CardTypes.TEXT_PROMPT))
      .addDialog(new ConfirmPrompt(CardTypes.CONFIRM_PROMPT))
      .addDialog(new NumberPrompt(CardTypes.NUMBER_PROMPT))
      .addDialog(new ChoicePrompt(CardTypes.CHOICE_PROMPT))
      .addDialog(
        new WaterfallDialog(CardTypes.WATERFALL_DIALOG, [
          this.Step1.bind(this),
          this.Step2.bind(this),
        ])
      );
    this.initialDialogId = CardTypes.WATERFALL_DIALOG;
  }

  async Step1(stepContext) {
    await stepContext.context.sendActivity(
      "Hi, Thank you for contacting virtual assistant."
    );

    let card = CardHandler.createCardMsgActivity(
      stepContext,
      CardTypes.GREETING_CARD.toString()
    );
    await stepContext.context.sendActivity(card);
    return Dialog.EndOfTurn;
  }

  async Step2(stepContext) {
    console.log("greeting result...", stepContext.context.activity.value);
    return await stepContext.replaceDialog("bot.testing");
  }
}
