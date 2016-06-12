(function() {
    'use strict';
    angular
    .module('app.pictureBook')
        .factory('PictureBooks', PictureBooks);

    PictureBooks.$inject = ['$resource'];

    function PictureBooks($resource) {
        return $resource('/api/picture_books/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();