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
import { BaseComponentDialog } from "../BaseComponentDialog";
import { BaseDialog } from "../BaseDialog";

export class TestingDialog extends BaseComponentDialog {
  public getNewInstance() {
    const instance = new TestingDialog(this.name);
    return instance;
  }
  constructor(id: string) {
    super(id || "bot.testing");
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
    await stepContext.context.sendActivity("testing dialog works");
    return await stepContext.endDialog();
  }
}
