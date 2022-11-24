import * as path from "path";
import { config } from "dotenv";
import { StartupApp } from "./CommonFile/Startup/StartupApp";
// import { ImapService } from './Modules/Email/imap';
// import { MailScheduler } from './Service/EmailService/utils/MailScheduler';
const ENVIRONMENT_FILE = path.join(__dirname, "..", ".env");
config({ path: ENVIRONMENT_FILE });

StartupApp.getInstance().initializeApp();

// ImapService.getInstance().runJob()

// MailScheduler.StartMailScheduler()
