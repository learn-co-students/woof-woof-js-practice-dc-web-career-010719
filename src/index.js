document.addEventListener("DOMContentLoaded", ()=>{
let dogBar = document.querySelector("#dog-bar")
let filter = document.querySelector("#good-dog-filter")
filter.dataset.on = "false"
filter.addEventListener("click", toggleFilter)

function fetchDogsGeneral(){
  dogBar.innerHTML = ''
if (filter.dataset.on === "true"){
  fetchOnlyGoodDogs()
}else{
  fetchDogs()
}
}

fetchDogsGeneral()

function toggleFilter(e){
  if (e.target.dataset.on === "true"){
    e.target.dataset.on = 'false'
    e.target.innerHTML = "Filter good dogs: OFF"
  }else{
    e.target.dataset.on = 'true'
    e.target.innerHTML = "Filter good dogs: ON"
  }
  fetchDogsGeneral()
}



function fetchOnlyGoodDogs(){
fetch(`http://localhost:3000/pups?isGoodDog=true`)
.then(res => res.json())
.then(json => json.forEach(function(dog){addToDogBar(dog)}))}

function fetchDogs(){
  fetch(`http://localhost:3000/pups`)
  .then(res => res.json())
  .then(json => json.forEach(function(dog){addToDogBar(dog)}))
  }

function addToDogBar(dog){
let dogSpan = document.createElement("span")
  dogSpan.innerHTML = dog.name
  dogSpan.id = dog.id
  dogBar.appendChild(dogSpan)
  dogSpan.addEventListener("click", fetchDogInfo)
}

function fetchDogInfo(e){
fetch(`http://localhost:3000/pups/${e.target.id}`)
.then(res => res.json())
.then(dog => showDogInfo(dog))
}

let dogInfoDiv = document.querySelector("#dog-info")
let dogName
let dogImg
let dogButton

function showDogInfo(dog){
  dogInfoDiv.innerHTML = ''
  dogInfoDiv.dataset.isGoodDog = dog.isGoodDog
  dogName = document.createElement("h2")
  dogName.innerHTML = dog.name
  dogImg = document.createElement("img")
  dogImg.src = dog.image
  dogButton = document.createElement("button")

  if (dog.isGoodDog){
    dogButton.innerHTML = "Good Dog!"
  }else{
    dogButton.innerHTML = "Bad Dog!"
  }
  dogButton.id = dog.id
  dogButton.addEventListener("click", handleClick)

  dogInfoDiv.appendChild(dogName)
  dogInfoDiv.appendChild(dogImg)
  dogInfoDiv.appendChild(dogButton)

}
let body
function handleClick(e){
  if (e.target.innerHTML ==="Good Dog!"){
    e.target.innerHTML = "Bad Dog!"
    data = {isGoodDog : false}
  }else{
    e.target.innerHTML = "Good Dog!"
    data = {isGoodDog : true}
  }


  fetch(`http://localhost:3000/pups/${e.target.id}`,{
    method : "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    body: JSON.stringify(data)
  })

}

})
