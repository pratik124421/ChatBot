import { WAPIType } from "./../../CommonFile/enum";
import { WapiInterface } from "./wapiInterface";
import { WAPIMsgService } from "./WAPIMsgService";

export class WapiService {
  private wapi = WAPIMsgService.getInstance();

  private getService(type: string): WapiInterface {
    // if(ExternalApp.ServiceNow.toString() === type ) {
    //     return this.wapi;
    // }
    return this.wapi;
  }

  public async action(config: any, payload: any, action: string) {
    let service: WapiInterface = this.getService(config.type);

    switch (action) {
      case WAPIType.SendSimpleTextMessage.toString():
        return service.SendSimpleTextMessage(payload, config);

      default:
        console.log("default");
        break;
    }

    throw new Error("Method not implemented.");
  }
}
