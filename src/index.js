'use strict'
document.addEventListener("DOMCintentLoaded", init())

//set filterBtn to false for good dog filter button
let filter = false

function init() {
  console.log("Ruff")
  //declare variable for event listener
  let filterBtn = document.querySelector("#good-dog-filter")
  
  //grab all pups from the db
  getAllPups()
  
  //add event listener to filterBtn and set active dataset for filter tracking
  filterBtn.addEventListener("click", () => {filterPups(filterBtn)})
}

function getAllPups() {
  //set varable for dog bar (div) to hold all the pups names
  const dogBar = document.querySelector("#dog-bar")

  //initial fetch for all pups
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(pups => {
    dogBar.innerText = '' //clear dog bar to render new pups
    pups.forEach((pup) => { //render only good pups if filterBtn is set to true. Render all if filterBtn is set to false
      if (filter === true && pup.isGoodDog === true) {
        renderPup(pup, dogBar)
      } else if (filter === false) {
        renderPup(pup, dogBar)
      }
    })
  })
}

function renderPup(dog, dogBar) {
  //create inidivual dog span and set span attributes with dog info
  const span = document.createElement("span")
  
  //set span attributes and add event listener
  span.innerText = dog.name
  span.addEventListener('click', () => {displayDog(dog)})
  
  //append span to dogBar
  dogBar.appendChild(span)
}

function displayDog(dog){
  //query and create elements for pup rendering
  const dogInfo = document.querySelector("#dog-info")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const btn = document.createElement("button")
  
  //clear dogInfo div of previous dog's info and set new pup attributes to elements for rendering and event listener handling
  dogInfo.innerHTML = ''
  h2.innerText = dog.name
  img.src = dog.image
  btn.innerText = goodDogBtn(dog)
  
  //add event listener to btn to update isGoodDog status
  btn.addEventListener('click', () => {
    goodBoiDOMUpdate(btn, dog)
  })
  
  //append elements to dogInfo div
  dogInfo.appendChild(img)
  dogInfo.appendChild(h2)
  dogInfo.appendChild(btn)
    
}

function goodDogBtn(dog) {
  //render button with text cooresponding to isGoodDog status
  return dog.isGoodDog ? "Good Dog!" :  "Bad Dog!"
}

function goodBoiDOMUpdate(btn, dog){
  //update isGoodDog boolean
  dog.isGoodDog = !dog.isGoodDog
  
  //update button innerText
  btn.innerText = goodDogBtn(dog)
  
  //send dog for db PATCH update
  goodBoiDbUpdate(dog)
}

function goodBoiDbUpdate(dog) {
  //data being sent to db for patch
  const data = {isGoodDog: dog.isGoodDog}
  
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data) //must stringify to send info to db
    })
  .then(res => res.json())
  .then(json => console.log(json))
}

function filterPups(filterBtn) {
  //update filter variable on click
  filter = !filter
  
  //update filter button innertext on click
  if (filter) {
    filterBtn.innerText = "Filter good dogs: ON"
  } else {
    filterBtn.innerText = "Filter good dogs: OFF"
  }
  
  //clear dogInfo div and render all pups to the dogBar
  document.querySelector("#dog-info").innerText = ''
  getAllPups()
}

