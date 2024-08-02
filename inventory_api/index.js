const sql = require('mssql/msnodesqlv8');

var dbConfig = {
    connectionTimeout : 30000,
    database: "Rswan_int_test",
    server: "VIVEK\\SQLEXPRESSNEW",
    options: {
        trustedConnection: true,
    }
};

var dbConfig2 = {
    connectionTimeout : 30000,
    connectionString: 'Driver={SQL Server Native Client 11.0};Server=<Server Name>;Database=<DB Name>;Trusted_Connection=yes;',
    options: {
        
    }
};

(async () => {
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
        console.dir(result.recordset);
        console.log("end");
    } catch (err) {
        // 
        console.log(err);
    } finally {
        //
    }
})();
