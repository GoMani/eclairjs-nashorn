/**
 * New LabeledPoint node file
 */

var LabeledPoint = function(x, y) { 
	if ( y == null) {
		print("Java object");
		this._jvmLabeledPoint = x;
	} else {
		var features = org.apache.spark.mllib.linalg.Vectors.dense(y)
		this._jvmLabeledPoint = new org.apache.spark.mllib.regression.LabeledPoint(x, features);

	}
	
}

LabeledPoint.prototype.getLabel = function() {
	return this._jvmLabeledPoint.label();
}

LabeledPoint.prototype.getFeatures = function() {
	// FIXME: need to convert Vector to array before returning
	return this._jvmLabeledPoint.features();
}

/*LabeledPoint.prototype.toString() = function() {
	return this._jvmLabeledPoint.toString();
}*/

LabeledPoint.prototype.parse = function(string) {
	var lp = org.apache.spark.mllib.regression.LabeledPoint.parse(s);
	var l = new LabeledPoint(lp);
}

LabeledPoint.prototype.getJavaObject = function(string) {
	//print("getJavaObject");
	return this._jvmLabeledPoint;
}

var labeledPointFromJavaObject = function(javaObject) {
	print("labeledPointFromJavaObject");
	return new LabeledPoint(javaObject);
}


