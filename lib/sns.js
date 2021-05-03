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
0.0.2         2020-07-21        Manoj          Updated the ReadMe
0.0.3         2021-05-03        Manoj          Updated the topic Functionality (To send SMS to Multiple People)
*****************************************************************************************************************/
var AWS = require('aws-sdk');
exports.AWS = AWS;
exports.Client = Client;
exports.sendSMS = sendSMS;
exports.createTopicandupdateSubscribers = CreateTopic;
exports.listSubscribers = listSubscribers;
exports.publishanddeletetopic = PublishTopic;
exports.createClient = function (options) {
    return new Client(options);
};

function Client(options) {
    options = options || {};
    AWS.config.update({
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
        region: options.region
    });

}

function sendSMS(textmessage, phone, senderid, SMSType, callback) {
    var params = {
        Message: textmessage,
        PhoneNumber: phone,
        MessageAttributes:
            { 'AWS.SNS.SMS.SenderID': { 'DataType': 'String', 'StringValue': senderid }, 'AWS.SNS.SMS.SMSType': { 'DataType': 'String', 'StringValue': SMSType } }
    };

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
        function (data) {
            callback(undefined, data.MessageId)
            // console.log("MessageID is " + data.MessageId);
        }).catch(
            function (err) {
                let json = {
                    'err': err,
                    'err.stack': err.stack
                }
                callback(json)
            });
}
// Creation of Topic 
function CreateTopic(topic, phonenumbers, callback) {
    var createTopicPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).createTopic({ Name: topic }).promise();

    // Handle promise's fulfilled/rejected states
    createTopicPromise.then(
        function (data) {
            //console.log("Topic ARN is " + data.TopicArn);
            updatetopicsubscribers(data.TopicArn, phonenumbers, function (response) {
                //console.log(response)
                if (response == 'UpdatedSubscriersDetails') {
                    callback(undefined, data.TopicArn)
                } else {
                    callback(response)
                }
            })
        }).catch(
            function (err) {
                let json = {
                    'err': err,
                    'err.stack': err.stack
                }
                callback(json)
            });
}

// updating Subscribers to the Provided Topics 
function updatetopicsubscribers(arnvalue, phonenumbers, callback) {
    // console.log(phonenumbers.length);
    phonenumbers.forEach(function (mobileno, index) {
        // console.log(mobileno);
        var params = {
            Protocol: 'SMS', /* required */
            TopicArn: arnvalue, /* required */
            Endpoint: mobileno
        };

        // Create promise and SNS service object
        var subscribePromise = new AWS.SNS({ apiVersion: '2010-03-31' }).subscribe(params).promise();

        // Handle promise's fulfilled/rejected states
        subscribePromise.then(
            function (data) {
                // console.log("Subscription ARN is " + data.SubscriptionArn);
                if ((index + 1) == phonenumbers.length) {
                    return callback("UpdatedSubscriersDetails")
                }
            }).catch(
                function (err) {
                    let json = {
                        'err': err,
                        'err.stack': err.stack
                    }
                    return callback(json)
                });
    });
}

// Getting List Of Subscribers
function listSubscribers(arn, callback) {
    const params = {
        TopicArn: arn
    }

    // Create promise and SNS service object
    var subslistPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).listSubscriptionsByTopic(params).promise();

    // Handle promise's fulfilled/rejected states
    subslistPromise.then(
        function (data) {
            callback(undefined, data)
        }).catch(
            function (err) {
                let json = {
                    'err': err,
                    'err.stack': err.stack
                }
                callback(json)
            });
}

// Publish Message 

function PublishTopic(TopicID, Message, deletionbollen, callback) {
    if (deletionbollen == true || deletionbollen == false || deletionbollen == 1 || deletionbollen == 0){    
    const params = {
        TopicArn: TopicID,
        Message: Message, /* required */
    }

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
        function (data) {
            if (deletionbollen == true || deletionbollen == 1) {
                deletetopic(TopicID, function (response) {
                    //console.log(response)
                    if (response == 'Topicdeleted') {
                        callback(undefined, data.MessageId)
                    } else {
                        callback(response)
                    }
                })
            } else {
                callback(undefined, data.MessageId)
            }
        }).catch(
            function (err) {
                let json = {
                    'err': err,
                    'err.stack': err.stack
                }
                callback(json)
            });
        }else{
            let json = {
                'code' : 403 ,
                'Message' : 'Bollean Value has to be either true or false'
            }
            callback(json)
        }
}

// Delete Topic 

function deletetopic(topicid, callback) {
    var deleteTopicPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).deleteTopic({ TopicArn: topicid }).promise();

    // Handle promise's fulfilled/rejected states
    deleteTopicPromise.then(
        function (data) {
            return callback("Topicdeleted");
        }).catch(
            function (err) {
                let json = {
                    'err': err,
                    'err.stack': err.stack
                }
                callback(json)
            });
}