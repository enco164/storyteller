(function() {
  'use strict';

  angular
      .module('blocks.logger')
      .factory('logger', logger);

  logger.$inject = ['$log', 'toastr'];

  /* @ngInject */
  function logger($log, toastr) {
    var service = {
      showToasts: true,

      error: error,
      info: info,
      success: success,
      warning: warning,

      // straight to console; bypass toastr
      log: $log.log
    };

    var markup =
        '<div id="snackbar" class="mdl-js-snackbar mdl-snackbar" style="z-index: 2000;">' +
        '<div class="mdl-snackbar__text"></div>' +
        '<button class="mdl-snackbar__action" type="button"></button>' +
        '</div>';

    var snackbarContainer = angular.element(document.querySelector('#snackbar'));
    if (!snackbarContainer.length) {
      // snackbar does not exists
      snackbarContainer = angular.element(markup);
      angular.element(document.querySelector('body')).append(snackbarContainer);
    }

    var lastColor = null;
    var getSnackbarData = function(msg) {
      return {
        message: msg,
        timeout: 3000
      };
    };

    return service;
    /////////////////////

    function setColor(color) {
      if (lastColor) {
        snackbarContainer.removeClass(lastColor);
      }
      snackbarContainer.addClass(color);
      lastColor = color;
    }

    function error(message, data, title) {
      //toastr.error(message, title);
      $log.error('Error: ' + message, data);
      setColor('mdl-color--red-900');
      snackbarContainer[0].MaterialSnackbar.showSnackbar(getSnackbarData(message));
    }

    function info(message, data, title) {
      //toastr.info(message, title);
      $log.info('Info: ' + message, data);
      setColor('mdl-color--blue-900');
      snackbarContainer[0].MaterialSnackbar.showSnackbar(getSnackbarData(message));
    }

    function success(message, data, title) {
      //toastr.success(message, title);
      $log.info('Success: ' + message, data);
      setColor('mdl-color--green-900');
      snackbarContainer[0].MaterialSnackbar.showSnackbar(getSnackbarData(message));
    }

    function warning(message, data, title) {
      //toastr.warning(message, title);
      $log.warn('Warning: ' + message, data);
      setColor('mdl-color--orange-900');
      snackbarContainer[0].MaterialSnackbar.showSnackbar(getSnackbarData(message));
    }
  }
} ());
