
//---------------------------------------------unit testing functions
//tests if two arrays are equal
function arrays_equal(a, b) {
    a.sort();
    b.sort();
    return !(a < b || b < a);
}

//creates a random array of numbers with size=elements, min value=1 and max value=elements
function rndNumArray(elements) {
    var i, ret = [];
    for (i = 0; i < elements; i++) {
        ret.push(Math.ceil(Math.random() * elements));
    }
    return ret;
}

//tests a function against a specific condition and profiles runtime
function errt(fn, testCondition, expected, iterations) {
    var i, res,date;
    if (iterations === undefined){
        iterations = 1000000;
    }
    console.time('errt*'+iterations);
    for (i = 0; i < iterations; i++) {
        res = fn(testCondition);
    }
    console.timeEnd('errt*'+iterations);
    if ((typeof(res) === 'object' && arrays_equal(res, expected))
            || res === expected)
    {
        console.log('PASS:');
        console.log(fn);
        console.log('Test:  ' + testCondition);
        console.log('Result:' + res);
        console.log('.......... PASS ..........');
        return false;
    }
    else
    {
        console.log('FAIL:');
        console.log(fn);
        console.log('Test:    ' + testCondition);
        console.log('Result:  ' + res);
        console.log('Expected:' + expected);
        console.log('*FAIL*FAIL*FAIL*FAIL*FAIL*');
        return true;
    }
}

//returns runtime
function runtime(fn, input, iterations) {
    var i;    
    if (iterations === undefined){
        iterations = 10000;
    }
    var start = new Date().getMilliseconds();
    for (i = 0; i < iterations; i++) {
        fn(input);
        
    }
    var end = new Date().getMilliseconds();
    var ms=(end-start)/iterations;
    console.log(start+'-'+end+'='+(end-start)+'...'+(end-start)+'/'+iterations+'='+ms);
    return ms;
}
//attempts to find the order N^X big O of a function using the Doubling Hypothesis 
//inside a set of bounds and prints the results of the test to console
function DoublingHypothesisBounds(fn,inputFn,minN,maxN){
    var N,input,time,R,runtimes={};
    if (minN===undefined){
        minN=250;
    }
    if (maxN===undefined){
        maxN=8001;
    }
    maxN++;
    
    //run the first operation
    input=inputFn(N);
    time=runtime(fn,input);
    runtimes[N]['time']=time;
    N*=2;
    //compute the runtime of the function, doubling N each iteration
    for (;N<=maxN;N*=2){        
        input=inputFn(N);
        time=runtimes(fn,input);
        runtimes[N]=time;
        R=time/runtimes[N/2];
        runtimes[N]['R']=R;
        runtimes[N]['lgR']=Math.log2(R);
    }
    console.log('Tests:',runtimes);    
}