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
      <span class="yellow">? </span>What would you like to do?
    </li>
    <li class="actions actions-js">
      <ol>
      {{~ it.actions :action }}
        <li action="{{= action.id }}">
          {{= action.label }}
        </li>
      {{~}}
      </ol>
    </li>
    <li class="input">
      <span class="bold yellow">&#62 </span>
      <input class="input-js" type="text" autocomplete="off" name="user-choice" placeholder="Enter your choice here">
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
     * Initialize the shell
     */
    const init = () => {
      reset()

      $.get(opts.url + 'start')
        .then(data => {
          return hydrateView(data, sectionTemplate)
        }).done(() => {
          let $actions = $(this).find('.actions-js:last')
          let $input = $(this).find('input:last').focus()
          let action

          // Register event
          $(document).on('keypress', evt => {
            if (evt.which === 13) { // 13 => ENTER key
              action = $actions.find(`li:nth-child(${$input.val()})`).attr('action')

              // Retrieve data
              $.get(opts.url + action)
                .then(data => {
                  return hydrateView(data, sectionTemplate)
                }).done(() => {
                  // Update variables
                  $actions = $(this).find('.actions-js:last')
                  $input = $(this).find('input:last').focus()
                })
            }
          })
        })
    }

    init()
  }
})(jQuery)
