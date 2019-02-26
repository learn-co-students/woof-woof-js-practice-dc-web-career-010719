function createDoge() {
  const allDoges = []

                       // Construct class //

  return class {
    constructor(data) {
      this.name = data.name
      this.id = data.id
      this.isGoodDog = JSON.parse(data.isGoodDog)
      this.image = data.image
      allDoges.push(this)
    }

                         // Instance methods //

    // Create individual dog span in DogBar
    formatSpan() {
      let span = document.createElement('span')
      span.id = `span${this.id}`

      let p = document.createElement('p')
      p.id = `name${this.id}`
      p.innerText = this.name

      span.appendChild(p)
      dogBar().appendChild(span)
    }

    // Display individual dog's info in bottom section
    displayInfo() {
      clear(dogInfo())

      let image = document.createElement('img')
      image.src = this.image

      let h2 = document.createElement('h2')
      h2.innerText = this.name

      let button = document.createElement('button')
      button.innerText = this.buttonText()
      button.id = `toggle${this.id}`
      
      dogInfo().appendChild(image)
      dogInfo().appendChild(h2)
      dogInfo().appendChild(button)
    }

    // Toggle isGoodDog
    toggleQuality() {
      this.isGoodDog = !this.isGoodDog
    }

                         // Class methods //

    // Return/display all dogs
    static all() {
      return allDoges
    }

    static displayAll() {
      goodDogFilter().className = "inactive"
      clear(dogBar())
      this.all().forEach(doge => doge.formatSpan())
    }

    // Return/display only good dogs
    static good() {
      return this.all().filter(doge => doge.isGoodDog)
    }

    static displayGood() {
      goodDogFilter().className = "active"
      clear(dogBar())
      this.good().forEach(doge => doge.formatSpan())
    }

                         // Helper methods //

    buttonText() {
      return (this.isGoodDog ? "Good Dog!" : "Bad Dog!")
    }

  }
}

const Doge = createDoge()
