const mongoose = require('mongoose');

let _campaignModel = null

class Campaign {
  static get shareMongooseModel() {
    const { Schema } = mongoose;

    if (!_campaignModel) {
      _campaignModel = mongoose.model('Campaign', {
        name: { type: String, required: true },
        startedAt: { type: Date, required: true },
        endedAt: { type: Date, required: true },
        candidates: [{ type: Schema.Types.ObjectId, ref: 'Candidate' }]
      })


      return _campaignModel
    }
    return _campaignModel
  }

  static async createOne({ name, startedAt, endedAt, candidates }) {
    return Campaign.shareMongooseModel.create({ name, startedAt, endedAt, candidates });
  }

  static async findOneById(id) {
    return Campaign.shareMongooseModel.findById(id);
  }
}

module.exports = Campaign;
