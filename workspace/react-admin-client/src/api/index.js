import ajax from './ajax'
import storageUtils from '../utils/storageUtils'

export const userAuth = () => {
    return ajax('/user/information',{})
    // return new Promise(resolve => {
    //     resolve({"code":0,"msg":"Operation Success","data":{"attributes":{"ext":{"tenantId":"preprod.login.w3.ibm.com"},"lastName":"Hu","sub":"taohu@cn.ibm.com","displayName":"Tao Hu","realmName":"W3IDRealm","uniqueSecurityName":"017614672","dn":"uid=017614672,c=cn,ou=bluepages,o=ibm.com","cn":"Tao%20Hu","preferred_username":"taohu@cn.ibm.com","uid":"017614672","acr":"urn:ibm:security:policy:id:12926","firstName":"Tao","emailAddress":"taohu@cn.ibm.com","blueGroups":["PRD_GDDM_LABVA_NTF","G_China_Grp","MD002D-Global","KView%20Authors-BCS-WW","LIS%20Regular%20China","legalibm","WW_TRELLO_ENTERPRISE","IBM_q2u","RW_IBM_Account_RTC_JazzUsers","MS__OFFICE__2013SE__B","MS__OFFICE__2010SE__MASTER","MS__OFFICE__2013SE__MASTER","BHPEOCATS","BHPEOEVERYONE","Jira%40IBM-CEPS-IT-Team","w3id-saml-adopters-techcontacts","All_IBM_Account_RTC_JazzUsers","w3id-oidc-adopters-techcontacts","SH%20IBM%20Reqular%20201808%20P","DUO%202FA%20Priv%20Users","rptHRMS_cn","TSRM%20COGNOS","Jira%40IBM-CEPS-MVS-Team","jazz-cio-users","TravelIBM_SAE_ADMIN_DEV","kyle-ghe-deny-list","BG_ExMail_Users","IES_PROVISIONER_PRIVACY_CONSENT","Travel%40IBM%20Project%20community","admibluegroup","CAICommunity"],"name":"Tao Hu","userType":"federated"}}}
    //     )
    // })
}

export const getStatistics = (type) => {
    return ajax('/proxyForm/statics/' + type)
}

export const submitRequests = (type,filelist,comment) => {
    let fileName = filelist[0].name
    let url = filelist[0].url
    let requester = storageUtils.getUser()

    return ajax('/proxyForm/submittedRequest/' + type,{attachmentUrl:url,attachmentFileName: fileName, requester,comment},'POST')
}

export const getSubmittedRequests = (type) => {
    return ajax('/proxyForm/submittedRequests/' + type)
}

export const getRequestDetails = (requestEntityId) => {
    return ajax('/proxyForm/requestDetails/' + requestEntityId)
}

export const deleteSubmittedRequest = (record) => {
    return ajax('/proxyForm/deleteRequest',{...record},'POST')
}