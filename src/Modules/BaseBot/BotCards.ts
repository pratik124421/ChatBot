export enum CardTypes {
  CONFIRM_PROMPT = "confirmPrompt",
  CHOICE_PROMPT = "CHOICE_PROMPT",
  NUMBER_PROMPT = "NUMBER_PROMPT",
  TEXT_PROMPT = "textPrompt",
  DATE_TIME_PROMPT = "DATE_TIME_PROMPT",
  WATERFALL_DIALOG = "waterfallDialog",
  GREETING_CARD = "GREETING_CARD",
}

export class Cards {
  static getCard(cardName: string, stepContext: any, options?: any) {
    const card =
      CardTypes.GREETING_CARD === cardName
        ? Cards.GREETING_CARD_FUNCTION(stepContext, options)
        : {};
    return card;
  }

  public static GREETING_CARD_FUNCTION(stepContext: any, data: any): any {
    let bodyList = [];
    return {
      type: "AdaptiveCard",
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.2",
      body: [
        {
          type: "TextBlock",
          text: "Start new conversation",
          wrap: true,
        },
        {
          type: "ActionSet",
          actions: [
            {
              type: "Action.Submit",
              title: "Submit",
            },
          ],
        },
      ],
    };
  }
}
