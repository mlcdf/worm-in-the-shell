/**
 * God Mode
 * Listen to keys pressed by the user and return a promise when a given code is typed.
 * @returns {jQuery Promise}
 */
(function ($) {
  $.fn.godmode = function (options) {
    const deferred = $.Deferred()
    const defaults = {
      code: [47, 103, 111, 100, 109, 111, 100, 101]
    }
    const opts = $.extend({}, defaults, options)
    const keysPressed = []

    $(this).keypress(evt => {
      const key = evt.keyCode || String.fromCharCode(evt.which)
      keysPressed.push(key)

      if (keysPressed.length > opts.code.length) {
        keysPressed.shift()
      }

      if (isEquals(opts.code, keysPressed)) {
        deferred.resolve()
      }
    })
    return deferred.promise()
  }
})(jQuery)

// Helpers

function isEquals(a, b) {
  if (a === b) {
    return true
  }
  if (a === null || b === null) {
    return false
  }
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}
