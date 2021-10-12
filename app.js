// const item = document.querySelectorAll('.item');
// const itemText = document.querySelector('.task');
// const check = document.querySelector('.border');

// for (let i = 0; i < item.length; i++) {
//   item[i].addEventListener('click', function toggleActive() {
//     item[i].childNodes[1].childNodes[1].childNodes[1].classList.toggle(
//       'check-active'
//     );
//     item[i].childNodes[1].childNodes[3].classList.toggle('complete');
//   });
// }
const list = document.querySelector('.list');
const input = document.querySelector('input');

const itemsCount = document.querySelector('.items-count');

var listArray = [];
var ids = 0;

class Item {
  constructor(task, id) {
    this.task = task;
    this.id = id;
  }
  status = 'notcompleted';
  renderItem() {
    return `<div class="item" id="${this.id}" onclick="changeState(event)">
    <div class="left-part">
      <div class="border">
        <span><img src="images/icon-check.svg" alt="check icon" /></span>
      </div>
      <p class="task">${this.task}</p>
    </div>
    <button onclick="deleteItem(event)">
      <img src="images/icon-cross.svg" alt="delete icon" />
    </button>
  </div>`;
  }
}
function uploadNewTask(event) {
  if (event.keyCode === 13) {
    var newItem = new Item(input.value, ids);
    listArray.push(newItem);
    reloadDom(listArray);
    ids++;
  }
}

function reloadDom(array) {
  list.innerHTML = '';
  array.forEach(function renderItem(item) {
    list.innerHTML += item.renderItem();
  });
  input.value = '';
  itemsCount.innerHTML = `${listArray.length} items left`;
  console.log(listArray);
}

function deleteItem(event) {
  var itemId = event.target.parentNode.parentNode.id;
  listArray.splice(
    listArray.findIndex(function findItem(item) {
      return item.id == itemId;
    }),
    1
  );
  reloadDom(listArray);
}

function changeState(event) {
  if (event.target.tagName == 'DIV') {
    var itemId = event.target.id;
    var index = listArray.findIndex(function findItem(item) {
      return item.id == itemId;
    });
    if (listArray[index].status != 'completed') {
      listArray[index].status = 'completed';
    }
    updateStyle(listArray);
  }
}

function updateStyle(array) {
  array.forEach(function changeStyle(item) {
    if (item.status == 'completed') {
      console.log(item.id);
      const parag = document.querySelector(`#${item.id}.item .left-part p`);
      console.log(parag);
    }
  });
}

window.addEventListener('keyup', uploadNewTask);
