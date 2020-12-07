const yup = require('yup');
const { User, Vote, Candidate, Campaign } = require('../models')
const BaseError = require('../errors/BaseError');

class VoteService {
  static async createOne(votePayload, req) {
    const schema = yup.object().shape({
      campaign: yup.string(),
      candidate: yup.string(),
      hkid: yup.string()
    })

    await schema.validate(votePayload);

    const user = await User.upsert({ hkid: votePayload.hkid });
    req.session.user = user;

    const vote = await VoteService.findOne({ user, campaign: votePayload.campaign });

    if (vote) {
      throw BaseError.createError('you already voted for this campaign')
    }

    const campaign = await Campaign.findOneById(votePayload.campaign)

    if (!campaign) {
      throw BaseError.createError('campaign is not exist')
    }

    if (new Date() < campaign.startedAt || new Date() > campaign.endedAt) {
      throw BaseError.createError('campaign is already end or not yet start')
    }

    const newVote = await Vote.createOne({
      user,
      candidate: votePayload.candidate,
      campaign: votePayload.campaign,
    })

    const candidate = await Candidate.shareMongooseModel.findById(votePayload.candidate)

    candidate.count = candidate.count + 1;

    await candidate.save();
    return newVote;
  }

  static async findOne({ user, campaign }) {
    return Vote.findOne({ user, campaign: campaign });
  }
}

module.exports = VoteService;
