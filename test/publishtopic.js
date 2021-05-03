var sns = require('../');
//Create the Client with AccessKey , Secret AccessKey , AWSRegion
sns.createClient({       
    accessKeyId: "**AccessKey**",
    secretAccessKey: "**SecretAccessKey**",
    region: "**AWS-Region**"  
});

// Publish & Delete Topic Accept Following Details 

//TopicID --- Will be ID OF Topic you need Publis
// Message ---  Meesage you need to send 
// Booolen will be true or false to delete  the topic 

sns.publishanddeletetopic("TopicID" , 'Message' ,'Boolean' , function(error , data){
    if (error){
        console.log(error)
    }else{
        console.log("Data"  ,data);
    }
})