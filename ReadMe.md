# STUDENT DETAILS API

The project is deployed on
https://kca.onrender.com

Swagger docs for testing API methods available on
https://kca.onrender.com/docs

Advanced filters, sorting, select, pagination, limit has been added. Following Request can be tested in Swagger.

https://kca.onrender.com/api/v1/students?totalMarks[gt]=70&stream=Science&select=id,name,email,stream,totalMarks&sort=-totalMarks&limit=2&page=2

the MongDB URI has not been added due to security concerns, but was connected through the env file. A sample env file has been provided in case testing is required on a local server.
