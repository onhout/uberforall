var register_users=require('../controllers/register_users.js');
var login_users=require('../controllers/login_users.js');
var add_address = require('../controllers/add_address.js');
// var update_users=require('../server/controllers/update_users.js')
module.exports=function(app){
    //FE
    app.get('/', function(req, res){
        res.render('layout')
    });

    app.get('/index', function(req, res){
        res.render('index');
    });

    app.get('/login', function(req, res){
        res.render('login');
    });

    app.get('/register', function(req, res){
        res.render('register');
    });

    app.get('/main', function(req,res){
        res.render('main');
    });

    app.get('/call_confirm', function(req, res){
        res.render('callConfirm');
    });

    //BE
	app.post('/register',register_users.add);

	app.post('/login',login_users.login);

    app.post('/addAddress', add_address.add_address);

    app.post('/getAddresses', add_address.get_address);

	app.post('/update_users',function(req,res){
		update_users.update(req,res);
	});

    app.post('/register_text', register_users.textPin);
};