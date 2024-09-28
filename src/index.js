let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getAllToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  document.querySelector('form').addEventListener('submit', handleNewToy);
});

function getAllToys() {
  fetch('http://localhost:3000/toys/') 
    .then(res => res.json())
    .then(toyData => toyData.forEach(toy => renderOneToy(toy)));
}

function renderOneToy(toy) {
  let card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class = "toy-avatar"> 
  <p>${toy.likes}</p>
  <button class="like-btn" id=${toy.id}>Like ❤️</button>
  `
  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes+= 1
    card.querySelector('p').textContent = toy.likes
    updateLikes(toy);
  });

  document.querySelector('#toy-collection').appendChild(card);
}

function handleNewToy(e) {
  e.preventDefault();
  let toyObj = {
    name: e.target.getElementsByClassName('input-text')[0].value,
    image: e.target.getElementsByClassName('input-text')[1].value,
    likes: 0
  }
  renderOneToy(toyObj);
  addNewToy(toyObj);
}

function addNewToy(toyObj) {
  fetch('http://localhost:3000/toys/',{
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
   },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

