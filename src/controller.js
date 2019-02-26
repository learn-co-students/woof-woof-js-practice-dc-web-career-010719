class Controller{

  constructor(){
    this.adapter = new Adapter('http://localhost:3000/pups')
  }

  startUp(){
    console.log("Booting up");
    let goodBoybtn = document.getElementById('good-dog-filter')

    //uses the adaper to get all the dogs then pass them into render dogs
    this.adapter.getAllDogsJSON().then(json => this.createDogsArray(json))
                                 .then(()=> this.renderDogs(dogs))

    //add goodboy filter logic
    goodBoybtn.addEventListener('click', ()=> this.setgoodBoyFilter())

  }

  createDogsArray(json){
    json.map((dog)=>{return new Dog(dog)})
  }

  renderDogs(dogs){
    document.getElementById('dog-bar').innerText = ""
    dogs.forEach((dog)=>{dog.renderDog()})
  }

  setgoodBoyFilter(){
    let goodBoy = document.getElementById('good-dog-filter')
    let goodBoyVal = goodBoy.innerText.split(": ")[1]

    if(goodBoyVal === "OFF"){
      goodBoy.innerText = "Filter good dogs: ON"
    }else if (goodBoyVal === "ON") {
      goodBoy.innerText = "Filter good dogs: OFF"
    }
    this.goodBoyFilter()
  }

  goodBoyFilter(){
    let goodBoy = document.getElementById('good-dog-filter')
    let goodBoyVal = goodBoy.innerText.split(": ")[1]

    if(goodBoyVal === "OFF"){
      this.renderDogs(dogs)
    }else if (goodBoyVal === "ON") {
      let newDogArray = dogs.filter(dog => dog.isGoodDog)
      this.renderDogs(newDogArray)
    }

  }






}
