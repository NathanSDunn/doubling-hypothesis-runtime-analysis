/* 
 * JavaScript Summing algorithms
 * @author Nathan Dunn
 * 
 */

//Sums all values of an array
var sum = function(array) {
    var ret = 0, len = array.length, i;
    for (i = 0; i < len; i++) {
        ret += array[i];
    }
    return ret;
};

//Sums all values of an array using ECMAScript Array.prototype.reduce()
var sum_reduce = function(array) {
    return array.reduce(function(sum, elem) {
        return sum + elem;
    });
};

//from https://class.coursera.org/algs4partI-004/lecture/11
threeSum = function(a) {
        var N = a.length;
        var cnt = 0;
        for (var i = 0; i < N; i++) {
            for (var j = i+1; j < N; j++) {
                for (var k = j+1; k < N; k++) {
                    if (a[i] + a[j] + a[k] == 0) {
                        cnt++;
                    }
                }
            }
        }
        return cnt;
    } 

threeSum_analyse = function(){    
    var db=DoublingHypothesisBounds;//pointer to the function
    
    //test the duplicate finding algorithms
    console.log('\nthreesum O(n^3)');
    db(threeSum, rndNumArray);
}

Sum_test = function() {
    var sizeOfRandomArray = 20;

//------------------------SUMMING--------------------------------
    console.log('\n\n\n\n\n\nUnit Testing of Summing Algorithms');
//prepare test data
    var testInput = rndNumArray(sizeOfRandomArray), testSorted = testInput.slice(), testExpected = sum(testInput);

//test the sum algorithms
    console.log('\nsum');
    errt(sum, testInput, testExpected);

    console.log('\n\nsum_reduce');
    errt(sum_reduce, testInput, testExpected);
};