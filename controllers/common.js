/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('load', {
    title: 'Loading...',
    name: 'FelCraft v0.1'
  });
};