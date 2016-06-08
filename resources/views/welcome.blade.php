<!DOCTYPE html>
<html ng-app="app">

<head>
    <style>
        /* This helps the ng-show/ng-hide animations start at the right place. */
        /* Since Angular has this but needs to load, this gives us the class early. */

        .ng-hide {
            display: none!important;
        }
    </style>
    <title ng-bind="title">
        storyteller
    </title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <base href="/">

    <!-- build:css styles/lib.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.css" />
    <link rel="stylesheet" href="bower_components/toastr/toastr.css" />
    <!-- endbower -->
    <!-- endbuild -->

    <!-- build:css styles/app.css -->
    <!-- inject:css -->
    <link rel="stylesheet" href=".tmp/AdminLTE.css">
    <link rel="stylesheet" href=".tmp/_all-skins.css">
    <!-- endinject -->
    <!-- endbuild -->
</head>

<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
    <div ng-include="'app/layout/shell.html'"></div>
    <div id="splash-page" ng-show="showSplash">
        <div class="page-splash">
            <div class="page-splash-message">
                storyteller
            </div>
            <div class="progress progress-striped active page-progress-bar">
                <div class="bar"></div>
            </div>
        </div>
    </div>
</div>

<!-- build:js js/lib.js -->
<!-- bower:js -->
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="bower_components/extras.angular.plus/ngplus-overlay.js"></script>
<script src="bower_components/moment/moment.js"></script>
<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="bower_components/toastr/toastr.js"></script>
<script src="bower_components/angular-animate/angular-animate.js"></script>
<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="bower_components/satellizer/satellizer.js"></script>
<!-- endbower -->
<!-- endbuild -->

<!-- build:js js/app.js -->
<!-- inject:js -->
<script src="app/app.module.js"></script>
<script src="app/admin/admin.module.js"></script>
<script src="app/auth/auth.module.js"></script>
<script src="app/blocks/exception/exception.module.js"></script>
<script src="app/blocks/logger/logger.module.js"></script>
<script src="app/blocks/router/router.module.js"></script>
<script src="app/core/core.module.js"></script>
<script src="app/dashboard/dashboard.module.js"></script>
<script src="app/layout/layout.module.js"></script>
<script src="app/widgets/widgets.module.js"></script>
<script src="app/admin/admin.controller.js"></script>
<script src="app/admin/admin.route.js"></script>
<script src="app/app.interceptor.js"></script>
<script src="app/auth/auth.route.js"></script>
<script src="app/auth/login.controller.js"></script>
<script src="app/auth/signup.controller.js"></script>
<script src="app/blocks/exception/exception-handler.provider.js"></script>
<script src="app/blocks/exception/exception.js"></script>
<script src="app/blocks/logger/logger.js"></script>
<script src="app/blocks/router/router-helper.provider.js"></script>
<script src="app/core/config.js"></script>
<script src="app/core/constants.js"></script>
<script src="app/core/core.route.js"></script>
<script src="app/dashboard/dashboard.controller.js"></script>
<script src="app/dashboard/dashboard.route.js"></script>
<script src="app/layout/ht-sidebar.directive.js"></script>
<script src="app/layout/ht-top-nav.directive.js"></script>
<script src="app/layout/shell.controller.js"></script>
<script src="app/layout/sidebar.controller.js"></script>
<script src="app/widgets/ht-img-person.directive.js"></script>
<script src="app/widgets/ht-widget-header.directive.js"></script>
<!-- endinject -->

<!-- inject:templates:js -->
<!-- endinject -->
<!-- endbuild -->

<script src="styles/app.js"></script>
</body>

</html>






<!--<!DOCTYPE html>-->
<!--<html>-->
<!--    <head>-->
<!--        <title>Laravel</title>-->
<!---->
<!--        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">-->
<!---->
<!--        <style>-->
<!--            html, body {-->
<!--                height: 100%;-->
<!--            }-->
<!---->
<!--            body {-->
<!--                margin: 0;-->
<!--                padding: 0;-->
<!--                width: 100%;-->
<!--                display: table;-->
<!--                font-weight: 100;-->
<!--                font-family: 'Lato';-->
<!--            }-->
<!---->
<!--            .container {-->
<!--                text-align: center;-->
<!--                display: table-cell;-->
<!--                vertical-align: middle;-->
<!--            }-->
<!---->
<!--            .content {-->
<!--                text-align: center;-->
<!--                display: inline-block;-->
<!--            }-->
<!---->
<!--            .title {-->
<!--                font-size: 96px;-->
<!--            }-->
<!--        </style>-->
<!--    </head>-->
<!--    <body>-->
<!--        <div class="container">-->
<!--            <div class="content">-->
<!--                <div class="title">Laravel 5</div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </body>-->
<!--</html>-->
