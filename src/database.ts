import initSqlJs from "sql.js";
import { Database } from "sql.js";


export type {Database};

export async function initializeDatabase() {
    const SQL = await initSqlJs({
      // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
      // You can omit locateFile completely when running in node
      locateFile: file => '/sql-wasm.wasm'
    });
 
  
    // Create a database
    let db = new SQL.Database();
  
    let sqlstr = "CREATE TABLE locations (id int, name char, width int, height int, description char);"
    db.run(sqlstr);
    sqlstr = "INSERT INTO locations VALUES (1, 'Garage', 10, 10, 'that thing you put cars in');";
    db.run(sqlstr);
    sqlstr = "INSERT INTO locations VALUES (2, 'Shed', 4, 6, 'the building out back');";
    db.run(sqlstr);
    sqlstr = "INSERT INTO locations VALUES (3, 'Downstairs Storage Room', 4, 6, 'The creepy room in the basement with no windows');";
    db.run(sqlstr); // Run the query without returning anything

    sqlstr = "CREATE TABLE containers (id int, locationID int, name char, description char, width int, height int, locationPositionX int, locationPositionY int);"
    db.run(sqlstr); // Run the query without returning anything
    sqlstr = "INSERT INTO containers VALUES (1, 2, 'self-contained', 'string', 1, 1, 2, 2);";
    db.run(sqlstr);

    sqlstr = "CREATE TABLE items (id int, locationID int, containerID int, name char, description char, size char);"
    db.run(sqlstr);
    sqlstr = "INSERT INTO items VALUES (1, 2, 2, 'truck', 'the white box in the garage', 'Galaxy');";
    db.run(sqlstr);
    sqlstr = "INSERT INTO items VALUES (2, 2, 4, 'bike', 'the red box in the garage', 'Enormous');";
    db.run(sqlstr);
    sqlstr = "INSERT INTO items VALUES (3, 3, -1, 'lawnmower', 'on the shelf in the garage', 'Super Big');";
    db.run(sqlstr);
    return db;
}


