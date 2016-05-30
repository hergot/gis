var Polygon = function(points) {
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
  var circle = function(centerX, centerY, radius, steps) {
    steps = steps || 16;
    var result = [];
    for (var i = 0; i < steps; i++) {
      var x = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
      var y = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
      result.push(new Point(x, y));
    }
    return result;
  };
  
};

module.exports = Polygon;