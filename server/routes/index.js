var express = require('express');
var router = express.Router();

var User=require('../model/model');

router.get('/', function(req, res,next){
    return res.render('index.ejs');
});

router.get('/',function(req,res,next){
    console.log(req.body);
    var personInfo = req.body;

    if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.password_confirmation) {
        res.send();
    } else {
        if(personInfo.password==personInfo.password_confirmation){
            User.findOne({email:personInfo.email},function(err,data){
                if(!data){
                    var c;
                    UserOne({},function(err,data){
                        if (data) {
                            c=data.unique_id+1;
                        } else {
                            c=1;
                        }
                        var newPerson = new User({
                            unique_id:c,
                            email:personInfo.email,
                            username:personInfo.username,
                            password:personInfo.password,
                            password_confirmation:personInfo.password_confirmation,
                        });
                        newPerson.save(function(err,Person){
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log('Success');
                            }
                        });

                    }).sort({_id:-1}).limit(1);
                    res.send({"Success" :"You are registered,login now"});
                }else{
                    res.send({"Success":"Email is already registered"});
                }

            });
        }else{
            res.send({"Success":"password is not matched"});
        }
    }
});

