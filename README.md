# aws-node-sns
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
