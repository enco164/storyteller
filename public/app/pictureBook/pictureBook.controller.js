(function() {
    'use strict';

    angular
        .module('app.pictureBook', ['bootstrapLightbox'])
        .controller('PictureBookController', PictureBookController);

    PictureBookController.$inject = ['$rootScope','$state', '$stateParams','logger', 'PictureBook', 'PictureBookScene', '$uibModal', 'Upload', '$timeout', 'Lightbox'];
    /* @ngInject */
    function PictureBookController($rootScope, $state, $stateParams, logger, PictureBook, PictureBookScene, $uibModal, Upload, $timeout, Lightbox) {
        var vm = this;
        $rootScope.pageTitle = 'Picture Books';
        vm.showForm = false;

        vm.deletePictureBook = deletePictureBook;
        vm.editPictureBook = editPictureBook;
        vm.onCreate = onCreate;
        vm.selectPictureBook = selectPictureBook;
        vm.showAddForm = showAddForm;
        vm.addScene = addScene;
        vm.selectFile = selectFile;
        vm.openLightboxModal = openLightBoxModal;
        vm.images;

        activate();

        function openLightBoxModal (index) {
            if(vm.images == undefined)
                reloadImageCollection();
            Lightbox.openModal(vm.images, index);
        };

        function reloadImageCollection()
        {
            vm.images = [];
            for(var i = 0; i < vm.currentPictureBook.scenes.length; i++)
            {
                var tempObj = {url: vm.currentPictureBook.scenes[i].media.path};
                vm.images.push(tempObj);
            }
        }

        function activate() {
            $timeout(function () {
                componentHandler.upgradeAllRegistered();
            });

            if ($stateParams.id) {
                PictureBook.get({id: $stateParams.id}, onSuccess, onError);
            }
            else {
                vm.currentPictureBook = undefined;
            }

            reloadPictureBooks();

            function onSuccess(pictureBook) {
                vm.currentPictureBook = pictureBook;
            }


            function onError(error) {
                vm.currentPictureBook = null;
                logger.error(error.data.error.message);
            }

        }

        function selectPictureBook(pictureBook) {
            $state.go($state.current, {id: pictureBook.id}, {notify: false});
            vm.currentPictureBook = pictureBook;
            reloadImageCollection();
        }

        function reloadPictureBooks() {
            PictureBook.query(function(pictureBooks){
                vm.pictureBooks = pictureBooks;
            });
        }

        function deletePictureBook(pictureBook) {
            var name = pictureBook.title;
            pictureBook.$delete(onSuccess, onError);

            function onSuccess() {
                logger.info('Picture Book ' + name + ' deleted!');
                vm.currentPictureBook = undefined;
                reloadPictureBooks();
            }

            function onError(error) {
                logger.error(error.message);
            }
        }

        function editPictureBook() {
            var modalInstance = instantiateModal(vm.currentPictureBook, "Edit picture book");

            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback() {
                reloadPictureBooks();
            }

            function onCancelCallback() {

            }
        }

        function onCreate(){
            var modalInstance = instantiateModal(undefined, "Create new picture book");
            
            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback() {
                reloadPictureBooks();
            }

            function onCancelCallback() {

            }
        }

        function instantiateModal(pictureBook, $modalTitle) {
            return $uibModal.open({
                templateUrl: 'app/pictureBook/pictureBookModal.html',
                controller: 'PictureBookModalController',
                controllerAs: 'vm',
                resolve: {
                    pictureBook: pictureBook,
                    modalTitle: function () {
                        return $modalTitle;
                    }
                }
            });
        }
        
        function showAddForm() {
            vm.showForm = !vm.showForm;
            vm.newScene = {};
            vm.file = {};
        }

        function addScene() {

            vm.uploadFiles();
            vm.newScene.mediaId = vm.uploadedFile.id;
            PictureBookScene.save({pictureBookId: vm.currentPictureBook.id}, vm.newScene, onSuccess);

            function onSuccess(newPictureBook){
                logger.info('Added scene to picture book ' + newPictureBook.title);
                vm.currentPictureBook = newPictureBook;
            }
            
        }

        function selectFile(file, errFiles)
        {
            vm.file = file;
            vm.errFile = errFiles && errFiles[0];
        }

        vm.uploadScene = function() {
            if (vm.file) {
                console.log(vm.file);
                vm.file.upload = Upload.upload({
                    url: 'api/media',
                    data: {file: vm.file}
                });

                vm.file.upload.then(function (response) {
                    $timeout(function () {
                        vm.uploadedFile = response.data;
                        vm.newScene.mediaId = vm.uploadedFile.id;
                        PictureBookScene.save({pictureBookId: vm.currentPictureBook.id}, vm.newScene, onSuccess);

                        function onSuccess(newPictureBook){
                            logger.info('Added scene to picture book ' + newPictureBook.title);
                            vm.currentPictureBook = newPictureBook;
                            reloadImageCollection();
                            showAddForm();
                        }
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
