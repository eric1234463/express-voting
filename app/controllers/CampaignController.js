class CampaignController {
  static show(req, res, next) {
    res.locals.data = { message: 'hello world' }
    return next();
  }
}

module.exports = CampaignController;
