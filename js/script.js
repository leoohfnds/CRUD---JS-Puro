let globalNames = ['João de Deus', 'Leticia Arantes', 'Son Goku', 'Vegete'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');
  activeInput(); // ativando o curso para o usuario
  preventFormSubmit(); //evita que o form sejá carregado
  render();
});

function activeInput() {
  function insertName(newName) {
    globalNames.push(newName); // push é uma função utilizada para inserir valores em um vetor
    render();
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
        render();
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  //quando se tem uma função dentro de outra o nome dela é closer
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    let button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';

    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }

  let divNames = document.querySelector('#listNames');
  divNames.innerHTML = ''; // aqui limpa a tela

  //criar ul
  //fazer n li's, conforme o tamanho de globalNames.
  let ul = document.createElement('ul');

  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];
    let li = document.createElement('li');
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}

function preventFormSubmit() {
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
  }
}
