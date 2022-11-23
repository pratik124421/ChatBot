
// const { LuisRecognizer } = require('botbuilder-ai');

import { IntentResult } from "./IntentResult";

export class DummyNLP {

    constructor(){
    }

    /**
     *
     * @param context
     */
    public async onRecognize(context:any): Promise<IntentResult> {
        const result = new IntentResult();
        // result.entities = luisResult.entities;
        result.topIntent = 'Unknown';
        result.topScore = .50
        return result;
    }
    public getName(): string {
        return "dummy"

    }

}


