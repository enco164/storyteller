(function() {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.widgets',
        'app.admin',
        'app.kid',
        'app.auth',
        'app.dashboard',
        'app.recordings',
        'app.sessions',
        'app.annotationSchema',
        'app.residence',
        'app.language',
        'app.pictureBook',
        'app.media',
        'app.layout',
        'angularAudioRecorder'
    ])
        .run(function ($rootScope,$timeout) {

            $rootScope.$on('$viewContentLoaded', function() {
                $timeout(function() {
                    componentHandler.upgradeAllRegistered();
                })
            })
        });
})();
