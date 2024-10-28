let profile = document.querySelector('.profile-btn');
let menu = document.querySelector('.menu');

profile.onclick = function () {
    menu.classList.toggle('active');
}




//js for toogle dark mode start here

document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });


});


//js for toogle list view and grid view
var listBtn = document.querySelector('.list-view');
var gridBtn = document.querySelector('.grid-view');

var listView = document.querySelector('.table__body');
var gridView = document.querySelector('.grid_block');
listView.style.display = "none"; 

listBtn.addEventListener('click', function () {
  gridBtn.classList.remove('active');
  listBtn.classList.add('active');
  gridView.style.display = "none"; // Hide grid view
  listView.style.display = "block"; // Show list view
});

gridBtn.addEventListener('click', function () {
  listBtn.classList.remove('active');
  gridBtn.classList.add('active');
  listView.style.display = "none"; // Hide list view
  gridView.style.display = "grid"; // Show grid view
});


