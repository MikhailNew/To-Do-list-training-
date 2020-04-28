let text = [];
let DATEarr = [];
const NAME_STORAGE_TODO_ITEMS = 'NAME_STORAGE_TODO_ITEMS';
const DATE_STORAGE = 'DATE_STORAGE';
flagOfTheme = false;

function addItemOnScreen(el){
    var itemLi = document.createElement('li');
    var btnClass = 'btn_delete';
    var btnDelete = `<div class="item__text">${el}</div><button class="${btnClass}" onclick="removeItem(this)">X</button>`;
    itemLi.classList.add('item_class');
    itemLi.innerHTML = btnDelete;
    document.querySelector('.list-items').appendChild(itemLi);
    //var btnEnterLeave = document.querySelectorAll('.btn_delete');
    // for(i=0; i<btnEnterLeave.length;i++) {
    //     btnEnterLeave[i].addEventListener('mouseover', handlerEnter);
    // }
}
//
function getItemFromServer(element){
    addItemOnScreen(element);
}

function addItemBlock(element) { 
    addItemOnScreen(element);
    add(element, onSuccessAdd);
}

function onSubmitFun(){
    var todoInput = document.querySelector('.todo-input');

    if (todoInput.value === '') {
        alert('Пустое поле! Повторите ошибку!');
    } else {
        addItemBlock(todoInput.value);
        todoInput.value = '';
    }
}

function removeItem(buttonRemove) {
    setTimeout( () => {
        let itemParent = buttonRemove.closest('li');
        var textChild = itemParent.querySelector('.item__text').textContent;
        remove(textChild, onSuccessRemove);
        itemParent.classList.add('item--to-remove');

        let fakeLi = document.createElement('li');
        fakeLi.classList.add('fake_block');
        let firstParentBlock = itemParent.closest('ul');
        
        setTimeout( () => {
            firstParentBlock.replaceChild(fakeLi,itemParent);
            fakeLi.classList.add('item--slide-top');

            setTimeout( () => {
                fakeLi.classList.remove('fake_block');
            },100)

            itemParent.remove();
        }, 1000)
  
    }, 10)
}

///// Меняем тему на темную
function onSubmitTheme(){

    flagOfTheme = !flagOfTheme;
    if (flagOfTheme) {
        $("#my-style").attr('href', 'style-black.css');
    } else {
        $("#my-style").attr('href', 'style.css');
    }
}

//// Выбор рандом места у кнопки удалить список (пока отключил)
function handlerEnter() {
    this.style.position = 'absolute';
    this.style.top = randomPlace(20, 500) + 'px';
    this.style.left = randomPlace(20, 900) + 'px';
}

function randomPlace(min,max) {
    return Math.floor(Math.random() *(max-min)+min);
}

///// -------------- Проверяем наличие информации 
function init() {
    getAll(onSuccess);
}

function onSuccess(items) {
    items.forEach( function (element) {
        getItemFromServer(element);
    });
  }
function onSuccessAdd(items) {
    console.log(items);
}
function onSuccessRemove(items) {
    console.log(items);
  }

//// Получение элементов с сервера
function getAll(callBack) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/item`);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status != 200) {
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      } else {
        let response = JSON.parse(xhr.response);
        callBack(response) 
        
      }
    };
}
//test
// Удаление элемента с сервера
function remove(itemToRemove, callBack) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/itemRemove?title=${itemToRemove}`);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status != 200) {
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      } else {
        let response = JSON.parse(xhr.response);
        callBack(response);
      }
    };
  }

// Добавление элемента на сервер
function add(newItem, callBack) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/itemAdd?title=${newItem}`);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status != 200) {
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      } else {
        let response = JSON.parse(xhr.response);
        callBack(response);
      }
    };
}

/////// попытка сохранить элемент по дате (надо доделать)
function getDate(el, d) {
    let user = {
        el,
        d
    }
    
}

///////// Смена слайдеров
function handlerSliderTickets() {
    $(".first__slider_tickets").addClass("active_slider");
    $(".first__slider_favorites").removeClass("active_slider");
    $(".first__tickets").css('display', 'block');
    $(".first__favorites").css('display', 'none');
}

function handlerSliderFavorite() {
    $(".first__slider_tickets").removeClass("active_slider");
    $(".first__slider_favorites").addClass("active_slider");
    $(".first__tickets").css('display', 'none');
    $(".first__favorites").css('display', 'block');
}

init();

$(".btn-submit").click(onSubmitFun);
$(".btn-theme").click(onSubmitTheme);


