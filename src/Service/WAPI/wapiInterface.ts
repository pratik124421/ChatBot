export interface WapiInterface {
  SendSimpleTextMessage(payload: any, metadata: any): Promise<string>;
}
