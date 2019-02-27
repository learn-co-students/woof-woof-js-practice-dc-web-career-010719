document.addEventListener('DOMContentLoaded', () => {
  fetchAllDogs();
});

function dogUrl() {
  return 'http://localhost:3000/pups/';
}

//fetch all dogs
function fetchAllDogs() {
  fetch(dogUrl())
    .then(res => res.json())
    .then(data => data.forEach(dog => renderDogButton(dog)));
}

//create dog(span) button
function renderDogButton(dog) {
  let dogBar = document.querySelector('#dog-bar');
  let dogButton = document.createElement('span');
  dogButton.dataset.dogId = dog.id;

  dogButton.innerText = dog.name;
  dogButton.addEventListener('click', e => {
    showMoreInfo(dog);
  });

  dogBar.appendChild(dogButton);
}

//add eventListener to dog span

//add more infotmation about each dog
function showMoreInfo(dog) {
  let dogDiv = document.getElementById('dog-info');
  let dogCard = document.createElement('div');

  dogDiv.innerHTML = '';
  let dogImage = document.createElement('img');
  dogImage.src = dog.image;

  let dogTitle = document.createElement('h2');
  dogTitle.innerHTML = dog.name;

  let goodDogButton = document.createElement('button');
  goodDogButton.innerText = dog.isGoodDog ? 'Good Dog' : 'Bad Dog';

  goodDogButton.addEventListener('click', () => {
    goodDogBadDog(dog);
  });

  dogCard.append(dogImage, dogTitle, goodDogButton);
  dogDiv.appendChild(dogCard);
}

function goodDogBadDog(dog) {
  let status = !dog.isGoodDog;

  data = { isGoodDog: status };

  fetch(dogUrl() + dog.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => showMoreInfo(json));
}
