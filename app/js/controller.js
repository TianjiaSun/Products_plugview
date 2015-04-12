'use strict';

var store = angular.module('store',['ngRoute'])

  .controller('StoreListCtrl', function($scope, $http, $route, $routeParams, $sce, $timeout) {

    $scope.LargeCards_flag = false;
    $scope.MediumCards_flag = true;
    $scope.SmallCards_flag = false;

    $scope.full_screen_edit = false;
    $scope.full_screen_camera = false;
    $scope.full_screen_vendor = false;
    $scope.full_screen_packaging = false;

    $scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
      $scope.productId = $routeParams.productId
      $scope.data;
      var req = {
        method: 'POST',
        url: 'http://asa.gausian.com',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({user_app_id:'app_id', service_app_name:'Product', request_string: "get on id=" + $scope.productId})
      };

      // get product info from ASA
      $http(req).success(function(data) {
        $scope.products = angular.fromJson(data.response);
      });
    });

    // to avoid flashing during page loading
    $scope.init = function () {
      $("#list_container").fadeIn(1000);
      var url_string = $location.hash();
    };

  })

  .config(function ($routeProvider){
    $routeProvider.
    when('/open=:productId',{
      action: 'open'
    })
  });