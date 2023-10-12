export default class PostJobModel {
    constructor(jobId, jobCategory, jobDesignation, jobLocation, companyName, salary, totalOpenings, requiredSkills, date) {
      this.jobId = jobId;
      this.jobCategory = jobCategory;
      this.jobDesignation = jobDesignation;
      this.jobLocation = jobLocation;
      this.companyName = companyName;
      this.salary = salary;
      this.totalOpenings = totalOpenings;
      this.requiredSkills = requiredSkills;
      this.date = date;
    }
  
    static getAll() {
      return jobs;
    }

    static getById(id) {
      return jobs.find((p) => p.jobId == id);
    }

    static add(newJobData) {
      let newJob = new PostJobModel(
        jobs.length + 1,
        newJobData.job_category,
        newJobData.job_designation,
        newJobData.job_location,
        newJobData.company_name,
        newJobData.salary,
        newJobData.number_of_openings,
        newJobData.skills_required,
        newJobData.apply_by
      );
      jobs.push(newJob);
    }
  
    // static update(jobObj) {
    //   const index = jobs.findIndex(
    //     (p) => p.jobId == jobObj.jobId
    //   );
    //   jobs[index] = jobObj;
    //   console.log('******************************************');
    //   console.log(jobs[index]);
    // }

    static update(jobObj, id) {
      const index = jobs.findIndex(
        (p) => p.jobId == id
      );
      jobs[index].jobId = id;
      jobs[index].jobCategory = jobObj.job_category;
      jobs[index].jobDesignation = jobObj.job_designation;
      jobs[index].jobLocation = jobObj.job_location;
      jobs[index].companyName = jobObj.company_name;
      jobs[index].salary = jobObj.salary;
      jobs[index].totalOpenings = jobObj.number_of_openings;
      jobs[index].requiredSkills = jobObj.skills_required;
      jobs[index].date = jobObj.apply_by;
    }
  
    static delete(id) {
      const index = jobs.findIndex(
        (p) => p.id == id
      );
      jobs.splice(index, 1);
    }

    static searchResult(identity) {
      var filterJobs=[];
      for(const i of jobs){
        if (i.companyName == identity || i.jobId == identity){
          filterJobs.push(i);
        }
      }
      // const data = this.jobs.filter((job) => {
      //   if (job.companyName == name) {
      //     return job;
      //   }
      // });
      return filterJobs;
    };
  
  }
  
  var jobs = [
    new PostJobModel(
        1,
        'Tech',
        'SDE',
        'Gurgaon HR IND Remote',
        'Amazon',
        '14-20lpa',
        '5',
        ['REACT', 'NodeJs', 'Js', 'SQL', 'MongoDB', 'Express', 'AWS'],
        '9/15/2023, 8:54:20 PM'
    ),
    new PostJobModel(
        2,
        'Tech',
        'Angular Developer',
        'Pune IND On-Site',
        'Go Digit',
        '6-10lpa',
        '3',
        ['Angular', 'NodeJs', 'Js', 'SQL', 'MongoDB', 'AWS'],
        '9/18/2023, 8:54:20 PM'
    ),
  ];
  