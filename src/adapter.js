// Get all doges
function getDoges() {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(data => createDoges(data))
}

// Edit isGoodDog for one doge
function updateDogeQuality(doge) {
  fetch(`http://localhost:3000/pups/${doge.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({isGoodDog: `${doge.isGoodDog}`})
  }).then(res => res.json())
}
