import { Router, Request, Response, NextFunction } from "express";
import { DirectLineController } from "../Controller/DirectLineController";

export class DirectLineRouter {
  private static router: Router;

  public static getInstance(): Router {
    if (DirectLineRouter.router == null) {
      let or = new DirectLineRouter();
      or.init();
    }
    return DirectLineRouter.router;
  }

  private constructor() {
    DirectLineRouter.router = Router();
  }

  public async startConversation(req: Request, res: Response) {
    let ctrl = DirectLineController.getInstance();
    ctrl.startConversation(req, res);
  }

  public async external_service(req: Request, res: Response) {
    let ctrl = DirectLineController.getInstance();
    ctrl.external_service(req, res);
  }

  public async resumeConversation(req: Request, res: Response) {
    let ctrl = DirectLineController.getInstance();
    ctrl.resumeConversation(req, res);
  }

  init() {
    DirectLineRouter.router.post("/external_service", this.external_service);
    DirectLineRouter.router.post("/start/conversation", this.startConversation);
    DirectLineRouter.router.post(
      "/resume/conversation",
      this.resumeConversation
    );
  }
}
