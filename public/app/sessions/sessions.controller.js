/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionsController', SessionsController);

    SessionsController.$inject = ['Session'];
    /* @ngInject */
    function SessionsController(Session) {
        var vm = this;
        vm.title = 'Sessions';

        activate();

        function activate() {
            Session.query(function(sessions) {
                vm.sessions = sessions;
                console.log(sessions);
            });
        }
    }
})();
