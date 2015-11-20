var url = 'event-stats.json';
// var url = 'https://api-test.mynextrun.com/site/v1/event-stats?jsoncallback=?';
// default location
var initialLocation = new google.maps.LatLng(60.1675899,24.9214712);
    var markerList = [];

// marker img here
var markerImg = {
    currentPos: new google.maps.MarkerImage (
        'http://www.apkdad.com/wp-content/uploads/2013/04/Circle-Local-Social-Network-Icon-150x150.png',
        null, 
        null, 
        null, 
        new google.maps.Size(24, 24)
    ),
    runningEvent: new google.maps.MarkerImage (
        'http://www.healthymen.ca/resources/content_running-man--green.png',
        null, 
        null, 
        null, 
        new google.maps.Size(16, 16)
    ),
    event: {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 0.5,
        fillColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeColor: '#fff000',
        strokeWeight: 2.0, 
        scale: 5
    }
};

function loadEvent(data) {    
    google.maps.event.addDomListener(window, 'load', initMap(data));
}

function initMap(data) {

    var mapProp = {
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapProp);

    // get user location    
    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            // set map center
            setCenterMarker(initialLocation, map);
            // load markers
            loadMarkers(data, initialLocation, map);
        }, function() {
            // set map center as the default position
            setCenterMarker(initialLocation, map);
            // load markers
            loadMarkers(data, initialLocation, map);
        });
    } else {
        // set map center as the default position
        setCenterMarker(initialLocation, map);
        // load markers
        loadMarkers(data, initialLocation, map);
    }    

    google.maps.event.addListener(map, "center_changed", function() { 
        mapCenter = {lat: map.getCenter().lat(), lng: map.getCenter().lng()};        
    });    
}

function loadMarkers(data, initialLocation, map) {    
    for (var i = 0; i < data.events.length; i++) {
        setEventMarker(data.events[i], map, initialLocation);
    }    
}

function setEventMarker(event, map, initialLocation) {
    var r_event = new RunningEvent(event);    

    r_event.setDistanceToCenter(distance(r_event.latlng, initialLocation));
    
    var infowindow = new google.maps.InfoWindow({
        content: r_event.infoText()
    });

    var eventMarker = new google.maps.Marker({
        position: r_event.location,
        map: map,
        icon: r_event.markerIcon(),
        date: r_event.date

    });

    markerList.push(eventMarker);    

    eventMarker.addListener('click', function() {
        infowindow.open(map, eventMarker);
        map.setZoom(12);
        map.setCenter(r_event.location);
    });
}

function setCenterMarker(pos, map) {
    map.setCenter(pos);

    var centerMarker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: markerImg.currentPos,
    });

    var infowindow = new google.maps.InfoWindow({
        content: 'You are here: <br>'
    });

    centerMarker.addListener('click', function() {
        infowindow.open(map, centerMarker);
        map.setZoom(12);
    });
}

function monthDiff(date1, date2) {
    var yDiff = date1.getFullYear() - date2.getFullYear();
    var mDiff = date1.getMonth() - date2.getMonth();
    var result = yDiff * 12 + mDiff;
    // return date1 > date2 ? result : -result;
    return result;
}

// load data
$.ajax({
    url: url,
    dataType: 'json',
    success: function(data){
      loadEvent(data);
    }
});

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});


// date slider
// Create a new date from a string, return as a timestamp.
function timestamp(str){
    return new Date(str).getTime();   
}

var dateSlider = document.getElementById('daterange');

noUiSlider.create(dateSlider, {
    start: [ timestamp('Nov 2015'), timestamp('2017') ],
    step: 24 * 60 * 60 * 1000,
    range: {
        min: timestamp('Nov 2015'),
        max: timestamp('2017')
    },
});

var dateValues = [
    document.getElementById('startdate'),
    document.getElementById('enddate')
];

dateSlider.noUiSlider.on('update', function( values, handle ) {
    var dateStart = new Date(parseFloat(values[0]));
    var dateEnd = new Date(parseFloat(values[1]));

    $('#startdate').val(formatDate(dateStart));    
    $('#enddate').val(formatDate(dateEnd));
    setMarkerVisibility(markerList, dateStart, dateEnd);
});

function setMarkerVisibility(markerList, dateStart, dateEnd) {
    if (!dateStart) {
        dateStart = new Date('01-01-1900');
    }
    if (!dateEnd) {
        dateEnd = new Date('01-01-2100');
    }

    for (var i = 0; i < markerList.length; i++) {
        //markerslist[i].setMap(map);
        if (markerList[i].date < dateStart || markerList[i].date > dateEnd ) {
            markerList[i].setVisible(false);
        } else {
            markerList[i].setVisible(true);
        }

    }
}

$('#startdate').change(function() {    
    setDate();
});
$('#enddate').change(function() {    
    setDate();
});

function setDate() {
    var dateStart = new Date($('#startdate').val());
    var dateEnd = new Date($('#enddate').val());    
    dateSlider.noUiSlider.set([timestamp(dateStart), timestamp(dateEnd)]);
    setMarkerVisibility(markerList, dateStart, dateEnd);
}