// next-routes used for routes with custom tokens
const routes = require('next-routes')();
// Order matters
routes.add('/campaigns/new', '/campaigns/new')
routes.add('/campaigns/:address', '/campaigns/show');

module.exports = routes;