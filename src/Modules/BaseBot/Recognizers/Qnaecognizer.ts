
import {QnAMaker,QnAMakerOptions} from 'botbuilder-ai'
import { NLP } from '../../../CommonFile/enum';
import { IntentResult } from './IntentResult';

export class Qna {
    private recognizer:QnAMaker;

    constructor(nlp:any){
        const qnaApp = { knowledgeBaseId: nlp.appId, 
                         endpointKey: nlp.EndpointKey, 
                         host: nlp.host };

        const recognizerOptions: QnAMakerOptions = {
            scoreThreshold : 0.3
        };
        this.recognizer = new QnAMaker(qnaApp, recognizerOptions);
    }

     public async onRecognize(context: any): Promise<IntentResult> {
        const qnaResult = await this.recognizer.getAnswers(context);
        const result = new IntentResult();
        try{
            result.topIntent = 'qnamaker.base.dialog';
            result.topScore = qnaResult[0].score;
            result.context = qnaResult[0].context;
            result.id = qnaResult[0].id;
            result.answer = qnaResult[0].answer;
    
        }catch(err){
            console.log("error.......")
            }
         return result;
    }
    
    public getName(): string {
        return NLP.QnA
    }
}