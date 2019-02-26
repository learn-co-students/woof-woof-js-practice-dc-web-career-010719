document.addEventListener("DOMContentLoaded", init)

function init() {
    Dog.fetchDogs()
    document.getElementById('good-dog-filter').addEventListener('click', handleFilter)
}

function handleFilter() {
    if (this.innerText === 'Filter good dogs: OFF') {
        Dog.onlyGoodDogs()
        this.innerText = 'Filter good dogs: ON'
    } else {
        Dog.addDogsToDogBar()
        this.innerText = 'Filter good dogs: OFF'
    }
}

// function addDogsToDogBar() {
//     const dogBar = document.getElementById('dog-bar')
//     Dog.all.forEach(pup => {
//         dogBar.appendChild(pup.dogSpan())
//     })
// }

