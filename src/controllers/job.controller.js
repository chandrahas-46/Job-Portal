import PostJobModel from '../models/job.model.js';
import PostAplicantModel from '../models/applicants.model.js';
import nodemailer from 'nodemailer';

class JobPortalController {
    homePage(req, res) {
        res.render('home', {userEmail: req.session.userEmail} );
    }

    getJobs(req, res) {
        var jobs = PostJobModel.getAll();
        // console.log(jobs);
        res.render('jobPage', { jobs, userEmail: req.session.userEmail });
    }

    getJobDetail(req, res) {
        const id = req.params.id;
        // const id=2;
        const jobFound = PostJobModel.getById(id);
        const alreadyAppliedApplicants = PostAplicantModel.count();
        // console.log(jobFound.requiredSkills.length); 
        // if (jobFound) {
        //     res.render('jobDetailsPage', {
        //         job: jobFound,
        //         errorMessage: null,
        //         alreadyAppliedApplicants,
        //     });
        // }
        if (jobFound) {
            res.render('jobDetailsPage', {
                job: jobFound,
                errorMessage: null,
                alreadyAppliedApplicants,
                userEmail: req.session.userEmail,
            });
        }
        else {
            res.status(401).send('Job not found');
        }
    }

    // ###################### Sending mail to applicant after apply any job  ###################

    // Adding/Saving Applicant details after [apply] the Job
    postAddApplicant(req, res) {
        // console.log("Applicant details: ", req.body);
        const{ name, email, contact } = req.body;
        const resumeUrl = `/resume/${req.file.filename}`;
        // const resumeUrl = 'resume/' + req.file.filename;
        // console.log(resumeUrl);
        PostAplicantModel.add(name, email, contact, resumeUrl);

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'codingninjas2k16@gmail.com',
                pass:'slwvvlczduktvhdj'
            }
        });
        const mailOptions = {
            from: 'codingninjas2k16@gmail.com',
            to: email,
            subject: 'Job Application Confirmation',
            text: `!!! Congratulations !!! ${name}, You had Successfully applied the Job :)`,
        };
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
            console.log(error);
            } else {
            console.log(`Success: Email sent to ${email}`);
            }
        });

        res.redirect('/jobs');
    }

    // ################################# After Recruiter Login #####################################

    getApplicant(req, res){
        var applicants = PostAplicantModel.getAll();  
        res.render('applicants', { applicants, userEmail: req.session.userEmail });
    }


    getAddJob(req, res){
        res.render('new-job.ejs', {userEmail: req.session.userEmail});
    }

    postAddJob(req, res) {
        // Used {urlencoded} in [index.js] file if data is not received by server
        // console.log("Before Post new Job: ",req.body);
        PostJobModel.add(req.body);

        res.redirect('/jobs');
    }

    // Update and Delete job : accessible only by Recruiter
    getUpdateJob(req, res, next) {
        const id = req.params.id;
        const jobFound = PostJobModel.getById(id);
        // console.log(jobFound);
        if (jobFound) {
          res.render('update-job', {
            job: jobFound,
            // errorMessage: null,
            userEmail: req.session.userEmail
          });
        }
        // 2. else return errors.
        else {
          res.status(401).send('Job not found');
        }
    }
    
    postUpdateJob(req, res) {
        const id = req.params.id;
        PostJobModel.update(req.body, id);
        const jobFound = PostJobModel.getById(id);
        const alreadyAppliedApplicants = PostAplicantModel.count();
        if (jobFound) {
            res.render('jobDetailsPage', {
                job: jobFound,
                errorMessage: null,
                alreadyAppliedApplicants,
                userEmail: req.session.userEmail,
            });
        }
        else {
            res.status(401).send('Job not found');
        }
    }

    deleteJobMethod(req, res) {
        const id = req.params.id;
        const jobFound = PostJobModel.getById(id);
        if (!jobFound) {
          return res
            .status(401)
            .send('Job not found');
        }
        PostJobModel.delete(id);
        // res.redirect('/jobs');
        var jobs = PostJobModel.getAll();
        res.render('jobPage', { jobs, userEmail: req.session.userEmail });
    }


    search = (req, res) => {
        // Write your code here
        const {identity} = req.body;
        console.log("Name: ",identity);
        const result = PostJobModel.searchResult(identity);
        console.log("Result: ",result);
        res.render("searchJob", {jobs: result});
    };

    getError(req, res){
        res.render("error");
    }

}

export default JobPortalController;
