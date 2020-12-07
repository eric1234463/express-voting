const mongoose = require('mongoose');

let _candidateModel = null

class Candidate {
  static get shareMongooseModel() {
    if (!_candidateModel) {
      _candidateModel = mongoose.model('Candidate', {
        name: String,
        count: { type: Number, default: 0, required: true },
      })

      return _candidateModel
    }
    return _candidateModel
  }

  static async createMany(candidates) {
    return Candidate.shareMongooseModel.insertMany(candidates);
  }
}

module.exports = Candidate;
