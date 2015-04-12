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

  $scope.data;
  var req = {
    method: 'POST',
    url: 'http://asa.gausian.com',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: $.param({user_app_id:'app_id', service_app_name:'Product', request_string: "get"})
  };

  // get product info from ASA
  $http(req).success(function(data) {
    $scope.products = angular.fromJson(data.response);
  });

  // to avoid flashing during page loading
  $scope.init = function () {
    $("#list_container").fadeIn(1000);
  };

  // change to large cards
  $scope.LargeCards = function () {
    $scope.LargeCards_flag = true;
    $scope.MediumCards_flag = false;
    $scope.SmallCards_flag = false;
  }

  // change to large cards
  $scope.MediumCards = function () {
    $scope.LargeCards_flag = false;
    $scope.MediumCards_flag = true;
    $scope.SmallCards_flag = false;
  }

  // change to large cards
  $scope.SmallCards = function () {
    $scope.LargeCards_flag = false;
    $scope.MediumCards_flag = false;
    $scope.SmallCards_flag = true;
  }

  // toggle product enalbe
  $scope.enableToggle = function(product) {
    if(product.enable==="true") {
      product.enable="false";
    }
    else {
      product.enable="true";
    }
  }

  $scope.full_edit = function() {
    $scope.full_screen_edit = true;
    $scope.full_screen_camera = false;
    $scope.full_screen_vendor = false;
    $scope.full_screen_packaging = false;
    $("#full_screen_overlay").fadeIn(400);
  }

  $scope.full_camera = function() {
    $scope.full_screen_edit = false;
    $scope.full_screen_camera = true;
    $scope.full_screen_vendor = false;
    $scope.full_screen_packaging = false;
    $("#full_screen_overlay").fadeIn(400);
  }

  $scope.full_vendor = function() {
    $scope.full_screen_edit = false;
    $scope.full_screen_camera = false;
    $scope.full_screen_vendor = true;
    $scope.full_screen_packaging = false;
    $("#full_screen_overlay").fadeIn(400);
  }

  $scope.full_packaging = function() {
    $scope.full_screen_edit = false;
    $scope.full_screen_camera = false;
    $scope.full_screen_vendor = false;
    $scope.full_screen_packaging = true;
    $("#full_screen_overlay").fadeIn(400);
  }

  $scope.switch_to_edit = function () {
    $scope.full_screen_edit = true;
    $scope.full_screen_camera = false;
    $scope.full_screen_vendor = false;
    $scope.full_screen_packaging = false;
  }

  $scope.switch_to_camera = function () {
    $scope.full_screen_edit = false;
    $scope.full_screen_camera = true;
    $scope.full_screen_vendor = false;
    $scope.full_screen_packaging = false;
  }

  $scope.switch_to_vendor = function () {
    $scope.full_screen_edit = false;
    $scope.full_screen_camera = false;
    $scope.full_screen_vendor = true;
    $scope.full_screen_packaging = false;
  }

  $scope.switch_to_packaging = function () {
    $scope.full_screen_edit = false;
    $scope.full_screen_camera = false;
    $scope.full_screen_vendor = false;
    $scope.full_screen_packaging = true;
  }    

  $scope.close_full_screen = function() {
    $("#full_screen_overlay").hide();
    $scope.full_screen_edit = false;
    $scope.full_screen_camera = false;
    $scope.full_screen_vendor = false;
    $scope.full_screen_packaging = false;
  }

/*



  // open detail page for one app
  $scope.openApp = function(app) {
    // firstly move overlay container into window
    $scope.app_path = $sce.trustAsResourceUrl(app.path);
    $scope.app = app;
    $("#list_container").fadeOut(500);
    $("#search_container").fadeOut(500);
    $("#movein_container").show();
    // secondly show iframe container
    $timeout(function(){ $("#overlay_container").fadeIn(500); }, 550);
  }

  $scope.install_this_app = function() {
    alert($scope.app.id);
  }

  $scope.closeApp = function() {
    $scope.app = null;
    $scope.search_header = null;
    $scope.app_path = $sce.trustAsResourceUrl(null);
    $("#overlay_container").hide();
    $("#movein_container").hide();
    $("#list_container").fadeIn(500);
    $('#iframe_cover_before_loaded').show();
  }

  $scope.filterCAT = function(catalog) {
    $scope.header = catalog;
    $("#search_container").hide();
    $("#list_container").hide();
    // filter with catalog info
    $scope.filterredApps = [];
    var j=0;
    for(var i=0; i<$scope.apps.length; i++){
      var app = $scope.apps[i];
      if(app.catalog.match($scope.header)){
        $scope.filterredApps[j++] = app;
      }
    }
    $("#list_container").fadeIn(500);
    //$timeout(function(){ $(".app_unit").fadeIn(100); }, 800); 
  }

  $scope.Search = function(keyEvent) {
    // if enter is input in search box
    if (keyEvent.which === 13){
      // hide list page
      $("#list_container").hide();
      $("#search_container").hide();
      $scope.searchedApps = [];
      var j=0;
      for(var i=0; i<$scope.apps.length; i++){
        var app = $scope.apps[i];
        if(app.keyword.match(angular.lowercase($scope.query))){
          $scope.searchedApps[j++] = app;
        }
      }
      $("#search_container").fadeIn(500);
      if($scope.searchedApps.length === 0) {
        $scope.search_header = "Sorry, no matching APP.";
      }
      else if($scope.searchedApps.length === 1) {
        $scope.search_header = "There is one result:";
      }
      else {
        $scope.search_header = "There are " + $scope.searchedApps.length + " results:";
      }
    }
    // if escape is input in search box
    if (keyEvent.which === 27){
      // close search result
      $("#search_container").hide();
      $("#list_container").fadeIn(500);
      $scope.search_header = null;
      $scope.query = null;
    }
  }

  $scope.ClickSearch = function() {
    // hide list page
    $("#list_container").hide();
    $("#search_container").hide();
    $scope.searchedApps = [];
    var j=0;
    for(var i=0; i<$scope.apps.length; i++){
      var app = $scope.apps[i];
      if(app.keyword.match($scope.query)){
        $scope.searchedApps[j++] = app;
      }
    }
    if($scope.searchedApps.length === 0) {
      $scope.search_header = "Sorry, no matching APP.";
    }
    else if($scope.searchedApps.length === 1) {
      $scope.search_header = "There is one result:";
    }
    else {
      $scope.search_header = "There are " + $scope.searchedApps.length + " results:";
    }
    $("#search_container").fadeIn(500);
  }*/

})