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
        const result = await sql.query();
        console.dir(result.recordset);
        console.log("end");
    } catch (err) {
        // 
        console.log(err);
    } finally {
        //
    }
})();
app.get('/api/select/:tableName', async (req, res) => {
  try {
    await sql.connect(config);

    const tableName = req.params.tableName;

    const { columns, conditions } = req.query;

    let query = `SELECT ${columns || '*'} FROM ${tableName}`;
    if (conditions) {
      query += ` WHERE ${conditions}`;
    }

    const result = await sql.query(query);
    res.send(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});