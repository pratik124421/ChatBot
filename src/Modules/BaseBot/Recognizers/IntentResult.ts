export class IntentResult {
   
    public text: string;

    public alteredText?: string;

    public intents: { [name: string]: { score: number } };
    public entities?: any;

    public topIntent:string;
    public topScore:number;
    public sourceNlp:string;
    public context?:any;
    public id?:any;
    public answer?:any;
    [propName: string]: any;
}