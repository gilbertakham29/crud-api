var Airtable = require('airtable');
const dotenv = require('dotenv');
dotenv.config();
Airtable.configure({
    apiKey:process.env.AIRTABLE_API_KEY
})
const base = Airtable.base('appiNDoKSEV2K5yFf')

// this is to get a record from table
base('tblhZWtvvNSAegrdN').select({
    maxRecords:11,
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
            "Name":"Ritesh",
            "Age":"22"
        }
    },
    {
        "fields":{
            "Name":"Rajesh",
            "Age":"34"
        }
    }
]).then(record =>{
    console.log('Created record:',record);
}).catch(err => {
    console.error('Error creating record:',err);
})

// update records in a table using id
base('tblhZWtvvNSAegrdN').update([
    {
        "id" : "recnfiXv4yoRYhZZP",
        "fields":{
            "Name":"Praveen",
            "Age":"21"
        }
    }
]).then(record => {
    console.log("Record is updated:",record);
}).catch(err => {
    console.log("Error in updating:",err);
})


// this is to delete a record from the table
base('tblhZWtvvNSAegrdN').destroy(['recnfiXv4yoRYhZZP']).then(record=>{
    console.log("Deleted Successfully");
}).catch(err=>{
    console.error("Error in deleting record",err);
})