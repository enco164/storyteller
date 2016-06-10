/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.recordings')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'recordings',
                config: {
                    url: '/recordings?id',
                    templateUrl: 'app/recordings/recordings.html',
                    controller: 'RecordingsController',
                    controllerAs: 'vm',
                    title: 'Recordings',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-microphone"></i> Recordings'
                    },
                    loginRequired: true
                }
            }
        ];
    }
})();
