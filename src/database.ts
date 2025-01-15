declare 

async function initilizeDatabase() {
    const SQL = await initSqlJs({
      // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
      // You can omit locateFile completely when running in node
      locateFile: file => '/sql-wasm.wasm'
    });
  
    // Create a database
    const db = new SQL.Database();
  
    let sqlstr = "CREATE TABLE items (id int, name char, location char); \
    INSERT INTO items VALUES (1, 'truck', 'garage'); \
    INSERT INTO items VALUES (2, 'bike', 'garage'); \
    INSERT INTO items VALUES (3, 'lawnmower', 'garage');"
  
    db.run(sqlstr); // Run the query without returning anything
  
    // Prepare an sql statement
    const result = db.exec("SELECT * FROM items");
  
    // Bind values to the parameters and fetch the results of the query
    console.log(result[0]['values']); // Will print {a:1, b:'world'}
  }
  
initilizeDatabase();