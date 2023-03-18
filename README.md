# Heart Rate Aggregator

## how to run the application

Run `npm install`

Run `node index.js`

### How to test APIs

- mehtod = get
- url = `http://localhost:3000/api/v1/heartrates/`  
- description = This endpoint will return all heart rate data from sample json (clinical_metrics.json).  

- method = get 
- url = `http://localhost:3000/api/v1/heartrates/aggregate`
- description = This endpoint is processing heart rate data from file. The API function is aggregating min and max heart rate. In response, you will get array of aggregated value for the given patient.

- mehtod = get 
- url = `http://localhost:3000/api/v1/heartrates/aggregate/store`
- description = This endpoint is processing heart rate data from file. The API function is aggregating min and max heart rate and stored it in database. In response you will get success message. 



### Assumptions
    I assumed that a database with the name "mydb" had already been established. user is the username and password is the password for this database. There is only one table in this database. The file "./models/heartRateModel.js" defines the table model.
    (Note. Please build the table above. To write the migration flow, I ran out of time.)