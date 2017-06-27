angular.module('app.service', [])
.service('loginService', function($http) {
    return {
        pageLocation: {},
        getUser: function() {
            var data = 'http://cgi.uru.ac.th/garbage-api/index.php/users';
            return $http.get(data);
        },
    }
})
.service('garbageService', function($http) {
    return {
        selectedLocation: {},
        loadGbPoint: function() {
            var data = 'http://cgi.uru.ac.th/garbage-api/index.php/gbpoint';
            return $http.get(data);
        },
        getJson: function() {
            var data = 'http://cgi.uru.ac.th/gs-gb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=nan:gb_point&outputFormat=application%2Fjson';
            return $http.get(data);
        },
        getApt: function() {
            var data = 'http://cgi.uru.ac.th/garbage-api/index.php/apt_location';
            return $http.get(data);
        }
    }
})

.service('chartService', function($http) {
	var dataService = [];
    return {  
        getCase: function(place,code) {
            var pdata = 'http://cgi.uru.ac.th/garbage-api/index.php/stat/'+place+'/'+code;
            return $http.get(pdata);
        },  
        getCaseProv: function(pcode) {
            var pdata = 'http://cgi.uru.ac.th/garbage-api/index.php/stat_prov/' + pcode;
            return $http.get(pdata);
        },
        getCaseAmp: function(acode) {
            var adata = 'http://cgi.uru.ac.th/garbage-api/index.php/stat_amp/' + acode;
            return $http.get(adata);
        },
        getCaseTam: function(tcode) {
            var tdata = 'http://cgi.uru.ac.th/garbage-api/index.php/stat_tam/' + tcode;
            return $http.get(tdata);
        },
        getCaseVill: function(vcode) {
            var vdata = 'http://cgi.uru.ac.th/garbage-api/index.php/stat_vill/' + vcode;
            return $http.get(vdata);
        }
    }
})

.service('placeService', function($http) {
    return {
        getProv: function() {
            var pdata = 'http://cgi.uru.ac.th/garbage-api/index.php/prov';
            return $http.get(pdata);
        },
        getAmp: function(pcode) {
            var adata = 'http://cgi.uru.ac.th/garbage-api/index.php/amp/' + pcode;
            return $http.get(adata);
        },
        getTam: function(acode) {
            var tdata = 'http://cgi.uru.ac.th/garbage-api/index.php/tam/' + acode;
            return $http.get(tdata);
        },
        getVill: function(tcode) {
            var vdata = 'http://cgi.uru.ac.th/garbage-api/index.php/vill/' + tcode;
            return $http.get(vdata);
        }
    }
})




