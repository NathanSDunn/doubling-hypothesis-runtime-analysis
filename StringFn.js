/* 
 * JavaScript String operations
 * @author Nathan Dunn
 * 
 */
//Container function to run tests

string_reverse = function(string){
    var i = string.length, ret = "";
    for (i; i > -1; i--) {
        ret += string.charAt(i);
    }
    return ret;
    
};

//http://stackoverflow.com/questions/4859208/recursive-string-reversal-function-in-javascript
string_reverse_recursive = function(s){
    if (s === "") {
        return "";
    } else {
        return string_reverse_recursive(s.substr(1)) + s.charAt(0);
    }
};

//s.length is faster than null string
string_reverse_recursive2 = function(s){
    if (s.length===0) {
        return "";
    } else {
        return string_reverse_recursive(s.substr(1)) //run algorithm on rest of string
                + s.charAt(0);//return current character
    }
};
string_reverse_recursive3 = function(s){
    if (s.length===0) {
        return "";
    } else {
        return s.charAt(0) + string_reverse_recursive(s.substr(1)); //run algorithm on rest of string
                //return current character
    }
};

//how can I automate testing of this?
String.prototype.reverse = function() {
    var i = this.length, ret = "";
    for (i; i > -1; i--) {
        ret += this.charAt(i);
    }
    return ret;
};



StringFn_test = function() {
    console.log('\nUnit Testing of String prototype operations');

    //prepare test data
    var testInput = "abcdefghijklmnopqrstuvwxyz", testExpected = "zyxwvutsrqponmlkjihgfedcba";

    console.log('\n\nstring_reverse O(n)');
    errt(string_reverse, testInput, testExpected);
    
    console.log('\n\nstring_reverse_recursive O(n)');
    errt(string_reverse_recursive, testInput, testExpected);
    
    console.log('\n\nstring_reverse_recursive2 O(n)');
    errt(string_reverse_recursive2, testInput, testExpected);
    
    console.log('\n\nstring_reverse_recursive3 O(n)');
    errt(string_reverse_recursive3, testInput, testExpected);
    
    console.log('\n\nString.prototype.reverse "alphabet"');
    console.log(testInput.reverse());
};