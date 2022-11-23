import {
  BotFrameworkAdapter,
  BotFrameworkAdapterSettings,
  WebRequest,
  WebResponse,
  TurnContext,
  ConversationState,
  TranscriptLoggerMiddleware,
  ShowTypingMiddleware,
  ConsoleTranscriptLogger,
  TranscriptLogger,
  Activity,
} from "botbuilder";
import { addRequest, getRequest } from "../../../CommonFile/Utils/NodeCache";

export class Adapter extends BotFrameworkAdapter {
  public constructor(settings?: Partial<BotFrameworkAdapterSettings>) {
    super(settings);
    super.onTurnError = this.onTurnErrorHandler;
  }

  public async process(
    req: WebRequest,
    res: WebResponse,
    logic: (context: TurnContext) => Promise<any>
  ): Promise<void> {
    let reqId = getRequest(req.body.conversation.id);

    if (reqId == undefined) {
      addRequest(req.body.conversation.id, req.body.timestamp);

      super.processActivity(req, res, logic);
    } else if (reqId != req.body.timestamp) {
      addRequest(req.body.conversation.id, req.body.timestamp);

      super.processActivity(req, res, logic);
    } else {
      console.log("double message detected..");
    }
  }

  private onTurnErrorHandler = async (context, error) => {
    await context.sendTraceActivity(
      "OnTurnError Trace",
      `${error}`,
      "https://www.botframework.com/schemas/error",
      "TurnError"
    );

    console.log("error occured", error);
    // Send a message to the user
    await context.sendActivity("The bot encountered an error or bug.");
    await context.sendActivity(
      "To continue to run this bot, please fix the bot source code."
    );
  };

  // Set the onTurnError for the singleton BotFrameworkAdapter.
}
