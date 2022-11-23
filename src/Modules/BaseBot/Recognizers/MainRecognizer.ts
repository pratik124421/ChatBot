import { QnAMaker } from "botbuilder-ai";
import { NLP } from "../../../CommonFile/enum";
import { DummyNLP } from "./DummyRecognizer";
import { IntentResult } from "./IntentResult";
import { Luis } from "./LuisRecognizer";
import { Qna } from "./Qnaecognizer";
const config = require("../../../../Resourses/config.json")


export class MainRecognizer {
    private nlpApps:any[];

    public static instance : MainRecognizer

    public static getInstance(){
        if(!MainRecognizer.instance){
            MainRecognizer.instance = new MainRecognizer()
        }
        return MainRecognizer.instance
    }

    constructor(){
        this.nlpApps = [];
        for (let nlp of config.tenantBot[0].nlpApps) {
            const nplApp = (nlp.type === NLP.LUIS)? new Luis(nlp):
                           (nlp.type === NLP.QnA)? new Qna(nlp):
                           new DummyNLP();

            if(nlp.isActive) {
               this.nlpApps.push(nplApp);
            }
        }
    }


    public async onRecognize(context:any): Promise<IntentResult> {
        let result:IntentResult = new IntentResult();
        result.topScore = 0;
        for (let apps of this.nlpApps) {
            const tmp = await apps.recognize(context);
            result = (tmp.topScore > result.topScore)?tmp:result;
        }

        return result;
    }
    
}