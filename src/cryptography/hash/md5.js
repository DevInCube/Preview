
var MD5 = {};

MD5.hash = function(message) {
	var L = message.length;
	var bytes = toUTF8Array(message);
    bytes.push(0x80);
    var len = bytes.length * 8;
    var mod = len % 512;
    if(mod < 448) {
        var numBytes = (448 - mod) / 8;
        while(numBytes-- > 0)
            bytes.push(0x00);
    } else {
        Logger.error("Not implemented!");
    }	
    Logger.debug("Padding to 448 moulo 512 \r\n[\r\n" + printBytes(bytes) + "\r\n]");
    var messageBits = L * 8;
    var lenBytes = longToByteArray(messageBits);
    Logger.debug("length: " + printBytes(lenBytes));
    for(var i = 0; i < 4; i++) {
        bytes.push(lenBytes[4 + i]);
    }
    for(var i = 0; i < 4; i++) {
        bytes.push(lenBytes[i]);
    }
    Logger.debug("Adding length bits " + (bytes.length * 8) + " \r\n[\r\n" + printBytes(bytes) + "\r\n]");
    var MD = [];
    var A = 0x67452301;
    var B = 0xEFCDAB89;
    var C = 0x98BADCFE;
    var D = 0x10325476;
    
    var F = function(X,Y,Z) { return (X & Y ) | (~ X & Z); };
    var G = function(X,Y,Z) { return  (X & Z ) | (Y & ~ Z); };
    var H = function(X,Y,Z) { return  X ^ Y ^ Z; };
    var I = function(X,Y,Z) { return  Y ^ (X | ~ Z); };
    
    var T = new Array(64);
    for(var i = 0; i < T.length; i++) {
        T[i] = Math.floor(Math.abs(Math.sin(i)) * Math.pow(2,32));        
    }
    
    //rounds
    var R1 = function(a,b,c,d,X,s,i) {
      a = b + ((a + F(b,c,d) + X + T[i]) << s);
      return a; 
    };
    var R2 = function(a,b,c,d,X,s,i) {
      a = b + ((a + G(b,c,d) + X + T[i]) << s);
      return a;
    };
    var R3 = function(a,b,c,d,X,s,i) {
      a = b + ((a + H(b,c,d) + X + T[i]) << s);
      return a;
    };
    var R4 = function(a,b,c,d,X,s,i) {
      a = b + ((a + I(b,c,d) + X + T[i]) << s);
      return a;
    };
    var M = bytes;
    var N = M.length;
    var msgLen = N / 16;    
    for(var k = 0; k < N; k++) {
         var AA = A;
         var BB = B;
         var CC = C;
         var DD = D;
         var X = new Array(16);         
         for(var i = 0; i < 16; i ++) {
             X[i] = byteArrayToLong(M.slice(i, i + msgLen));
             //Logger.trace(X[i]);
         }     
         
         /* Round 1. Do 16 operations. */
         R1(A,B,C,D,X[ 0], 7, 1) ;
         R1(D,A,B,C,X[ 1],12, 2) ;
         R1(C,D,A,B,X[ 2],17, 3) ;
         R1(B,C,D,A,X[ 3],22, 4) ;
         R1(A,B,C,D,X[ 4], 7, 5) ;
         R1(D,A,B,C,X[ 5],12, 6) ;
         R1(C,D,A,B,X[ 6],17, 7) ;
         R1(B,C,D,A,X[ 7],22, 8) ;
         R1(A,B,C,D,X[ 8], 7, 9) ;
         R1(D,A,B,C,X[ 9],12,10) ;
         R1(C,D,A,B,X[10],17,11) ;
         R1(B,C,D,A,X[11],22,12) ;
         R1(A,B,C,D,X[12], 7,13) ;
         R1(D,A,B,C,X[13],12,14) ;
         R1(C,D,A,B,X[14],17,15) ;
         R1(B,C,D,A,X[15],22,16) ;
        
         /* Round 2. Do 16 operations. */
         R2(A,B,C,D,X[ 1], 5,17)  ;
         R2(D,A,B,C,X[ 6], 9,18)  ;
         R2(C,D,A,B,X[11],14,19)  ;
         R2(B,C,D,A,X[ 0],20,20)  ;
         R2(A,B,C,D,X[ 5], 5,21)  ;
         R2(D,A,B,C,X[10], 9,22)  ;
         R2(C,D,A,B,X[15],14,23)  ;
         R2(B,C,D,A,X[ 4],20,24)  ;
         R2(A,B,C,D,X[ 9], 5,25)  ;
         R2(D,A,B,C,X[14], 9,26)  ;
         R2(C,D,A,B,X[ 3],14,27)  ;
         R2(B,C,D,A,X[ 8],20,28)  ;
         R2(A,B,C,D,X[13], 5,29)  ;
         R2(D,A,B,C,X[ 2], 9,30)  ;
         R2(C,D,A,B,X[ 7],14,31)  ;
         R2(B,C,D,A,X[12],20,32)  ;
         
         /* Round 3. Do 16 operations. */
         R3(A,B,C,D,X[ 5], 4,33)  ;
         R3(D,A,B,C,X[ 8],11,34)  ;
         R3(C,D,A,B,X[11],16,35)  ;
         R3(B,C,D,A,X[14],23,36)  ;
         R3(A,B,C,D,X[ 1], 4,37)  ;
         R3(D,A,B,C,X[ 4],11,38)  ;
         R3(C,D,A,B,X[ 7],16,39)  ;
         R3(B,C,D,A,X[10],23,40)  ;
         R3(A,B,C,D,X[13], 4,41)  ;
         R3(D,A,B,C,X[ 0],11,42)  ;
         R3(C,D,A,B,X[ 3],16,43)  ;
         R3(B,C,D,A,X[ 6],23,44)  ;
         R3(A,B,C,D,X[ 9], 4,45)  ;
         R3(D,A,B,C,X[12],11,46)  ;
         R3(C,D,A,B,X[15],16,47)  ;
         R3(B,C,D,A,X[ 2],23,48)  ;
        
         /* Round 4. Do 16 operations. */
         R4(A,B,C,D,X[ 0], 6,49) ;
         R4(D,A,B,C,X[ 7],10,50) ;
         R4(C,D,A,B,X[14],15,51) ;
         R4(B,C,D,A,X[ 5],21,52) ;
         R4(A,B,C,D,X[12], 6,53) ;
         R4(D,A,B,C,X[ 3],10,54) ;
         R4(C,D,A,B,X[10],15,55) ;
         R4(B,C,D,A,X[ 1],21,56) ;
         R4(A,B,C,D,X[ 8], 6,57) ;
         R4(D,A,B,C,X[15],10,58) ;
         R4(C,D,A,B,X[ 6],15,59) ;
         R4(B,C,D,A,X[13],21,60) ;
         R4(A,B,C,D,X[ 4], 6,61) ;
         R4(D,A,B,C,X[11],10,62) ;
         R4(C,D,A,B,X[ 2],15,63) ;
         R4(B,C,D,A,X[ 9],21,64) ;    
         
         A = A + AA;
         B = B + BB;
         C = C + CC;
         D = D + DD;
    }
    Logger.debug([A,B,C,D]);
    A = longToByteArray(A, msgLen);
    B = longToByteArray(B, msgLen);
    C = longToByteArray(C, msgLen);
    D = longToByteArray(D, msgLen);
    Logger.debug([A,B,C,D]);
    A.reverse();
    B.reverse();
    C.reverse();
    D.reverse();
    var resultArr = [
        A, B, C, D
    ];    
    Logger.debug(resultArr);
}

function printBytes(arr) {
    var res = '';
    arr.forEach(function(el, i, a) { res += dec2Bin(el) + " "; });
    return res;
}

var longToByteArray = function(/*long*/long, len) {
    // we want to represent the input as a 8-bytes array
    if(!len) len = 8;
    var byteArray = new Array(len);

    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = long & 0xff;
        byteArray [ byteArray.length - index - 1 ] = byte;
        long = (long - byte) / 256 ;
    }

    return byteArray;
};

var byteArrayToLong = function(/*byte[]*/byteArray) {
    var value = 0;
    for ( var i = byteArray.length - 1; i >= 0; i--) {
        value = (value * 256) + byteArray[i];
    }

    return value;
};

function dec2Bin(dec) {
    var str;
    if(dec >= 0) {
        str = dec.toString(2);
    }
    else {
        /* Here you could represent the number in 2s compliment but this is not what 
           JS uses as its not sure how many bits are in your number range. There are 
           some suggestions http://stackoverflow.com/questions/10936600/javascript-decimal-to-binary-64-bit 
        */
        str = (~dec).toString(2);        
    }
    var pad = "00000000";
    var ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
}


function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18), 
                      0x80 | ((charcode>>12) & 0x3f), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}