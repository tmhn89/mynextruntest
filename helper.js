function monthDiff(date1, date2) {
    var yDiff = date1.getFullYear() - date2.getFullYear();
    var mDiff = date1.getMonth() - date2.getMonth();
    var result = yDiff * 12 + mDiff;
    return result;
}

function distance(point1, point2){
  return (google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000).toFixed(2);
}

// var rad = function(x) {
//   return x * Math.PI / 180;
// };

// // return the distance between two points, in kilometer
// function distance(lat1, lng1, lat2, lng2) {
//   var R = 6371; // Radius of the earth in km
//   var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
//   var dLon = (lon2-lon1).toRad(); 
//   var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//           Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
//           Math.sin(dLon/2) * Math.sin(dLon/2); 
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//   var d = R * c; // Distance in km
//   return d;
// }