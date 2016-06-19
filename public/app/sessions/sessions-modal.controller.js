/**
 * Created by enco on 14.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionsModalController', SessionsModalController);

    SessionsModalController.$inject = ['title', 'Session', 'Kid', 'PictureBook', '$timeout', '$uibModalInstance'];

    function SessionsModalController(title, Session, Kid, PictureBook, $timeout, $uibModalInstance) {
        var vm = this;
        vm.modalTitle = title;
        vm.kidId = vm.pictureBookId = null;

        vm.ok = onOk;
        vm.cancel = onCancel;

        activate();

        function activate() {
            Kid.query(function(kids) {
                vm.kids = kids;
            });
            PictureBook.query(function(books) {
                vm.pictureBooks = books;
            });
        }

        function onOk() {
            if (!vm.kidId || !vm.pictureBookId) {
                vm.error = 'All fields are required!';
                $timeout(function(){
                    vm.error = null;
                },5000);
                return;
            }
            var session = new Session({kidId: vm.kidId, pictureBookId: vm.pictureBookId});
            session.$save(function(sess) {
                $uibModalInstance.close(sess);
            });
        }

        function onCancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }
})();