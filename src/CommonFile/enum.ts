export enum Modules {
    ADMIN='ADMIN',
    EMAIL='EMAIL',
    TWILIO='TWILIO',
    ESI='ESI'
}

export enum CollectionNames{
    UserCollection='UserCollection'
}

export enum Env{
    LOCAL='LOCAL',DEV='DEV'
}


export enum NLP{
    LUIS='LUIS', QnA='QnA'
}

export enum ItsmRequestType {
    LatestIncident='LatestIncident',
    ReadIncident='getIncident',
    ValidateToken = "ValidateToken",

    IncidentCategories = 'getIncidentCategories',
    Priorites='getPriorites',
    UserDetailsByUserName='getUserDetailsByUserName',
    CreateIncident='createIncident',
    ModifyIncident='modifyIncident',
    SysId='getSysI',
    CreateSR = 'createSR',
    ReadMultipleIncidents='getIncidents',
    ServiceRequestStatus='getServiceRequestStatus',
    ServiceRequestStatusByUser='getServiceRequestStatusByUser',
    Outages='getOutages',
    AssetDetailsByUserSysId='getAssetDetailsByUserSysId',
    // updateIncident,
    GetSCvariables = 'getVariablesOfCatalog',
    GetSpecificKnowledgeArticle = 'getSpecificKnowledgeArticle',
    AddInCartSC = 'addInCartCatalog',
    SubmitOrderSC = 'submitOrderCatalog',
    KnowledgeArticles = 'getKnowledgeArticles',
    HardwareAssets='getHardwareAssets',
    SoftwareAssets='getSoftwareAssets',
    SysIdOfCatalogItem='getSysIdOfCatalogItem',
    Allcatalogitems='getallcatalogitems',
    BuyItem='getallcatalogitems',
    CreateServiceRequest='createServiceRequest',
    AddAttachment='addAttachment',
    AddAttachmentWithGetCall='addAttachmentWithGetCall',
    UserDetails='getUserDetails',
    ModifyUserDetails='modifyUserDetails',
    Manager='getManager',
    searchServiceCatalog='searchServiceCatalog'
}
