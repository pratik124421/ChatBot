const { InputHints, CardFactory } = require("botbuilder");
import {
  ComponentDialog,
  ConfirmPrompt,
  TextPrompt,
  ChoicePrompt,
  NumberPrompt,
  ChoiceFactory,
  WaterfallDialog,
  ListStyle,
} from "botbuilder-dialogs";
import {
  IMessageActivity,
  ActivityFactory,
  ActivityTypes,
  MessageFactory,
} from "botbuilder";
import { Cards } from "./BotCards";

export class CardHandler {
  constructor() {}

  public static GetAdaptiveCard(
    cardName: string,
    stepContext: any,
    options: any
  ) {
    return CardFactory.adaptiveCard(
      Cards.getCard(cardName, stepContext, options)
    );
  }

  public static getCaurosalCard(
    cardName: string,
    stepContext: any,
    options: any
  ) {
    Cards.getCard(cardName, stepContext, options);
  }

  public static async textPromptWithChoice(
    stepContext: any,
    promptType: any,
    promptMsg: any,
    promptOptions?: any
  ) {
    let channelType = stepContext.context.activity.channelId;
    let optionString: string;

    if (promptOptions) {
      optionString = promptOptions[0];
      for (let i = 1; i < promptOptions.length; i++) {
        optionString = optionString + "|" + promptOptions[i];
      }
    }

    if (channelType == "directline" || channelType == "webchat") {
      let channelData: any = {
        message: promptMsg,
        rawData: optionString,
        dataType: "OTHER_CHOICE",
      };
      let message = MessageFactory.text(
        promptMsg,
        promptMsg,
        InputHints.ExpectingInput
      );
      message.channelData = channelData;
      return await stepContext.prompt(promptType, {
        prompt: message,
        choices: ChoiceFactory.toChoices(promptOptions),
      });
    } else {
      let cardArray = [];
      let data = {
        options: promptOptions,
        message: promptMsg,
      };

      for (let i = 0; i < data.options.length; i = i + 5) {
        let res = [];
        for (let j = 0; j < 5; j++) {
          if (i + j < data.options.length) {
            if (stepContext.context.activity.channelId == "emulator") {
              res.push({
                type: "Action.Submit",
                title: data.options[i + j],
                data: data.options[i + j],
              });
            } else {
              res.push({
                type: "Action.Submit",
                title: data.options[i + j],
                data: {
                  msteams: {
                    type: "imBack",
                    value: data.options[i + j],
                  },
                },
              });
            }
          } else {
            break;
          }
        }

        var adaptiveCard = CardFactory.adaptiveCard({
          type: "AdaptiveCard",
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          msTeams: {
            width: "full",
          },
          version: "1.0",
          body: [
            {
              type: "TextBlock",
              text: data.message,
              wrap: true,
            },
          ],
          actions: res,
        });

        cardArray.push(adaptiveCard);
      }

      // const cardmsg = CardHandler.getInstance().createCardMsgActivity(stepContext,PlatFormCarType.GET_FEEDBACK_CARD,data)

      return await stepContext.prompt(promptType, {
        prompt: MessageFactory.carousel(cardArray),
      });
    }
  }

  public static createCardMsgActivity(
    stepContext: any,
    cardName: any,
    options?: any,
    msg?: any,
    cardtype?: any
  ) {
    let cardType = cardtype ? cardtype : "adaptiveCard";
    let Msg = msg ? msg : "";
    let type = "message";

    let card: any;

    card = CardHandler.GetAdaptiveCard(cardName, stepContext, options);

    let channelData: any = {};
    channelData.message = Msg;
    channelData.type = type;
    channelData.cardType = cardType;
    channelData.dataType = cardName;

    let message = MessageFactory.attachment(card);
    message.channelData = channelData;

    return message;
  }

  public static createCarouselCardMsgActivity(
    stepContext: any,
    cardName: any,
    options?: any,
    msg?: any,
    cardtype?: any
  ) {
    let cardType = cardtype ? cardtype : "adaptiveCard";
    let Msg = msg ? msg : "";
    let type = "message";
    let card: any;

    card = CardHandler.getCaurosalCard(cardName, stepContext, options);

    console.log("carousel cardname", card);

    let channelData: any = {};
    channelData.message = Msg;
    channelData.type = type;
    channelData.cardType = cardType;
    channelData.dataType = cardName;

    let message = MessageFactory.carousel(card);
    //const message:ActivityTypes.Message =
    console.log(channelData);
    message.channelData = channelData;

    return message;
  }

  public static async sendPrompt(
    stepContext: any,
    promptType: any,
    promptMsg: any,
    promptOptions?: any
  ) {
    let optionString: string;

    if (promptOptions) {
      optionString = promptOptions[0];

      for (let i = 1; i < promptOptions.length; i++) {
        optionString = optionString + "|" + promptOptions[i];
      }
    }
    if (promptType == "confirmPrompt") {
      let msg = MessageFactory.text(
        promptMsg,
        promptMsg,
        InputHints.ExpectingInput
      );
      return await stepContext.prompt(promptType, { prompt: msg });
    } else {
      return await stepContext.prompt(promptType, {
        prompt: promptMsg,
        choices: ChoiceFactory.toChoices(promptOptions),
        style: ListStyle.heroCard,
      });
    }
  }
}
