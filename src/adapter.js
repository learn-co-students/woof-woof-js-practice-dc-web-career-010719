class Adapter {
  static fetchPups() {
    return fetch(Adapter.api)
      .then(res => res.json())
  }

  static fetchPup(id) {
    return fetch(`${Adapter.api}/${id}`)
      .then(res => res.json())
  }
}

Adapter.api = 'http://localhost:3000/'