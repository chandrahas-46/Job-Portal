// delete job from {update job page}
console.log("outer Delete method call!!!!!!!!!");
function deleteJob(id) {
  console.log("Delete method call!!!!!!!!!");
  const result = confirm(
    'Are you sure you want to delete this job ?'
  );
  if (result) {
    fetch(`/job/delete/${id}`, {
      method: 'POST',
    }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  }
}


