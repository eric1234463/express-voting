const log = require('../services/log')

const requestLog = (req, res, next) => {
  log('request', 'info', {
    url: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    session: req.session,
  })

  return next();
}

module.exports = requestLog;
