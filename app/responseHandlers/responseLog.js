const log = require('../services/log')

const responseLog = (req, res, next) => {
  if (res.locals.error) {
    log('request', 'error', {
      url: req.path,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
      session: req.session,
      data: res.locals.data,
      error: res.locals.error,
    })
  } else {
    log('request', 'info', {
      url: req.path,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
      session: req.session,
      data: res.locals.data,
    })
  }

  return next();
}

module.exports = responseLog;
