(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$rootScope','logger'];
  /* @ngInject */
  function AdminController($rootScope, logger) {
    var vm = this;
    $rootScope.pageTitle = 'Admin';

    activate();

    function activate() {
      //logger.info('Activated Admin View');
    }
  }
})();
