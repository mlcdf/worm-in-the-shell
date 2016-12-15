const actionButtons = $('button[go]')
const sections = $('.section')

let currentSection = sections.first()

// Hide all the section except the first one
sections.slice(1).hide()

actionButtons.each(function () {
  // btn stores the current button
  const btn = $(this)

  btn.click(() => {
    currentSection.hide()

    // Show the section pointed by the button attribut 'go'
    currentSection = $('#' + btn.attr('go'))
    currentSection.show()
  })
})
