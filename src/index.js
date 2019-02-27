// On Document Load
document.addEventListener("DOMContentLoaded", init)

// Returns pups
function pupsUrl() {
  return "http://localhost:3000/pups/"
}

// Initialized functions on DOM load
function init() {
  getAllPups()
  filterDogsEvent()  
}

// Event listener for filter button
function filterDogsEvent() {
  let filterButton = document.getElementById('good-dog-filter')
  let onOff = filterButton.innerText.split(': ')[1]
  let toggle = true
  if (onOff === "ON") {
    filterButton.innerText = "Filter good dogs: OFF"
    debugger
    toggle = false
  } else {
    debugger
    filterButton.innerText = "Filter good dogs: ON"
    toggle = true
  }
  filterButton.addEventListener('click', () => getAllPups(toggle))
}

// Fetch pups from pups URL
function getAllPups(toggle) {
  let dogBar = document.getElementById('dog-bar')
  dogBar.innerHTML = ""
  fetch(pupsUrl())
  .then(res => res.json())
  .then(pups => {
    if (toggle){
      goodPups = pups.filter(pup => pup.isGoodDog)
      // let dogBar = document.getElementById('dog-bar')
      // dogBar.innerHTML = ""
      goodPups.forEach(pup => renderPupCard(pup))
    } else {
      pups.forEach(pup => renderPupCard(pup))
    }})
}

// Render each pup in dog bar
function renderPupCard(pup) {
  // Grab dog bar
  let dogBar = document.getElementById('dog-bar')
  // dogBar.innerHTML = ""
  
  // Create dog spans
  let span = document.createElement('span')
  span.innerText = pup.name
  dogBar.appendChild(span)
  
  span.addEventListener('click', () => showPupInfo(pup))
  
}

function showPupInfo(pup) {
  // Find dog info div
  let divInfo = document.getElementById('dog-info')
  divInfo.innerHTML = ""

  // Create elements of pup info
  let img = document.createElement('img')
  img.src = pup.image
  let h2 = document.createElement('h2')
  h2.innerText = pup.name

  // Create dog good button based on isGoodDog
  let button = document.createElement('button')
  button.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
  divInfo.append(img, h2, button)
  
  // Add event listener to good dog button
  button.addEventListener('click', () => goodDogStatus(pup, button))
}

// Takes status and updates it
function goodDogStatus(pup) {
  data = {isGoodDog: !pup.isGoodDog}

  fetch((pupsUrl() + pup.id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(pup => showPupInfo(pup))
}
