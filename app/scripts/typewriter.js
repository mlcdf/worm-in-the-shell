(function ($) {
  $.fn.typewrite = function (options) {
    const settings = {
      selector: this,
      extraChar: '',
      delay: 42,
      trim: false,
      callback: null
    }
    if (options) {
      $.extend(settings, options)
    }

        /* This extra closure makes it so each element
         * matched by the selector runs sequentially, instead
         * of all at the same time. */
    function typeNextElement(index) {
      const currentElement = $(settings.selector[index])
      let finalText = currentElement.text()
      if (settings.trim) {
        finalText = $.trim(finalText)
      }
      currentElement.html('').show()

      function typeNextCharacter(element, i) {
        element.html(finalText.substr(0, i) + settings.extraChar)
        if (finalText.length >= i) {
          setTimeout(() => {
            typeNextCharacter(element, i + 1)
          }, settings.delay)
        } else if (++index < settings.selector.length) {
          typeNextElement(index)
        } else if (settings.callback) {
          settings.callback()
        }
      }
      typeNextCharacter(currentElement, 0)
    }
    typeNextElement(0)

    return this
  }
})(jQuery)
