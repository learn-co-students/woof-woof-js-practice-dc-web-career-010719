let dogs = []

class Dog{

  constructor(obj){
    this.id = obj.id
    this.name = obj.name
    this.isGoodDog = obj.isGoodDog
    this.image = obj.image
    this.controller = new Controller()
    this.adapter = this.controller.adapter
    // this.controller = new Controller
    dogs.push(this)
  }

  renderDog(){
    console.log(`rendering ${this.name}`);

    //grab and create all the elements needed for dom manipulation
    let dogBar = document.getElementById('dog-bar')

    let span = document.createElement('span')
    span.innerText = this.name
    span.id = `dog-${this.id}-span`

    //add event listener
    span.addEventListener('click', ()=>{this.showMoreDogInfo()})

    //adding span to dog bar
    dogBar.appendChild(span)
    // debugger
  }

  showMoreDogInfo(){
    let dogInfo = document.getElementById('dog-info')
    dogInfo.innerText = ""

    let img = document.createElement('img')
    img.src = this.image
    img.id = `img-${this.id}`

    let h2 = document.createElement('h2')
    h2.innerText = this.name
    h2.id = `h2-${this.id}`

    let btn = document.createElement('button')
    btn.id = `goodBoybtn-${this.id}`

    if(this.isGoodDog){
      btn.innerText = "Is a Bad Dog!"
    }else{
      btn.innerText = "Is a Good Dog!"
    }

    btn.addEventListener('click', ()=>{this.goodOrBadDog()})

    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(btn)

  }

  goodOrBadDog(){
    let btn = document.getElementById(`goodBoybtn-${this.id}`)

    if(this.isGoodDog){
      this.isGoodDog = false
      btn.innerText = "Is a Good Dog!"
      this.controller.goodBoyFilter()
    }else{
      this.isGoodDog = true
      btn.innerText = "Is a Bad Dog!"
      this.controller.goodBoyFilter()
    }
    
    this.adapter.patchGoodBoy(this)
  }

}
