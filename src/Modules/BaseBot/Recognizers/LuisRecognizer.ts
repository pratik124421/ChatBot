import { LuisApplication, LuisRecognizer, LuisRecognizerOptionsV3 } from 'botbuilder-ai';
import { RecognizerResult, TurnContext, getTopScoringIntent } from "botbuilder";
import { WaterfallStepContext } from 'botbuilder-dialogs';
import { IntentResult } from './IntentResult';
import { NLP } from '../../../CommonFile/enum';
// const { LuisRecognizer } = require('botbuilder-ai');

export class Luis{

    private recognizer:LuisRecognizer;

    constructor(nlp:any){
        const luisApp = { applicationId: nlp.appId, 
                          endpointKey: nlp.luisAPIKey, 
                          endpoint: nlp.host };
        const recognizerOptions: LuisRecognizerOptionsV3 = {
                            apiVersion : 'v3',
                            includeAllIntents:true, 
                        };
        this.recognizer = new LuisRecognizer(luisApp, recognizerOptions);
    }

    /**
     *
     * @param context
     */
    public async onRecognize(context:any): Promise<IntentResult> {
        
        const luisResult = await this.recognizer.recognize(context);
        console.log(">>>>>>>>>>>>>>>>>PPPPPPPPPPPPPPPP1",JSON.stringify(luisResult))
        const topIntent =  LuisRecognizer.topIntent(luisResult);
        const topResult = getTopScoringIntent(luisResult);
        const result = new IntentResult();
        result.entities = luisResult.entities;
        result.topIntent = topResult.intent;
        result.topScore = topResult.score;
        result.intents =  luisResult.intents
        return result;
    }
    public getName(): string {
        return NLP.LUIS

    }

}


