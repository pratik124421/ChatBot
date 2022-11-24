import { Request, Response } from "express";
import { WapiService } from "../../../Service/WAPI/wapiService";

export class EsiController {
  private static instance: EsiController;
  private wapiService: WapiService;

  private constructor() {
    this.wapiService = new WapiService();
  }

  public static getInstance = () => {
    if (EsiController.instance == null) {
      EsiController.instance = new EsiController();
    }
    return EsiController.instance;
  };

  public async OperationOnWAPI(req: Request, res: Response) {
    return await this.wapiService
      .action(req.body.config, req.body.payload, req.body.action)
      .then((tb) => {
        res.send(tb);
      });
  }
}
