/* global arraysEqual */

const $form = $('form')
const $shell = $('.shell')

$form.on('submit', evt => {
  evt.preventDefault()
  const val = $form.find('input:checked').val()
  console.log(val)
})

$shell.on('click', () => {
  $form.find('input:checked + label').focus()
})

$form.find('input:first').focus()

const keysPressed = []
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 'a', 'b']

// Fire events on keyPressed
$(document).keypress(evt => {
  // Submit the user choice
  if (evt.which === 13) {
    $form.submit()
  }

  // Handle Komani Code
  const key = evt.keyCode || String.fromCharCode(evt.which)
  keysPressed.push(key)

  if (keysPressed.length > 10) {
    keysPressed.shift()
  }

  if (arraysEqual(keysPressed, konamiCode)) {
    // TODO: do something
  }
})
