var MONTH_NAMES = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
];

function monthDiff(date1, date2) {
    var yDiff = date1.getFullYear() - date2.getFullYear();
    var mDiff = date1.getMonth() - date2.getMonth();
    var result = yDiff * 12 + mDiff;
    return result;
}

function formatDate(date) {
    return date.getDate() + ' ' + MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear();
}

function distance(point1, point2){
  return (google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000).toFixed(2);
}