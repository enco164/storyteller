/**
 * Created by Darko on 14/6/2016.
 */

(function() {
    'use strict';

    angular.
        module('app.media', ['ngFileUpload'])
        .controller('MediaController', MediaController);

    MediaController.$inject = ['$rootScope','Upload', '$timeout'];
    /* @ngInject */
    function MediaController($rootScope, Upload, $timeout) {
        var vm = this;
        $rootScope.pageTitle = 'Media';

        vm.uploadFiles = function(file, errFiles) {
            vm.f = file;
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'api/media',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        console.log(response.data);
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        vm.errorMsg = response.status + ': ' + response.data;
                });
            }
        }
    }
})();