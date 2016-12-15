const actionButtons = $('button[go]')
const sections = $('.section')

// Hide all the section exect the first one.
sections.slice(1).hide()

actionButtons.each(function () {
  // btn stores the current button
  const btn = $(this)

  // When a button is clicked, do
  $(this).click(() => {

    // Hide the current section
    $(this).parents('.section').hide()

    // Show the section pointed by the button attribut 'go'
    $('#' + btn.attr('go')).show()
  })
})
