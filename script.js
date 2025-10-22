
c
const wrapper = document.querySelector('.cards-wrapper');
let scrollAmount = 0;

setInterval(()=>{
    scrollAmount += 5;
    if (scrollAmount >= wrapper.scrollWidth - wrapper.clientWidth){
        scrollAmount = 0; //reset and start
    }
    wrapper.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}, 60); //adjust speed

// declaration input to userInput
const userInput = document.getElementById("userInput");
// for display the list on the page
const tasklist = document.getElementById("tasklist");
const count = document.getElementById('count');
// key used in localStorage
const Storage_key = 'simple_todo_v1';

// taking the input value and create the
//  new li element and store input content to li
function addList(){
  if(userInput.value === ""){
    alert("input box is empty");
  } else{
    let li = document.createElement("li");
    li.innerHTML = userInput.value;
    tasklist.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  userInput.value = "";
  saveData();
  updateCount();
}

tasklist.addEventListener("click", function(e) {
  // console.log('clicked', e.target, 'tag:', e.target.tagName);
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
  else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function updateCount() {
  let total = tasklist.getElementsByTagName("li").length;
  count.textContent = total > 0 ? `${total} task(s)` : "No tasks";
}

function saveData(){
  localStorage.setItem("data", tasklist.innerHTML)
}
function showTask(){
  tasklist.innerHTML = localStorage.getItem("data");
}

showTask()
