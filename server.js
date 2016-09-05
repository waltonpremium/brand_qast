// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
require('dotenv').config({ silent: true });

var express    = require('express');        // call express
var subdomain = require('wildcard-subdomains');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var passport   = require('passport');
var jwt        = require('jwt-simple');
var config = require('./config/database');
var User = require('./models/user');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static(__dirname + "/public"));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/uploads',  express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
// connect to database
//mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

//var domain = process.env.DOMAIN || 'brandqast-local';
var domain = 'brandqast.local';

app.use(subdomain({
  domain: domain,
  namespace: 'accounts',
  www: 'false'
}));

app.param('subdomain', function(req, res, next, subdomain) {
    // save name to the request
    req.subdomain = subdomain;

    next();
});

var AccountRoutes = require('./routes/accounts');
var ApiRoutes = require('./routes/apis');
var BillingRoutes = require('./routes/billing');
var CustomAttributeRoutes = require('./routes/custom_attributes');
var CustomStatusRoutes = require('./routes/custom_statuses');
var ListRoutes = require('./routes/lists');
var LocationRoutes = require('./routes/locations');
var MarkupCalculatorRoutes = require('./routes/markup_calculator');
var PricingFieldRoutes = require('./routes/pricing_fields');
var ProductLineRoutes = require('./routes/product_lines');
var ProductLineRevisionRoutes = require('./routes/product_line_revisions');
var ProductLineProductsRoutes = require('./routes/product_line_products');
var PullRequestRoutes = require('./routes/pull_requests');
var RegisterRoutes = require('./routes/register');
var RoundingCalculatorRoutes = require('./routes/rounding_calculator');
var SessionRoutes = require('./routes/sessions');
var SubscriberClassRoutes = require('./routes/subscriber_classes');
var SubscriptionRoutes = require('./routes/subscriptions');
var UpstreamSubscriptionRoutes = require('./routes/upstream_subscriptions');
var UserRoutes = require('./routes/users');
var WidgetRoutes = require('./routes/widgets');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1/accounts', RegisterRoutes);

app.use('/accounts/:subdomain/api/v1/accounts', AccountRoutes);
app.use('/accounts/:subdomain/api/v1/sessions', SessionRoutes);


//Authenticated Routes
app.use('/accounts/:subdomain/api/v1/apis', passport.authenticate('jwt', { session: false}), ApiRoutes);
app.use('/accounts/:subdomain/api/v1/billing', passport.authenticate('jwt', { session: false}), BillingRoutes);
app.use('/accounts/:subdomain/api/v1/custom_attributes', passport.authenticate('jwt', { session: false}), CustomAttributeRoutes);
app.use('/accounts/:subdomain/api/v1/custom_statuses', passport.authenticate('jwt', { session: false}), CustomStatusRoutes);
app.use('/accounts/:subdomain/api/v1/locations', passport.authenticate('jwt', { session: false}), LocationRoutes);
app.use('/accounts/:subdomain/api/v1/lists', passport.authenticate('jwt', { session: false}), ListRoutes);
app.use('/accounts/:subdomain/api/v1/markup_calculators', passport.authenticate('jwt', { session: false}), MarkupCalculatorRoutes);
app.use('/accounts/:subdomain/api/v1/pricing_fields', passport.authenticate('jwt', { session: false}),  PricingFieldRoutes);
app.use('/accounts/:subdomain/api/v1/product_line_revisions', passport.authenticate('jwt', { session: false}), ProductLineRevisionRoutes);
app.use('/accounts/:subdomain/api/v1/pull_requests', passport.authenticate('jwt', { session: false}), PullRequestRoutes);
app.use('/accounts/:subdomain/api/v1/rounding_calculators', passport.authenticate('jwt', { session: false}), RoundingCalculatorRoutes);
app.use('/accounts/:subdomain/api/v1/subscriber_classes', passport.authenticate('jwt', { session: false}), SubscriberClassRoutes);
app.use('/accounts/:subdomain/api/v1/subscriptions', passport.authenticate('jwt', { session: false}), SubscriptionRoutes);
app.use('/accounts/:subdomain/api/v1/upstream_subscriptions', passport.authenticate('jwt', { session: false}), UpstreamSubscriptionRoutes);
app.use('/accounts/:subdomain/api/v1/widgets', passport.authenticate('jwt', { session: false}), WidgetRoutes);
app.use('/accounts/:subdomain/api/v1/users', passport.authenticate('jwt', { session: false}), UserRoutes);
app.use('/accounts/:subdomain/api/v1/product_lines', passport.authenticate('jwt', { session: false}), ProductLineRoutes);

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
//app.use('/api/v1/product_lines/:product_line_id/subscribers', passport.authenticate('jwt', { session: false}), ProductLineSubscribers);app.use('/api/v1/product_lines/:product_line_id/revisions', passport.authenticate('jwt', { session: false}), ProductLineRevisionRoutes);
//app.use('/api/v1/product_lines/:product_line_id/subscribers', passport.authenticate('jwt', { session: false}), ProductLineSubscribers);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/products', passport.authenticate('jwt', { session: false}), ProductListRevisionProductRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/inactive_products', passport.authenticate('jwt', { session: false}), ProductLineRevisionInActiveProductRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/lists', passport.authenticate('jwt', { session: false}), ProductLineRevisionListRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/locations', passport.authenticate('jwt', { session: false}), ProductLineRevisionLocationRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/pricing', passport.authenticate('jwt', { session: false}), ProductLineRevisionPricingRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/status', passport.authenticate('jwt', { session: false}), ProductLineRevisionStatusRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/subscriber_classes', passport.authenticate('jwt', { session: false}), ProductLineRevisionSubscriberClassRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/products/:product_id/lists', passport.authenticate('jwt', { session: false}), ProductLineRevisionProductListRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/products/:product_id/locations', passport.authenticate('jwt', { session: false}), ProductLineRevisionProductLocationRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/products/:product_id/subscriber_classes', passport.authenticate('jwt', { session: false}), ProductLineRevisionProductSubscriberClassRoutes);
//app.use('/api/v1/product_lines/:product_line_id/revision/:revision_id/products/:product_id/media', passport.authenticate('jwt', { session: false}), ProductLineRevisionProductMediaRoutes);

// application -------------------------------------------------------------

// START THE SERVER
// =============================================================================

//app.get('/*', function (req, res) {
//  res
//      .status( 200 )
//      .set( { 'content-type': 'text/html; charset=utf-8' } )
//      .sendfile('public/index.html' );
//  })
//  .on( 'error', function( error ){
//      console.log( "Error: \n" + error.message );
//      console.log( error.stack );
//  }
//);

app.listen(port);
console.log('Magic happens on port ' + port);
