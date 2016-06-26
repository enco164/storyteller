/**
 * Created by Darko on 14/6/2016.
 */

(function() {
    'use strict';

    angular.
    module('app.media', ['ngFileUpload'])
        .controller('MediaController', MediaController);

    MediaController.$inject = ['$rootScope','Upload', '$timeout', 'logger', 'Media'];
    /* @ngInject */
    function MediaController($rootScope, Upload, $timeout, logger, Media) {
        var vm = this;
        $rootScope.pageTitle = 'Media';
        vm.selectFile = selectFile;

        activate();

        function activate() {
            Media.query(function(media){
                vm.allMedia = media;
            });
            //console.log(vm.allMedia);
        }

        function selectFile(file, errFiles)
        {
            vm.file = file;
            vm.errFile = errFiles && errFiles[0];
            // console.log(vm.file);
        }

        vm.uploadFiles = function() {
            if (vm.file) {
                vm.file.upload = Upload.upload({
                    url: 'api/media',
                    data: {file: vm.file}
                });

                vm.file.upload.then(function (response) {
                    $timeout(function () {
                        vm.file.result = response.data;
                        logger.info('File successfully uploaded!');
                    });
                }, function (response) {
                    if (response.status > 0)
                        vm.errorMsg = response.status + ': ' + response.data;
                });

                vm.file={};
                vm.errFile={};
            }
            else {
                logger.info('File not selected!')
            }
        }
    }
})();