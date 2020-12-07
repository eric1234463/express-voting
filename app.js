require('dotenv').config();

class ExpressApp {
  constructor() {
    var express = require('express')
    this.app = express()
  }

  async start() {
    const port = 3000
    await this.loadDependencies();
    await this.loadMiddleWares();
    await this.loadRoutes();
    await this.loadResponseHandler();
    this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  }

  async loadMiddleWares() {
    const middlewares = require('./app/middlewares');
    this.app.use(...middlewares);
  }

  async loadRoutes() {
    const routes = require('./app/routes');
    this.app.use(routes);
  }

  async loadResponseHandler() {
    const responseHandlers = require('./app/responseHandlers');
    this.app.use(responseHandlers);
  }

  async loadDependencies () {
    try {
      const mongo = require('./app/services/mongo');
      await mongo.connect();
      await mongo.loadModels();
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
}

new ExpressApp().start().catch(console.log);
