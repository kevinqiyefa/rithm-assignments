$(document).ready(function() {
  const $userlist = $('#userlist');
  $.getJSON('http://localhost:3000/users').then(function(users) {
    users.forEach(function(user) {
      let $newUser = $('<li>', {
        text: `ID#${user.id}. ${user.first_name} ${user.last_name}`
      });
      $userlist.append($newUser);
    });
  });

  const $companylist = $('#companylist');
  $.getJSON('http://localhost:3000/companies').then(function(companies) {
    companies.forEach(function(company) {
      let $newCompany = $('<li>', {
        text: `ID#${company.id}. ${company.name}`
      });
      $companylist.append($newCompany);
    });
  });

  const $joblist = $('#joblist');
  $.getJSON('http://localhost:3000/jobs').then(function(jobs) {
    jobs.forEach(function(job) {
      let $newJob = $('<li>', {
        text: `ID#${job.id}. ${job.title}`
      });
      $joblist.append($newJob);
    });
  });

  const $jobs_users = $('#jobs_users');
  $.getJSON('http://localhost:3000/jobs_users').then(function(jobs_users) {
    jobs_users.forEach(function(job_user) {
      let $newjob_user = $('<li>', {
        text: `ID#${job_user.id}. job_id: ${job_user.job_id}  user_id ${
          job_user.user_id
        }`
      });
      $jobs_users.append($newjob_user);
    });
  });
});
