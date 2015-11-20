function RunningEvent (event) {    
    this.name = event.eventName;
    this.time = event.eventDate;
    this.lat = event.latitude;
    this.lng = event.longitude;
    this.date = new Date(this.time);
    // location in obj lat lng
    this.location = { lat: this.lat, lng: this.lng };
    // location in google format
    this.latlng = new google.maps.LatLng(this.lat, this.lng)
    this.distanceToCenter = 0;

    this.dateStr = function() {        
        return formatDate(this.date);
    };

    this.infoText = function() {        
        return '<b>' + this.name + '</b><br/>' + this.dateStr() + '<br>' + this.distanceToCenter + ' km away from you';
    };

    this.setMarker = function() {

    }

    this.markerIcon = function() {
        var now = new Date();    
        var monthToEvent = monthDiff(this.date, now);
        // hue: how close the event in time aspect
        var hue = monthToEvent * 10;
        if (hue > 120) {
            hue = 120;
        }
        var fillColor = 'hsl('+ hue + ', 80%, 50%)';

        // opacity: how close the event in distance aspect
        // var opacity = 1 - this.distanceToCenter;

        return {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 0.7,
            fillColor: fillColor,
            strokeOpacity: 1.0,
            strokeColor: 'green',
            strokeWeight: 0.0, 
            scale: 10
        };
    }

    this.setDistanceToCenter = function(d) {
        this.distanceToCenter = d;
    }    
}