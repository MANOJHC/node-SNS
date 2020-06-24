var sns = require('../');
//Create the Client with AccessKey , Secret AccessKey , AWSRegion
     sns.createClient({       
        accessKeyId: "**AccessKey**",
        secretAccessKey: "**SecretAccessKey**",
        region: "**AWS-Region**"  
    });
    //Send SMS Function Will take Following Object
    // SMSMessage = This will be a string 
    //Mobile No = "Mobile No has to enter with CountryCode with out +"
    //Example MobileNo = "91123456779"
    //SENDERID = "AWS Configured SenderID" 
    //SMS Type = "SMSType Can be Transcational / Promotional"
sns.sendSMS("Welcome to SNS" , "MobileNo" , "SENDERID" , "SMSType", function(error, data){
    if (error){
        console.log(error)
    }else{
        console.log('MessageID' , data)
    }
});
