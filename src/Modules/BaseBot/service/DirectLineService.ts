import { HttpUtil } from "../../../CommonFile/Utils/HttpUtil";
import { header } from "express-validator/check";
import { format } from "path";
import { WapiConfig } from "../../../Service/WAPI/WapiConfig";
import { WAPIType } from "../../../CommonFile/enum";

const axios = require("axios");

export class DirectLineService {
  private cache: Map<string, string>;

  private static instance: DirectLineService;

  constructor() {
    this.cache = new Map<string, string>();
  }

  public static getInstance(): DirectLineService {
    if (DirectLineService.instance == null) {
      DirectLineService.instance = new DirectLineService();
    }
    return DirectLineService.instance;
  }

  public async external_service(payload: any) {
    console.log("::::>>>", payload);
    let result: any;

    let response = WapiConfig._wapiService.execute(
      WAPIType.SendSimpleTextMessage.toString(),
      payload
    );
    console.log(response);
    return response;
    if (payload.count == 0) {
      result = await this.startConversation(payload);
    } else {
      result = await this.resumeConversation(payload);
    }

    return result;
  }

  public async startConversation(payload: any) {
    //get cov-ID first
    let token = await this.getDirectLineToken();

    // payload.message = {}
    // payload.message.text = "Hi"
    //     payload = {"type":"message",
    //     "text":"hi",
    //     "from":{
    //         "id":"kadu_pooja@network.lilly.com"
    //     },
    //     "locale":"en"
    // }

    // let msgPayload = await this.constructPayloadToSendMessage(payload)

    let result = await this.sendMessage(
      token.conversationId,
      payload,
      token.token
    );

    let response = await this.getResponse(token.conversationId, token.token);

    let finalResponse = await this.getLatestResponse(
      response.activities,
      result.id
    );
    finalResponse["directlineToken"] = token.token;
    finalResponse["conversationId"] = token.conversationId;

    return finalResponse;
  }

  public async resumeConversation(payload: any) {
    let tokens = await this.refreshToken(payload.directlineToken);
    if (tokens.name == "Error") {
      return await this.startConversation(payload);
    }

    let msgPayload = await this.constructPayloadToSendMessage(payload);

    msgPayload["from"] = {
      id: "integration@maxlife.com",
    };

    let result = await this.sendMessage(
      payload.conversationId,
      msgPayload,
      tokens.token
    );

    let response = await this.getResponse(payload.conversationId, tokens.token);

    let finalResponse = await this.getLatestResponse(
      response.activities,
      result.id
    );

    finalResponse["directlineToken"] = tokens.token;
    finalResponse["conversationId"] = tokens.conversationId;

    return finalResponse;
  }

  public async getDirectLineToken() {
    try {
      let tokenUrl =
        "https://directline.botframework.com/v3/directline/conversations";
      let directlineSecret = process.env.directlineSecret;
      if (directlineSecret) {
        var header = {
          Authorization: `Bearer ${directlineSecret}`,
          "Content-Type": "application/json",
        };
        let response = HttpUtil.post(tokenUrl, null, header);
        return response;
      } else {
        return {
          error: "error in your request, could not able to generate tokens",
        };
      }
    } catch (e) {
      return {
        error: "error in your request, could not able to generate tokens",
      };
    }
  }

  public async refreshToken(token: any) {
    try {
      let url =
        "https://directline.botframework.com/v3/directline/tokens/refresh";

      var header = {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
      };
      let response = await HttpUtil.post(url, {}, header);
      return response;
    } catch (e) {
      return "error";
    }
  }

  public async sendMessage(conversationId: string, message: any, token: any) {
    try {
      let url =
        "https://directline.botframework.com/v3/directline/conversations/" +
        conversationId +
        "/activities";

      var header = {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
      };
      let response = await HttpUtil.post(url, message, header);
      return response;
    } catch (e) {
      return "error";
    }
  }

  public async getResponse(conversationId: string, authToken: any) {
    try {
      let url =
        "https://directline.botframework.com/v3/directline/conversations/" +
        conversationId +
        "/activities";

      var header = {
        Authorization: `Bearer ` + authToken,
        "Content-Type": "application/json",
      };
      let response = HttpUtil.get(url, header, null);
      return response;
    } catch (e) {
      return "error";
    }
  }
  public async getLatestResponse(activities: any, replyToId: string) {
    let finalResponse = {};

    let ans = [];

    for (let i = activities.length - 1; i >= 0; i--) {
      let current = activities[i];
      if (current.replyToId != replyToId) {
        break;
      } else {
        if (current.attachments && current.attachments.length > 0) {
          console.log("having card" + current.attachments[0].contentType);
          if (
            current.attachments[0].contentType ==
            "application/vnd.microsoft.card.adaptive"
          ) {
            console.log("having adaptive card..!");
            let finalObj = await this.constructResponseMessage(
              "adaptiveCard",
              current
            );
            ans.unshift(finalObj);
          } else if (
            current.attachments[0].contentType ==
            "application/vnd.microsoft.card.hero"
          ) {
            console.log("having Hero card..!");
            //let translatedObject= await this.translateHeroCard(current, language)
            let finalObj = await this.constructResponseMessage(
              "heroCard",
              current
            );
            ans.unshift(finalObj);
          }
        } else if (
          current.suggestedActions &&
          current.suggestedActions.actions
        ) {
          console.log("buttons...!");
          let finalObj = await this.constructResponseMessage(
            "choicePrompt",
            current
          );
          ans.unshift(finalObj);
        } else {
          let finalObj = await this.constructResponseMessage("text", current);
          ans.unshift(finalObj);
        }
      }
    }
    finalResponse["messages"] = ans;
    return finalResponse;
  }

  public async constructResponseMessage(type: any, data: any) {
    let finalPayload = {};
    if (type === "text") {
      finalPayload["messageType"] = "text";
      finalPayload["message"] = data.text;
      return finalPayload;
    } else if (type === "choicePrompt") {
      finalPayload["messageType"] = "choicePrompt";
      finalPayload["message"] = {
        text: data.text,
        suggestedActions: data.suggestedActions,
      };
      return finalPayload;
    } else if (type === "heroCard") {
      let btnArray = data.attachments[0].content.buttons;
      const newArray: any = [];
      btnArray.forEach((value: any) => {
        newArray.push({
          type: "imBack",
          title: value.title,
          value: value.value,
          text: value.title,
        });
      });
      data.attachments[0].content.buttons = newArray;

      finalPayload["messageType"] = "attachment";
      finalPayload["message"] = data.attachments[0];
      finalPayload["attachmentType"] = "HeroCard";
      const choices: any = [];
      let i = 1;
      newArray.forEach((value: any) => {
        choices.push(`\n` + i + "." + value.text);
        i++;
      });
      finalPayload["txt_hero_card"] = data.attachments[0].content.text;
      finalPayload["options"] = choices;
      let content = finalPayload["message"];

      finalPayload["message"] = content;

      return finalPayload;
    } else if (type === "adaptiveCard") {
      finalPayload["messageType"] = "attachment";
      finalPayload["message"] = data.attachments[0];
      finalPayload["attachmentType"] = data.attachments[0].content.type;
      let choices = [];
      let array1 = [];
      let array2 = [];

      let newArray = data.attachments[0].content.body;

      const setData = async (newArray) => {
        newArray.forEach(async (obj) => {
          if (obj.type == "TextBlock") {
            choices.push(`\n` + obj.text);
          } else if (obj.type == "Input.Number" || obj.type === "Input.Text") {
            choices.push(`\n` + obj.lable);
          } else if (obj.type === "Action.OpenUrl") {
            choices.push(
              finalPayload["adaptiveCardTranscriptMessage"] +
                `\n` +
                "URL : " +
                obj.url +
                `\n`
            );
          } else if (
            obj.type === "Action.Submit" ||
            obj.type === "Action.ToggleVisibility"
          ) {
            choices.push(
              finalPayload["adaptiveCardTranscriptMessage"] +
                `\n` +
                "Title : " +
                obj.title +
                `\n`
            );
          } else if (obj.type == "ActionSet") {
            await setData(obj.actions);
          } else if (obj.type == "Container") {
            await setData(obj.items);
          } else if (obj.type == "ColumnSet") {
            await setData(obj.columns);
          } else if (obj.type == "Column") {
            await setData(obj.items);
          }
        });
      };

      await setData(newArray);

      let choiceinText: any = choices.join();
      finalPayload["adaptiveCardTranscriptMessage"] = choiceinText;

      return finalPayload;
    }
  }

  public async constructPayloadToSendMessage(payload: any) {
    let data = {};
    data["type"] = "message";
    // data['from'] = {
    //     'id': payload.userEmail
    // }

    if (payload.message.text == "" || payload.message.text == undefined) {
      data["text"] = " ";
    } else {
      data["text"] = payload.message.text;
    }
    data["attachments"] = [];
    if (payload.message) {
      if (
        payload.message.attachments &&
        payload.message.attachments.length > 0
      ) {
        let attachment = [];
        for (let attachmentObject of payload.message.attachments) {
          let attachmentToSend = {};
          if (
            attachmentObject.content &&
            attachmentObject.content.fileType &&
            attachmentObject.content.downloadUrl &&
            attachmentObject.name
          ) {
            attachmentToSend["contentType"] = attachmentObject.content.fileType;
            attachmentToSend["contentUrl"] =
              attachmentObject.content.downloadUrl;
            attachmentToSend["name"] = attachmentObject.name;
            attachment.push(attachmentToSend);
          }
        }

        data["attachments"] = attachment;
      }
    }

    return data;
  }
}
