/**
 * Shell
 * Create a pseudo shell
 */
(function ($) {
  $.fn.shell = function (options) {
    const defaults = {
      url: 'http://localhost:3000/?section='
    }
    const opts = $.extend({}, defaults, options)

    const sectionTemplate = doT.template(`<li>&nbsp;
    </li>
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
    <li class="input">
      <span class="bold pink">&#62 </span>
      <input class="input-js" type="text" autocomplete="off" name="user-choice" placeholder="n°">
      <span class="info"></span>
    </li>`)

    /**
     * Reset the shell
     */
    const reset = () => {
      $(this).find('ul').empty()
    }

    /**
     * Update the scroll
     */
    const updateScroll = () => {
      const element = $(this).find('ul')
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
          $(`<li>${text}</li>`).appendTo($(this).find('ul'))
          updateScroll()
        }, delay += 300)
      })

      setTimeout(() => {
        $(template(data)).appendTo($(this).find('ul'))
        updateScroll()
      }, delay += 300)

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
        return true
      }

      $info.addClass('pink')
      $info.removeClass('blue')
      $info.text('✖')
      return false
    }

    /**
     * Initialize the shell
     */
    const init = () => {
      reset()

      $.get(opts.url + 'start')
        .then(data => {
          return hydrateView(data, sectionTemplate)
        }).done(() => {
          let $actions = $(this).find('.actions-js')
          let $input = $(this).find('input').focus()
          let $info = $(this).find('.info')
          let action

          // Register event
          $(document).on('keypress', evt => {
            if (evt.which === 13) { // 13 => ENTER key
              if ($input.val() < 1 || $input.val() > $actions.find('li[action]').length) {
                updateInputState(false, $input, $info)
                return
              }
              updateInputState(true, $input, $info)
              action = $actions.find(`li:nth-child(${$input.val()})`).attr('action')

              // Retrieve data
              $.get(opts.url + action)
                .then(data => {
                  return hydrateView(data, sectionTemplate)
                }).done(() => {
                  // Update variables
                  $actions = $(this).find('.actions-js:last')
                  $input = $(this).find('input:last').focus()
                  $info = $(this).find('.info:last')
                })
            }
          })
        })
    }

    init()
  }
})(jQuery)
