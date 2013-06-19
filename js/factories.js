romApp.factory('romFactory', function($http){
	var roms =  [],
		factory = {};

	factory.getRoms = function(){
		return $http.get('files.js').then(function(res){
        		return roms = res.data;
     	 });
	}

	return factory;
});