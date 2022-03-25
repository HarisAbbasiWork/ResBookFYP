var array2=[98,12,89,43,56,76]

var secondhigh=null
var high=null
for(i=0;i<array2.length;i++){
    if(array2[i]>high){
        if(secondhigh!=null){
            secondhigh=high
        }
        high=array2[i]
    }else{
        if(secondhigh==null||array2[i]>secondhigh){
            secondhigh=array2[i]
        }
    }
}

console.log("secondhigh",secondhigh,"high",high)