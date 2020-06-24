/*
-------------------------------------------------------------------------------------------------
CreationDate : 2020-06-24 ,
FileName : sns.js ,
Packages : 
    * aws-sdk
Description : 
    * Using this library we will send the SMS to the provided Mobile No using AWS Packages
----------------------------------------------------------------------------------------------------------------
REVISION HISTORY
Version No  : Revision Date:    Revised By    Details
0.0.1         2020-06-24        Manoj          sendSMS Function Added
*****************************************************************************************************************/
var AWS = require('aws-sdk');
exports.AWS = AWS;
exports.Client = Client;
exports.sendSMS = sendSMS;
exports.createClient = function(options) {
    return new Client(options);
  };

  function Client(options) {
    options = options || {};
         AWS.config.update({
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
        region: options.region});
        
}

function sendSMS(textmessage , phone , senderid , SMSType , callback){
    var params = {
        Message: textmessage,
        PhoneNumber: phone,
        MessageAttributes :
        {'AWS.SNS.SMS.SenderID': {'DataType': 'String', 'StringValue':senderid}, 'AWS.SNS.SMS.SMSType': {'DataType': 'String', 'StringValue': SMSType}}};
        
        // Create promise and SNS service object
        var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
        
        // Handle promise's fulfilled/rejected states
        publishTextPromise.then(
        function(data) {
            callback(undefined,data.MessageId)
       // console.log("MessageID is " + data.MessageId);
        }).catch(
        function(err) {
            let json = {
                'err' : err , 
                'err.stack' : err.stack
            }
            callback(json)
        }); 
}