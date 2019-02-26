document.addEventListener("DOMContentLoaded", () => {
  getDoges()
  goodDogFilter().addEventListener('click', filterDogeQuality)
  dogBar().addEventListener('click', filterDogeInfo)
  dogInfo().addEventListener('click', toggleDogeQuality)
})
