var url = 'http://localhost';
//var url = 'http://cgi.uru.ac.th';

angular.module('app.service', [])
.service('loginService', function($http) {
    return {
        pageLocation: {},
        getUser: function(email) {
            var data = url+'/garbage-api/index.php/users/'+email;
            return $http.get(data);
        },        
        getSession: function() {
            var session = url+'/garbage/gb_session.php';
            return $http.get(session);
        },
        logOut: function() {
            var out = url+'/garbage/gb_session.php?destroy=yes';
            return $http.get(out);
        },
    }
})

.service('garbageService', function($http) {
    return {
        selectedLocation: {},
        loadGbPoint: function() {
            var data = url+'/garbage-api/index.php/gbpoint';
            return $http.get(data);
        },
        getJson: function() {
            var data = url+'/gs-gb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=nan:gb_point&outputFormat=application%2Fjson';
            return $http.get(data);
        },
        getApt: function() {
            var data = url+'/garbage-api/index.php/apt_location';
            return $http.get(data);
        }
    }
})

.service('chartService', function($http) {
	var dataService = [];
    return {  
        getCase: function(place,code) {
            var pdata = url+'/garbage-api/index.php/stat/'+place+'/'+code;
            return $http.get(pdata);
        },  
        getCaseProv: function(pcode) {
            var pdata = url+'/garbage-api/index.php/stat_prov/' + pcode;
            return $http.get(pdata);
        },
        getCaseAmp: function(acode) {
            var adata = url+'/garbage-api/index.php/stat_amp/' + acode;
            return $http.get(adata);
        },
        getCaseTam: function(tcode) {
            var tdata = url+'/garbage-api/index.php/stat_tam/' + tcode;
            return $http.get(tdata);
        },
        getCaseVill: function(vcode) {
            var vdata = url+'/garbage-api/index.php/stat_vill/' + vcode;
            return $http.get(vdata);
        }
    }
})

.service('placeService', function($http) {
    return {
        getProv: function() {
            var pdata = url+'/garbage-api/index.php/prov';
            return $http.get(pdata);
        },
        getAmp: function(pcode) {
            var adata = url+'/garbage-api/index.php/amp/' + pcode;
            return $http.get(adata);
        },
        getTam: function(acode) {
            var tdata = url+'/garbage-api/index.php/tam/' + acode;
            return $http.get(tdata);
        },
        getVill: function(tcode) {
            var vdata = url+'/garbage-api/index.php/vill/' + tcode;
            return $http.get(vdata);
        }
    }
})




