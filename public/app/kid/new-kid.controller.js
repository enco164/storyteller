/**
 * Created by enco on 4.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.kid')
        .controller('NewKidController', NewKidController);

    NewKidController.$inject = ['Kid', 'logger'];

    function NewKidController(Kid, logger) {
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;

        function ok(){
            console.log('on ok');
            var kid = new Kid(vm.kid);
            kid.$save(function(){
                logger.info('Kid saved');
            }, function(error){
                logger.error('Error');
            });
        }

        function cancel() {

        }
    }
})();