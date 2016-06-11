/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'sessions',
                config: {
                    url: '/sessions?id',
                    templateUrl: 'app/sessions/sessions.html',
                    controller: 'SessionsController',
                    controllerAs: 'vm',
                    title: 'Sessions',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-archive"></i> Sessions'
                    },
                    loginRequired: true
                }
            }
        ];
    }
})();
