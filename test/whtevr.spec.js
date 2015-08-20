/* global $ */
'use strict';

describe('whtevr', function () {
  after(function () {
    $(window).scrollTop(0);
    $('.deletewhendone').remove();
  });

  describe('init', function () {
    it('should not show anything initially', function () {
      $('.whtevr-evt__content').length.should.equal(0);
    });
  });


  describe('lazy load on event', function () {

    var eventFired = {
      script: false,
      noScript: false
    };
    var $element = {
      script: null,
      noScript: null
    };

    before(function () {
      $('[type="text/x-whtevr-evt"]').on('whtevr-evt-loaded', function (e, $el) {
        eventFired.script = true;
        $element.script = $el;
      });
      $('.js-whtevr-evt').on('whtevr-evt-loaded', function (e, $el) {
        eventFired.noScript = true;
        $element.noScript = $el;
      });
    });

    it('should show correct click and selector', function (done) {
      $('.button--1').trigger('click');
      setTimeout(function () {
        if ($('#test').length === 1) {
          done();
        }
      });
    });

    it('should default to click if no data-evt present', function (done) {
      $('.button--3').trigger('click');
      setTimeout(function () {
        if ($('#test3').length === 1) {
          done();
        }
      });
    });

    it('should not fire if no data-selector present', function (done) {
      $('.button--4').trigger('click');
      setTimeout(function () {
        if ($('#test4').length === 0) {
          done();
        }
      });
    });

    it('should show if using noscript', function (done) {
      $('.button--5').trigger('click');
      setTimeout(function () {
        if ($('#test5').length === 1) {
          done();
        }

      });
    });

    it('should have fired an event', function () {
      eventFired.script.should.be.True;
      $element.script.length.should.not.equal(0);

      eventFired.noScript.should.be.True;
      $element.noScript.length.should.not.equal(0);
    });

  });
});