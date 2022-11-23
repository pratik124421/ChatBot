export class TimerCache{
    private static instance : TimerCache;

    public cache : Map<string,any>

    private constructor(){
        this.cache = new Map<string,any>()
    }

    public static getInstance():TimerCache{
        if(TimerCache.instance == null){
            TimerCache.instance = new TimerCache()
        }
        return TimerCache.instance
    }
}