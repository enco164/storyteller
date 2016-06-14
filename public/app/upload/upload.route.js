/**
 * Created by Nikola on 14/6/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.upload')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'upload',
                config: {
                    url: '/upload?id',
                    templateUrl: 'app/upload/uploads.html',
                    controller: 'UploadController',
                    controllerAs: 'vm',
                    title: 'Uploads',
                    settings: {
                        nav: 6,
                        content: '<i class="fa fa-file-text" aria-hidden="true"></i> Uploads'
                    },
                    loginRequired: true
                }
            }
        ];
    }
})();