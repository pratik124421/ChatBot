import { ExternalApp } from "../../CommonFile/enum";
import { wapiFacade } from "./wapiFacase";

export class WapiConfig {
  public static _wapiService: wapiFacade;
  private ExtAppConfig: any;

  constructor(cfg: any) {
    this.ExtAppConfig = cfg;
  }

  public async init() {
    const wapiConfig = this.getExternalAppConfig(ExternalApp.WAPI);
    if (wapiConfig) {
      WapiConfig._wapiService = new wapiFacade(wapiConfig);
    }
  }

  public getExternalAppConfig(extApp: ExternalApp) {
    for (let app of this.ExtAppConfig) {
      if (app.category == extApp) {
        return app;
      }
    }
    return {};
  }
}
