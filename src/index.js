'use strict'
document.addEventListener("DOMCintentLoaded", console.log("Ruff"), init())

function init() {
  //declare variable for event listener
  let filterBtn = document.querySelector("#good-dog-filter")
  
  //render all pups on page load
  getAllPups()
  
  //add event listener to filterBtn and set active dataset for filter tracking
  filterBtn.dataset.active = false
  filterBtn.addEventListener("click", filterPups)
}


function getAllPups() {
  //initial fetch for all pups
  fetch('http://localhost:3000/pups')
	 .then(res => res.json())
	 .then(json => {
    json.forEach((el) => renderPup(el))
    })
}

function renderPup(dog) {
  //create inidivual dog span and set span attributes with dog info
  let dogBar = document.querySelector("#dog-bar")
  let span = document.createElement("span")
  
  span.dataset.dogId = dog.id
  span.dataset.goodBool = dog.isGoodDog
  span.innerText = dog.name
  span.className = `dogs dog-${dog.id}`
  span.addEventListener('click', fetchDog)
  
  //append dog span to dogbar
  dogBar.appendChild(span)
}

function fetchDog(e) {
  //individual dog fetch for pup picture
  let id = e.currentTarget.dataset.dogId
  fetch(`http://localhost:3000/pups/${id}`)
    .then(res => res.json())
    .then(json => displayDog(json))
}

function displayDog(dog){
  //create elements for pup rendering
  let dogInfo = document.querySelector("#dog-info")
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let btn = document.createElement("button")
  
  //clear dogInfo div of previous dog's info and set new pup attributes to elements for rendering and event histener handling
  dogInfo.innerHTML = ''
  h2.innerText = dog.name
  img.src = dog.image
  btn.dataset.isGoodDog = dog.isGoodDog
  btn.dataset.id = dog.id
  //  debugger
  btn.innerText = goodDogBtn(btn)
  btn.addEventListener('click', goodBoiDbUpdate)
  
  //add updated pup info to dog-info div
  dogInfo.appendChild(img)
  dogInfo.appendChild(h2)
  dogInfo.appendChild(btn)
    
}

function goodDogBtn(btn) {
  //render goodDog button with text cooresponding to isGoodDog status
  let btnBool = JSON.parse(btn.dataset.isGoodDog)
  
  return btnBool ? "Good Dog!" :  "Bad Dog!"
}

function goodBoiDbUpdate(e) {
  e.preventDefault()
  //update goodDog status in the database
  let id = e.currentTarget.dataset.id
  let data = JSON.parse(e.currentTarget.dataset.isGoodDog)
  
  goodBoiDOMUpdate(e)
  
  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({isGoodDog: data})
    })
  .then(res => res.json())
  .then(json => console.log(json))
}

function goodBoiDOMUpdate(e){
  //update attributes in dog bar and dog info divs with new goodBoi status
  let btn = e.currentTarget
  let btnBool = JSON.parse(btn.dataset.isGoodDog)
  let dogBarId = document.querySelector(`.dog-${btn.dataset.id}`)

  dogBarId.dataset.goodBool = !btnBool
  btn.dataset.isGoodDog = !btnBool

  btn.innerText = goodDogBtn(btn)
}

function filterPups(e) {
  e.preventDefault()
  let dogInfo = document.querySelector("#dog-info")
  let filterBool = !(JSON.parse(e.target.dataset.active))
  e.target.dataset.active = filterBool
  
  if (filterBool) {
    document.querySelector("#good-dog-filter").innerText = "Filter good dogs: ON"
    document.querySelectorAll(".dogs").forEach((dog) => {
      let goodBool = JSON.parse(dog.dataset.goodBool)
      
      if (goodBool) {
    //render good dogs only when filterBool === true 
        dog.style.display = "flex"
        dogInfo.innerText = ''
        } else {
    //toggle element display off when isGoodBoy === false
          dog.style.display = "none"
        }
    })
  } else {
    //render all dogs when filterBool === false
      document.querySelector("#good-dog-filter").innerText = "Filter good dogs: OFF"
      document.querySelectorAll(".dogs").forEach((dog) => { dog.style.display = "flex" })
      dogInfo.innerText = ''
  }

}

