(function ($) {
  /**
   * Shell
   * Create a pseudo shell
   * @param {Object} options - A set of options which will erase the default ones.
   */
  $.fn.shell = function (options) {
    const shellListView = $(this).find('ul')
    const defaults = {
      url: 'http://localhost:3000/?section='
    }
    const opts = $.extend({}, defaults, options)

    const sectionTemplate = doT.template(`<li>&nbsp;
    </li>
    {{? it.actions.length > 0}}
    <li class="bold">
      <span class="blue">? </span>What would you like to do?
    </li>
    <li class="actions actions-js">
      <ol>
      {{~ it.actions :action:index }}
        <li action="{{= action.id }}"> <span class="silver">(</span>{{= index + 1 }}<span class="silver">)</span>
          {{= action.label }}
        </li>
      {{~}}
      </ol>
    </li>
    <li class="input-row">
      <span class="bold pink">&#62 </span>
      <input class="input-js" type="text" autocomplete="off" name="user-choice" placeholder="n°">
      <span class="info-js"></span>
    </li>
    {{?}}`)

    /**
     * Reset the shell
     */
    const reset = () => {
      shellListView.empty()
    }

    /**
     * Update the scroll
     */
    const updateScroll = () => {
      const element = shellListView
      element.scrollTop(element.prop('scrollHeight'))
    }

    /**
     * Update the shell with new elements
     * @param {Object} data
     * @param {Any} template
     */
    const hydrateView = (data, template) => {
      const deferred = $.Deferred()
      let delay = 0

      $.each(data.texts, (index, text) => {
        setTimeout(() => {
          $(`<li>${text}</li>`).appendTo(shellListView)
          updateScroll()
        }, delay += 600)
      })

      setTimeout(() => {
        $(template(data)).appendTo(shellListView)
        updateScroll()
      }, delay += 600)

      setTimeout(() => {
        deferred.resolve()
      }, delay)

      return deferred.promise()
    }

    /**
     * Update the view the new input state
     * @param {bool} isValid
     * @param {jQuery Collection} $input
     * @param {jQuery Collection} $info
     */
    const updateInputState = (isValid, $input, $info) => {
      if (isValid) {
        $info.addClass('blue')
        $info.removeClass('pink')
        $info.text('✔')
        $input.prop('disabled', true)
      } else {
        $info.addClass('pink')
        $info.removeClass('blue')
        $info.text('✖')
      }
    }

    /**
     * Initialize the shell
     */
    const init = () => {
      reset()

      const gameManager = GameManager()

      $.get(opts.url + 'start')
        .then(data => {
          return hydrateView(data, sectionTemplate)
        }).done(() => {
          let $actions = shellListView.find('.actions-js')
          let $input = shellListView.find('.input-js').focus()
          let $info = shellListView.find('.info-js')
          let action

          // Register event
          $(document).on('keypress', evt => {
            if (evt.which === 13) { // 13 => ENTER key
              // If input is not valid
              if (isNaN($input.val()) || $input.val() < 1 || $input.val() > $actions.find('li[action]').length) {
                updateInputState(false, $input, $info)
                return
              }
              updateInputState(true, $input, $info)
              action = $actions.find(`li:nth-child(${$input.val()})`).attr('action')

              // Retrieve data
              $.get(opts.url + action)
                .then(data => {
                  if (data.wormProgress) {
                    gameManager.wormProgress()
                  }

                  if (gameManager.wormHasWon()) {
                    $.get(opts.url + 'game-over').done(data => {
                      hydrateView(data, sectionTemplate)
                    })
                    return
                  }

                  return hydrateView(data, sectionTemplate)
                }).done(() => {
                  // Update variables
                  $actions = shellListView.find('.actions-js:last')
                  $input = shellListView.find('.input-js:last').focus()
                  $info = shellListView.find('.info-js:last')
                })
            }
          })
        })
    }

    init()
  }
})(jQuery)
