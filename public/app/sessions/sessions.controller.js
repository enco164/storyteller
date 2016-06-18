/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionsController', SessionsController);

    SessionsController.$inject = ['$rootScope','Session'];
    /* @ngInject */
    function SessionsController($rootScope, Session) {
        var vm = this;
        $rootScope.pageTitle = 'Sessions';

        activate();

        function activate() {
            Session.query(function(sessions) {
                vm.sessions = sessions;
                console.log(sessions);
            });
        }
    }
})();
