// document.addEventListener('DOMContentLoaded', Controller.init)
document.addEventListener('DOMContentLoaded', init);

const api = 'http://localhost:3000/pups'
let filterGood = false

function init(e) {
  document.querySelector('#good-dog-filter').addEventListener('click', toggleFilter)
  getPups()
}

function getPups() {
  const url = filterGood ? `${api}?isGoodDog=true` : api
  return fetch(url)
    .then(res => res.json())
    .then(renderPups)
}

function getPup(id) {
  return fetch(`${api}/${id}`)
    .then(res => res.json())
    .then(renderPup)
}

function updatePup(pup) {
  return fetch(`${api}/${pup.id}`, {
    method: 'PATCH',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(pup) 
  })
}

function renderPups(pups) {
  const bar = document.querySelector('#dog-bar')
  bar.innerHTML = ''
  pups.forEach(pup => {
    bar.appendChild(pupItem(pup))
  })
}

function pupItem(pup) {
  const item = document.createElement('span')
  item.innerText = pup.name
  item.dataset.id = pup.id
  item.addEventListener('click', e => renderPup(pup))
  return item
}

function renderPup(pup) {
  const info = document.querySelector('#dog-info')
  info.innerHTML = ''
  info.innerHTML += `<img src="${pup.image}" alt="${pup.name}" />`
  info.innerHTML += `<h2>${pup.name}</h2>`

  const btn = document.createElement('button')
  btn.innerText = pup.isGoodDog ? 'Bad Dog!' : 'Good Dog!'
  btn.addEventListener('click', e => togglePup(pup))
  info.appendChild(btn)
}

function togglePup(pup) {
  pup.isGoodDog = !pup.isGoodDog
  renderPup(pup)
  updatePup(pup)
}

function toggleFilter() {
  filterGood = !filterGood
  getPups()
  
  const btn = document.querySelector('#good-dog-filter')
  const state = filterGood ? 'ON' : 'OFF'
  btn.innerText = `Filter good dogs: ${state}`
}