/**
 * Created by Nikola on 14/6/2016.
 */

//ST TODO: angular ne prepoznaje ovaj kontroler, treba srediti(paging dr.enco...)

(function() {
    'use strict';

    angular.
        module('app.upload', ['ur.file', 'ngResource'])
        .controller('UploadController', UploadController);

    UploadController.$inject = ['Upload', '$timeout'];
    /* @ngInject */
    function UploadController(Upload, $timeout) {
        var vm = this;
        
        vm.uploadFiles = function(file, errFiles) {
            vm.f = file;
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'api/uploads',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        vm.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        }
    }
})();