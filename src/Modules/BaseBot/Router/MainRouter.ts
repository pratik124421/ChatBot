import { Router, NextFunction, Request, Response } from "express";
import { BaseRouter } from "../../../CommonFile/BaseRouter";
import { BotController } from "../Controller/BotController";
import { DirectLineRouter } from "./DirectLineRouter";

export class BotRouter extends BaseRouter {
  constructor() {
    super();
  }

  Routerinit(router: Router) {
    router.post("/messages", BotController.listen);
    router.use("/directline", DirectLineRouter.getInstance());

    // throw new Error("Method not implemented.");
  }
}
