(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['logger'];
  /* @ngInject */
  function DashboardController(logger) {
    var vm = this;
    vm.news = {
      title: 'storyteller',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';

    activate();

    function activate() {
      //logger.info('Activated Dashboard View');
    }

  }
})();
