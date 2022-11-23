import { Config } from "./utils/config";
const {simpleParser} = require('mailparser');
import * as fs from "fs"

const Imap = require('imap')
let count = 0
export class ImapService{
    private static instance : ImapService;
    private imap : any = null;
    public static getInstance(){
        if(ImapService.instance == null){
            ImapService.instance = new ImapService()
        }
        return ImapService.instance
    }

    public async runJob(){
        const imap = this.getImap()

        if(!imap){
            this.initImap()
            this.connectImap()
        }else{

        }

    }

    private initImap(){
        const imap = new Imap(Config.IMAPConfig())
        this.setImap(imap)
    }

    private setImap(imap:any){
        this.imap = imap
    }

    private getImap(){
        return this.imap
    }

    private connectImap(){
        try{
            const imap = this.getImap()

            imap.once('ready', () => {
                imap.openBox('INBOX', false, () => {
                  imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
                    const f = imap.fetch(results, {bodies: ''});
                    f.on('message', msg => {
                      msg.on('body', stream => {
                        simpleParser(stream, async (err, parsed) => {
                          // const {from, subject, textAsHtml, text} = parsed;
                          console.log(parsed);
                          if(count==0){
                            fs.writeFileSync("test.html",parsed.html)
                            count++
                          }
                          /* Make API call to save the data
                             Save the retrieved data into a database.
                             E.t.c
                          */
                        });
                      });
                      msg.once('attributes', attrs => {
                        const {uid} = attrs;
                        // imap.addFlags(uid, ['\\Seen'], () => {
                        //   // Mark the email as read after reading it
                        //   console.log('Marked as read!');
                        // });
                      });
                    });
                    f.once('error', ex => {
                      return Promise.reject(ex);
                    });
                    f.once('end', () => {
                      console.log('Done fetching all messages!');
                      imap.end();
                    });
                  });
                });
              });
          
              imap.once('error', err => {
                console.log(err);
              });
          
              imap.once('end', () => {
                console.log('Connection ended');
              });
          
              imap.connect();
        }
        catch(error){
            console.log("error...",error)
        }
    }


}