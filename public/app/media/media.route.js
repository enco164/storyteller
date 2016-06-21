/**
 * Created by Darko on 14/6/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.media')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'media',
                config: {
                    url: '/media?id',
                    templateUrl: 'app/media/media.html',
                    controller: 'MediaController',
                    controllerAs: 'vm',
                    title: 'Media',
                    settings: {
                        nav: 7,
                        content: '<i class="material-icons">backup</i> Media'
                    },
                    loginRequired: true
                }
            }
        ];
    }
})();