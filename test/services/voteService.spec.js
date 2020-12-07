const VoteService = require('../../app/services/voteService')
const { Campaign, Candidate, User, Vote } = require('../../app/models')

describe('VoteService', () => {
  const payload = {
    "hkid": "A123456",
    "candidate": "5fcdcf8a21268d3900f3b3f9"
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

  const user = {
    _id: 1
  }

  const req = {
    session: {
      user: null
    }
  };

  const candidate = {
    save: jest.fn(),
    count: 0,
  }

  const campaign = {
    startedAt: new Date('2020-12-7'),
    endedAt: new Date('2020-12-10')
  }

  describe('.createOne', () => {
    test('create a vote document when u are not yet voted', async () => {
      jest.spyOn(User, 'upsert').mockImplementation(() => user)
      jest.spyOn(Vote, 'findOne').mockImplementation(() => null)
      jest.spyOn(Vote, 'createOne').mockImplementation(() => payload)
      jest.spyOn(Campaign, 'findOneById').mockImplementation(() => campaign)
      jest.spyOn(Candidate.shareMongooseModel, 'findById').mockImplementation(() => candidate)
      jest.spyOn(VoteService, 'getCurrentDate').mockImplementation(() => new Date('2020-12-8'))
      const result = await VoteService.createOne(payload, req)
      expect(result).toEqual(payload);
    })


    test('throw error if user is already voted', async () => {
      jest.spyOn(User, 'upsert').mockImplementation(() => user)
      jest.spyOn(Vote, 'findOne').mockImplementation(() => payload)
      jest.spyOn(Vote, 'createOne').mockImplementation(() => payload)
      try {
        await VoteService.createOne(payload, req)
      } catch (e) {
        expect(e.message).toEqual('you already voted for this campaign')
      }
    })

    test('throw error if campaign is not exist', async () => {
      jest.spyOn(User, 'upsert').mockImplementation(() => user)
      jest.spyOn(Vote, 'findOne').mockImplementation(() => null)
      jest.spyOn(Vote, 'createOne').mockImplementation(() => payload)
      jest.spyOn(Campaign, 'findOneById').mockImplementation(() => null)
      jest.spyOn(Candidate.shareMongooseModel, 'findById').mockImplementation(() => candidate)
      jest.spyOn(VoteService, 'getCurrentDate').mockImplementation(() => new Date('2020-12-8'))

      try {
        await VoteService.createOne(payload, req)
      } catch (e) {
        expect(e.message).toEqual('campaign is not exist')
      }
    })

    test('throw error if campaign is not yet start', async () => {
      jest.spyOn(User, 'upsert').mockImplementation(() => user)
      jest.spyOn(Vote, 'findOne').mockImplementation(() => null)
      jest.spyOn(Vote, 'createOne').mockImplementation(() => payload)
      jest.spyOn(Campaign, 'findOneById').mockImplementation(() => campaign)
      jest.spyOn(Candidate.shareMongooseModel, 'findById').mockImplementation(() => candidate)
      jest.spyOn(VoteService, 'getCurrentDate').mockImplementation(() => new Date('2020-12-6'))

      try {
        await VoteService.createOne(payload, req)
      } catch (e) {
        expect(e.message).toEqual('campaign is already end or not yet start')
      }
    })
  })
})
