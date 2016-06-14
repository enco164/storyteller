/**
 * Created by Nikola on 14/6/2016.
 */

(function() {
    'use strict';

    angular
        .module('app.upload', ['ur.file', 'ngResource'])
        .controller('UploadController', UploadController);

    UploadController.$inject = ['$resource', '$http'];
    /* @ngInject */
    function UploadController($resource, $http) {
        var vm = this;
        var Files = $resource('/api/uploads/:id', { id: "@id" });
        vm.model = {};
        vm.model.file = null;



        vm.upload = function() {
            Files.save({test: "abc"}, function(self, headers) {
                // server laze
                console.log("Success?");
            });
        };
    }
})();