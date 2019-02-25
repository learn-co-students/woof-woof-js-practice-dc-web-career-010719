let good = false
let activeDog

document.addEventListener('DOMContentLoaded', init)

function init() {
  renderDoggos()
  let goodButton = document.getElementById('good-dog-filter')
  goodButton.addEventListener('click', toggleGood)
}

function renderDoggos() {
  document.getElementById('dog-bar').innerHTML = ''
  let dogArea = document.getElementById('dog-summary-container').innerHTML = ''
  fetch('http://localhost:3000/pups')
  .then(resp => resp.json())
  .then(json => json.forEach(renderDog))
}

function renderDog(dog) {
  if (dog.isGoodDog === good) {
    let name = dog.name
    let dogBar = document.getElementById('dog-bar')
    let span = document.createElement('span')

    dogBar.appendChild(span)
    span.innerText = name
    span.id = dog.id
    span.addEventListener('click', selectDoggo)
  }
}

function selectDoggo(e) {
  activeDog = e.target.id
  fetch(`http://localhost:3000/pups/${activeDog}`)
  .then(resp => resp.json())
  .then(json => {spotlightDoggo(json)})
}

function spotlightDoggo(dog) {
  let dogArea = document.getElementById('dog-summary-container')
  dogArea.innerHTML = ''

  let div = document.createElement('div')
  dogArea.appendChild(div)
  div.id = "dog-info"

  let img = document.createElement('img')
  div.appendChild(img)
  img.src = dog.image

  let h2 = document.createElement('h2')
  div.appendChild(h2)
  h2.innerText = dog.name

  let button = document.createElement('button')
  div.appendChild(button)
  let a
  good ? a = 'Good Dog!' : a = 'Bad Dog!'
  button.innerText = a

  button.addEventListener('click', () => {changeStatus(dog)})
}

function changeStatus (dog){
  fetch(`http://localhost:3000/pups/${activeDog}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({isGoodDog: !good})
  })
  toggleGood()
  spotlightDoggo(dog)
}

function toggleGood(e) {
  let a
  good = !good
  good ? a = 'On' : a = 'Off'
  document.getElementById('good-dog-filter').innerText = `Filter good dogs: ${a}`
  renderDoggos()
}
