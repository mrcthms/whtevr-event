(function (root, factory) {
  if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(root.$);
  }
}(this, function ($) {

  var $window = $(window);

  $('[type="text/x-whtevr-evt"], .js-whtevr-evt').each(function () {
    var $this = $(this);
    var $newElement = $('<div />')
      .hide();
    $newElement.insertAfter($this);
    var evt = !$this.data('evt') ? 'click' : $this.data('evt');

    if (!$this.data('selector')) {
      return;
    }

    function triggerFinished($data) {
      $this
        .trigger('whtevr-evt-loaded', [ $data ])
        .remove();
      $data.children().unwrap();
    }

    function loadNow() {
      var isNoscript = ($this.prop('tagName') === 'NOSCRIPT');
      var $content = isNoscript ? $this.text() : $this.html();
      $newElement.html($.parseHTML($content));
      var $images = $newElement.find('img');
      var imageTicker = 0;
      var imageCount = $images.length;
      if (imageCount > 0) {
        $images.load(function () {
          ++imageTicker;
          if (imageCount === imageTicker) {
            triggerFinished($newElement);
          }
        });
      } else {
        triggerFinished($newElement);
      }
    }

    $(document).on(evt, $this.data('selector'), loadNow);

  });
}));