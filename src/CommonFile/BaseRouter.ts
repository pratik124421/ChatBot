import { Router, NextFunction, Request, Response } from 'express';


export abstract class BaseRouter {
  private  router: Router;
  private port : number
  
  constructor() {
    this.router = Router();
    this.Routerinit(this.router);
    }

 
  public getRouter():Router {
    return this.router;
  }

    
  abstract Routerinit(router:Router);


}
