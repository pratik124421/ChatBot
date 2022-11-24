import { Router, NextFunction, Request, Response } from "express";
import { BaseRouter } from "../../../CommonFile/BaseRouter";
import { BotController } from "../Controller/BotController";

export class BotRouter extends BaseRouter {
  constructor() {
    super();
  }

  Routerinit(router: Router) {
    router.post("/messages", BotController.listen);

    // throw new Error("Method not implemented.");
  }
}
