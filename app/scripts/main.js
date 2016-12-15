const actionButtons = $('button[go]')
const sections = $('.section')

const lives = {
  initial:  3,
  current: 3
}

$('.life span.value').html(lives.current)

let currentSection = sections.first()

// Hide all the section except the first one
sections.slice(1).hide()

actionButtons.each(function () {
  // btn stores the current button
  const btn = $(this)

  btn.click(() => {
    goToSection($('#' + btn.attr('go')))

    if (currentSection.find('action[name="hit"]').length > 0) {
      lives.current--
      $('.life span.value').html(lives.current)
    }

    if (lives.current === 0) {
      goToSection($('#death'))
      $('#death > button[go="intro"]').click(() => {
        lives.current = lives.initial
        goToSection($('#intro'))
      })
    }
  })
})

function goToSection(section) {
  currentSection.hide()
  currentSection = section
  currentSection.show()
  return currentSection
}
