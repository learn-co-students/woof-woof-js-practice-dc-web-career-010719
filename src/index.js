let dogContainer
let filterButton

document.addEventListener("DOMContentLoaded", init)

function init() {
  dogContainer = document.querySelector('#dog-bar')
  getAllDogs()

  filterButton = document.querySelector('#good-dog-filter')
  filterButton.addEventListener('click', handleClickOfFilter)
}

function getAllDogs() {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(allDogsData => {
    allDogsData.forEach(renderDog)
  })
}

function renderDog(dogObj) {
  let span = document.createElement('span')
  dogContainer.appendChild(span)
  span.innerText = dogObj.name
  span.dataset.id = dogObj.id
  span.addEventListener('click', handleClickOfDog)
}

function handleClickOfDog(event) {
  fetch(`http://localhost:3000/pups/${event.currentTarget.dataset.id}`)
  .then(res => res.json())
  .then(dogObj => renderDogInfo(dogObj))
}

function renderDogInfo(dogObj) {
  let div = document.querySelector('#dog-info')
  div.innerHTML = ''
  let img = document.createElement('img')
  div.appendChild(img)
  img.src = dogObj.image

  let h2 = document.createElement('h2')
  div.appendChild(h2)
  h2.innerText = dogObj.name

  let button = document.createElement('button')
  div.appendChild(button)
  if (dogObj.isGoodDog === true) {
    button.innerText = "Good Dog!"
  } else {
    button.innerText = "Bad Dog!"
  }
  button.dataset.id = dogObj.id
  button.addEventListener('click', handleClickOfButton)
}

function handleClickOfButton(event) {
  let patchData
  if(event.currentTarget.innerText === "Good Dog!") {
    patchData = {
      isGoodDog: false
    }
  } else {
    patchData = {
      isGoodDog: true
    }
  }
  fetch(`http://localhost:3000/pups/${event.currentTarget.dataset.id}`, {
    method: "PATCH",
    body: JSON.stringify(patchData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(res => res.json())
    .then(patchDogData => renderDogInfo(patchDogData))
}

function handleClickOfFilter(event) {
  let filter
  if (event.currentTarget.innerText === 'Filter good dogs: OFF') {
    event.currentTarget.innerText = 'Filter good dogs: ON'
    filter = 'Filter good dogs: ON'
  } else {
    event.currentTarget.innerText = 'Filter good dogs: OFF'
    filter = 'Filter good dogs: OFF'
  }
  filterDogs(filter)
}

function filterDogs(filter) {
  dogContainer.innerHTML = ''
  document.querySelector('#dog-info').innerHTML = ''
  let boolean
  if (filter === 'Filter good dogs: ON') {
    boolean = true
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(allDogsData => {
      allDogsData.filter(function(dog) {return dog.isGoodDog === boolean}).forEach(renderDog)
    })
  } else {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(allDogsData => {
      allDogsData.forEach(renderDog)
    })
  }
}
