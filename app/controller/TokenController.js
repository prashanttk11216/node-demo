const url = require('url');

exports.getToken = (req,res)=>{

    var query = url.parse(req.url,true).query;

    var uid = query.u_token;

    if(uid!=''){

        res.status(200).send({'start_time':'15:00:00','end_time':'22:00:00','date':'9/21/2022'});

    }
    else{

        res.status(500).send({'message':'Something is wrong.'});
    }

}