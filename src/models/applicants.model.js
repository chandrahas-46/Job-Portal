export default class PostAplicantModel {
    constructor(id, name, email, contact, resume) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.contact = contact;
      this.resume = resume;
    }
  
    static getAll() {
      return applicants;
    }

    static add(name, email, contact, resumeUrl) {
      let newApplicant = new PostAplicantModel(
        applicants.length + 1,
        name,
        email,
        contact,
        resumeUrl
      );
      applicants.push(newApplicant);
    }

    static count(){
      return applicants.length;
    }
}
  
  var applicants = [
    new PostAplicantModel(
        1,
        'Chandrahas',
        '4401chk@gmail.com',
        '8218083837',
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'
    ),
  ];
  