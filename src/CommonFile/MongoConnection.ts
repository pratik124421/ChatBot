import { MongoClient, Db } from 'mongodb';
export class MongoConnection{

    private static url=""
    
    public static async getConnection(): Db {
        let db :Db
        let client: MongoClient
        try{
            client =await MongoClient.connect(MongoConnection.url,{ useUnifiedTopology: true })
            db=client.db("DummyDatabase")
            return db
        }catch(error){   
            console.log(`Fetching records failed!`)
            console.log(error)
            return error
                    
        }
    }
}