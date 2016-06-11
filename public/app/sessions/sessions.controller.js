/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionsController', SessionsController);

    SessionsController.$inject = [];
    /* @ngInject */
    function SessionsController() {
        var vm = this;
        vm.title = 'Sessions';

    }
})();
