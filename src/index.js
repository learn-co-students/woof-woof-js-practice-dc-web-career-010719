
document.addEventListener(`DOMContentLoaded`, fetchDoggos)
document.querySelector('#good-dog-filter').addEventListener('click', filterDoggos)

function getDogBar() {
  return document.querySelector('#dog-bar')
}

function getDogDiv() {
  return document.querySelector('#dog-summary-container')
}

function getDoggo(id) {
  return document.getElementById(id)
}

function getDoggoButton(id) {
  return document.querySelector(`button[id='${id}']`)
}

function fetchDoggos() {
  fetch(`http://localhost:3000/pups`)
  .then(res => res.json())
  .then(doggosArray=>doggosArray.forEach((doggo)=>renderDoggo(doggo)))
}

function renderDoggo(doggo) {
  span = document.createElement('span')
  span.innerText = doggo.name
  span.id = doggo.id
  span.dataset.id = doggo.id
  span.dataset.image = doggo.image
  span.dataset.good = doggo.isGoodDog
  span.addEventListener('click', getDoggoInfo)
  getDogBar().appendChild(span)
}

function getDoggoInfo(e) {
  document.querySelector('#dog-summary-container').innerText = ""

  img = document.createElement('img')
  img.src = e.target.dataset.image
  getDogDiv().appendChild(img)

  h2 = document.createElement('h2')
  h2.innerText = e.target.innerText
  getDogDiv().appendChild(h2)

  button = document.createElement('button')
  button.innerText = JSON.parse(e.target.dataset.good) ? "Good Dog!" : "Bad Dog!"
  button.id = e.target.dataset.id
  button.addEventListener('click',handleButtonClick)
  getDogDiv().appendChild(button)
}

function handleButtonClick(e) {
  e.preventDefault()
  getDoggo(e.target.id).dataset.good = !JSON.parse(getDoggo(e.target.id).dataset.good)
  patchDoggo(e.target.id)
  let x = getDoggo(e.target.id).dataset.good
  getDoggoButton(e.target.id).innerText = JSON.parse(x) ? "Good Dog!" : "Bad Dog!"
}
function patchDoggo(id) {
  let x = getDoggo(id).dataset.good
  data = {isGoodDog: x}
  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
}

function getFilterButton() {
  return document.getElementById('good-dog-filter').dataset.filter
}

function filterDoggos(e) {
  e.preventDefault();
  if (getFilterButton() === "OFF") {
    document.getElementById('good-dog-filter').dataset.filter = "ON"
    document.getElementById('good-dog-filter').innerText = "Filter good dogs: ON"
    for(let i = 0; i < getDogBar().children.length; i++) {
      if (JSON.parse(getDogBar().children[i].dataset.good) == false) {
        getDogBar().children[i].style.display = "none";}
      }
    } else if (getFilterButton() === "ON") {
      document.getElementById('good-dog-filter').dataset.filter = "OFF"
      document.getElementById('good-dog-filter').innerText = "Filter good dogs: OFF"

      for(let i = 0; i < getDogBar().children.length; i++) {
        getDogBar().children[i].style.display = "flex";}
      }
    }
