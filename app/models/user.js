const mongoose = require('mongoose');

let _userModel = null

class User {
  static get shareMongooseModel() {
    if (!_userModel) {
      _userModel = mongoose.model('User', {
        hkid: String,
      })

      return _userModel
    }
    return _userModel
  }

  static async findOneByHKID(hkid) {
    return User.shareMongooseModel.findOne({ hkid });
  }

  static async findOneById(id) {
    return User.shareMongooseModel.findById(id);
  }

  static async upsert({ hkid }) {
    const user = await User.shareMongooseModel.findOneAndUpdate({ hkid }, { hkid }, { new: true, upsert: true });

    return user;
  }
}

module.exports = User;
