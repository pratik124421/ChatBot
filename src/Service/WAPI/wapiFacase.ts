import { HttpUtil } from "../../CommonFile/Utils/HttpUtil";

export class wapiFacade {
  private _config: any;

  constructor(config: any) {
    this._config = config;
  }

  public async execute(operation: string, payloadDetails: {}): Promise<any> {
    let fullpayload = {
      config: this._config,
      payload: payloadDetails,
      action: operation,
    };

    let response = await HttpUtil.post(
      "http://localhost:8080/esi/wapi",
      fullpayload
    );

    return response;
  }
}
