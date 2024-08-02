const express = require('express');
const sql = require('mssql/msnodesqlv8');
const dbConfig = require('./dbConfig');

const app = express();

app.use(express.json());

// Sample route to get data from the database
app.get('/api/bsnl', async (req, res) => {
  try {
    console.log("start");
    await sql.connect(dbConfig);  // both format of dbConfig or dbConfig2 will work
    const result = await sql.query(`SELECT TOP (3) [DistrictName]
  ,[Designation]
  ,[Name]
  ,[STDCode]
  ,[Direct]
  ,[Fax]
  ,[Mobile]
  ,[BSNlPortalEmail]
  ,[OtherPortalEmail]
  ,[EPAX PGM]
  ,[CGMT EPBX]
  ,[PAX]
  ,[PABX]
  ,[Id]
  ,[User Name]
  ,[User No]
FROM [Rswan_int_test].[dbo].[__BSNLCoordinator]`);
res.send(result);
    console.dir(result.recordset);
    console.log("end");
} catch (err) {
  console.error(err);
  res.status(500).send('Internal Server Error');
} finally {
  sql.close();
}
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
