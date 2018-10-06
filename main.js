
let allchecked = true; /* indicates if all contacts are selected */
let allNotChecked = true; /* indicates if no contacts are selected */
let onlyOneChecked = false; /* indicates if only one contact contact is selected */
let subADDRESSES = []; /* subgroup of ADDRESSES array */

/********************************************************************/
/* Show contact form when new contact button clicked */
function newContact() {
  document.getElementById('txtName').value = "";
  document.getElementById('txtSurname').value = "";
  document.getElementById('txtPhone').value = "";
  document.getElementById('txtAddress').value = "";

  let title = document.getElementById('titleContactForm');
  title.innerHTML = '<h2 id="titleContactForm">Add a new contact</h2>';
  $('#contactForm').show();
}

/********************************************************************/
/* Show contact form with the info of the selected contact */
function modifyContact() {

  for (i=0; i<ADDRESSES.length; i++) {
    if (ADDRESSES[i].checked) {
      document.getElementById('txtName').value = ADDRESSES[i].name;
      document.getElementById('txtSurname').value = ADDRESSES[i].surname;
      document.getElementById('txtPhone').value = ADDRESSES[i].phone;
      document.getElementById('txtAddress').value = ADDRESSES[i].address;
    }
  }

  let title = document.getElementById('titleContactForm');
  title.innerHTML = '<h2 id="titleContactForm">Modify contact</h2>';
  $('#contactForm').show();

}

/********************************************************************/
/* Exit contact form when exit button clicked */
function exitForm() {
  $('#contactForm').hide();
}

/********************************************************************/
/* Save contact when save button clicked in the contact form */
function saveContact() {
  let name = document.getElementById('txtName').value;
  let surname = document.getElementById('txtSurname').value;
  let phone = document.getElementById('txtPhone').value;
  let address = document.getElementById('txtAddress').value;

  onlyOneChecked = false;

  /* If a contact has been selected for modification, modify ADDRESSES array*/
  for (i=0; i<ADDRESSES.length; i++) {
    if (ADDRESSES[i].checked) {
      ADDRESSES[i].checked = false;
      if (document.getElementById('txtName').value!=='' &&
          document.getElementById('txtSurname').value!=='' &&
          document.getElementById('txtPhone').value!=='' &&
          document.getElementById('txtAddress').value!=='') {
          ADDRESSES[i].name = document.getElementById('txtName').value;
          ADDRESSES[i].surname = document.getElementById('txtSurname').value;
          ADDRESSES[i].phone = document.getElementById('txtPhone').value;
          ADDRESSES[i].address = document.getElementById('txtAddress').value;
      }

      onlyOneChecked = true;
    }
  };

  /* If no contact has been selected for modification, add new contact */
  if (!onlyOneChecked) {
    if (name!=='' && surname!=='' && phone!=='' && address!=='') {
      ADDRESSES.push({
        checked: false,
        name: name,
        surname: surname,
        phone: phone,
        address: address
      });
    }
  };

  displayTbl(ADDRESSES);
}

/********************************************************************/
/* If check button click, change its value*/
function checkFunc(idxCheck) {
  ADDRESSES[idxCheck].checked = !ADDRESSES[idxCheck].checked;
  displayTbl(ADDRESSES);
}

/********************************************************************/
/* If allcheck button clicked, modify all the contact check buttons */
function checkAll() {
  allchecked = !allchecked;
  for (i=0; i<ADDRESSES.length; i++) {
    ADDRESSES[i].checked = allchecked;
  }
  displayTbl(ADDRESSES);
}

/********************************************************************/
/* Delete contact(s) when delete button clicked */
function deleteContact() {
  let index = 0;
  let lengthAddresses = ADDRESSES.length;

  for (i=0; i<lengthAddresses; i++) {
    if (ADDRESSES[index].checked) {
      ADDRESSES.splice(index,1);
    }
    else {
      index++;
    }
  }
  if (allchecked) {
    allchecked = false;
  }
  displayTbl(ADDRESSES);
};

/********************************************************************/
/* Search for an input string within all contacts */
function searchContact() {
  let searchVal = document.getElementById('txtFilter').value.toLowerCase();
  subADDRESSES = [];

  for (i=0; i<ADDRESSES.length; i++) {

      let name = ADDRESSES[i].name.toLowerCase();
      let surname = ADDRESSES[i].surname.toLowerCase();
      let phone = ADDRESSES[i].phone.toLowerCase();
      let address = ADDRESSES[i].address.toLowerCase();

      if (name.includes(searchVal) || surname.includes(searchVal) ||
          phone.includes(searchVal) || address.includes(searchVal)) {
        subADDRESSES.push(ADDRESSES[i]);
      }

  };
  displayTbl(subADDRESSES);
}

/********************************************************************/
/* Display contact table and buttons format based on contact checked buttons */
function displayTbl(addressArr) {

  allNotChecked = true;
  onlyOneChecked = false;
  let countChecks = 0;
  let tblAddress = document.getElementById('addressTblId');

  /* Delete content of tblAddress */
  while (tblAddress.rows.length>1) {
    for (i=1; i<tblAddress.rows.length+1; i++) {
      tblAddress.deleteRow(1);
    }
  }

  /* Print tblAddress based on array ADDRESSES */
  for (i=0; i<addressArr.length; i++) {
    let row = tblAddress.insertRow(i+1);
    let checkbox = row.insertCell(0);
    let name = row.insertCell(1);
    let surname = row.insertCell(2);
    let phone = row.insertCell(3);
    let address = row.insertCell(4);

    if (addressArr[i].checked) {
      checkbox.innerHTML ='<img src="img/checkImg.png" onclick="checkFunc('+i+')" id="chBox"/>';
      allNotChecked = false;
      countChecks++;
    }
    else {
      checkbox.innerHTML ='<img src="img/uncheckImg.png" onclick="checkFunc('+i+')" id="chBox"/>';
      allchecked = false;
    }

    name.innerHTML = addressArr[i].name;
    surname.innerHTML = addressArr[i].surname;
    phone.innerHTML = addressArr[i].phone;
    address.innerHTML = addressArr[i].address;
  }

  if (countChecks!==1) {
    onlyOneChecked = true;
  }

  if (!allchecked) {
    tblAddress.rows[0].cells[0].innerHTML = '<img src="img/uncheckImg.png" id="chBoxAll" onclick="checkAll()"/>';
  } else {
    tblAddress.rows[0].cells[0].innerHTML = '<img src="img/checkImg.png" id="chBoxAll" onclick="checkAll()"/>';
  }

  /* Modify button only active if one contact is checked */
  if (onlyOneChecked) {
    $('#modifyBtn').css({
      backgroundColor: '#C0C0C0',
      opacity: '0.7',
      pointerEvents: 'none',
    });
    document.getElementById("modifyBtn").disabled = true;
  }
  else {
    $('#modifyBtn').css({
      backgroundColor: '#ffa05a',
      opacity: '1',
      pointerEvents: 'auto',
    });
    document.getElementById("modifyBtn").disabled = false;
  }

  /* Delete button active if at least contact is checked */
  if (allNotChecked) {
    $('#deleteBtn').css({
      backgroundColor: '#C0C0C0',
      opacity: '0.7',
      pointerEvents: 'none',
    });
    document.getElementById("deleteBtn").disabled = true;
  }
  else {
    $('#deleteBtn').css({
      backgroundColor: '#ffa05a',
      opacity: '1',
      pointerEvents: 'auto',
    });
    document.getElementById("deleteBtn").disabled = false;
  }
};

/********************************************************************/
$(document).ready(() => {

  displayTbl(ADDRESSES);

});
