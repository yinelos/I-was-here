/*
JS functions for check local storage, add user and save new user to local storage
*/

// chech if user in local storage
function first_check() {
  var name = localStorage.getItem('name');
  // if name exist in local storage -> show hello message
  if (name) {
    hiblock = document.getElementById("hiagain");
    document.getElementsByName("hi-name")[0].innerHTML = name;
    hiblock.classList.remove('hidden');
  } else {
    // if name is not exist in local storage -> show welcome form
    welcome = document.getElementById("welcome");
    welcome.classList.remove('hidden');
  }
};

// save server response dbkey and name to browser local storage
function save_to_ls(dbkey, name) {
  localStorage.setItem('dbkey', dbkey);
  localStorage.setItem('name', name);
}

// send input name to server via XHR (ajax)
function send_name_ajax(name) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.responseType = 'json';
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        resp = xmlhttp.response
        if (resp.status) {
          // if db ok
          // save name and key to local storage
          save_to_ls(resp.dbkey, resp.name);
          // hide name form
          welcome = document.getElementById("welcome");
          welcome.classList.add('hidden');
          // show hi div with name
          hiblock = document.getElementById("hiagain");
          document.getElementsByName("hitext")[0].innerHTML = 'Привіт,';
          document.getElementsByName("hi-name")[0].innerHTML = name;
          hiblock.classList.remove('hidden');
        } else {
          // if db error
          alert('Помилка запису в базу даних, спробуйте пізніше');
        };
      } else if (xmlhttp.status == 400) {
        // 400 error
        alert('Помилка, спробуйте пізніше');
      } else {
        // else error
        alert('Помилка, спробуйте пізніше');
      }
    }
  };
  xmlhttp.open("POST", "/add", true);
  xmlhttp.send(name);
}

// function to get name and initialize XHR send
function send_btn() {
  name = document.getElementById("name").value
  if (name == '') {
    alert('Здається, ти забув ввести ім`я)');
  } else {
    send_name_ajax(name);
  }
};

// start first check onload(+-) page
first_check();

// localStorage.clear();
