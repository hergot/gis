var Point = function(lat, lon) {
  this.lat = lat;
  this.lon = lon;
};

Point.prototype.getLat = function() {
  return this.lat;
};

Point.prototype.getLon = function() {
  return this.lon;
};

Point.prototype.equals = function(point) {
  return this.lat === point.lat && this.lon === point.lon;
};

Point.prototype.distance = function(point, unit) {
  unit = unit || 'km';
  var toRad = function() {
    return this * Math.PI / 180;
  };

  var lat2 = point.lat;
  var lon2 = point.lon;
  var lat1 = this.lat;
  var lon1 = this.lon;

  var R = 6371; // km 
  //has a problem with the .toRad() method below.
  var x1 = lat2-lat1;
  var dLat = toRad(x1);
  var x2 = lon2-lon1;
  var dLon = toRad(x2);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;

  switch (unit) {
    case 'km':
      return d;
    break;
    case 'm':
      return d * 1000;
    break;
    case 'cm':
      return d * 100000;
    break;
    default:
      throw new Error('Unknown distance unit "' + unit + '" - only supported are km, m, cm');
    break;
  }
};

module.exports = Point;