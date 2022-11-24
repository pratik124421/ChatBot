import { WAPIType } from "./../../CommonFile/enum";
import { HttpUtil } from "./../../CommonFile/Utils/HttpUtil";
import { WapiInterface } from "./wapiInterface";
const axios = require("axios");

import { GenerateWapiPayload } from "./GenerateWAPIPayload";

export class WAPIMsgService implements WapiInterface {
  private static ApiServiceUrl: string =
    "/Maxlife/api_integration/REST/Summit_RESTWCF.svc/RESTService/CommonWS_JsonObjCall";

  private static instance: WAPIMsgService = null;

  private constructor() {}
  searchServiceCatalog(tool: any, query: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  public static getInstance(): WAPIMsgService {
    if (WAPIMsgService.instance == null) {
      WAPIMsgService.instance = new WAPIMsgService();
    }
    return WAPIMsgService.instance;
  }

  private constructHeaders(config: any) {
    let authToken =
      "Basic " +
      Buffer.from(config.principal + ":" + config.secret).toString("base64");
    let headers = {};
    headers["Authorization"] = authToken;
    headers["Content-Type"] = "application/json";
    return headers;
  }

  private async getMethod(
    metadata: any,
    requestUrl: string,
    requestName: string
  ): Promise<any> {
    const url = metadata.url + requestUrl;
    return await HttpUtil.get(url, this.constructHeaders(metadata));
  }

  private async postMethod(
    payload: any,
    metadata: any,
    requestUrl: string,
    requestName: string
  ): Promise<any> {
    const url = metadata.url + requestUrl;
    return await HttpUtil.post(url, payload, this.constructHeaders(metadata));
  }

  public async SendSimpleTextMessage(
    payload: any,
    metadata: any
  ): Promise<string> {
    // throw new Error("Method not implemented.");

    return "working fine";
    let short_description = payload.short_description;
    let url = "";
    return await this.getMethod(metadata, url, WAPIType.SendSimpleTextMessage);
  }
}
