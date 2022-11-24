import { NextFunction, Request, Response } from "express";
import { DirectLineService } from "../service/DirectLineService";

export class DirectLineController {
  private static instance: DirectLineController;

  private constructor() {}

  public static getInstance = () => {
    if (DirectLineController.instance == null) {
      DirectLineController.instance = new DirectLineController();
    }
    return DirectLineController.instance;
  };

  public async startConversation(req: Request, res: Response): Promise<any> {
    let ts = DirectLineService.getInstance();
    ts.startConversation(req.body).then((response) => {
      res.send(response);
    });
  }

  public async external_service(req: Request, res: Response): Promise<any> {
    let ts = DirectLineService.getInstance();
    ts.external_service(req.body).then((response) => {
      res.send(response);
    });
  }
  public async resumeConversation(req: Request, res: Response): Promise<any> {
    let ts = DirectLineService.getInstance();
    ts.resumeConversation(req.body).then((response) => {
      res.send(response);
    });
  }
}
