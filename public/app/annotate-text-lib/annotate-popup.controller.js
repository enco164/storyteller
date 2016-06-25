/**
 * Created by enco on 23.6.16..
 */
(function() {
    angular
        .module("app")
        .controller("AnnotationController",AnnotationController);




    AnnotationController.$inject = ['$scope', '$timeout', '$stateParams', 'Session'];
    function AnnotationController($scope, $timeout, $stateParams, Session) {
        Session.get({id: $stateParams.id}, function(session) {
            console.log(session);
            $scope.transcript = session.transcripts.find(function(transcript) {
                console.log(transcript);
                return transcript.id == $stateParams.transcriptId;
            });

            $scope.annotationColours = [
                {
                    name: $scope.transcript.annotationSchema.red,
                    value: "red"
                }, {
                    name: $scope.transcript.annotationSchema.green,
                    value: "green"
                }, {
                    name: $scope.transcript.annotationSchema.blue,
                    value: "blue"
                }, {
                    name: $scope.transcript.annotationSchema.aqua,
                    value: "aqua"
                }, {
                    name: $scope.transcript.annotationSchema.pink,
                    value: "pink"
                }, {
                    name: $scope.transcript.annotationSchema.yellow,
                    value: "yellow"
                }, {
                    name: $scope.transcript.annotationSchema.orange,
                    value: "orange"
                }
            ];
        });

        $scope.useTemplate = function(template) {
            if (template.type !== null) {
                $scope.$annotation.type = template.type;
            }
            if (template.comment !== null) {
                $scope.$annotation.data.comment = template.comment;
            }
            $scope.$close();
        };
        $scope.useColor = function(color) {
            if (color.value !== null) {
                $scope.$annotation.type = color.value;
            }
        };
        $scope.isActiveColor = function(color) {
            return color && color.value === $scope.$annotation.type;
        };
        $scope.close = function() {
            console.log('close');
            return $scope.$close();
        };
        $scope.reject = function() {
            return $scope.$reject();
        };
    }

    //]).controller("MainController", function($scope, $timeout, NGAnnotation) {
    //    $scope.demoTexts = ["The Stockholm School of Economics (SSE) or Handelshögskolan i Stockholm (HHS) is one of the leading European business schools. SSE is a private business school that receives most of its financing from private sources. SSE offers bachelors, mastors and MBA programs, along with highly regarded PhD programs and extensive Executive Education (customized and open programs).\r\rSSE's Masters in Management program is ranked no. 18 worldwide by the Financial Times.[1] QS ranks SSE no.26 among universities in the field of economics worldwide\r\rSSE is accredited by EQUIS certifying that all of its main activities, teaching as well as research, are of the highest international standards. SSE is also the Swedish member institution of CEMS together with universities such as London School of Economics, Copenhagen Business School, Tsinghua University, Bocconi University, HEC Paris and the University of St. Gallen.\r\rSSE has founded sister organizations: SSE Riga in Riga, Latvia, and SSE Russia in St Petersburg, Russia. It also operates a research institute in Tokyo, Japan; the EIJS (European Institute of Japanese Studies)."];
    //    $scope.annotations = [
    //        [
    //            new NGAnnotation({
    //                startIndex: 0,
    //                endIndex: 39,
    //                type: "green",
    //                data: {
    //                    comment: "Well written!",
    //                    points: 2
    //                }
    //            }), new NGAnnotation({
    //            startIndex: 240,
    //            endIndex: 247,
    //            type: "red",
    //            data: {
    //                comment: "Spelling mistake",
    //                points: -1
    //            }
    //        })
    //        ]
    //    ];
    //    $scope.onAnnotate = function($annotation) {
    //        console && console.log($annotation);
    //    };
    //    $scope.onAnnotateError = function($ex) {
    //        if ($ex.message === "NG_ANNOTATE_TEXT_PARTIAL_NODE_SELECTED") {
    //            return alert("Invalid selection.");
    //        } else {
    //            throw $ex;
    //        }
    //    };
    //    $scope.onPopupShow = function($el) {
    //        var firstInput;
    //        firstInput = $el.find("input, textarea").eq(0).focus();
    //        return firstInput && firstInput[0].select();
    //    };
    //    $scope.hasPoints = function(points) {
    //        var _isNaN;
    //        _isNaN = Number.isNaN || isNaN;
    //        return typeof points === "number" && points !== 0 && !_isNaN(points);
    //    };
    //    $scope.hasComment = function(comment) {
    //        return typeof comment === "string" && comment.length > 0;
    //    };
    //    $scope.annotationsAsFlatList = function(annotations) {
    //        if (annotations == null) {
    //            annotations = $scope.annotations[0];
    //        }
    //        if (!annotations.length) {
    //            return [];
    //        } else {
    //            return annotations.map(function(annotation) {
    //                var arr;
    //                arr = [];
    //                if ($scope.hasPoints(annotation.data.points) && $scope.hasComment(annotation.data.comment)) {
    //                    arr.push(annotation);
    //                }
    //                if (annotation.children && annotation.children.length) {
    //                    arr = arr.concat($scope.annotationsAsFlatList(annotation.children));
    //                }
    //                return arr;
    //            }).reduce(function(prev, current) {
    //                return prev.concat(current);
    //            });
    //        }
    //    };
    //    return $scope.clearPopups = function() {
    //        return $scope.$broadcast("ngAnnotateText.clearPopups");
    //    };
    //});

// ---
// generated by coffee-script 1.9.2
})();