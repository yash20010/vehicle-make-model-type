# A new client wants us to develop the services, and create the infrastructure for their new project. The client wants their services to be fast, maintainable, and scalable. The client wants to create a service that can parse XML data and transform it to JSON format

## Hard Requirements

1. Service must parse XML

   - [Parse all the Makes from here](https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML)
   - [Get all the Vehicle Types per Make here](https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/440?format=xml)

2. Service must produce JSON
   - Combine all the of XML information into a single JSON object
   - Produce an array of objects will the all of the information from the XML endpoints
   - [The JSON must look like this](https://gist.github.com/mbaigbimm/d340e7800d17737482e71c9ad1856f68)
3. Service must have a single endpoint to get all the data
4. Service must be Dockerized
5. Service must save this into a document based datastore
6. Service must follow NodeJS best practices for project structure, and code

### Nice to have

1. Service may schedule a job to get XML information on a regular basis
2. Service can expose GraphQL endpoint for GQL queries
3. Service can contain tests for each data transformation

## Further Improvements

1. Test data at each modification for appropriate properties and value types
2. If any data fails test update the value by refetching them and adding them to the database
