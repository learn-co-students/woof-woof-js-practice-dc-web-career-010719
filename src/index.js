document.addEventListener("DOMContentLoaded", ()=>{


fetchDogs()
})

function fetchDogs(){
  fetch(`http://localhost:3000/pups`)
  .then(res => res.json())
  .then(json => json.forEach(dog => renderDog(dog)))
}

function renderDog(dog){
  let dogBar = document.querySelector("#dog-bar")
  let span = document.createElement("span")
  span.innerHTML = dog.name
  span.addEventListener("click", (e) => showDog(e, dog))
  dogBar.appendChild(span)
}

function showDog(e, dog){
  let dogDiv = document.querySelector("#dog-info")
  dogDiv.innerHTML = ''
   let name = document.createElement("h2")
   name.innerHTML = dog.name
   let image = document.createElement("img")
   image.src = dog.image

   let isGoodDog = document.createElement("button")
   if (dog.isGoodDog) {isGoodDog.innerHTML = "Good Dog!"}
   else {isGoodDog.innerHTML = "Bad Dog!"}
   isGoodDog.addEventListener("click", (e)=> toggleButton(e, dog))

   dogDiv.append(name, image, isGoodDog)
}

function toggleButton(e, dog){
let data
  if (e.target.innerHTML == "Good Dog!") {
    e.target.innerHTML = "Bad Dog!"
    data = {isGoodDog: false }
  }
  else {e.target.innerHTML = "Good Dog!";
  data = {isGoodDog: true} }



  fetch(`http://localhost:3000/pups/${dog.id}`,{
    method: "PATCH",
    headers: {"Content-Type": "application/json",
              "Accept": "application/json"},
    body: JSON.stringify(data)
    })

}
