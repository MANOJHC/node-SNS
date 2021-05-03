var sns = require('../');
//Create the Client with AccessKey , Secret AccessKey , AWSRegion
sns.createClient({       
    accessKeyId: "**AccessKey**",
    secretAccessKey: "**SecretAccessKey**",
    region: "**AWS-Region**"  
});

// List of Subscribers  will accept TopicID as Input

sns.listSubscribers ('TopicID' , function(eror , data) {
    if (eror){
        console.error(eror);
    }else{
        console.log(data)
    }
})