let flagURL="https://flagcdn.com/16x12/ua.png";
let countURL="";

///this is the same url from which i have taken flag
let fNameurl="https://flagcdn.com/en/codes.json";


//main link base link---https://v6.exchangerate-api.com/v6/8d15d435f6522ba66b9db9ca/latest/USD 

let currencyUrl="https://v6.exchangerate-api.com/v6/8d15d435f6522ba66b9db9ca/latest";


////another testing currency ap 


//accesssing html elements
let dropdown=document.querySelectorAll(".select select");
let btn=document.querySelector("#excBtn");


let fromCurr=document.querySelector("#from select");
let toCurr=document.querySelector("#to select");
let result=document.querySelector("#result");
///------------////

///adding country name to select dropdown options//
let data;
let convertedValue;
let img


const setOptions=(data)=>{
   
    for( select of dropdown){
        for( currencyCode in countryList){
            let newOption=document.createElement("option");
// console.log("currency code:",currencyCode, "country code:",countryList[currencyCode]);
          
            newOption.value=currencyCode;
            newOption.textContent=`${countryList[currencyCode]}`;

            if(select.name==="from" && currencyCode==="USD"){
                newOption.selected="selected";
                let usimg=document.querySelector("#from img");
                usimg.src=`https://flagcdn.com/16x12/${countryList[currencyCode].toLowerCase()}.png`;
                
            }
            else if(select.name==="to" && currencyCode==="INR"){
                newOption.selected="selected";

                let inimg=document.querySelector("#to img");
                inimg.src=`https://flagcdn.com/16x12/${countryList[currencyCode].toLowerCase()}.png`;
              
            }
            select.append(newOption);
            
            
        }
        select.addEventListener("change",(evt)=>{
            setFlag(evt.target);


        }
        );
    
    }

}









const  countryFlag =async ()=>{
   let response= await fetch(fNameurl);
    data=await response.json();
 

setOptions(data);



//for loop that get country code//
// for  (code in data ){
//     console.log("country code=",code);
//     console.log("country name=",data[code])
// }

}
countryFlag();

const setFlag=(element)=>{
 
    console.log(element);
    console.log(element);
    let currencyCode=element.value;
    console.log("currency code=",currencyCode);
    let countryCode=document.querySelector(`option[value=${currencyCode}]`).textContent;
    console.log("country code is---",countryCode.toLowerCase());

    
   
  img= element.parentElement.querySelector("img");
   let newSrc=`https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`;
img.src=newSrc;



}






// countrt=currencyValue=async()=>{
//     let response= await fetch(currencyUrl);
//     let currencyData= await response.json();
//     console.log(currencyData);
// }
// currencyValue();


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    console.log("exchange btn clicked");
    let amount=document.querySelector("#input input");
    let amtValue=amount.value;
    console.log(amtValue);

   
    let fromCurrCode=fromCurr.value;
    let toCurrCode=toCurr.value;
    console.log(fromCurrCode,toCurrCode);


let fromExchangeURL=`${currencyUrl}/${fromCurrCode}`;
console.log(fromExchangeURL)


const   getFromCurr =async ()=>{
    let response= await fetch(fromExchangeURL);
    let fromCurrData= await response.json();
    let ConversionRate=fromCurrData.conversion_rates;
    console.log(ConversionRate );

 

   console.log(ConversionRate[toCurrCode]);
  
   

   convertedValue=ConversionRate[toCurrCode]*amtValue;
  
result.textContent=`${amtValue} ${fromCurrCode} = ${convertedValue} ${toCurrCode}`



}
getFromCurr();




})