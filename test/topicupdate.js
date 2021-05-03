var sns = require('../');
//Create the Client with AccessKey , Secret AccessKey , AWSRegion
sns.createClient({       
    accessKeyId: "**AccessKey**",
    secretAccessKey: "**SecretAccessKey**",
    region: "**AWS-Region**"  
});

//Create Topic And Update the SubScribers Detils 

// TopicName will be Updated -- This Will be String 
// Array of Subscribers 

sns.createTopicandupdateSubscribers ('TopicName' , ["+919876543210" , "+919876543211" , "+91987653212" ] , function(error , results){
    if (error){
        console.log('error'); 
    }else{
        console.log('Topic ID',results)
    }
})