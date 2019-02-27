let allDogs = []

document.addEventListener('DOMContentLoaded',()=>{
  fetchDogs()
  filterDogs()

})

function dogsUrl(){
  return url = `http://localhost:3000/pups`
}

function dogUrl(id){
  return url = `http://localhost:3000/pups/${id}`
}

function fetchDogs(){

  fetch(dogsUrl())
  .then(res => res.json())
  .then(json => json.forEach(pushDogs))
}

function goodBad(dog){
  dog.isGoodDog = !dog.isGoodDog
  let data = {}
  data.isGoodDog = dog.isGoodDog
  fetch(dogUrl(dog.id),{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(dog => dogInfo(dog))
  goodDogs()
}

function pushDogs(dog){
  allDogs.push(dog)
  renderDog(dog)
}

function renderDog(dog){

  let dogBar = document.getElementById(`dog-bar`)
  let span = document.createElement('span')
  // debugger
  span.id = dog.id
  span.innerText = `${dog.name}`
  dogBar.appendChild(span)
  span.addEventListener('click',()=>{dogInfo(dog)})
  filterDogs()
}

function dogInfo(dog){
  let dogInfoTag = document.getElementById(`dog-info`)
  dogInfoTag.innerText = ''
  let dogImg = document.createElement("IMG")
  let dogName = document.createElement(`h2`)
  let dogButton = document.createElement(`button`)
  dogName.innerText = `${dog.name}`
  dogImg.id = `dog-${dog.id}`
  dogImg.src = `${dog.image}`
  if (dog.isGoodDog){
    dogButton.innerText = `"Good Dog!""`
  } else {dogButton.innerText = `"Bad Dog!"`}
  dogButton.addEventListener(`click`,()=>{goodBad(dog)} )
  dogInfoTag.append(dogImg, dogName, dogButton)
}

function filterDogs(){
  let filterButton = document.getElementById(`good-dog-filter`)
  filterButton.addEventListener('click', goodDogs)
}

function goodDogs(){
  let dogBar = document.getElementById(`dog-bar`)
    dogBar.innerText = ''
  let span = document.createElement('span')
  let filterButton = document.getElementById(`good-dog-filter`)
  if (filterButton.innerText === 'Filter good dogs: OFF'){
    filterButton.innerText = 'Filter good dogs: ON'
    let goodDogsArry = allDogs.filter((dog)=> dog.isGoodDog === true)
    goodDogsArry.forEach(dog=> renderDog(dog))
  } else if( filterButton.innerText === 'Filter good dogs: ON'){
     allDogs.forEach(dog=> renderDog(dog))
    filterButton.innerText = 'Filter good dogs: OFF'
  }
}
