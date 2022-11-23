import { TurnContext } from "botbuilder"

export interface TimeoutProps{
    context : TurnContext;
    promptHandler:any;
    endConvoHandler:any
}

export class TimeoutStorage{
    private readonly Storage = new Map<string,TimeoutProps>();
    
    constructor(){
        
    }

   public storeConvoIdAndSession(id:string,context:TurnContext){
    const props = {context , promptHandler:false,endConvoHandler:false} as TimeoutProps
    this.Storage.set(id,props)
   }

   public setPromptHandlerFor(id:string,value:any){
    this.Storage.get(id).promptHandler = value
   }

   public setEndConvoHandlerFor(id:string,value:any){
    this.Storage.get(id).endConvoHandler = value
   }

   public getPromptHandlerFor(id:string){
    return this.Storage.get(id).promptHandler 
   }

   public getEndConvoHandlerFor(id:string){
    return this.Storage.get(id).endConvoHandler
   }


   public isValid(id:string){
    return this.Storage.has(id)
   }

   public removeConvoFromStore(id:string){
    return this.Storage.delete(id)
   }
   

}