const form = document.querySelector('#newTaskForm'),
      inputTaskName = document.querySelector('#addNewTask'),
      taskList = document.querySelector('#list-group'),
      emptyListItem = document.querySelector('#empty-list-item'),
      modalEdit = document.querySelector('#staticBackdropLive'),
      modalSaveBtn = document.querySelector('#save'),
      modalCloseBnts = document.querySelectorAll('.close-modal'),
      inputEdit = document.querySelector('#input-edit');

checkTasks();

inputTaskName.setAttribute('maxlength', '70');
inputEdit.setAttribute('maxlength', '70');

modalCloseBnts.forEach(el => {
  el.addEventListener('click', () => {
    modalEdit.classList.remove('show', 'fade');
  }); 
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputTaskName.value != '') {
    inputTaskName.style.borderColor = `unset`;

    let li = document.createElement('li'),
        buttonEdit = document.createElement('button'),
        buttonDone = document.createElement('button'),
        buttonDelete = document.createElement('button'),
        bwnWrapper = document.createElement('div'),
        span = document.createElement('span');
    
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'check-list');

    buttonDone.classList.add('btn', 'btn-light', 'align-self-end');
    buttonDone.innerHTML = `Готово`;
    buttonDone.addEventListener('click', () => {
      li.classList.toggle('task-title--done');

      if (!li.classList.contains('task-title--done')) {
        buttonDone.innerHTML = `Готово`;
        span.setAttribute('contenteditable', false);
      } else {
        span.setAttribute('contenteditable', false);
        buttonDone.innerHTML = `Не готово`;
      }
    });

    buttonDelete.classList.add('btn', 'btn-light', 'align-self-end');
    buttonDelete.innerHTML = ` Удалить`;
    buttonDelete.addEventListener('click', () => {
      li.remove();
      checkTasks();
    });    
    
    buttonEdit.classList.add('btn', 'btn-light', 'align-self-end');
    buttonEdit.innerHTML = ` Редактировать`;
    buttonEdit.addEventListener('click', (e) => {
      modalEdit.classList.add('show', 'fade');
      inputEdit.value = span.textContent;

      setTaskValue(span);
    });

    span.classList.add('task-title');
    span.innerHTML = inputTaskName.value;
    span.setAttribute('contenteditable', false);

    bwnWrapper.appendChild(buttonDone);
    // bwnWrapper.appendChild(buttonEdit);
    bwnWrapper.appendChild(buttonDelete);
    li.appendChild(span);
    li.appendChild(bwnWrapper);
    taskList.appendChild(li);

    inputTaskName.value = '';
  } else {
    inputTaskName.style.borderColor = `red`;
  }

  checkTasks();
});

function checkTasks() {
  if (document.querySelector('.check-list') == null) {
    emptyListItem.innerHTML = `Список дел пуст`;
  } else {
    emptyListItem.innerHTML = `Список дел:`;
  }
}

function setTaskValue(span) {
  modalSaveBtn.addEventListener('click', () => {
    if (inputEdit.value != '') {
      modalEdit.classList.remove('show', 'fade');
      try {
        span.innerHTML = inputEdit.value;
      } catch (e) {
        console.warn(e);
      }
    } else {
      inputEdit.style.borderColor = `red`;
    }
  });
}