var GOAL = 700.0;
var printDebug = 0;
var INtotal, OUTtotal, TOTAL;
var best= [];
 //
 var data= [
   {name: '0.1',                    weight:  1, value:1, pieces:0},
   {name: '0.5',                weight: 5, value: 5, pieces:0},
   {name: '1.0',                  weight:10, value:10, pieces:0},
   {name: '2.0',               weight: 20, value: 20, pieces:0},
   {name: '5.0',                weight: 50, value: 50, pieces:0},
   {name: '10.0',                    weight: 100, value: 100, pieces:0},
   {name: '20.0',                 weight: 200, value: 200, pieces:0},
   {name: '50.0',                  weight: 500, value: 500, pieces:0},
   {name: '100.0',                 weight: 1000, value: 1000, pieces:0},
   {name: '200.0',                   weight: 2000, value: 2000, pieces:0}
 ];
 function getVal(v){
    if(v === "0.1" || v === 0)	return 0.1;
	if(v === "0.5" || v === 1)	return 0.5;
	if(v === "1" || v === 2)	return 1.0;
	if(v === "2" || v === 3)	return 2.0;
	if(v === "5" || v === 4)	return 5.0;
	if(v === "10" || v === 5)	return 10.0;
	if(v === "20" || v === 6)	return 20.0;
	if(v === "50" || v === 7)	return 50.0;
	if(v === "100" || v === 8)	return 100.0;
	if(v === "200" || v === 9)	return 200.0;
}
 function getI(v){
    if(v === "0.1" || v == 0.1)	return 0;
	if(v === "0.5" || v == 0.5)	return 1;
	if(v === "1" || v == 1)	return 2;
	if(v === "2" || v == 2)	return 3;
	if(v === "5" || v == 5)	return 4;
	if(v === "10" || v == 10)	return 5;
	if(v === "20" || v == 20)	return 6;
	if(v === "50" || v == 50)	return 7;
	if(v === "100" || v == 100)	return 8;
	if(v === "200" || v == 200)	return 9;
}
function validateNumber(str){
    for(var i=0; i<str.length; i++){
        if(str.charAt(i) != "0" && str.charAt(i) != "1"  && str.charAt(i) != "2"  && str.charAt(i) != "3"  && str.charAt(i) != "4"  && str.charAt(i) != "5"  && str.charAt(i) != "6"  && str.charAt(i) != "7"  && str.charAt(i) != "8"  && str.charAt(i) != "9"){
            return 0;
        }
    }
    return 1;
}
function sumAll(){
    var sum = 0.0;
   for(var i = 0; i< data.length; i++){
       sum += data[i].pieces * getVal(i);
    }
    TOTAL = sum;
    return sum;
}
function sumBest(){
    var sum = 0.0;
    for (var i= 0; i<best.length; i++) {
        if (best[i] == 0)   continue;
        sum += best[i] * (data[i].value/10);
    }
    INtotal = sum;
    return sum;
}
function setGoal(elem){
    //money type
    var moneyType = elem.id;
    console.log("elem.id: " + elem.id);
    //input
    var strInput = document.getElementById(elem.id).value;
    console.log("totalCounted: " + strInput);
    if(!validateNumber(strInput)){
        return;
    }
    var val;
    if(strInput == ""){
        val = 0;
    } else{
        val =  parseInt(strInput);
    }

    GOAL = val;
}
 function inp(elem){
    var countID, takeID, leaveID, id;
    //reset data
    for(let i=0; i<10; i++){
        if(getVal(i) == 0.1 || getVal(i) == 0.5){
            id = getVal(i);
        } else{
            id = parseInt(getVal(i));
        }
        takeID = "take" + id;
        leaveID = "leave" + id;
        console.log("RESET: takeID- " + takeID + " leaveID- " + leaveID);
        document.getElementById(takeID).innerHTML = "";
        document.getElementById(leaveID).innerHTML = "";
    }
    document.getElementById("leave").innerHTML = "0₪";
    document.getElementById("take").innerHTML = "0₪";
    
    //money type
    var moneyType = elem.id;
    console.log("elem.id: " + elem.id);
    var moneyVal = parseFloat(moneyType);
    //input
    var strInput = document.getElementById(elem.id).value;
    console.log("totalCounted: " + strInput);
    if(!validateNumber(strInput)){
        return;
    }
    var totalCounted;
    if(strInput == ""){
        totalCounted = 0;
    } else{
        totalCounted =  parseInt(strInput);
    }

    countID = "count" + moneyType;
    takeID = "take" + moneyType;
    leaveID = "leave" + moneyType;
    
    console.log("countID: " + countID + " takeID: " + takeID + " leaveID: " + leaveID);

    var str =  (moneyVal * totalCounted).toFixed(1) + "₪";
    document.getElementById(countID).innerHTML = str;
    //update data
    data[getI(moneyType)].pieces = totalCounted;
    console.log(data);
    document.getElementById("counted").innerHTML = sumAll() + "₪";
}

function printWhatDo(){
    var takeID = "take";
    var leaveID = "leave";
    var takeStr, leaveStr;
    var id, take=-1, leave=-1;
    for(var i=0; i<=9; i++){
        takeID = "take";
        leaveID = "leave";
        if(data[i].pieces <= 0)
            continue;
        if(getVal(i) == 0.1 || getVal(i) == 0.5){
            id = getVal(i);
        } else{
            id = parseInt(getVal(i));
        }
        
        takeID += id;
        leaveID += id;
        console.log("takeID: " + takeID + " leaveID: " + leaveID);
        //take out
        take = data[i].pieces - best[i];
        if(take < 0)    take = 0;
        takeStr  = "<h6 class='myh6'>(" + (take * getVal(i)) + "₪)</h6>";
        takeStr += "<h5 class='myh5'>" + take + "</h5>";
        document.getElementById(takeID).innerHTML = takeStr;
        //what will be
        leave = best[i];
        leaveStr  = "<h6 class='myh6'>(" + (leave * getVal(i)) + "₪)</h6>";
        leaveStr += "<h5 class='myh5'>" + leave + "</h5>";
        document.getElementById(leaveID).innerHTML = leaveStr;
    }
    document.getElementById("counted").innerHTML = sumAll() + "₪";
    document.getElementById("leave").innerHTML = sumBest() + "₪";
    document.getElementById("take").innerHTML = (TOTAL - INtotal) + "₪";
}
 function findBestPack() {
     var m= [[0]]; // maximum pack value found so far
     var b= [[0]]; // best combination found so far
     var opts= [0]; // item index for 0 of item 0 
     var P= [1]; // item encoding for 0 of item 0
     var choose= 0;
     for (var j= 0; j<data.length; j++) {
         opts[j+1]= opts[j]+data[j].pieces; // item index for 0 of item j+1
         P[j+1]= P[j]*(1+data[j].pieces); // item encoding for 0 of item j+1
     }
     for (var j= 0; j<opts[data.length]; j++) {
         m[0][j+1]= b[0][j+1]= 0; // best values and combos for empty pack: nothing
     }
     for (var w=1; w<= (GOAL*10); w++) {
         m[w]= [0];
         b[w]= [0];
         for (var j=0; j<data.length; j++) {
             var N= data[j].pieces; // how many of these can we have?
             var base= opts[j]; // what is the item index for 0 of these?
             for (var n= 1; n<=N; n++) {
                 var W= n*data[j].weight; // how much do these items weigh?
                 var s= w>=W ?1 :0; // can we carry this many?
                 var v= s*n*data[j].value; // how much are they worth?
                 var I= base+n; // what is the item number for this many?
                 var wN= w-s*W; // how much other stuff can we be carrying?
                 var C= n*P[j] + b[wN][base]; // encoded combination
                 m[w][I]= Math.max(m[w][I-1], v+m[wN][base]); // best value
                 choose= b[w][I]= m[w][I]>m[w][I-1] ?C :b[w][I-1];
             }
         }
     }
     for (var j= data.length-1; j>=0; j--) {
         best[j]= Math.floor(choose/P[j]);
         choose-= best[j]*P[j];
     }
     var out='<table><tr><td><b>Count</b></td><td><b>Item</b></td><th>unit weight</th><th>unit value</th>';
     var wgt= 0;
     var val= 0;
     for (var i= 0; i<best.length; i++) {
         if (0==best[i]) continue;
         out+='</tr><tr><td>'+best[i]+'</td><td>'+data[i].name+'</td><td>'+data[i].weight/10+'</td><td>'+data[i].value/10+'</td>'
         wgt+= best[i]*data[i].weight/10;
         val+= best[i]*data[i].value/10;
     }
     out+= '</tr></table><br/>Total weight: '+wgt;
     out+= '<br/>Total value: '+val;
    //document.getElementById('defTable').innerHTML= out;
 }
 function calc(){
    //check minimum
    if(sumAll() < GOAL){
        flashWarning("#counted");
        return;
    }
    findBestPack();
    printWhatDo();
}
 function flashWarning(id){
    $(id).addClass("myFlash");
    setTimeout(function() {
        $(id).removeClass("myFlash");
    }, 500);
}