const NodeCache = require("node-cache") 

// import * as NodeCache from "node-cache" 

const myCache = new NodeCache(); 

export const addRequest = (key , data)=>{ 

    key = `req-${key}` 

    let success = myCache.set(key , data) 

    return success 

} 

 

 export const getRequest = (key)=>{ 

     key = `req-${key}` 

     console.log(key , "check") 

     let success = myCache.get(key) 

     return success 

 } 

 export const deleteAllData = () =>{ 

     myCache.flushAll() 

 }

 

 