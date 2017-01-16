/* global arraysEqual */

/**
 * Initialize a shell
 */
const shell = () => {
  const $shell = $('.shell')
  const $form = $shell.find('form')

  $form.find('input').focus()

  $shell.on('click', () => {
    $form.find('input:checked + label').focus()
  })

  const keysPressed = []
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 'a', 'b']

  // Fire events on keyPressed
  $(document).keypress(evt => {
    // Submit the user choice
    if (evt.which === 13) { // 13 => ENTER key
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

  const sectionTemplate = doT.template(`<li>
    <div>{{= it.text }}</div>
    <div>? Next move? <span class="grey">(</span>&uarr;&darr; <span class="grey">+</span> ENTER<span class="grey">)</span></div>
    <form action="">
      {{~ it.inputs :input:index }}
      <div>
        <input type="radio" id="radio{{=index+it.index}}" name="action" value="{{=input.value}}" checked="checked">
        <label for="radio{{=index+it.index}}">{{=input.label}}</label>
      </div>
      {{~}}
    </form>
  </li>`)

  function updateScroll() {
    const element = $shell.find('ul')
    element.scrollTop(element.prop('scrollHeight'))
  }

  let idCounter = 3

  // Core
  $form.on('submit', evt => {
    evt.preventDefault()
    const val = $form.find('input:checked').val()
    $.getJSON('http://0.0.0.0:3000/?section=' + val).done(data => {
      idCounter += 2
      data.index = idCounter
      const $section = $(sectionTemplate(data))
      $section.appendTo($shell.find('ul')).focus()
      updateScroll()
      $shell.off()
      $shell.find('form:last-child').focus()
      $shell.on('click', () => {
        $shell.find('form:last-child').focus()
      })
    })
  })
}

shell()
