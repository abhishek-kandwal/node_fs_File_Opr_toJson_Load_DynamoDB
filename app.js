'use strict'
var fs = require('fs');
var newCountry = [];
var newLanguage = [];
var newGroups = [];
var GroupName = [];
var MasterJsonData = {};

let rawdataCountry = fs.readFileSync('./json/country.json');
let rawdataLanguage= fs.readFileSync('./json/language.json');


let country = JSON.parse(rawdataCountry);
let language = JSON.parse(rawdataLanguage);


country.forEach(element => {
    newCountry.push(
        {
            "DisplayName": element["Country Name"],
            "Code": element["Country Code"],
            "Icon": "",
            "CurrentStatus": "Active"
        }
    );
});

language.forEach(element =>{
    newLanguage.push(
        {
            "DisplayName": element.Language,
            "Code": element.code,
            "CurrentStatus": "Active"
        }
    )
});

country.forEach(element => {
    if( !newGroups.includes(element["Content Country Groups"]) ){
        newGroups.push(element["Content Country Groups"]);
    }
});

newGroups.forEach(element => {
    var temp = [];
    country.forEach(inelement=>{
        if (element == inelement["Content Country Groups"]){
            temp.push(
                {
                    "DisplayName": inelement["Country Name"],
                    "Code": inelement["Country Code"],
                    "Icon": "",
                    "CurrentStatus": "Active"
                }
            )
        }
    });
    GroupName.push(
        {
            "DisplayName": element,
            "Country": temp,
            "CurrentStatus": "Active"
        }
    )
});

MasterJsonData = {
    id : 1,
    Country: newCountry,
    LanguageName: newLanguage,
    GroupName: GroupName,
    ContentOwners: [
        {
            "DisplayName": "Owner",
            "CurrentStatus": "Active"
        }
    ]
}

let data = JSON.stringify(MasterJsonData);
fs.writeFileSync('MasterDB.json',data);