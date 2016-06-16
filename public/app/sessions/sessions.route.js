/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'sessions',
                config: {
                    url: '/sessions',
                    abstract: true,
                    template: '<div ui-view></div>'
                }
            },
            {
                state: 'sessions.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/sessions/sessions.html',
                    controller: 'SessionsController',
                    controllerAs: 'vm',
                    title: 'Sessions',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-archive"></i> Sessions'
                    },
                    loginRequired: true
                }
            },
            {
                state: 'sessions.detail',
                config: {
                    url: '/detail/:id',
                    templateUrl: 'app/sessions/session-detail.html',
                    controller: 'SessionDetailController',
                    controllerAs: 'vm',
                    title: 'Session Detail',
                    loginRequired: true
                }
            },
            {
                state: 'sessions.new',
                config: {
                    url: '/new',
                    loginRequired: true,
                    onEnter: ['$uibModal', '$state', function($uibModal, $state) {
                        $uibModal.open({
                            templateUrl: 'app/sessions/sessions-modal.html',
                            controller: 'SessionsModalController',
                            controllerAs: 'vm',
                            resolve: {
                                title: function() {return 'Sessions'}
                            }
                        }).result.then(function(session) {
                            //$state.go('sessions.detail', {id: session.id});
                        });
                    }]
                }
            }
        ];
    }
})();