/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * We need to load SparkContext.js and SparkConf.js in order to create SparkContext
 * The SparkContext will load the rest of sparkJS files. So these are the oly two 
 * the user has to explicitly load. 
 */

var sparkContext = new SparkContext("local[*]", "mllib Unit test");

var LinearRegressionWithSGDTest = function(file) {
	
	var sc = sparkContext;
	
	var data = sc.textFile(file).cache();
	var scopeVars = {};
	var parsedData = data.map( function(s) { 
		var parts = s.split(",");
		var features = parts[1].split(" "); 
		return new LabeledPoint(parts[0], new DenseVector(features));
	 });
	//var t = parsedData.take(5);
	//print("take 5 = " + JSON.stringify(parsedData.take(5)));
	var numIterations = 3;
	/* var */ linearRegressionModel = LinearRegressionWithSGD.train(parsedData, numIterations); // Due to JUNIT scoping these need to be global
	/* var */ delta = 17; // Due to JUNIT scoping these need to be global
	var valuesAndPreds = parsedData.mapToPair(function(lp, linearRegressionModel, delta) {
		var label = lp.getLabel();
		var f = lp.getFeatures();
		var prediction = linearRegressionModel.predict(f) + delta;
		return new Tuple(prediction, label);
	}, [linearRegressionModel, delta]); // end MapToPair
	
	//print("valuesAndPreds: " + valuesAndPreds.take(10).toString());
    /*valuesAndPreds.map(function(s){
        print(s)
        return s
    }).collect()*/
	return valuesAndPreds.take(10).toString();
	//return valuesAndPreds.take(10).toString();
}

var AssociationRulesTest = function() {
    load("examples/mllib/association_rules_example.js");
    return run(sparkContext);
}

var BisectingKMeansExample = function() {
    load("examples/mllib/bisecting_k_means_example.js");
    return JSON.stringify(run(sparkContext));
}

var DecisionTreeClassificationExample = function() {
    load("examples/mllib/decision_tree_classification_example.js");
    var result = run(sparkContext);
    var json = {};
    json.testErr = result.testErr;
    json.depth = result.model.depth();
    json.nodes = result.model.numNodes();
    if (result) {
        return "successful";
    } else {
        return "failed";
    }
}

var DecisionTreeRegressionExample = function() {
    load("examples/mllib/decision_tree_regression_example.js");
    var result = run(sparkContext);
    var json = {};
    json.testMSE = result.testMSE;
    json.depth = result.model.depth();
    json.nodes = result.model.numNodes();
    if (result) {
        return "successful";
    } else {
        return "failed";
    }
}

var fpGrowthExample = function() {
    load("examples/mllib/fp_growth_example.js");
    var result = run(sparkContext, true);
    return JSON.stringify(result);
}

var GradientBoostingClassificationExample = function() {
    load("examples/mllib/gradient_boosting_classification_example.js");
    var result = run(sparkContext);
    var json = {};
    json.testErr = result.testErr;
    json.summary = result.model.toString();
    print(JSON.stringify(json))
    if (result) {
        return "successful";
    } else {
        return "failed"
    }
}

var GradientBoostingRegressionExample = function() {
    load("examples/mllib/gradient_boosting_regression_example.js");
    var result = run(sparkContext);
    var json = {};
    json.testMSE = result.testMSE;
    json.summary = result.model.toString();
    if (result) {
        return "successful";
    } else {
        return "failed"
    }
}

var IsotonicRegressionExample = function() {
    load("examples/mllib/isotonic_regression_example.js");
    var result = run(sparkContext);
    var json = {};
    json.meanSquaredError = result.meanSquaredError;
    return JSON.stringify(json);
}

var KMeansExample = function() {
    load("examples/mllib/kmeans_example.js");
    var result = run(sparkContext);
    if (result.cost > 0) {
        return "all is good";
    } else {
        return "Error running test"
    }
}

var binaryClassificationMetricsExample = function() {
    load("examples/mllib/binary_classification_metrics_example.js");
    var result = run(sparkContext);
    if (result) {
        return "all is good";
    } else {
        return "Error running test"
    }
}

var lbfgsExample = function() {
    load("examples/mllib/lbfgs_example.js");
    var result = run(sparkContext);
    return result.auROC;
}

var ldaExample = function() {
    load("examples/mllib/lda_example.js");
    var result = run(sparkContext);
    return result.vocabSize;
}

var lrExample = function() {
    load("examples/mllib/lr_example.js");
    var result = run(sparkContext);
    return JSON.stringify(result);
}