const mongoose = require('mongoose');

class Mongo {
  static async connect() {
    return mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  static async loadModels() {
    const models = require('../models')
    for (let model of Object.values(models)) {
      model.shareMongooseModel
    }
  }

}

module.exports = Mongo;
