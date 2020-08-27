var aws = require('aws-sdk');
var fs = require('fs');

aws.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new aws.DynamoDB.DocumentClient();
var InsertData = JSON.parse(fs.readFileSync('MasterDB.json','utf8'));
var AllData = ["Country","LanguageName","GroupName","ContentOwners"];


AllData.forEach(element => {
        
    var params = {
            TableName : "MasterTable",
            Item : {
                Key : element,
                Value: InsertData[element]
            }
        }

    docClient.put(params, function(err , data){
    
        if(err){
            console.log("unable to Insert", JSON.stringify(err, null , 2));
        }else{
            console.log("Data Inserted");
        }
    });
})