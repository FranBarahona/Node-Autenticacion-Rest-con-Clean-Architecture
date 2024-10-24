import express, { Router } from 'express';

interface Options {
    port?: number;
    routes: Router;
}



export class Server {

    public readonly app = express();
    private readonly port :number;
    private readonly routes: Router;
    constructor(option: Options) {
        const { port = 3300, routes } = option;
        this.port = port;
        this.routes = routes;
    }
  
    async start() {
      //middeleware
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


      this.app.use(this.routes);
      this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
    }
}