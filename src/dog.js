class Dog {
    constructor(id, name, isGoodDog, image) {
        this.id = id
        this.name = name
        this.isGoodDog = isGoodDog
        this.image = image
        this.div = `<img src='${image}'>
        <h2>${name}</h2>`
        Dog.all.push(this)
    }
    
    logTheDog() {
        console.log(this)
    }
    
    newDogSpan() {
        let ds = document.createElement('span')
        ds.innerHTML = this.name
        ds.id = `dog-${this.id}`
        ds.addEventListener('click', this.pupPage)
        return ds
    }

    findDogSpan() {
        return document.getElementById(`dog-${this.id}`)
    }

    pupToggler(){
        let toggler = document.createElement('button')
        if (this.isGoodDog === true) {
            toggler.innerHTML = 'Bad Dog!'
            toggler.addEventListener('click', () => {this.changeto(false)}, {once: true})
        } else {
            toggler.innerHTML = 'Good Dog!'
            toggler.addEventListener('click', () => { this.changeto(true) }, { once: true })
        }
        return toggler
    }

    changeto(input) {
        fetch(Dog.api + `/${this.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                'isGoodDog': input
            })
        })
        this.isGoodDog = input
        this.pupPage()
    }

    pupPage = ()  => {
        let dogDiv = document.getElementById('dog-info')
        dogDiv.innerHTML = this.div
        dogDiv.appendChild(this.pupToggler())
    }


    static fetchDogs() {
        Dog.all = []
        fetch(Dog.api)
        .then(resp => resp.json())
        .then(jsonDogulo => {
            jsonDogulo.forEach( pup => {new Dog(pup.id, pup.name, pup.isGoodDog, pup.image)} )
            Dog.addDogsToDogBar()
        })
    }

    static addDogsToDogBar() {
        const dogBar = document.getElementById('dog-bar')
        dogBar.innerHTML = ''
        Dog.all.forEach(pup => {
            dogBar.appendChild(pup.newDogSpan())
        })
    }

    static onlyGoodDogs() {
        let badDogs = Dog.all.filter(pup => pup.isGoodDog === false)
        const dogBar = document.getElementById('dog-bar')
        badDogs.forEach(pup => {
            dogBar.removeChild(pup.findDogSpan())
        })
    }

}

Dog.all = []
Dog.api = 'http://localhost:3000/pups'