document.addEventListener("DOMContentLoaded", init)

function init() {
  getAllDogs()

  let filterButton = getFilterButton()
  filterButton.addEventListener('click', handleClickOfFilterButton)
}

function getAllDogs() {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(allDogObjs => {
    allDogObjs.forEach(renderDog)
  })
}

function getDogBar() {
  return document.querySelector("#dog-bar")
}

function getDogInfoContainer() {
  return document.querySelector("#dog-info")
}

function getFilterButton() {
  return document.querySelector("#good-dog-filter")
}

function renderDog(dogObj) {
  let dogBar = getDogBar()

  let span = document.createElement('span')
  dogBar.appendChild(span)
  span.dataset.id = dogObj.id
  span.innerText = dogObj.name
  span.addEventListener('click', handleClickOfDog)
}

function handleClickOfDog(event) {
  let dogId = event.currentTarget.dataset.id
  getDogInfo(dogId)
}

function getDogInfo(dogId) {
  fetch(`http://localhost:3000/pups/${dogId}`)
  .then(res => res.json())
  .then(dogObj => renderDogInfo(dogObj))
}

function renderDogInfo(dogObj) {
  let dogInfoContainer = getDogInfoContainer()
  dogInfoContainer.innerHTML = ''

  let img = document.createElement('img')
  dogInfoContainer.appendChild(img)
  img.src = dogObj.image

  let h2 = document.createElement('h2')
  dogInfoContainer.appendChild(h2)
  h2.innerText = dogObj.name

  let attitudeButton = document.createElement('button')
  dogInfoContainer.appendChild(attitudeButton)
  attitudeButton.dataset.id = dogObj.id
  attitudeButton.id = 'dog-attitude-' + dogObj.id
  if (dogObj.isGoodDog === true) {
    attitudeButton.innerText = 'Good Dog!'
  } else {
    attitudeButton.innerText = 'Bad Dog!'
  }
  attitudeButton.addEventListener('click', handleClickOfAttitudeButton)
}

function handleClickOfAttitudeButton(event) {
  let dogId = event.currentTarget.dataset.id
  patchDogAttitude(dogId)
}

function patchDogAttitude(dogId) {
  let patchData
  if (document.querySelector(`#dog-attitude-${dogId}`).innerText === "Good Dog!") {
    patchData = {
      isGoodDog: false
    }
  } else {
    patchData = {
      isGoodDog: true
    }
  }
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: "PATCH",
    body: JSON.stringify(patchData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(res => res.json())
    .then(patchedDogObj => {
      if (patchedDogObj.isGoodDog === true) {
        document.querySelector(`#dog-attitude-${dogId}`).innerText = 'Good Dog!'
      } else {
        document.querySelector(`#dog-attitude-${dogId}`).innerText = 'Bad Dog!'
      }
    })
}

function handleClickOfFilterButton(event) {
  if (event.currentTarget.innerText === 'Filter good dogs: ON') {
    getDogBar().innerHTML = ''
    getDogInfoContainer().innerHTML = ''
    getAllDogs()
    event.currentTarget.innerText = 'Filter good dogs: OFF'
  } else {
    getDogBar().innerHTML = ''
    getDogInfoContainer().innerHTML = ''
    getGoodDogs()
    event.currentTarget.innerText = 'Filter good dogs: ON'
  }
}

function getGoodDogs() {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(allDogObjs => {
    allDogObjs.filter(dogObj => dogObj.isGoodDog === true).forEach(renderDog)
  })
}
