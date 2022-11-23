import { Request, Response } from "express"; 
import { MongoClient, Db } from "mongodb";
import { AppBaseDao } from "../../../CommonFile/AppBaseDao";
import { CollectionNames } from "../../../CommonFile/enum";
var util = require('util')


export class UserDao extends AppBaseDao{
    
    private static UserDao: UserDao;

    public static getInstance(): UserDao {

        if (UserDao.UserDao == null) {
            UserDao.UserDao = new UserDao()
        }
        
        return UserDao.UserDao;
    }

    private constructor() {
        super(CollectionNames.UserCollection)
    }
    
    public async getUser(payload: any): Promise<any> {
        let CategiryList=await UserDao.getInstance().find(payload)
        return CategiryList
    }
   
}