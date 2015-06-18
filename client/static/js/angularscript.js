/**
 * Created by pl on 5/30/15.
 */
var app = angular.module('uberApp', ['ngRoute']);
var pin='';
app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/index',
            controller: 'indexController'
        })
        .when('/login', {
            templateUrl: '/login',
            controller: 'loginController'
        })
        .when('/register', {
            templateUrl: '/register',
            controller: 'registerController'
        })
        .when('/main', {
            templateUrl: '/main',
            controller: 'mainController'
        })
        .when('/call_confirm', {
            templateUrl: '/call_confirm'
        })
});

app.factory('userFactory', function(){
    return{
        phoneNumber: '',
        pin: function(){
            var pin1 = Math.floor((Math.random()*9));
            var pin2 = Math.floor((Math.random()*9));
            var pin3 = Math.floor((Math.random()*9));
            var pin4 = Math.floor((Math.random()*9));
            pin =  ''+pin1 + pin2 + pin3 + pin4;
        }
    }
});

app.factory('registerFactory',function($http){
    var factory={};
    factory.register=function(info){
        $http.post('/register',info);
        console.log('add- factory');
    };
    return factory;
});

app.factory('loginFactory',function($http){
    var factory={};
    factory.user = {};
    factory.login=function(info, callback){
        $http.post('/login',info).success(function(output){
            callback(output);
        });
    };
    return factory;
});

app.factory('addressList', function($http){
    var factory = {};
    factory.add_address=function(info){
        $http.post('/addAddress', info);
    };
    factory.get_address = function(info, callback){
        $http.post('/getAddresses', info).success(function(data){
            callback(data);
        });
    };
    return factory;
});

app.factory('updateFactory',function($http){
    var factory={};
    factory.updateAddresses=function(info){
        $http.post('/updateAddresses',info);
    };
    return factory;
})

app.controller('mainController', function($scope, loginFactory, addressList){
    var id = loginFactory.user._id;
    addressList.get_address({userID:id}, function(data){
        $scope.addresses = data.addresses;
    });
    /*$scope.addresses = [
        {name: 'Home', address: '1980 Zanker Rd, San Jose, CA'},
        {name: 'Work', address: '3848 Fake Rd, San Jose, CA'},
        {name: 'Daughter', address: '2121 Noob Rd, San Jose, CA'}
    ];*/

    $scope.addAddressFun = function(){
        var stuffToPush = {
            userID: id,
            address: $scope.address
        };
        addressList.add_address(stuffToPush);
        $scope.addresses.push($scope.address);
        $scope.address = {};
        $scope.addAddress = false;
    };

    var inputbox = document.getElementById('address');
    var options = {
        componentRestrictions: {country: 'us'}
    };

    var new_address = new google.maps.places.Autocomplete(inputbox, options);
    google.maps.event.addListener(new_address, 'place_changed', function() {
        var place = new_address.getPlace();
        $scope.address.address = place.formatted_address;
        $scope.$apply();
    });
});

app.controller('registerController', function($scope, $location, userFactory, registerFactory){
    $scope.register = function(){
        //FROMCAM
        userFactory.pin();
        $scope.info.password = $scope.password;
        userFactory.phoneNumber = $scope.info.phoneNumber;
        $scope.info.pin = pin;
        registerFactory.register($scope.info);
        $scope.info={};
        $location.path('/call_confirm');
    };

    $scope.getPhone = function(){
        var areaCode = userFactory.phoneNumber.slice(0, 3);
        var num3 = userFactory.phoneNumber.slice(3, 6);
        var num4 = userFactory.phoneNumber.slice(6);
        return '(' + areaCode + ')' + num3 + '-' + num4;
    };

    $scope.Pin = pin;
});


app.controller('loginController', function($scope, $location, loginFactory){
    $scope.login = function(){
        loginFactory.login($scope.info, function(data){
            if (data){
                loginFactory.user = data;
                $location.path('/main');
            } else{
                $location.path('/login');
            }
        });
        $scope.info={};
    }
});

app.controller('indexController', function($scope){

});



app.directive('pwConfirm', [function(){
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl){
            var password = attrs.ngModel;
            var confirmpw = attrs.pwConfirm;
            scope.$watch(password, function(){
                ctrl.$setValidity('pwMatch', scope[password]==scope[confirmpw]);
            });
        }
    }
}]);