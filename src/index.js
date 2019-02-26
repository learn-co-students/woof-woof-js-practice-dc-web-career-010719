document.addEventListener('DOMContentLoaded', () => {
  fetchPups()
  let filterBtn = document.getElementById('good-dog-filter')
  filterBtn.addEventListener('click', filterDogs)
})

function fetchPups () {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(pups => {
    pups.forEach(showPup)
  })
}

function showPup (pup) {
  let dogBar = document.getElementById('dog-bar')
  let dogSpan = document.createElement('span')
  dogSpan.setAttribute('id', `pup-${pup.id}`)
  dogSpan.innerText = `${pup.name}`
  dogBar.appendChild(dogSpan)

  let dogDiv = document.getElementById('dog-info')
  let img = document.createElement('img')
  img.src = `${pup.image}`
  img.setAttribute('id', `img-pup-${pup.id}`)
  let header = document.createElement('h2')
  header.innerText = `${pup.name}`
  header.setAttribute('id', `header-pup-${pup.id}`)
  let goodBtn = document.createElement('button')
  if (pup.isGoodDog === true) {
    goodBtn.innerText = 'Good Dog!'
  } else {
    goodBtn.innerText = 'Bad Dog!'
  }
  goodBtn.setAttribute('id', `btn-pup-${pup.id}`)
  goodBtn.className = 'tfBtn'

  dogDiv.appendChild(img)
  dogDiv.appendChild(header)
  dogDiv.appendChild(goodBtn)
  img.hidden = true
  header.hidden = true
  goodBtn.hidden = true

  dogSpan.addEventListener('click', pupInfo)
  goodBtn.addEventListener('click', toggleGood)
}

function pupInfo (e) {
  let div = document.getElementById('dog-info')
  let children = div.children
  for (let i = 0; i < children.length; i++) {
    children[i].hidden = true
  }

  let id = e.currentTarget.id.split('-')[1]
  let img = document.getElementById(`img-pup-${id}`)
  let header = document.getElementById(`header-pup-${id}`)
  let goodBtn = document.getElementById(`btn-pup-${id}`)
  img.hidden = false
  header.hidden = false
  goodBtn.hidden = false
}

function toggleGood (e) {
  let id = e.currentTarget.id.split('-')[2]
  let goodBtn = document.getElementById(`btn-pup-${id}`)
  let isGood = true
  if (goodBtn.innerText === 'Good Dog!') {
    goodBtn.innerText = 'Bad Dog!'
    isGood = false
  } else {
    goodBtn.innerText = 'Good Dog!'
  }

  let data = {
    isGoodDog: isGood
  }

  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(res => res.json())
}

function filterDogs () {
  let dogBar = document.getElementById('dog-bar')
  let filterBtn = document.getElementById('good-dog-filter')
  let children = dogBar.children
  for (let i = 0; i < children.length; i++) {
    children[i].hidden = true
  }
  if (filterBtn.innerText === 'Filter good dogs: OFF') {
    showGoodDogs()
    filterBtn.innerText = 'Filter good dogs: ON'
  } else {
    showAllDogs()
    filterBtn.innerText = 'Filter good dogs: OFF'
  }
}
function showGoodDogs () {
  let btns = document.getElementsByClassName('tfBtn')
  for (let i = 0; i < btns.length; i++) {
    if (btns[i].innerText === 'Good Dog!') {
      let span = document.getElementById(`pup-${i+1}`)
      span.hidden = false
    }
  }
}
function showAllDogs () {
  let btns = document.getElementsByClassName('tfBtn')
  for (let i = 0; i < btns.length; i++) {
    let span = document.getElementById(`pup-${i+1}`)
    span.hidden = false
  }
}
