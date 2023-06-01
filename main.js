const userDB = [
  {
    fname: "ARBAB", lname: "SHAFI", email: "arbabshafi81@gmail.com", password: "admin",address:'Pampore'
  }
];
let updatedIndex=-1
function onRegister() {
  const user = Array.from(document.querySelectorAll("#registerForm input")).reduce((key, val) => ({ ...key, [val.name]: val.value }), {});
  if (user.password !== user.cpassword) {
    swal("oops...!", "Entered Password doesn't match!", "warning")
    return
  }
  if (userDB.length) {
    const isExistingUser = userDB.some(user1 => {
      return user1.email === user.email;
    });
    isExistingUser ? swal("oops...!", "Email Already Exist", "warning"):(userDB.push(user), swal("Success", "Registered", "success"), showLogin());
  } else {
    userDB.push(user);
    swal("Success", "User Registered Successfully!", "success")
    showLogin();
  }
  console.log(user);
}
function showRegistration() {
  document.querySelector(".LOGIN").style.display = "none";
  document.querySelector(".SIGNUP").style.display = "flex";
  document.querySelector(".userlist").style.display = "none";
  document.querySelector(".UPDATE").style.display = "none";
}
function showLogin() {
  document.querySelector(".LOGIN").style.display = "flex";
  document.querySelector(".SIGNUP").style.display = "none";
  document.querySelector(".userlist").style.display = "none";
  document.querySelector(".UPDATE").style.display = "none";
}
function showUser() {
  document.querySelector(".LOGIN").style.display = "none";
  document.querySelector(".SIGNUP").style.display = "none";
  document.querySelector(".userlist").style.display = "block";
  document.querySelector(".UPDATE").style.display = "none";
}
function onLogin() {
  const logEmail = document.getElementById("email1").value;
  const logPass = document.getElementById("password1").value;
  if (!userDB.length) {
    swal("oops...!", "User Not Found Register First!", "error")
    return
  }
  const isUser = userDB.some(user => {
    return user.email === logEmail && user.password === logPass});
  if (isUser) {
    swal("Success", "Login Successfull", "success")
    document.querySelector(".LOGIN").style.display = "none";
    document.querySelector(".userlist").style.display = "block";
    addUser();
  }
  else {
    swal("oops...!", "Invalid Credentials!", "error");
  }
}
function addUser() {
  for (let i = 0; i < userDB.length; i++) {
    let tr = document.createElement('tr');
    let btn1 = document.createElement('BUTTON');
    let btn2 = document.createElement('BUTTON');
    let btn3 = document.createElement('BUTTON');

    btn1.innerHTML = 'View'
    btn1.style.backgroundColor='#007bff';
    btn1.style.color='white';
    btn1.style.borderColor='#007bff';
    btn1.style.fontSize='15px';
    btn1.style.padding='5px 5px';
    btn1.style.width='20%';    
    btn1.style.borderRadius='5px';    
    btn1.style.cursor='pointer';    


    btn2.innerHTML = "Delete";
    btn2.style.backgroundColor='#dc3545';
    btn2.style.borderColor='#dc3545';
    btn2.style.fontSize='15px';
    btn2.style.color='white';
    btn2.style.padding='5px 5px';
    btn2.style.width='20%';
    btn2.style.borderRadius='5px'; 
    btn2.style.cursor='pointer';


    btn3.innerHTML = "Edit";
    btn3.style.backgroundColor='#17a2b8';
    btn3.style.borderColor='#17a2b8';
    btn3.style.fontSize='15px';
    btn3.style.color='white';
    btn3.style.padding='5px 5px';
    btn3.style.width='20%';
    btn3.style.borderRadius='5px'; 
    btn3.style.cursor='pointer';

    let td1 = tr.appendChild(document.createElement('td'));
    let td2 = tr.appendChild(document.createElement('td'));
    let td3 = tr.appendChild(document.createElement('td'));
    let td4 = tr.appendChild(document.createElement('td'));
    td4.classList.add('btn-container');

    td1.innerHTML = userDB[i].fname;
    td2.innerHTML = userDB[i].lname;
    td3.innerHTML = userDB[i].address;
    td4.appendChild(btn1);
    td4.appendChild(btn2);
    td4.appendChild(btn3);
    document.getElementById("myTable").appendChild(tr);
  }
}
function logout() {
  const old_tbody = document.getElementById("myTable");
  old_tbody.innerHTML = "";
  showLogin();
}
// btn2-- Delete button
document.addEventListener('click', function(event) {
  if (event.target && event.target.nodeName === 'BUTTON' && event.target.innerHTML === 'Delete') {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let row = event.target.parentNode.parentNode;
        let index = row.rowIndex;
        userDB.splice(index - 1, 1);
        row.parentNode.removeChild(row);
        swal("Poof! Your data file has been deleted!", {
          icon: "success",
        });
      }
    });
  }
});
// btn1-----View Button
document.addEventListener('click', function(event) {
  if (event.target && event.target.nodeName === 'BUTTON' && event.target.innerHTML === 'View') {
    let row = event.target.parentNode.parentNode;
    let index = row.rowIndex;
    let user = userDB[index - 1];
    
    // Display user details in the view details div
    let viewDetailsDiv = document.getElementById('viewDetails');
    viewDetailsDiv.innerHTML = `
      <span class="closeBtn">&times;</span>
      <h3>User Details</h3>
      <p><strong> First Name:</strong> ${user.fname}</p>
      <p><strong>Last Name:</strong> ${user.lname}</p>
      <p><strong>Address:</strong> ${user.address}</p>
    `;
    viewDetailsDiv.style.display = 'block';

    // Add event listener to close button (x)
    let closeBtn = viewDetailsDiv.querySelector('.closeBtn');
    closeBtn.addEventListener('click', function() {
    viewDetailsDiv.style.display = 'none';
    });
    // Add event listener to window's beforeunload event
    window.addEventListener('beforeunload', function() {
      viewDetailsDiv.style.display = 'none';
    });
  }
});
//btn 3---Edit Button
document.addEventListener('click', function(event) {
  if (event.target && event.target.nodeName === 'BUTTON' && event.target.innerHTML === 'Edit') {
    let row = event.target.parentNode.parentNode;
    updatedIndex = row.rowIndex-1;
    document.getElementById("fname1").value=userDB[updatedIndex].fname;
    document.getElementById("lname1").value=userDB[updatedIndex].lname;
    document.getElementById("address1").value=userDB[updatedIndex].address;
    document.querySelector(".LOGIN").style.display = "none";
    document.querySelector(".SIGNUP").style.display = "none";
    document.querySelector(".userlist").style.display = "none";
    document.querySelector(".UPDATE").style.display = "flex";
    }
  });
  function updateData(){
    let updatedfname=document.getElementById('fname1').value;
    let updatedlname=document.getElementById('lname1').value;
    let updatedaddress=document.getElementById('address1').value;
    let updatedObject={...userDB[updatedIndex],fname:updatedfname,lname:updatedlname,address:updatedaddress}
    userDB[updatedIndex]=updatedObject;
  }
  function showTableAgain(){
    document.getElementById('myTable').innerHTML="";
    addUser();
    showUser();
  }
