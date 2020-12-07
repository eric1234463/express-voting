const VoteService = require('../services/voteService');

class VoteController {
  static async create(req, res, next) {
    try {
      res.locals.data = await VoteService.createOne({
        ...req.body,
        campaign: req.params.id,
      }, req);
      return next();
    } catch(e) {
      res.locals.error = e;
      return next();
    }
  }
}

module.exports = VoteController;

