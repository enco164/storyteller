/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.recordings')
        .controller('RecordingsController', RecordingsController);

    RecordingsController.$inject = ['$rootScope'];
    /* @ngInject */
    function RecordingsController($rootScope) {
        var vm = this;
        $rootScope.pageTitle = 'Recordings';

    }
})();
