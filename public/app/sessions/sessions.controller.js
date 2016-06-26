/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionsController', SessionsController);

    SessionsController.$inject = ['$rootScope','Session', 'logger'];
    /* @ngInject */
    function SessionsController($rootScope, Session, logger) {
        var vm = this;
        $rootScope.pageTitle = 'Sessions';

        vm.deleteSession = deleteSession;

        activate();

        function activate() {
            getSessions();
        }

        function getSessions() {
            Session.query(function(sessions) {
                vm.sessions = null;
                vm.sessions = sessions;
            });
        }

        function deleteSession(sessionId) {
            Session.delete({id: sessionId}, function() {
                logger.info('Session deleted');
                getSessions();
            });
        }
    }
})();
