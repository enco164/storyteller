/**
 * Created by Nikola on 12/6/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.residence')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'residence',
                config: {
                    url: '/residence?id',
                    templateUrl: 'app/residence/residences.html',
                    controller: 'ResidenceController',
                    controllerAs: 'vm',
                    title: 'Residences',
                    settings: {
                        nav: 6,
                        content: '<i class="fa fa-file-text" aria-hidden="true"></i> Residences'
                    },
                    loginRequired: true
                }
            }
        ];
    }
})();