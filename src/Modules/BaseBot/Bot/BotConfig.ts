// import { Adapter } from './Adapter';
// import { TenantService } from './../../service/TenantService';
// import { Environment } from './../../../common/model/Environment';
// import { DialogFactory } from './../../dialogs/impl/DialogFactory';

import { EnvironmentConfig } from "../../../EnvironmentConfig";
import { WapiConfig } from "../../../Service/WAPI/WapiConfig";
import { DialogFactory } from "../Dialogs/DialogFactory";
import { Adapter } from "./Adapter";
import { AppCache } from "./Cache";
import { MainBot } from "./MainBot";

// import { Cache } from './../Cache';
// import { SimpleBot } from './SimpleBot';
// import { RootDialog } from '../../dialogs/RootDialog';
// import { LoggingUtil } from '../../../common/utils/log4js';
// import { DeploymentEnv } from '../../../common/enums/Enums';
// import { AdminService } from './../../service/AdminService';

const config = require("../../../../Resourses/config.json");

export class BotConfig {
  constructor() {}

  public async Config() {
    for (let bot of config.tenantBot) {
      const botId = bot.botId + "";
      const appId = bot.appId;
      const appSecret = bot.appSecret;
      // Create Root dialog

      if (bot.botId == "1") {
        const ExtAppConfig = new WapiConfig(bot.extApp);
        await ExtAppConfig.init();
      }

      const dialog = await DialogFactory.getRootDialog();
      // Create bot
      const simpleBot = new MainBot(bot.botName, dialog);
      simpleBot.adapter = this.createAdapter(appId, appSecret);
      AppCache.getInstance().addBot(simpleBot);
    }
  }

  private createAdapter(appId: string, appSecret: string): Adapter {
    const isLocalDeployment =
      EnvironmentConfig.getInstance().isDeploymentEnvLocal(); // (this.environment.deploymentEnv === DeploymentEnv.LOCAL);
    appId = isLocalDeployment ? "" : appId;
    appSecret = isLocalDeployment ? "" : appSecret;
    return new Adapter({ appId: appId, appPassword: appSecret });
  }
}
