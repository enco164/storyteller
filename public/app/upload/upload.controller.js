/**
 * Created by Nikola on 14/6/2016.
 */

(function() {
    'use strict';

    angular.
        module('app.upload', ['ur.file', 'ngResource'])
        .controller('UploadController', UploadController);

    UploadController.$inject = ['$state', '$stateParams','logger', 'Upload', '$uibModal','$scope', '$resource'];
    /* @ngInject */
    function UploadController($state, $stateParams, logger, Residence, $uibModal,$scope, $resource) {
        var Files = $resource('/media/:id', { id: "@id" });

        angular.extend($scope, {

            model: { file: null },

            upload: function(model) {
                Files.prototype.$save.call(model.file, function(self, headers) {
                    // Handle server response
                });
            }
        });
    }
})();