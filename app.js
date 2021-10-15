const list = document.querySelector('.list');
const input = document.querySelector('input');

const itemsCount = document.querySelector('.items-count');

const clear = document.querySelector('.clear');
const buttons = document.querySelectorAll('.switch button');

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
  updateStyle(array);
  reloadCounter(array);
}

function reloadCounter(array) {
  let counter = 0;
  array.forEach(function checkStatus(item) {
    if (item.status != 'completed') {
      counter++;
    }
  });
  itemsCount.innerHTML = `${counter} items left`;
}

function deleteItem(event) {
  var itemId = event.target.parentNode.parentNode.id;
  listArray.splice(
    listArray.findIndex(function findItem(item) {
      return item.id == itemId;
    }),
    1
  );
  removeClass();
  buttons[0].classList.add('switch-active');
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
    } else {
      listArray[index].status = 'notcompleted';
    }
    updateStyle(listArray);
    reloadCounter(listArray);
    removeClass();
    buttons[0].classList.add('switch-active');
  }
}

function updateStyle(array) {
  array.forEach(function changeStyle(item) {
    const divItem = document.getElementById(item.id);
    if (item.status == 'completed') {
      divItem.classList.add('complete');
    } else {
      divItem.classList.remove('complete');
    }
  });
}

function clearCompleted() {
  listArray = listArray.filter(function filterCompleted(item) {
    return item.status == 'notcompleted';
  });
  removeClass();
  buttons[0].classList.add('switch-active');
  reloadDom(listArray);
}

function swtichHandler(event) {
  removeClass();
  let arrayCopy = [...listArray];
  switch (event.target.innerText) {
    case 'Active':
      event.target.classList.add('switch-active');
      arrayCopy = arrayCopy.filter(function filterCompleted(item) {
        return item.status == 'notcompleted';
      });
      reloadDom(arrayCopy);
      break;
    case 'Completed':
      event.target.classList.add('switch-active');
      arrayCopy = arrayCopy.filter(function filterCompleted(item) {
        return item.status == 'completed';
      });
      reloadDom(arrayCopy);
      break;
    case 'All':
      event.target.classList.add('switch-active');
      reloadDom(listArray);
      break;
  }
}

function removeClass() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('switch-active');
  }
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', swtichHandler);
}
clear.addEventListener('click', clearCompleted);
window.addEventListener('keyup', uploadNewTask);
