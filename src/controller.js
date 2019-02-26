                         // Retrieve page elements //

function dogBar() {
  return document.querySelector('#dog-bar')
}

function dogInfo() {
  return document.querySelector('#dog-info')
}

function goodDogFilter() {
  return document.querySelector('#good-dog-filter')
}

                         // Helper methods //

function clear(area) {
  while (area.firstChild) {
    area.removeChild(area.firstChild)
  }
}

                         // Primary functions //

// Create doges from fetch
function createDoges(dogeData) {
  for (const key in dogeData) {
    new Doge(dogeData[key])
  }
  Doge.displayAll()
}

// Respond to span click -- show info for one dog
function filterDogeInfo(e) {
  if (e.target && (e.target.nodeName === 'SPAN' || e.target.nodeName === 'P')) {
    Doge.all().find(doge => doge.id == e.target.id.slice(4)).displayInfo()
  }
}

// Respond to good/bad dog button
function toggleDogeQuality(e) {
  if (e.target && e.target.nodeName === 'BUTTON') {
    let d = Doge.all().find(doge => doge.id == e.target.id.slice(6))
    d.toggleQuality()
    d.displayInfo()
    updateDogeQuality(d)
  }
}

// Respond to filter toggle
function filterDogeQuality(e) {
  if (e.target.className == "inactive") {
    Doge.displayGood()
  } else {
    Doge.displayAll()
  }
}
