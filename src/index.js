document.addEventListener("DOMContentLoaded",function (){
fetchDogs()
})

function fetchDogs() {
fetch(`http://localhost:3000/pups/`)
.then(response => response.json())
.then(dogsData => dogsData.forEach(dog => renderDog(dog)))
}

function renderDog(dog){
  console.log(`inside`);
  let dogSpan = document.createElement('span')
  dogSpan.innerHTML = `${dog.name}`
  dogSpan.id = dog.id
  document.querySelector('#dog-bar').appendChild(dogSpan)
  dogSpan.addEventListener('click', () => {
    showDogInfo(dog);
  })
}

function showDogInfo(dog){
  let dogCard = document.createElement('div')
  let dogName = document.createElement('h2')
  dogName.innerHTML = dog.name
  let dogImage = document.createElement('img')
  dogImage.src = dog.image
  let dogBttn = document.createElement('button')
  if (dog.isGoodDog){
  dogBttn.innerHTML = 'Good boi!'
} else {
  dogBttn.innerHTML = 'Bad boi!'
}
  dogCard.append(dogName, dogImage, dogBttn)
  let dogInfo = document.querySelector('#dog-info').append(dogCard)
  dogBttn.addEventListener('click', () => patchDog(dog))
}

function patchDog(dog) {
data = {
  id: dog.id,
  name: dog.name,
  image: dog.image,
  isGoodDog: !dog.isGoodDog
}
debugger
fetch(`http://localhost:3000/pups/${dog.id}`,{
  method: 'PATCH',
  headers: {'Content-Type': 'application/json'},
  body:JSON.stringify(data),
})
.then(response => response.json())
.then(jSon => renderDog(jSon))
}
