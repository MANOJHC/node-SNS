# aws-node-sns
![npm](https://img.shields.io/npm/v/aws-node-sns?label=aws-node-sns&logo=npm&style=for-the-badge)              
![npmDownloads](https://img.shields.io/jsdelivr/npm/hw/aws-node-sns?label=downloads&logo=npm&style=for-the-badge)               
![npmlicensed](https://img.shields.io/npm/l/aws-node-sns?label=MIT&logo=npm&style=for-the-badge)
              
This library provides simple access to AWS SNS API for node.js applications.
It's MIT licensed, and being used in production .
## Installation

```sh
$ npm install aws-node-sns
```

Or you can just throw `sns.js` into your application.  There are
no dependencies outside of node's standard library.

**Note:** `master` on Github is going to be untested/unstable at times,
          as this is a small enough library that I don't want to bother
          with a more complicated repo structure.  As such, you should
          really only rely on the version of `aws-node-sns` in `npm`, as
          I'll only ever push stable and tested code there.

 ## Initialization

Access to the API is done through a AWS object.  It's instantiated
like so:
```js
var sns = require('aws-node-sns');
    sns.createClient({       
        accessKeyId: "**AccessKey**",
        secretAccessKey: "**SecretAccessKey**",
        region: "**AWS-Region**"  
    });
```

## SendingSMS

Sends a simple plain-text SMS.  This also allows for slightly easier Way
```js
sns.sendSMS(text , recipients , SENDERID , SMSType, function(error, data){
    if (error){
        console.log(error)
    }else{
        console.log('MessageID' , data)
    }
});
```
 * `text` - Message Body Text; this should be a string
              (e.g. `Welcome To SNS`).
* `recipients` - A Mobile No (`911234567789`) 
                    (In Mobile No has to Contain the CountryCode)
* `SENDERID` - THis is a AWS SenderID , You Can SetUP SenderID By Following the Below Provided  Link
https://docs.aws.amazon.com/sns/latest/dg/channels-sms-awssupport-sender-id.html

* `SMSType` - For SMS type, choose one of the following: 


  *  Promotional – Noncritical messages, such as marketing messages. Amazon SNS optimizes the message delivery to incur the lowest cost.

   * Transactional – Critical messages that support customer transactions, such as one-time passcodes for multi-factor authentication. Amazon SNS optimizes the message delivery to achieve the highest reliability.
This message-level setting overrides your default message type, which you set on the Text messaging preferences page. 


## Sending SMS To Multiple Devices 

As per AWS Documentation  To Send Same SMS to Multiple Devices First We need to Create Topic . Later We need to add Subscribers . 
Once Subscribers Added We Can Publish the Topic . On Publish of Topic the SMS Will reach to Multiple Devices

Sending SMS to Multiple Devices using AWS SNS was a Very Painfull Process . That Process , we have Simplified to as much as Possible 

## Create a Topic And Add Subscribers

Using this Function We Can  Create a Topic & We can update subscribers to the same Topic . 

On Response You will recive the ARN ID (Topic ID)

```js

sns.createTopicandupdateSubscribers ('TopicName' ,'SubscribersList' , function(error , results){
    if (error){
        console.log('error'); 
    }else{
        console.log('Topic ID',results)
    }
});

```

* `TopicName` - An Amazon SNS topic is a logical access point that acts as a communication channel. (Name of the Topic)
* `SubscribersList` - Subscribers List is a array of  recipants You need to Deliver the SMS (Message)
                        Eg: ["+919876543210" , "+919876543211" , "+91987653212" ]
                        The Recipants number has to Contain With Country Code and +


Once this Function Executed the topic will be Creted & List of Recipants will  be added to the Created Topic on Response You will Recive ARN ID (this we need for Future Communications)


## Get a List of Subscribers 

To Verify the List of Subscribers added to the Topic is Successfull , We can Fetch the Suscribers List using Provided Function


```js

sns.listSubscribers ('TopicID' , function(eror , data) {
    if (eror){
        console.error(eror);
    }else{
        console.log(data)
    }
})

```

* `TopicID` - TopicID Will be ARN ID that You recive on Creation of the Topic 

* `Data` - You Will Recive the List of Subscribers for a Provided Topic ID 


## Publish And Delete Topic 

This Function Will Publish the Topic & We will delete the Topic using Boolean

```js

sns.publishanddeletetopic("TopicID" , 'Message' ,'Boolean' , function(error , data){
    if (error){
        console.log(error)
    }else{
        console.log("Data"  ,data);
    }
})

```

* `TopicID` - TopicID Will be ARN ID that You recive on Creation of the Topic 

* `Message` - Message Body Text (Message You Need to Publish to Multiple People); this should be a string;

* `Boolean` -  The Boolean Value Will be **true** or **False** .
                if the Value is **true** We will **Delete** the Provided Topics .
                if the Value is **false** We will not **Delete** the Provided Topics.

