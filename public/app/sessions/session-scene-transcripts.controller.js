/**
 * Created by enco on 15.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionSceneTranscriptsController', SessionSceneTranscriptsController);

    SessionSceneTranscriptsController.$inject = ['$stateParams', 'SessionSceneTranscript', '$log'];
    /* @ngInject */
    function SessionSceneTranscriptsController($stateParams, SessionSceneTranscript, $log) {
        var vm = this;
        vm.sceneTranscripts = SessionSceneTranscript.query({sessionId: $stateParams.id});
        vm.save = save;

        activate();

        function activate() {
        }

        function save() {
            var i = 0;
            angular.forEach(vm.sceneTranscripts, function(sceneTranscript){

                sceneTranscript.$update(function(){
                    i++;
                    if (i === vm.sceneTranscripts.length) {
                        $log.info('Saved');
                    }
                });
            });
        }
    }
})();
