/* 
 * JavaScript Duplicate Finding algorithms
 * @author Nathan Dunn
 * 
 */

//brute force check for duplicates in an array
    var duplicates = function(array) {
        var i, ret = [], obj = {};
        var len = array.length;
        for (i = 0; i < len; i++) {
            //iterate through values
            if (array[i] in obj) {
                obj[array[i]]++;
                if (obj[array[i]] === 2) {
                    ret.push(array[i]);
                }
            }
            else {
                obj[array[i]] = 1;
            }
        }
        return ret;
    };


//optimised check for duplicates in an array - remove a loop
    var duplicates_opt = function(array) {
        var i, ret = [], obj = {};
        var len = array.length;
        for (i = 0; i < len; i++) {
            //iterate through values
            if (obj[array[i]] === undefined) {
                //val has occurred once
                obj[array[i]] = 1;
            } else if (obj[array[i]] === 1) {
                obj[array[i]] = 2;
                ret.push(array[i]);
            }
        }
        return ret;
    };

//optimised check for duplicates in an array - store obj value
    var duplicates_optm = function(array) {
        var i, currval, ret = [], obj = {};
        var len = array.length;
        for (i = 0; i < len; i++) {
            //iterate through values
            currval = obj[array[i]];//use curval to minimise obj accesses
            if (currval === undefined) {
                //val has occurred once
                obj[array[i]] = 1;
            } else if (currval === 1) {
                obj[array[i]] = 2;
                ret.push(array[i]);
            }
        }
        return ret;
    };

//optimised check for duplicates in an array - store obj value and array value
    var duplicates_optmm = function(array) {
        var i, currobj, currval, ret = [], obj = {};
        var len = array.length;
        for (i = 0; i < len; i++) {
            //iterate through values
            currval = array[i];//use currval to minimise array accesses
            currobj = obj[currval];//use currobj to minimise obj accesses
            if (currobj === undefined) {
                //val has occurred once
                obj[currval] = 1;
            } else if (currobj === 1) {
                obj[currval] = 2;
                ret.push(currval);
            }
        }
        return ret;
    };
//optimised check for duplicates in an array - store obj value and array value, remove comments to speed up parsing
    var duplicates_optmmc = function(array) {
        var i, currobj, currval, ret = [], obj = {};
        var len = array.length;
        for (i = 0; i < len; i++) {
            currval = array[i];
            currobj = obj[currval];
            if (currobj === undefined) {
                obj[currval] = 1;
            } else if (currobj === 1) {
                obj[currval] = 2;
                ret.push(currval);
            }
        }
        return ret;
    };

//optimised check for duplicates in an array - store obj value and array value, remove comments and mInify to speed up parsing
    var duplicates_optmmci = function(a) {
        var i, p, v, r = [], o = {};
        var len = a.length;
        for (i = 0; i < len; i++) {
            v = a[i];
            p = o[v];
            if (p === undefined) {
                o[v] = 1;
            } else if (p === 1) {
                o[v] = 2;
                r.push(v);
            }
        }
        return r;
    };

//sorts an array and checks for duplicates
    var sort_duplicates_sorted = function(array) {
        //copies and sorts an array (so as not to mess up the test input)
        return duplicates_sorted(array.slice().sort());
    };

//sorts an array and checks for duplicates
    var sort = function(array) {
        //copies and sorts an array (so as not to mess up the test input)
        return array.slice().sort();
    };

//checks for duplicates in a sorted array
    var duplicates_sorted = function(array) {
        var i, ret = [], len = array.length - 1;
        for (i = 0; i < len; i++) {
            //iterate through values, add to result if value is the same as it's neighbour & not already in results array        
            if (array[i] === array[i + 1] && ret[ret.length - 1] !== array[i])
            {
                ret.push(array[i]);
            }
        }
        return ret;
    };

//checks for duplicates using ECMAScript Array.prototype.reduce()
    var duplicates_reduce = function(array) {
        return array.reduce(function(ret, elem, index, arr) {
            //if ret is not dimensioned        
            if (typeof ret !== 'object') {
                ret = [];
            }
            //return if element is already in ret
            if (ret.indexOf(elem) > -1) {
                return ret;
            }
            //add element to ret array if the first or last identical element in arr does not match the current index
            if (arr.indexOf(elem) !== index || arr.lastIndexOf(elem) !== index) {
                ret.push(elem);
            }
            return ret;
        });
    };





//Perform the runtime tests
//define array size

//Container function to run tests
Dupes_test = function() {
    var sizeOfRandomArray = 20;

//------------------------DUPLICATE FINDING--------------------------------

    console.log('\n\n\n\n\n\nUnit Testing of Duplicates Algorithms (sorts and compares output arrays)');

//prepare test data
    var testInput = rndNumArray(sizeOfRandomArray), testSorted = testInput.slice().sort(), testExpected = duplicates(testInput);

//test the duplicate finding algorithms
    console.log('\nduplicates O(n^2)');
    errt(duplicates, testInput, testExpected);

//test the duplicate finding algorithms
    console.log('\nduplicates_opt O(n)');
    errt(duplicates_opt, testInput, testExpected);

    console.log('\nduplicates_optm O(n)');
    errt(duplicates_optm, testInput, testExpected);

    console.log('\nduplicates_optmm O(n)');
    errt(duplicates_optmm, testInput, testExpected);

    console.log('\nduplicates_optmmc O(n)');
    errt(duplicates_optmmc, testInput, testExpected);

    console.log('\nduplicates_optmmci O(n)');
    errt(duplicates_optmmci, testInput, testExpected);

    console.log('\n\nsort - time to copy and sort the array');
    errt(sort, testInput, testSorted);

    console.log('\n\nsort_duplicates_sorted O(n) + time to copy and sort the array');
    errt(sort_duplicates_sorted, testInput, testExpected);

    console.log('\n\nduplicates_sorted(pre-sorted_list) O(n)');
    errt(duplicates_sorted, testSorted, testExpected);

    console.log('\n\nduplicates_sorted(unsorted_list)-should fail if duplicates are not adjacent');
    errt(duplicates_sorted, testInput, testExpected);

    console.log('\n\nduplicates_reduce');
    errt(duplicates_reduce, testInput, testExpected);


    console.log('\n\n\n\n\n\nTESTS COMPLETE!');
};

//Container function to run tests
Dupes_analyse = function() {
    var db=DoublingHypothesisBounds;//pointer to the function

//------------------------DUPLICATE FINDING--------------------------------

    console.log('\n\n\n\n\n\nAnalysis of Duplicates Algorithms (sorts and compares output arrays)');

    //test runtime function
    console.log(runtime(duplicates, rndNumArray(20)));
//test the duplicate finding algorithms
    console.log('\nduplicates O(n^2)');
    db(duplicates, rndNumArray);

//test the duplicate finding algorithms
    console.log('\nduplicates_opt O(n)');
    db(duplicates_opt, rndNumArray);

    console.log('\nduplicates_optm O(n)');
    db(duplicates_optm, rndNumArray);

    console.log('\nduplicates_optmm O(n)');
    db(duplicates_optmm, rndNumArray);

    console.log('\nduplicates_optmmc O(n)');
    db(duplicates_optmmc, rndNumArray);

    console.log('\nduplicates_optmmci O(n)');
    db(duplicates_optmmci, rndNumArray);

    console.log('\n\nsort - time to copy and sort the array');
    db(sort, testInput, rndNumArray);

    console.log('\n\nsort_duplicates_sorted O(n) + time to copy and sort the array');
    db(sort_duplicates_sorted, rndNumArray);

    console.log('\n\nduplicates_sorted(pre-sorted_list) O(n)');
    db(duplicates_sorted, rndNumArray);

    console.log('\n\nduplicates_sorted(unsorted_list)-should fail if duplicates are not adjacent');
    db(duplicates_sorted, rndNumArray);

    console.log('\n\nduplicates_reduce');
    db(duplicates_reduce, rndNumArray);


    console.log('\n\n\n\n\n\nTESTS COMPLETE!');
};