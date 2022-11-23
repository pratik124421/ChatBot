import { MongoClient, Db } from "mongodb";
import { MongoConnection } from "./MongoConnection";
var util = require('util')
export class AppBaseDao{

    
    constructor(private collection: string){}

    public async find(payload:any): Promise<any> {
        let db=await MongoConnection.getConnection()
        try{
            let result= await db.collection(this.collection).find({email:payload.email}).toArray()
            return result
        }catch(error){
            console.log(`Fetching records failed!`)
            console.log(error)
            return error
        }
    }   
}