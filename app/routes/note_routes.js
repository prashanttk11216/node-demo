/*module.exports = function(app, db) {
};*/
const { adminAuth, userAuth } = require("../middleware/auth.js");
const usercontroller = require('../controller/UserController');
const userregcontroller = require('../controller/UserRegController');
const loginController = require('../controller/LoginController');

module.exports = function(app, db) {  

    app.get('/', (req, res) => {    // You'll create your note here.    
        res.send('Hello')
    });

    app.get('/test', usercontroller.test);

    app.post('/user-create', usercontroller.create);
    app.get('/user-details', usercontroller.findAll);
    app.get('/user/:id', usercontroller.findOne);
    app.post('/user/:id/update', usercontroller.update);

    app.post('/userfilter', usercontroller.findByParams);

    // for registration..........

    app.post('/user-reg', userregcontroller.create);

    // for login
    app.post('/login', loginController.login);


    app.get('/admin', adminAuth,usercontroller.findByAdmin);
    app.get('/user', adminAuth,usercontroller.findByUser);
    app.get('/logout',usercontroller.logout)

};