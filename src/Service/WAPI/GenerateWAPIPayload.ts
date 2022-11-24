import { WAPIType } from "../../CommonFile/enum";
import { CardTypes } from "../../Modules/BaseBot/BotCards";
import { WapiInterface } from "./wapiInterface";
import { WAPIMsgService } from "./WAPIMsgService";

export class GenerateWapiPayload {
  public static async GeneratePayload(
    type: string,
    payload: any,
    StartDate?: any,
    EndDate?: any
  ) {
    switch (type) {
      case CardTypes.SIMPLE_TEXT_MESSAGE:
      //     console.log("=========payload create=>",payload)
      //     return {
      //         "ServiceName": mlicCarType.LogOrUpdateIncident,
      //         "objCommonParameters": {
      //             "_ProxyDetails": {
      //             "ProxyID": 0,
      //             "ReturnType": "JSON",
      //             "OrgID": 1,
      //             "APIKey": process.env.SummitApiKey,
      //             "AuthType": "APIKEY",
      //             "TokenID":""
      //             },
      //             "incidentParamsJSON": {
      //                 "IncidentContainerJsonObj": {
      //                             "Updater": "Executive",
      //                             "Ticket": {
      //                                 "IsFromWebService": true,
      //                                 "Priority_Name": payload.Priority,
      //                                 "Response_SLA_Met": false,
      //                                 "Classification_Name": payload.Sup_Function == "MAXIT" ? "Incident":"Complaint",
      //                                 "SLA_Name": payload.Sup_Function == "MAXIT" ? "24x7":"8:30 AM to 5:30 PM",
      //                                 "Sup_Function": payload.Sup_Function,
      //                                 "SupporterFunction":"",
      //                                 "Caller_EmailID": payload.EmailId,
      //                                 "ResolutionCode": 0,
      //                                 "ResolutionCodeName": "Resolved",
      //                                 "Status": "New",
      //                                 "Urgency_Name": payload.Sup_Function == "MAXIT"?"LOW":"Low",
      //                                 "Resolution_SLA_Met": false,
      //                                 "Assigned_WorkGroup": payload.WorkGroup,
      //                                 "Assigned_WorkGroup_Name": payload.WorkGroup,
      //                                 "Medium": "Web",
      //                                 "Impact_Name": payload.Sup_Function == "MAXIT"?"LOW":"Low",
      //                                 "Closure_Code_Name": "Resolved",
      //                                 "Category_Name": payload.Category_Name,
      //                                 "OpenCategory_Name": payload.OpenCategory_Name,
      //                                 "Desc": payload.Desc,
      //                                 "PageName": "LogTicket",
      //                                 "Source":"Application",
      //                                 "Description":payload.Description,
      //                     },
      //                     "TicketInformation": {
      //                             "InternalLog": {},
      //                                     "Information": payload.Information
      //                     }
      //                 }
      //             },
      //             "RequestType": "RemoteCall"
      //         }
      //     }

      default:
        console.log("default");
        break;
    }

    throw new Error("Method not implemented.");
  }
}
