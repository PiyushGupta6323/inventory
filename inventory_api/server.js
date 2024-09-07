const express = require('express');
const sql = require('mssql/msnodesqlv8');
var cors = require('cors')
const { dbConfig, dbConfig1, dbConfig2 } = require('./dbConfig');

const app = express();

app.use(express.json());
app.use(cors())

// Sample route to get data from the database
app.get('/api/bsnl', async (req, res) => {
  try {
    console.log("start");
    await sql.connect(dbConfig1);  // both format of dbConfig or dbConfig2 will work
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

/*app.post('/api/book', async (req, res) => {
  try {
    const { title, primary_author } = req.body;
    await sql.connect(dbConfig2);
    console.log('gjgjjgj',req.body);
    // Ensure all required fields are provided
    if (!title ) {
      return res.status(400).send('Missing required fields');
    }

    const result = await sql.query(`
      INSERT INTO [Rswan_int].[dbo].[book] 
      (title, primary_author)
      VALUES (@title, @primary_author)
    `, {
      title: sql.NVarChar(255), value: title,
      primary_author: sql.NVarChar(255), value: primary_author,
    });

    res.json({ success: true, message: 'Item inserted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});*/



app.post('/api/book', async (req, res) => {
  try {
    const { title, primary_author } = req.body;

    await sql.connect(dbConfig2);

    console.log('Request Body:', req.body);
    console.log('title of the book:', title);
    console.log('author of the book:', primary_author);

    // Ensure all required fields are provided
    if (!title) {
      return res.status(400).send('Missing required fields');
    }

    // Define the query with parameters
   /* const result = await sql.query(`
      INSERT INTO [Rswan_int].[dbo].[book] 
      (title, primary_author)
      VALUES (@title, @primary_author)
    `, {
      title: { type: sql.NVarChar(255), value: title },
      primary_author: { type: sql.NVarChar(255), value: primary_author },
    });
    */

    const result = await sql.query(`
      INSERT INTO [Rswan_int].[dbo].[books] 
    ([title], [primary_author])
      VALUES 
      ('${title}','${primary_author}')
    `);


    res.json({ success: true, message: 'Item inserted successfully' });
  } catch (err) {
    if (err instanceof sql.RequestError) {
      console.error('SQL Error:', err.message);
    } else {
      console.error('Error occurred:', err);
    }
    res.status(500).send('Internal Server Error');
  } finally {
    await sql.close(); // Ensure to await the close operation
  }
});





app.post('/api/create-item', async (req, res) => {
  try {
    const {
      item_name,
      active,
      created,
      updated,
      deleted,
      item_type,
      order_no,
      HDMS,
      make_and_model,
      location_identifier,
      ref_no
    } = req.body;


    await sql.connect(dbConfig2);

    console.log('Request Body:', req.body);
    console.log('title of the book:', item_name);
    console.log('author of the book:', item_type);
    console.log('author of the book:', order_no);

   

    // Validate the required fields
    if (!item_name || !item_type) {
      return res.status(400).send('Missing required fields');
    }

    // Connect to SQL Server
    await sql.connect(dbConfig2);

    const result = await sql.query(`
      INSERT INTO [Rswan_int].[dbo].[Master_Items] 
    ([item_name], [active], [created], [updated], [deleted], 
            [item_type], [HDMS], [make_and_model], [location_identifier], [ref_no])
      VALUES 
      ('${item_name}', ${active}, '${created}', '${updated}', ${deleted}, '${item_type}', ${HDMS}, '${make_and_model}', '${location_identifier}', '${ref_no}')
    `);


    res.json({ success: true, message: 'Item inserted successfully' });
  } catch (err) {
    if (err instanceof sql.RequestError) {
      console.error('SQL Error:', err.message);
    } else {
      console.error('Error occurred:', err);
    }
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});




app.get('/api/masterItems', async (req, res) => {
  try {
    console.log("start");
    await sql.connect(dbConfig2);  // both format of dbConfig or dbConfig2 will work
    const result = await sql.query(`SELECT [id]
      ,[item_name]
      ,[active]
      ,[created]
      ,[updated]
      ,[deleted]
      ,[item_type]
      ,[order_no]
      ,[HDMS]
      ,[make_and_model]
      ,[location_identifier]
      ,[ref_no]
  FROM [Rswan_int].[dbo].[Master_Items]`);


  res.json(result.recordset);  // Send only the recordset array
  console.log('end');
} catch (err) {
  console.error(err);
  res.status(500).send('Internal Server Error');
} finally {
  sql.close();
}
});


app.get('/api/shq', async (req, res) => {
  try {
    console.log('start');
    await sql.connect(dbConfig);

    const result = await sql.query(`
      SELECT 
        [S No], 
        [Item Name], 
        [Qty], 
        [Unit], 
        [Serial No / Processor Board ID], 
        [Make / Model], 
        [Remark]
      FROM [RSWAN_NEW].[dbo].[VerticalInventory_SDC]
    `);

    res.json(result.recordset);  // Send only the recordset array
    console.log('end');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

// Insert , edit,  get api 



app.get('/api/systemitem', async (req, res) => {
  try {
    console.log('start');
    await sql.connect(dbConfig2);

    const result = await sql.query(`
     SELECT
       [Id],
      [Item_name],
      [Is_active],
      [Is_delete],
      [Last_Modified],
      [Created_on],
      [item_type],
      [order_no],
      [Ref_no],
      [Is_HDMS],
      [Make_And_Model],
      [LocationIdentifire]
  FROM [Rswan_int].[dbo].[Sytem_Itrem_tbs]
    `);

    res.json(result.recordset);  // Send only the recordset array
    console.log('end');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});
// app.get('/api/shq', (req, res) => {
//   const data = [
//     { first: 'Mark', last: 'Otto', handle: '44' },
//     { first: 'Jacob', last: 'Thornton', handle: '88' },
//     { first: 'Larry the Bird', last: '', handle: '33' }
//   ];
//   res.json(data); // Use res.json to send a JSON array
  
// });


app.get('/api/shqByItemName/:item', async (req, res) => {
  const { item } = req.params; // Extract ID from the URL

  try {
    console.log('Connecting to the database...');
    await sql.connect(dbConfig);

    // Create a new SQL request
    const request = new sql.Request();

    // Add the ID parameter to the request
    request.input('item', sql.VarChar, item);

    // SQL query to fetch the record by ID
    const query = `
      SELECT *
      FROM [RSWAN_NEW].[dbo].[VerticalInventory_SDC]
      WHERE 
      [Item Name] = @item`;

    // Execute the query
    const result = await request.query(query);
    console.log(query);

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]); // Send the result as JSON
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('Server error');
  } finally {
    sql.close(); // Close the SQL connection
  }
});



app.get('/api/shq-edit/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from the URL

  try {
    console.log('Connecting to the database...');
    await sql.connect(dbConfig);

    // Create a new SQL request
    const request = new sql.Request();

    // Add the ID parameter to the request
    request.input('id', sql.Int, id);

    // SQL query to fetch the record by ID
    const query = `
      SELECT *
      FROM [RSWAN_NEW].[dbo].[VerticalInventory_SDC]
      WHERE 
        [S No] = @id
    `;

    // Execute the query
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]); // Send the result as JSON
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('Server error');
  } finally {
    sql.close(); // Close the SQL connection
  }
});



app.put('/api/updateShq/:srno', async (req, res) => {
  const srno = req.params.srno;  // Get the srno from the URL
  const { itemName, qty, unit, serialNo, makeModel, remark } = req.body;  // Destructure the values from the request body

  try {
    console.log('start');
    await sql.connect(dbConfig);

    const query = `
      UPDATE [RSWAN_NEW].[dbo].[VerticalInventory_SDC]
      SET 
        [Item Name] = @itemName,
        [Qty] = @qty,
        [Unit] = @unit,
        [Serial No / Processor Board ID] = @serialNo,
        [Make / Model] = @makeModel,
        [Remark] = @remark
      WHERE [S No] = @srno
    `;

    const request = new sql.Request();
    request.input('itemName', sql.VarChar, itemName);
    request.input('qty', sql.Int, qty);
    request.input('unit', sql.VarChar, unit);
    request.input('serialNo', sql.VarChar, serialNo);
    request.input('makeModel', sql.VarChar, makeModel);
    request.input('remark', sql.VarChar, remark);
    request.input('srno', sql.Int, srno);

    const result = await request.query(query);

    if (result.rowsAffected[0] > 0) {
      res.send('Record updated successfully');
    } else {
      res.status(404).send('Record not found');
    }

    console.log('end');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});


app.get('/api/ofc_dc', async (req, res) => {
  try{
  console.log("start");
  await sql.connect(dbConfig3);
  const result = await sql.query(`SELECT TOP (1000) [Item Name]
      ,[Default Qty]
      ,[Unit]
      ,[RFP Tech Spec Item No]
      ,[Default Make And Model No]
      ,[Default Company Name]
      ,[Id]
  FROM [Rswan_int].[dbo].[BOM_HOSites_OFC_DC_ZP] `)
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

app.get('/api/ofc', async (req, res) => {
  try{
  console.log("start");
  await sql.connect(dbConfig4);
  const result = await sql.query(`SELECT TOP (1000) [Item Name]
      ,[Default Qty]
      ,[Unit]
      ,[RFP Tech Spec Item No]
      ,[Default Make And Model No]
      ,[Default Company Name]
      ,[Id]
  FROM [Rswan_int].[dbo].[BOM_HOSites_OFC]`)
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
  console.log(`Server is running on http://localhost: ${port}`);
});
