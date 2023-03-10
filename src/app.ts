import Database from './config';
import * as dotenv from 'dotenv';
dotenv.config()
import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
// import routes  from './src/index'
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

class App {
  public app:Application = express();
  public port = process.env.PORT ? process.env.PORT : 4000
  private db: any = new Database();
  constructor() {
    this.server();  // call function for server creation
    this.db;   // call database class to connect with database 
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json())
    // create swagger documentation link
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // call main routes given in src folder
    // this.app.use("/", routes);
  }

  private server(): void {

    // create server with port given in .env file or 4000
    this.app.listen(this.port, ():void => {
      console.log(`Server Running here 👉 https://localhost:${this.port}`);
    });
  }
}
new App();  