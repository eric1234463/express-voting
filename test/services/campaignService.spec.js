const CampaignService = require('../../app/services/campaignService')
const { Campaign, Candidate } = require('../../app/models')

describe('CampaignService', () => {
  const payload = {
    "name": "Who is the best NBA player in history",
    "startedAt": "2020-12-09",
    "endedAt": "2020-12-10",
    "candidates": [
      {
        "name": "Michael Jordan"
      },
      {
        "name": "Kobe Bryant"
      }
    ]
  }

  const candidates = [
    {
      "_id": 1,
      "name": "Michael Jordan"
    },
    {
      "_id": 2,
      "name": "Kobe Bryant"
    }
  ]

  describe('.createOne', () => {
    test('return a campaign document', async () => {
      jest.spyOn(Candidate, 'createMany').mockImplementation(() => candidates)
      jest.spyOn(Campaign, 'createOne').mockImplementation(() => payload)

      const result = await CampaignService.createOne(payload)
      expect(result).toEqual(payload);
    })

    test('throw Validation Error', async () => {
      jest.spyOn(Candidate, 'createMany').mockImplementation(() => candidates)
      jest.spyOn(Campaign, 'createOne').mockImplementation(() => payload)

      try {
        await CampaignService.createOne({ "name": "Who is the best NBA player in history" });
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toEqual('endedAt is a required field')
      }
    })
  })
})
