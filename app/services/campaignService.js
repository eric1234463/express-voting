const { Campaign, Candidate } = require('../models')

class CampaignService {
  static async createOne(campaignPayload) {
    const candidates = await Candidate.createMany(campaignPayload.candidates);
    const candidateIds = candidates.map(candidate => candidate._id)
    const campaign = await Campaign.createOne({
      ...campaignPayload,
      candidates: candidateIds,
    });

    return campaign;
  }

  static async find() {
    const campaigns = await Campaign.shareMongooseModel.find();

    return campaigns;
  }

  static async show(id) {
    const campaign = await Campaign.shareMongooseModel.findById(id).populate('candidates')

    return campaign;
  }
}

module.exports = CampaignService;
