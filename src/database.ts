import initSqlJs from "sql.js";
import { Database, BindParams, SqlValue } from "sql.js";
import _ from 'lodash';


export type {Database};
declare global {
  let db: Database;
}
let db: Database;

export async function initializeDatabase() {
    const SQL = await initSqlJs({
      // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
      // You can omit locateFile completely when running in node
      locateFile: file => '/sql-wasm.wasm'
    });
 
    // Create a database
    db = new SQL.Database();
  
    let sqlstr = "CREATE TABLE locations (id integer primary key, name char, width int, height int, description char);"
    db.run(sqlstr);
    sqlstr = "INSERT INTO locations VALUES (1, 'Garage', 10, 10, 'that thing you put cars in');";
    db.run(sqlstr);
    sqlstr = "INSERT INTO locations VALUES (2, 'Shed', 4, 6, 'the building out back');";
    db.run(sqlstr);
    sqlstr = "INSERT INTO locations VALUES (3, 'Downstairs Storage Room', 4, 6, 'The creepy room in the basement with no windows');";
    db.run(sqlstr); // Run the query without returning anything

    sqlstr = "CREATE TABLE containers (id integer primary key, locationID int, name char, description char, width int, height int, locationPositionX int, locationPositionY int);"
    db.run(sqlstr); // Run the query without returning anything
    sqlstr = "INSERT INTO containers VALUES (1, 2, 'self-contained', 'string', 1, 1, 2, 2);";
    db.run(sqlstr);

    sqlstr = "CREATE TABLE items (id integer primary key, locationID int, containerID int, name char, description char, size char);"
    db.run(sqlstr);
    sqlstr = "INSERT INTO items VALUES (1, 2, 2, 'truck', 'the white box in the garage', 'Galaxy');";
    db.run(sqlstr);
    sqlstr = "INSERT INTO items VALUES (2, 2, 4, 'bike', 'the red box in the garage', 'Enormous');";
    db.run(sqlstr);
    sqlstr = "INSERT INTO items VALUES (3, 3, -1, 'lawnmower', 'on the shelf in the garage', 'Super Big');";
    db.run(sqlstr);

    return db;
}


export async function saveDatabaseToLocalStorage() {
    let dbExport = db.export();
    let stringEncodeed = Array.prototype.map((value) => {
      return String.fromCharCode(value);
    }, dbExport)
    .join();


    localStorage.setItem("sql.js", window.btoa(stringEncodeed));
}

export async function loadDatabaseFromLocalStorage() {
  let base64Encoded = localStorage.getItem("sql.js");
  if (base64Encoded !== null) {
    let stringEncodeed = window.atob(base64Encoded);
    let dbImport = new Uint8Array(stringEncodeed.length);
    for (let i = 0; i < stringEncodeed.length; i++) {
      dbImport[i] = stringEncodeed.charCodeAt(i);
    }
  }
  
  
  // let stringEncodeed = _.map(dbExport, (value) => {
  //   return String.fromCharCode(value);
  // })
  // .join();
  db = new Database();
  let dbExport = db.export();
    
    

  
}



export function addItemToDB(name: string, containerID: number, locationID: number, description: string, size: string) {
  let insertStatement = db.prepare('INSERT INTO items (locationID, containerID, name, description, size) VALUES (?, ?, ?, ?, ?)');

  insertStatement.bind([name, containerID, locationID, description, size]);

  insertStatement.run();
}

export function updateItemToDB(id: number, name: string, containerID: number, locationID: number, description: string, size: number) {
  let insertStatement = db.prepare('UPDATE items SET name=?, containerID=?, locationID=?, description=?, size=? WHERE id=?');

  insertStatement.bind([name, containerID, locationID, description, size, id]);
  insertStatement.run();
}

export function getItemById(id: number) {  
  let selectStatement = db.prepare("SELECT * FROM items WHERE id = ?");

  selectStatement.bind([id]);

  return selectStatement.get();
}
export function getItemsByDescriptionorName(description: string) {  
  let selectStatement = db.prepare("SELECT * FROM items WHERE descrption like '%?%'");

  selectStatement.bind([description]);

  return selectStatement.get();
}

export function getItemsByContainerIdFromDB(containerID: number) {  
  let selectStatement = db.prepare("SELECT * FROM items WHERE containerID = ?");

  selectStatement.bind([containerID]);

  return selectStatement.get();
}

export function getItemsByLocationIdFromDB(locationID: number) {  
  let selectStatement = db.prepare("SELECT * FROM items WHERE locationID = ?");

  selectStatement.bind([locationID]);

  return selectStatement.get();
}

export function searchItemsFromDB(search: string) {  
  let selectStatement = db.prepare("SELECT * FROM items WHERE name LIKE ? OR description LIKE ?");

  selectStatement.bind([`%${search}%`, `%${search}%`]);

  return selectStatement.get();
}



