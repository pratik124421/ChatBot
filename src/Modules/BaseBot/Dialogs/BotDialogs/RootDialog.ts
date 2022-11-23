import { InputHints, MessageFactory } from "botbuilder";
//import { StatePropertyAccessor, TurnContext } from 'botbuilder-core';
import {
  ConversationState,
  MemoryStorage,
  UserState,
  Storage,
  StatePropertyAccessor,
} from "botbuilder";
import {
  ComponentDialog,
  DialogContext,
  DialogSet,
  DialogState,
  DialogTurnResult,
  DialogTurnStatus,
  TextPrompt,
  WaterfallDialog,
  WaterfallStepContext,
} from "botbuilder-dialogs";
import { AppCache } from "../../Bot/Cache";
import { RequestData } from "../../Models/RequestModel";
import { MainRecognizer } from "../../Recognizers/MainRecognizer";
import { BaseDialog } from "../BaseDialog";

export class RootDialog extends BaseDialog {
  constructor(id: string, dialogs: ComponentDialog[]) {
    super(id);
    const MAIN_WATERFALL_DIALOG = id;

    for (var i = 0; i < dialogs.length; i++) {
      this.addDialog(dialogs[i]);
      AppCache.getInstance().getDialogCache().set(dialogs[i].id, dialogs[i]);
    }

    this.addDialog(new TextPrompt("TextPrompt"));
    this.addDialog(
      new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
        this.findIntentAndDialog.bind(this),
        this.finalStep.bind(this),
      ])
    );

    this.initialDialogId = MAIN_WATERFALL_DIALOG;
  }

  private async findIntentAndDialog(stepContext: WaterfallStepContext) {
    // stepContext.prompt("TextPrompt", { prompt: "" });
    // const intentResult = await MainRecognizer.getInstance().onRecognize(
    //   stepContext.context
    // );
    // const dialog = AppCache.getInstance()
    //   .getDialogCache()
    //   .get(intentResult.topIntent);

    // if (dialog) {
    //   return await stepContext.beginDialog(dialog.id, intentResult);
    //   //return await stepContext.replaceDialog("mlic.greetings");
    // } else {
    //   return await this.handleUndefinedDialog(stepContext);
    // }
    return await stepContext.replaceDialog("bot.greeting");
  }

  /**
   * This is the final step in the main waterfall dialog.
   * It wraps up the sample "book a flight" interaction with a simple confirmation.
   */
  private async finalStep(
    stepContext: WaterfallStepContext
  ): Promise<DialogTurnResult> {
    // Restart the main dialog waterfall with a different message the second time around
    return await stepContext.replaceDialog(this.initialDialogId, {
      restartMsg: "What else can I do for you?",
    });
  }

  /**
   * The run method handles the incoming activity (in the form of a DialogContext) and passes it through the dialog system.
   * If no dialog is active, it will start the default dialog.
   * @param {TurnContext} context
   */
  public async run(context, accessor) {
    console.log("root dialog called...");
    const dialogSet = new DialogSet(accessor);
    dialogSet.add(this);
    RequestData.getInstance().dialogSet = dialogSet
    const dialogContext = await dialogSet.createContext(context);
    // console.log("dialog context => ", dialogContext)
    const results = await dialogContext.continueDialog();
    console.log("dialog context initilized...", this.id);
    if (results.status === DialogTurnStatus.empty) {
      await dialogContext.beginDialog(this.id);
    }
  }

  private async handleUndefinedDialog(
    stepContext: WaterfallStepContext
  ): Promise<DialogTurnResult> {
    const messageText = "Sorry, I could not find any matching flow. Try again";
    const promptMessage = MessageFactory.text(
      messageText,
      messageText,
      InputHints.ExpectingInput
    );
    return await stepContext.prompt("TextPrompt", { prompt: promptMessage });
  }

  public getNewInstance() {
    throw new Error("Method not implemented.");
  }
}
