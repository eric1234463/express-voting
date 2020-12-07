const mongoose = require('mongoose');

let _voteModel = null

class Vote {
  static get shareMongooseModel() {
    const { Schema } = mongoose;
    if (!_voteModel) {
      _voteModel = mongoose.model('Vote', {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        candidate: { type: Schema.Types.ObjectId, ref: 'candidate', required: true },
        campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true }
      })


      return _voteModel
    }
    return _voteModel
  }

  static async findOne({ user, campaign }) {
    return Vote.shareMongooseModel.findOne({
      user,
      campaign,
    });
  }

  static async createOne({ user, candidate, campaign }) {
    return Vote.shareMongooseModel.create({
      user,
      candidate,
      campaign,
    });
  }
}

module.exports = Vote;
