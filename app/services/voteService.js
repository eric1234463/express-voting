const { User, Vote, Candidate } = require('../models')

class VoteService {
  static async createOne(votePayload, req) {
    const user = await User.upsert({ hkid: votePayload.hkid });
    req.session.user = user;

    const vote = await VoteService.findOne({ user, campaign: votePayload.campaign });

    if (vote) {
      throw new Error('you already voted for this campaign')
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
