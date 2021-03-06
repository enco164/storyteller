/**
 * Created by Nikola on 13/6/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.language')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'language',
                config: {
                    url: '/admin/language?id',
                    templateUrl: 'app/language/languages.html',
                    controller: 'LanguageController',
                    controllerAs: 'vm',
                    title: 'Admin',
                    // settings: {
                    //     nav: 9,
                    //     content: '<i class="material-icons">language</i> Languages'
                    // },
                    loginRequired: true
                }
            }
        ];
    }
})();