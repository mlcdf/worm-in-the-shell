(function ( $ ) {
    $.fn.typewrite = function ( options ) {
        var settings = {
            'selector': this,
            'extra_char': '',
            'delay':    42,
            'trim':     false,
            'callback': null
        };
        if (options) $.extend(settings, options);

        /* This extra closure makes it so each element
         * matched by the selector runs sequentially, instead
         * of all at the same time. */
        function type_next_element(index) {
            var current_element = $(settings.selector[index]);
            var final_text = current_element.text();
            if (settings.trim) final_text = $.trim(final_text);
            current_element.html('').show();

            function type_next_character(element, i) {
                element.html( final_text.substr(0, i)+settings.extra_char );
                if (final_text.length >= i) {
                    setTimeout(function() {
                        type_next_character(element, i+1);
                    }, settings.delay);
                }
                else {
                    if (++index < settings.selector.length) {
                        type_next_element(index);
                    }
                    else if (settings.callback) settings.callback();
                }
            }
            type_next_character(current_element, 0);
        }
        type_next_element(0);

        return this;
    };
})(jQuery);
