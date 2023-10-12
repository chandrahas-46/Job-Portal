import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import JobPortalController from './src/controllers/job.controller.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
const jobPortalController = new JobPortalController();
const userController = new UserController();

dotenv.config({path: './config'});

const app = express();
app.use(express.json());
app.use(express.static('public'));      // for accessing public folder content anywhere in project
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);

// ################################### session
app.use(session({
    secret: 'SecretKey',   // in future use key generator to set secret
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}, 
 }));

 // ################################ Cookie
app.use(cookieParser());
app.use(setLastVisit); 

app.set('view engine', 'ejs');
app.set('views',path.join(path.resolve(), 'src', 'views'));

// Routes description
// User Login
app.get('/register', userController.getRegister);
app.get('/login', userController.getLogin);
app.post('/register', userController.postRegister);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);

app.get('/', jobPortalController.homePage);
app.get('/jobs', jobPortalController.getJobs);
app.get('/job/:id', jobPortalController.getJobDetail);
app.get('/job/applicants/:id', auth, jobPortalController.getApplicant);
app.post(
    '/jobs',
    uploadFile.single('resume'),
    // jobPortalController.getJobs,
    jobPortalController.postAddApplicant
);


// Error route
app.get('/error', jobPortalController.getError);
// Added new Job in jobList
app.get('/postjob', auth, jobPortalController.getAddJob);
app.post('/job', jobPortalController.postAddJob);

// Update and Delete job : accessible only by Recruiter
app.get('/job/update/:id', auth,  jobPortalController.getUpdateJob);
app.post('/job/update/:id', auth,  jobPortalController.postUpdateJob);

// app.get('job/delete/:id', jobPortalController.getdeleteJob);
app.get('/job/delete/:id', auth, jobPortalController.deleteJobMethod);

app.post("/search", jobPortalController.search);




const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});