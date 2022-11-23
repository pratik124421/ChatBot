import { BaseComponentDialog } from "./BaseComponentDialog";
import { GreetingDialog } from "./BotDialogs/GreetingDialog";
import { RootDialog } from "./BotDialogs/RootDialog";
import { SessionHandlerDialog } from "./BotDialogs/SessionHandlerDialog";
import { TestingDialog } from "./BotDialogs/TestingDialog";
const nlpConfig = require("../../../../Resourses/nlpConfig.json");

export class DialogFactory {
  public static dialogRegistry: Map<string, BaseComponentDialog>;

  public static getRegistry() {
    if (!DialogFactory.dialogRegistry) {
      DialogFactory.dialogRegistry = new Map<string, BaseComponentDialog>();
      DialogFactory.dialogRegistry.set(
        "bot.greeting",
        new GreetingDialog("bot.greeting")
      );
      DialogFactory.dialogRegistry.set(
        "bot.session.handler",
        new SessionHandlerDialog("bot.session.handler")
      );
      DialogFactory.dialogRegistry.set(
        "bot.testing",
        new TestingDialog("bot.testing")
      );
      console.log("greeting dialog set...");
    }
    return DialogFactory.dialogRegistry;
  }

  public static async getRootDialog() {
    var DialogList = [];
    if (nlpConfig.intents) {
      for (let intent of nlpConfig.intents) {
        console.log(">>>>>>>>>>>comming in dialof factory..", intent);

        let dialogTmp = this.getRegistry().get(intent.name).getNewInstance();
        DialogList.push(dialogTmp);
      }
    }
    return new RootDialog("root.dialog", DialogList);
  }
}
