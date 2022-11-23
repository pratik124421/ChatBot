import {
    ComponentDialog,
    DialogContext,
    DialogSet,
    DialogState,
    DialogTurnResult,
    DialogTurnStatus,
    TextPrompt,
    WaterfallDialog,
    WaterfallStepContext
} from 'botbuilder-dialogs';

/**
 * This base class watches for common phrases like "help" and "cancel" and takes action on them
 * BEFORE they reach the normal bot logic.
 */
export abstract class BaseDialog extends ComponentDialog {
    private _name:any;
    

    constructor(id: string) {
        super(id);
        this._name = id;
    }

    public abstract getNewInstance();

    public get name(){
        return this._name;
    }



}
