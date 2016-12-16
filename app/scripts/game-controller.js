const actionButtons = $('button[go]')
const sections = $('.section')

/**
 * Represent the game controller
 * @constructor
 * @param {name} name
 */
const GameController = () => {
  const player = Player('Tom')

  const updateLives = function () {
    $('.life span.value').html(player.life())
  }

  updateLives()

  const goToSection = (section) => {
    currentSection.hide()
    currentSection = section
    currentSection.show()
    return currentSection
  }

  const displaySection = () => {
    currentSection.find('p').hide()
    currentSection.find('button').hide()
    currentSection.find('h2').typewrite({
      callback: function () {
        currentSection.find('p').typewrite({
          callback: function () {
            currentSection.find('button').show()
          }
        })
      }
    })
  }

  return {
    updateLives,
    goToSection,
    player,
    displaySection
  }
}

let gameController = GameController()

let currentSection = sections.first()

gameController.displaySection()

// Hide all the section except the first one
sections.slice(1).hide()

actionButtons.each(function () {
  // btn stores the current button
  const btn = $(this)

  btn.click(() => {
    gameController.goToSection($('#' + btn.attr('go')))
    gameController.displaySection()

    if (currentSection.find('action[name="hit"]').length > 0) {
      gameController.player.loseLife()
      gameController.updateLives()
    }

    if (gameController.player.life() === 0) {
      gameController.goToSection($('#death'))
      $('#death > button[go="intro"]').click(() => {
        gameController = GameController()
        gameController.goToSection($('#intro'))
      })
    }
  })
})

const keysPressed = new Array()
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 'a', 'b']

$(document).keypress(function(evt) {
  const key = evt.keyCode || String.fromCharCode(evt.which)
  keysPressed.push(key)

  if (keysPressed.length > 10) {
    keysPressed.shift()
  }

  if (arraysEqual(keysPressed, konamiCode)) {
    gameController.goToSection($('#death'))
  }
})
