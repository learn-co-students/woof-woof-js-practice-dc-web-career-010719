class Controller {
  static init() {
    Controller.getPups().then(Controller.renderPup)
  }

  static getPups() {
    return Adapter.fetchPups().then(pups => {
      return pups.map(pup => new Pup(pup))
    })
  }

  static getPup(id) {
    return Adapter.fetchPup(id)
      .then(pup => new Pup(pup))
  }

  static renderPups(pups) {
    const bar = document.querySelector('#dog-bar')
    pups.forEach(pup => {
      bar.appendChild(pup.barElement())
    })
  }

  static renderPup(pup) {
  }

  static handleBarClick(e) {
  }
}