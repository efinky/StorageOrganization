import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import initSqlJs from 'sql.js';

const SQL = await initSqlJs({
  // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
  // You can omit locateFile completely when running in node
  locateFile: '/sql-wasm.wasm'
});

// Create a database
const db = new SQL.Database();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


