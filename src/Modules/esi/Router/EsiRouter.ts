import { Router, NextFunction, Request, Response } from "express";
import { BaseRouter } from "../../../CommonFile/BaseRouter";
import { EsiController } from "../Controller/EsiController";

export class EsiRouter extends BaseRouter {
  private controller: EsiController;

  constructor() {
    super();
  }

  Routerinit(router: Router) {
    router.post("/wapi", this.OperationOnWAPI);

    // throw new Error("Method not implemented.");
  }

  public OperationOnWAPI(req: Request, res: Response) {
    EsiController.getInstance().OperationOnWAPI(req, res);
  }
}
