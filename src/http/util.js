    import {NetInfo} from "react-native";

    //Default headers to make request
    const default_headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    /*
    make the string request parameters to append to the URL
    params = JSON object
    example: 
    paramsExample={
    id: 1,
    title: "Hello World",
    titles: ["Hello1","Hello2","Hello3"],
    year: 2016
    };
    makeURLParams(paramsExample) ==> id=1&title=Hello World&titles=Hello1&titles=Hello2&titles=Hello3&year=2016
    */
    function makeURLParams(params)
    {
      let arrayParams = Object.keys(params).map(function(k) { 
      if( Object.prototype.toString.call( params[k] ) === '[object Array]' ) {
      let x="";
      for(let i=0;i<params[k].length;i++){
        x += i==0 ? k+"="+params[k][i] : "&"+k+"="+params[k][i];
      } 
      return x;
    } else{
      return k+"="+params[k];
    }
    });
      let stringParams="";
      for(let i=0;i<arrayParams.length;i++){
        stringParams += i==0 ? arrayParams[i] : "&"+arrayParams[i];
      }
      return stringParams;
    }

    /*
    *Configure the request depending the type: GET, POST, PUT, DELETE
    in the case of PUT and DElETE is necesarry append to the URL the identifier parameter to delete or update 
    */
    function configureRequest(url, method, params, headers){
      let config;
      let params2 = makeURLParams(params);
      let url2 = params2 == "" ? url :  url+"?"+ params2;
      let newURL= method != "GET" ? url : url2;
      switch(method){
        case "GET": case "DELETE": config= {
        method: method,
        headers: headers
      };
        break;

        case "POST": case "PUT": config= {
        method: method,
        headers: headers,
        body: JSON.stringify(params)
      };
        break;

        default:break;
      }
      let result= {url: newURL,config: config};
      return result;
    }

    /*treat by promise
    */
    async function request(url, method, params, headers)
    {
        let method2=method==undefined ? "" : method.toUpperCase();
        let params2= params == undefined ? {} : params;
        let headers2= headers == undefined ? default_headers : headers;
        let config= configureRequest(url, method2, params2, headers2);
        let response = await fetch(config.url,config.config);
        
        return response;
    }

    /*treat by promise
    validateInternetConnection().then(response =>alert(JSON.stringify(response)));
    */
    async function validateInternetConnection() 
    {
        let response= await NetInfo.isConnected.fetch();
        return response;
    }


  	export default
     {
     request,
     validateInternetConnection
    };