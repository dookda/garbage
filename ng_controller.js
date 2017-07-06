var url = 'http://localhost';
//var url = 'http://cgi.uru.ac.th';
angular.module('app.controller', ['ui-leaflet', 'ng-echarts'])

    .controller("registerCtrl", function ($scope, $http, $timeout, $window, loginService, garbageService) {

        $scope.title = 'register';
        $scope.chkMail = false;
        $scope.chkPw = false;
        $scope.chkFname = false;
        $scope.chkLname = false;
        $scope.chkAptname = false;
        $scope.bchk = true;

        //check email
        $scope.getUser = function () {
            loginService.getUser($scope.reg.email)
                .then(function (res) {
                    if (res.data[0].count >= 1) {
                        $scope.errEmail = true;
                        $scope.chkMail = false;
                        $scope.chkButton();
                    } else {
                        $scope.errEmail = false;
                        $scope.chkMail = true;
                        $scope.chkButton();
                    }
                })
        };

        // check name surname and address
        $scope.chkVal = function (inputDat) {
            if (inputDat == 'fname') {
                if ($scope.reg.fname == null) {
                    $scope.errFname = true;
                    $scope.chkFname = false;
                    $scope.chkButton();
                } else {
                    $scope.errFname = false
                    $scope.chkFname = true;
                    $scope.chkButton();
                }
            } else if (inputDat == 'lname') {
                if ($scope.reg.lname == null) {
                    $scope.errLname = true;
                    $scope.chkLname = false;
                    $scope.chkButton();
                } else {
                    $scope.errLname = false
                    $scope.chkLname = true;
                    $scope.chkButton();
                }
            } else if (inputDat == 'apt_name') {
                if ($scope.reg.apt_name == null) {
                    $scope.errAname = true;
                    $scope.chkAptname = false;
                    $scope.chkButton();
                } else {
                    $scope.errAname = false
                    $scope.chkAptname = true;
                    $scope.chkButton();
                }
            }
        };

        // get apt location
        $scope.getApt = function () {
            garbageService.getApt()
                .then(function (res) {
                    $scope.apts = res.data;
                })
        };
        //$scope.getApt();

        // check password
        $scope.chkPass = function () {
            if ($scope.reg.pw1 == $scope.reg.pw2) {
                $scope.errPw = false;
                $scope.chkPw = true;
                $scope.chkButton();
            } else {
                $scope.errPw = true;
                $scope.chkPw = false;
                $scope.chkButton();
            }
        };

        $scope.chkButton = function () {
            if ($scope.chkPw == true & $scope.chkMail == true & $scope.chkFname == true & $scope.chkLname == true & $scope.chkAptname == true) {
                $scope.bchk = false;
            } else {
                $scope.bchk = true;
            }
        };

        $scope.init = {
            email: '',
            fname: '',
            lname: '',
            pw1: '',
            pw2: '',
            apt_name: ''
        }

        // insert data to database
        $scope.register = function () {
            console.log($scope.reg.apt_name.name);
            var link = url + '/garbage/gb_usr_insert.php';
            $http.post(link, $scope.reg)
                .then(function (res) {
                    //console.log(res.data);
                    $scope.successful = true;
                    $timeout(function () {
                        $scope.reg = angular.copy($scope.init);
                    }, 400);
                    $timeout(function () {
                        $window.location.href = "#!/login";
                    }, 800);
                });
        }
    })

    .controller("loginCtrl", function ($scope, $http, $window, loginService) {
        $scope.pageLocation = loginService.pageLocation;

        $scope.title = 'login';

        //login
        $scope.login2 = function () {
            var link = url + '/garbage/gb_login_action.php';
            $http.post(link, $scope.usr)
                .then(function (res) {
                    if (res.data.data[0].status == 'true') {
                        if ($scope.pageLocation == 'report') {
                            $window.location.href = "#!/report";
                        } else if ($scope.pageLocation == 'form') {
                            $window.location.href = "#!/form";
                        } else if ($scope.pageLocation == 'chart') {
                            $window.location.href = "#!/chart";
                        } else {
                            $window.location.href = "#!/form";
                        }
                    } else {
                        $scope.errorMsg = 'กรุณาลองใหม่อีกครั้ง';
                    }
                });
        };
    })

    .controller("mapCtrl", function ($scope, $rootScope, leafletMapEvents, leafletData,
        $http, $filter, $timeout, $window, $interval, loginService, garbageService, placeService) {

        $scope.title = 'map';
        $scope.center = garbageService.selectedLocation;
        $scope.pageLocation = loginService.pageLocation;

        //session
        var linkIn = url + '/garbage/gb_session.php';
        $http.get(linkIn)
            .then(function (res) {
                $scope.session = res.data.data;
                $scope.access_token = res.data.data[0].access_token;
                console.log(res.data.data[0].access_token);
                if ($scope.access_token == null) {
                    loginService.pageLocation = "map";
                    $window.location.href = "#!/login";
                }
            });


        $scope.logout = function () {
            var linkOut = url + '/garbage/gb_session.php?destroy=yes';
            $http.get(linkOut)
                .then(function (res) {
                    loginService.pageLocation = "map";
                    $window.location.href = "#!/login";
                })
        };

        if ($scope.center.lat == null) {
            //console.log('yess null');
            var center = {
                lat: 18.885497977462876,
                lng: 100.74462890625,
                zoom: 8
            }
        } else {
            var center = {
                lat: Number($scope.center.lat),
                lng: Number($scope.center.lng),
                zoom: 15
            };
            //console.log($scope.center.lat + '-' + $scope.center.lng);
        }

        angular.extend($scope, {
            center: center,
            layers: {
                baselayers: {
                    /*osm: {
                        name: 'OpenStreetMap',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        type: 'xyz'
                    },*/
                    bingRoad: {
                        name: 'Bing Road',
                        type: 'bing',
                        key: 'Aj6XtE1Q1rIvehmjn2Rh1LR2qvMGZ-8vPS9Hn3jCeUiToM77JFnf-kFRzyMELDol',
                        layerOptions: {
                            type: 'Road'
                        }
                    },
                    bingAerial: {
                        name: 'Bing Aerial',
                        type: 'bing',
                        key: 'Aj6XtE1Q1rIvehmjn2Rh1LR2qvMGZ-8vPS9Hn3jCeUiToM77JFnf-kFRzyMELDol',
                        layerOptions: {
                            type: 'Aerial'
                        }
                    },
                    bingAerialWithLabels: {
                        name: 'Bing Aerial With Labels',
                        type: 'bing',
                        key: 'Aj6XtE1Q1rIvehmjn2Rh1LR2qvMGZ-8vPS9Hn3jCeUiToM77JFnf-kFRzyMELDol',
                        layerOptions: {
                            type: 'AerialWithLabels'
                        }
                    }
                },
                overlays: {
                    pro: {
                        name: 'ขอบเขตจังหวัด',
                        type: 'wms',
                        visible: true,
                        url: url + '/gs-gb/wms?',
                        layerParams: {
                            layers: 'nan:province',
                            format: 'image/png',
                            transparent: true
                        },
                        zIndex: 4
                    },
                    amp: {
                        name: 'ขอบเขตอำเภอ',
                        type: 'wms',
                        visible: true,
                        url: url + '/gs-gb/wms?',
                        layerParams: {
                            layers: 'nan:amphoe',
                            format: 'image/png',
                            transparent: true
                        },
                        zIndex: 3
                    },
                    tambon: {
                        name: 'ขอบเขตตำบล',
                        type: 'wms',
                        visible: true,
                        url: url + '/gs-gb/wms?',
                        layerParams: {
                            layers: 'nan:tambon',
                            format: 'image/png',
                            transparent: true,
                            "showOnSelector": true,
                        },
                        zIndex: 2
                    },
                    village: {
                        name: 'หมู่บ้าน',
                        type: 'wms',
                        url: url + '/gs-gb/wms?',
                        layerParams: {
                            layers: 'nan:village',
                            format: 'image/png',
                            transparent: true,
                            "showOnSelector": true,
                        },
                        visible: false,
                        zIndex: 1
                    }
                } //end overlays 
            },
            defaults: {
                scrollWheelZoom: true,
                popup: {
                    maxWidth: 800
                }
            },
            //events: {},
            markers: {}
        });

        // Get the countries geojson data
        $scope.getJson = function () {
            garbageService.getJson()
                .then(function (data) {
                    //addGeoJsonLayerWithClustering(data.data);
                    var markers = L.markerClusterGroup();
                    var geoJsonLayer = L.geoJson(data.data, {
                        onEachFeature: function (feature, layer) {
                            layer.bindPopup(feature.properties.pat_desc);
                        }
                    });
                    markers.addLayer(geoJsonLayer);
                    leafletData.getMap().then(function (map) {
                        map.addLayer(markers);
                        //map.fitBounds(markers.getBounds());
                    });

                })
        };
        $scope.getJson();

        /* // refesh layer
        var refreshIntervalInSeconds = 30;
        var actualSeconds = 0;
        $interval(function() {
            if (actualSeconds === refreshIntervalInSeconds) {
                $scope.layers.overlays.v_dengue_point.doRefresh = true;
                console.log("Overlay refreshed.")
                actualSeconds = 0;
            } else {
                console.log("Next update of overlay in " + (refreshIntervalInSeconds - actualSeconds) + " seconds.");
                actualSeconds += 1;
            }
        }, 500);
        */

        // fix baselayers change
        $scope.$on('leafletDirectiveMap.baselayerchange', function (ev, layer) {
            //console.log('base layer changed to %s', layer.leafletEvent.name);
            angular.forEach($scope.layers.overlays, function (overlay) {
                if (overlay.visible) overlay.doRefresh = true;
            });
        });

        // add markers
        $scope.addPoint = false;
        var id = 1;

        $scope.markers = new Array();
        $scope.$on("leafletDirectiveMap.click", function (events, args) {
            var leafEvent = args.leafletEvent;

            if ($scope.addPoint == true) {
                $scope.markers.push({
                    getMessageScope: function () {
                        return $scope;
                    },
                    id: id,
                    lat: leafEvent.latlng.lat,
                    lng: leafEvent.latlng.lng,
                    message: '<form><div class="form-group">' +
                    '<label>รายละเอียด: </label><input type="text" class="form-control" ng-model= "dat.desc" ng-required="true" />' +

                    '<label>จังหวัด: </label><select class="form-control" ng-model="dat.prov" ng-options="p.prov_code as p.prov_name for p in province" ng-change="getAmp()" ng-required="true">' +
                    '<option value=""> </option></select>' +

                    '<label>อำเภอ:   </label><select class="form-control" ng-model="dat.amp" ng-options="a.amp_code as a.amp_name for a in amphoe" ng-change="getTam()" ng-required="true">' +
                    '<option value=""> </option></select>' +

                    '<label>ตำบล:   </label><select class="form-control" ng-model="dat.tam" ng-options="t.tam_code as t.tam_name for t in tambon" ng-change="getVill()" ng-required="true">' +
                    '<option value=""> </option></select>' +

                    '<label>หมู่บ้าน:    </label><select class="form-control" ng-model="dat.vill" ng-options="v.vill_code as v.vill_name for v in village" ng-required="true">' +
                    '<option value=""> </option></select>' +

                    '<div class="form-group"><label><strong>วันรายงาน:</strong> </label><input type="date" class="form-control" ng-model= dat.date_sick ng-required="true" /></div>' +
                    '</div>' +
                    '<button class="btn btn-success"type="submit" ng-click="insertMarker(); removeMarker(' + id + ')"><i class="icon-plus-sign icon-white"></i> เพิ่ม</button><span>  </span>' +
                    '<button class="btn btn-danger" type="submit" ng-click="removeMarker(' + id + ')"><i class="icon-minus-sign icon-white"></i> ยกเลิก</button></form>',
                    focus: true,
                    draggable: true
                });
                //console.log(id);
                id++;
                $scope.dat = { lat: leafEvent.latlng.lat, lng: leafEvent.latlng.lng };
            }
        });

        // select address
        $scope.dat = {
            prov: '',
            amp: '',
            tam: '',
            vill: ''
        };

        // get everything
        $scope.getProv = function () {
            placeService.getProv()
                .then(function (response) {
                    $scope.province = response.data;
                })
        };
        $scope.getProv();

        $scope.getAmp = function () {
            placeService.getAmp($scope.dat.prov)
                .then(function (response) {
                    $scope.amphoe = response.data;
                    $scope.tambon = [];
                    $scope.village = [];
                })
        };

        $scope.getTam = function () {
            placeService.getTam($scope.dat.amp)
                .then(function (response) {
                    $scope.tambon = response.data;
                    $scope.village = [];
                })
        };

        $scope.getVill = function () {
            placeService.getVill($scope.dat.tam)
                .then(function (response) {
                    $scope.village = response.data;
                })
        };

        // marker of everything 
        $scope.addMarkers = function () {
            $scope.addPoint = true;
        };

        $scope.removeMarker = function (item) {
            var latSearch = item;
            var foundItem = $filter('filter')($scope.markers, { id: latSearch }, true)[0];
            var index = $scope.markers.indexOf(foundItem);
            $scope.markers.splice(index, 1);
        };

        $scope.removeMarkers = function () {
            $scope.markers = new Array();
            $scope.addPoint = false;
        };

        // insert data 
        $scope.insertMarker = function () {

            var link = url + '/garbage/case_insert.php';
            //$http.post(link, {username : $scope.data.farmer_fname})
            $http.post(link, $scope.dat)
                .then(function (res) {
                    $scope.response = res.data;
                    // refesh layer
                    $timeout(function () {
                        $scope.getJson();
                    }, 400);
                });
        };

        //refesh
        $scope.reload = function () {
            location.reload();
        };
    })

    .controller("formCtrl", function ($scope, $http, $window, $timeout, garbageService, loginService) {
        $scope.title = 'form';

        // get apt location
        $scope.getApt = function () {
            garbageService.getApt()
                .then(function (res) {
                    $scope.apts = res.data;
                })
        };
        $scope.getApt();

        var d = new Date();
        var month = new Array();
        var m = month[d.getMonth()];
        //console.log(d.getFullYear());

        $scope.month = m;
        $scope.year = d.getFullYear();
        //$scope.month = moment().format('MMMM');

        //define initial
        $scope.initial = {
            apt_name: '',
            month: '',
            year: '',
            general: '',
            organic: '',
            recycle: '',
            hazard: '',
            electronic: '',
            dispose: '',
            cost: '',
            infect: '',
            infectClear: '',
            indust: '',
            industClear: '',
            collectPoint: '',
            remark: ''
        };

        $scope.insertGarbage = function () {
            var link = url + '/garbage/gb_insert.php';
            //$http.post(link, {username : $scope.data.farmer_fname})
            $http.post(link, $scope.gb)
                .then(function (res) {
                    $scope.response = res.data;
                });
            $timeout(function () {
                $scope.gb = angular.copy($scope.initial);
            }, 400);
        };

        $scope.cancelGarbage = function () {
            $scope.gb = angular.copy($scope.initial);
        };

        //refesh page
        $scope.reload = function () {
            location.reload();
        };

    })

    .controller('reportCtrl', function ($scope, $http, $window, garbageService, loginService) {
        $scope.title = 'report';

        $scope.loadGbPoint = function () {
            garbageService.loadGbPoint()
                //$http.get('http://localhost/hms-api/index.php/denguepoint')
                .then(function (res) {
                    $scope.dengues = res.data;
                    $scope.countRec = res.data.length;
                    //console.log(response.data);
                })
        };
        $scope.loadGbPoint();

        $scope.delete = function (item) {
            //console.log(item);
            $scope.dengues.splice($scope.dengues.indexOf(item), 1);

            var link = url + '/garbage/case_remove.php';
            $http.post(link, item)
                .then(function (res) {
                    $scope.response = res.data;
                    //delete $scope.data;
                });
        };

        //$scope.dat = { lat: '', lng: ''};
        $scope.goMap = function (lat, lng) {
            $scope.center = { lat: lat, lng: lng };
            garbageService.selectedLocation = $scope.center;
            //console.log(lat + '-' + lng);
        };

        //refesh page
        $scope.reload = function () {
            location.reload();
        };
    })

    .controller('calCtrl', function ($scope) {
        $scope.title = 'calculate';

        

        $scope.cal = function () {

            console.log($scope.ctype);

            if ($scope.ctype == 'a') {
                $scope.exp = {
                    organic: 0.19,
                    general: 0.5,
                    recycle: 0.3,
                    hazard: 0.01
                }
            } else if ($scope.ctype == 'b') {
                $scope.exp = {
                    general: 0.65,
                    organic: 0.02,
                    recycle: 0.29,
                    hazard: 0.04
                }
            } else if ($scope.ctype == 'c') {
                $scope.exp = {
                    general: 0.61,
                    organic: 0.03,
                    recycle: 0.32,
                    hazard: 0.04
                }
            } else if ($scope.ctype == 'd') {
                $scope.exp = {
                    general: 0.60,
                    organic: 0.03,
                    recycle: 0.34,
                    hazard: 0.03
                }
            } else if ($scope.ctype == 'e') {
                $scope.exp = {
                    general: 0.64,
                    organic: 0.03,
                    recycle: 0.31,
                    hazard: 0.03
                }
            } else if ($scope.ctype == 'f') {
                $scope.exp = {
                    general: 0.64,
                    organic: 0.02,
                    recycle: 0.30,
                    hazard: 0.03
                }
            } else if ($scope.ctype == 'g') {
                $scope.exp = {
                    general: 0.65,
                    organic: 0.02,
                    recycle: 0.29,
                    hazard: 0.03
                }
            } else if ($scope.ctype == 'h') {
                $scope.exp = {
                    general: 0.64,
                    organic: 0.03,
                    recycle: 0.30,
                    hazard: 0.04
                }
            } else if ($scope.ctype == 'i') {
                $scope.exp = {
                    general: 0.64,
                    organic: 0.03,
                    recycle: 0.30,
                    hazard: 0.03
                }
            }
        }

    })

    .controller('chartCtrl', function ($scope, $http, $window, loginService) {
        $scope.title = 'chart';

        $scope.optionBar = {
            title: {
                text: 'ปริมาณขยะรายเดือน',
                subtext: 'กก.'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['sales', 'purchases']
            },
            toolbox: {
                show: false
            },
            calculable: false,
            xAxis: [{
                type: 'category',
                data: ['1?', '2?', '3?', '4?', '5?', '6?', '7?', '8?', '9?', '10?', '11?', '12?']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'sales',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint: {
                    data: [{
                        type: 'max',
                        name: '???'
                    }, {
                        type: 'min',
                        name: '???'
                    }]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        name: '???'
                    }]
                }
            }, {
                name: 'purchases',
                type: 'bar',
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint: {
                    data: [{
                        name: 'sales',
                        value: 182.2,
                        xAxis: 7,
                        yAxis: 183,
                    }, {
                        name: 'purchases',
                        value: 2.3,
                        xAxis: 11,
                        yAxis: 3
                    }]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        name: '???'
                    }]
                }
            }]

        };

        $scope.optionRadar = {
            title: {
                text: 'ขยะแต่ละประเภท',
                subtext: 'กก.'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y: 'bottom',
                data: ['ปัจจุบัน', 'เดือนที่ผ่านมา']
            },
            toolbox: {
                show: true,
                feature: {
                    restore: {
                        show: true,
                        title: "Restore"
                    },
                    saveAsImage: {
                        show: true,
                        title: "Save Image"
                    }
                }
            },
            polar: [{
                indicator: [{
                    text: 'ขยะมูลฝอยทั่วไป',
                    max: 6000
                }, {
                    text: 'ขยะอินทรีย์',
                    max: 16000
                }, {
                    text: 'ขยะรีไซเคิล',
                    max: 30000
                }, {
                    text: 'ขยะอันตราย',
                    max: 38000
                }, {
                    text: 'ขยะอิเล็กทรอนิกส์',
                    max: 52000
                }]
            }],
            calculable: true,
            series: [{
                name: 'Budget vs spending',
                type: 'radar',
                data: [{
                    value: [4300, 10000, 28000, 35000, 50000],
                    name: 'ปัจจุบัน'
                }, {
                    value: [5000, 14000, 28000, 31000, 42000],
                    name: 'เดือนที่ผ่านมา'
                }]
            }]
        };

        $scope.config = {
            theme: 'default', //['default','vintage'];
            dataLoaded: true
        };

        //refesh page
        $scope.reload = function () {
            location.reload();
        };

    });
