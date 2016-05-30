var Polygon = function(points) {
  if (points.length < 3) {
    throw new Error('Polygon needs at least 3 points');
  }
  this.points = points;
};

Polygon.prototype.containsPoint = function(point) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point.getLon(), y = point.getLat();

    var inside = false;
    for (var i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
        var xi = this.points[i].getLon(), yi = this.points[i].getLat();
        var xj = this.points[j].getLon(), yj = this.points[j].getLat();

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

Polygon.prototype.buffer = function(offset) {
  var circle = function(centerPoint, radius, steps) {
    steps = steps || 16;
    var points = [];
    for (var i = 0; i < steps; i++) {
      var lat = (centerPoint.getLat() + radius * Math.cos(2 * Math.PI * i / steps));
      var lon = (centerPoint.getLon() + radius * Math.sin(2 * Math.PI * i / steps));
      points.push(new Point(lat, lon));
    }
    return new Polygon(points);
  };

  var angle = function(line) {
    var dlat = line.getEndPoint().getLat() - line.getStartPoint().getLat();
    var dlon = line.getEndPoint().getLon() - line.getStartPoint().getLon();
    var theta = Math.atan2(dlat, dlon); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    return theta < 0 ? 360 + theta : theta;
  };
};

module.exports = Polygon;