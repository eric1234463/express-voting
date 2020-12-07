const CampaignService = require('../services/campaignService');
const VoteService = require('../services/voteService');

class CampaignController {
  static async index(req, res, next) {
    res.locals.data = await CampaignService.find()
    return next();
  }

  static async create(req, res, next) {
    res.locals.data = await CampaignService.createOne(req.body);
    return next();
  }

  static async show(req, res, next) {
    const campaign = await CampaignService.show(req.params.id);
    if (req.session.user) {
      const myVote = await VoteService.findOne({ user: req.session.user._id, campaign: req.params.id });
      res.locals.data = {
        ...campaign.toObject(),
        myVote,
      }
    } else {
      res.locals.data = campaign
    }
    return next();
  }
}

module.exports = CampaignController;
