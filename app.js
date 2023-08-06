var Airtable = require('airtable');
const dotenv = require('dotenv');
dotenv.config();
Airtable.configure({
    apiKey:process.env.AIRTABLE_API_KEY
})
const base = Airtable.base('appiNDoKSEV2K5yFf')

// this is to get a record from table
base('tblhZWtvvNSAegrdN').select({
    maxRecords:2,
}).eachPage(function page(records,fetchNextPage){
    records.forEach(function(record){
        console.log('Details' + ' ' + record.get('Name') + ' ' + record.get('Age'));
    })
    fetchNextPage();
},function done(err){
    if(err){
        console.error(err); return;
    }
})

//to create a record in a table
base('tblhZWtvvNSAegrdN').create([
    {
        "fields":{
            "Name":"Smith",
            "Age":"16"
        }
    },
    {
        "fields":{
            "Name":"Tom",
            "Age":"32"
        }
    }
]).then(record =>{
    console.log('Create record:',record);
}).catch(err => {
    console.error('Error creating record:',err);
})

// update records in a table using id
base('tblhZWtvvNSAegrdN').update([
    {
        "id" : "recPHU4xUDUsE9mlT",
        "fields":{
            "Name":"Harry",
            "Age":"40"
        }
    }
]).then(record => {
    console.log("Record is updated:",record);
}).catch(err => {
    console.log("Error in updating:",err);
})


// this is to delete a record from the table
base('tblhZWtvvNSAegrdN').destroy(['rec53nnDL8derXbfK']).then(record=>{
    console.log("Deleted Successfully");
}).catch(err=>{
    console.error("Error in deleting record",err);
})