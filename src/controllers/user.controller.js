import UserModel from "../models/user.model.js";
import PostJobModel from '../models/job.model.js';
import PostAplicantModel from '../models/applicants.model.js';

export default class UserController{
    getRegister(req, res){
        res.render('register');
    }

    getLogin(req, res){
        res.render('login', {errorMessage: null});
    }

    postRegister(req, res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.render('login',{errorMessage: null});
    }

    postLogin(req, res){
        const {email, password} = req.body;
        const user = UserModel.isValidUser(email, password);
        // user==undefine || user==null
        if(!user){
            // res.send("Invalid Credentials!!");
            return res.render('login', {errorMessage: "Invalid Credentials!!"});
        }
        // ########################################## Session
        req.session.userEmail = email;
        res.redirect('/jobs');
    }

    logout(req, res) {
        // on logout destroy the session
        req.session.destroy((err) => {
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/login');
            }
        })
        res.clearCookie('lastVisit');
    }
}