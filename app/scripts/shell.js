/**
 * Shell
 * Create a pseudo shell
 */
(function ($) {
  $.fn.shell = function (options) {
    let idCount
    let $form

    const defaults = {
      url: 'http://localhost:3000/?section='
    }
    const opts = $.extend({}, defaults, options)

    const formTemplate = doT.template(`<li>&nbsp;
    </li>
      <li>
        <span class="yellow">?</span> WHAT SHOULD I DO? <span class="grey">(</span>&uarr;&darr; <span class="grey">+</span> ENTER<span class="grey">)</span>
      </li>
      <li>
        <form action="">
          {{~ it.inputs :input:index }}
          <div>
            <input type="radio" id="radio{{=index+it.index}}" name="action" value="{{=input.value}}" checked="checked">
            <label for="radio{{=index+it.index}}">{{=input.label}}</label>
          </div>
          {{~}}
        </form>
    </li>`)

    const reset = () => {
      $(this).find('ul').empty()
    }

    const updateScroll = () => {
      const element = $(this).find('ul')
      element.scrollTop(element.prop('scrollHeight'))
    }

    const hydrateView = (data, template) => {
      const deferred = $.Deferred()
      // console.log(data.paragraphs.length)
      idCount += data.paragraphs.length
      data.index = idCount

      let delay = 0

      $.each(data.paragraphs, (index, paragraph) => {
        setTimeout(() => {
          $(`<li>${paragraph}</li>`).appendTo($(this).find('ul'))
          updateScroll()
        }, delay += 300)
      })

      setTimeout(() => {
        $(template(data)).appendTo($(this).find('ul'))
        updateScroll()
        $(this).off()
        $(this).find('form').last().find('input').focus()
        $(this).on('click', () => {
          $(this).find('form').last().find('input').focus()
        })
      }, delay += 300)

      setTimeout(() => {
        deferred.resolve()
      }, delay)
      return deferred.promise()
    }

    const init = () => {
      reset()

      $.get(opts.url + 'start')
        .then(data => {
          return hydrateView(data, formTemplate)
        }).done(() => {
          $form = $(this).find('form')
          $form.find('input').focus()

          $(this).on('click', () => {
            $form.find('input:checked + label').focus()
          })

          $(document).keypress(evt => {
            // Submit the user choice
            if (evt.which === 13) { // 13 => ENTER keypress
              $form.submit()
              console.log('test')
            }
          })

          $form.on('submit', evt => {
            console.log('ENTER')
            evt.preventDefault()
            const val = $form.find('input:checked').val()

            // retrive data
            $.get(opts.url + val).done(data => {
              hydrateView(data, formTemplate)
            })
          })
        })
    }

    init()
  }
})(jQuery)
