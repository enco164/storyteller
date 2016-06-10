/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.recordings')
        .controller('RecordingsController', RecordingsController);

    RecordingsController.$inject = [];
    /* @ngInject */
    function RecordingsController() {
        var vm = this;
        vm.title = 'Recordings';

    }
})();
