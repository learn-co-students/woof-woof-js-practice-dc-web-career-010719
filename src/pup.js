class Pup {
  constructor({id, name, isGoodDog, image}) {
    this.id = id
    this.name = name
    this.breed = breed
    this.isGoodDog = isGoodDog
    this.image = image
  }

  barElement() {
    const elem = document.createElement('span')
    elem.innerText = this.name
    elem.dataset.id = this.id
    elem.addEventListener('click', Controller.handleItemClick)
    return elem
  }
}