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

  return {
    updateLives,
    goToSection,
    player
  }
}

let gameController = GameController()

let currentSection = sections.first()

// Hide all the section except the first one
sections.slice(1).hide()

actionButtons.each(function () {
  // btn stores the current button
  const btn = $(this)

  btn.click(() => {
    gameController.goToSection($('#' + btn.attr('go')))

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
