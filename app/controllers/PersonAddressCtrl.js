'use strict';

(function () {
    var addressBookApp = angular.module("addressBookApp");

    var PersonAddressCtrl = function ($scope, $http)
    {
    	$scope.working = 'Angular is Working';
        //common error function
    	var onError = function (error) {
            $scope.error = error.data;
        };
        //end error function

        //get all persone
    	var onAddressGetCompleted = function(response){
    		$scope.addresses = response.data;
            console.log($scope.addresses);
    	}
    	

        var refresh = function(){
        	$http.get('/person/addresses/')
        		.then(onAddressGetCompleted, onError);
        	console.log('Response received...');
        }

        refresh();
    	//end get all persons

        //get persons by Id
        var onGetByIdCompleted = function(response){
            $scope.addresses = response.data;
            console.log(response.data);
        };

        $scope.searchAddressById = function(id){
            $http.get('/person/addresses/' + id)
                    .then(onGetByIdCompleted, onError);
            console.log(id);
        };
        //end get person by Id

        //add new person
        var onAddAddressCompleted = function(response){
            $scope.addresses = response.data;
            console.log(response.data);
            refresh();
        };
        $scope.addAddress = function(address){
            $http.post('person/addAddress/', address)
                    .then(onAddAddressCompleted, onError);
            console.log(address);
        };
        //end add new person address

        //delete person address
        $scope.deleteAddress = function(id){
            $http.delete('person/deleteAddress/' + id)
                .then(onAddressDeleteCompleted,  onError);
            console.log(id);
        };

        var onAddressDeleteCompleted = function(response){
            $scope.addresses = response.data;
            console.log(response.data);
            refresh();
        };
        //end delete person address

        //update person address
        $scope.updateAddress = function(address){
            $http.put("person/updateAddress", person)
                .then(onUpdateAddressCompleted, onError);
                    console.log(person);
        };

        var onUpdateAddressCompleted = function(response){
            $scope.addresses = null;
            console.log(response.data);
            refresh();
        };
        //end update person address
    }
    addressBookApp.controller('PersonAddressCtrl', PersonAddressCtrl);
}());