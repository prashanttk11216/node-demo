/*module.exports = function(app, db) {
};*/
const { adminAuth, userAuth } = require("../middleware/auth.js");
// const usercontroller = require('../controller/UserController');
const userregcontroller = require('../controller/UserRegController');
const loginController = require('../controller/LoginController');

const tokenController = require('../controller/TokenController');

module.exports = function(app, db) {  

    app.get('/', (req, res) => {    // You'll create your note here.    
        res.send('Hello')
    });

    // app.get('/test', usercontroller.test);

    // For admin Signup

    app.post('/admin-reg', userregcontroller.adminCreate);

    // For Users Registration

    app.post('/user-create', userregcontroller.create); // registration
    app.get('/user-list', userregcontroller.findAll); // users list
    app.get('/user/:id', userregcontroller.findOne);
    app.post('/user/:id/update', userregcontroller.update);

    app.post('/user/delete', userregcontroller.delete);

    app.post('/userfilter', userregcontroller.findByParams);

    // for login
    app.post('/login', loginController.login);
    // app.get('/logout',usercontroller.logout)

    app.post('/get-token', tokenController.getToken);


    // app.get('/admin', adminAuth,usercontroller.findByAdmin);
    // app.get('/user', adminAuth,usercontroller.findByUser);

};