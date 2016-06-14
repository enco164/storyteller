(function() {
    'use strict';
    angular
    .module('app.pictureBook')
        .factory('PictureBook', PictureBook);

    PictureBook.$inject = ['$resource'];

    function PictureBook($resource) {
        return $resource('/api/picture_books/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();