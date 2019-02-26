class Adapter{
    constructor(url){
      this.baseURL = url
    }

    getAllDogsJSON(){
      return fetch(this.baseURL)
              .then(res => res.json())
    }

    patchGoodBoy(dog){
      // debugger
      fetch(`${this.baseURL}/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dog)
      })
      .then(res => res.json())
      .then(json => console.log(json))
    }


}
