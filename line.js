var Line = function(startPoint, endPoint) {
  this.startPoint = startPoint;
  this.endPoint = endPoint;
};

Line.prototype.isIntersectionWithLine = function(line) {
  var CCW = function(p1, p2, p3) {
    a = p1.getLon(); b = p1.getLat(); 
    c = p2.getLon(); d = p2.getLat();
    e = p3.getLon(); f = p3.getLat();
    return (f - b) * (c - a) > (d - b) * (e - a);
  };

  var p1 = this.startPoint;
  var p2 = this.endPoint;
  var p3 = line.startPoint;
  var p4 = line.endPoint;
  return (CCW(p1, p3, p4) != CCW(p2, p3, p4)) && (CCW(p1, p2, p3) != CCW(p1, p2, p4));
};


module.exports = Line;