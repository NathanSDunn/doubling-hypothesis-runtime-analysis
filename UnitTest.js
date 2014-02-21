
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
function runtimeIterations(fn, input, iterations) {
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
//returns runtime with a min time elapsed of 10ms (runtime was giving low values
//for some very fast functions, wanted to overcome this.)
function runtime(fn, input, iterations) {
    var i,start,end,ms=0,rt;    
    if (iterations === undefined){
        iterations = 10;
    }
    while (ms<10) {
        start = new Date().getTime();
        for (i = 1; i < iterations; i++) {
            fn(input);
        }
        end = new Date().getTime();
        ms=(end-start);
        iterations*=10;//not enough time elapsed, try more iterations
        //console.log('ms'+ms);
    }
    rt=ms/iterations;
    //console.log(start+'-'+end+'='+ms+'ms so ms/i='+ms+'/'+iterations+'='+rt);
    return rt;
}

//use lookup table to compute log base 2
//see http://jsperf.com/log-base-2/2 
log2lookupTable= [0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8, 31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9];
log2lookup=function (a) {
  return log2lookupTable[(a & -a) * 0x077CB531 >>> 27];
};

//compute with Math.log
mathLog2Val=Math.log(2);
lg=function(a){return Math.log(a) /mathLog2Val;};
analyse=DoublingHypothesisBounds;//pointer to the function
//attempts to find the order N^X big O of a function using the Doubling Hypothesis 
//inside a set of bounds and prints the results of the test to console
function DoublingHypothesisBounds(fn,inputFn,maxN,maxSamples){
    var N,input,time,R,runtimes={},a,b,og,minN,eqn,callback;//og=order of growth
    
    if (maxN===undefined){
        maxN=4000;
    }
        
    if (maxSamples===undefined){
        minN=maxN/Math.pow(2,2);//default to 3 runs
    } else {
        minN=maxN/Math.pow(2,(maxSamples-1));        
    }
    
    N=minN;
    maxN++;
    
    //compute the runtime of the function, doubling N each iteration
    for (;N<=maxN;N*=2){ 
        if (N>=1){
            input=inputFn(N);
            time=runtime(fn,input);
            runtimes[N]={};
            runtimes[N]['time']=time;
            
            if (runtimes[N/2]!==undefined){
                //work out ratio
                R=time/runtimes[N/2].time;
                //review https://class.coursera.org/algs4partI-004/lecture/14 to work out R values for different types of algorithms
                //rough estimates, compare experimentally
                //these seems inccorect, exponent should be equal to b but the lecture slides are different
                if (R<2.5){
                    if (R<1.2){
                        og='constant O(1)';
                    } else if (R<1.8) {
                        og='logarithmic O(log(N))';                
                    } else {
                        og='linear O(N)';
                    }            
                } else {
                    //>=2.5
                    if (R<3){
                        og='quadratic(N^2)';   
                    } else if (R<10) {
                        og='cubic(N^3)';                
                    } else {
                        og='exponential(2^N)';
                    }                     
                }
                runtimes[N]['R']=R;

                b=lg(R);
                runtimes[N]['lg(R)']=b;
                a=time/Math.pow(N,Math.round(b));
                runtimes[N]['a']=a;
                eqn=a+'N^'+Math.round(b)+'   b:'+b;
                console.log(eqn);
            }
        }
    }
    console.log('Tests:',runtimes,og); 
    //workout how to translate this into a proper cached function
    callback="function(N){return "+a+"* Math.pow(N,Math.round("+b+"));};";
    return callback;
}
