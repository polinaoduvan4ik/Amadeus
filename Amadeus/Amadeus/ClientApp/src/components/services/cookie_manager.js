
let debug =false;
let domain =`.${document.location.hostname}`;
if(debug){
    console.log(domain);
}
class Cookie{
    constructor(name,value){
        this.name=name;
        this.value=value;
    }

    getName(){
        return `${this.name}`;
    }

    getValue(){
        return `${this.value}`;
    }
}
export default  class CookiesManager {
    static get(name) {
        const cookies = this.getAll();

        return cookies[name];
    }

    static getAll() {
        const pairs = document.cookie.split(';');
        const cookies = {};

        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            cookies[(pair[0] + '').trim()] = decodeURIComponent(pair[1]);
        }

        return cookies;
    }
    static set(name, value, days) {

        var d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = name + "=" + value+';domain='+domain + ";path=/;expires=" + d.toGMTString();
    }

    static clearAll() {
        var cookies = document.cookie.split("; ");

        var cookiesArray=[];
       
        for(let i=0;i<cookies.length;i++){
            let cookie = cookies[i];
            let name='';
            let value='';
            let flag = false;

            for(let j=0;j<cookie.length;j++){
                if(cookie[j]==='='){
                    flag = true;
                    continue;
                }
                if(!flag){
                    name+=cookie[j];
                }else{
                    value+=cookie[j];
                }
            }
            // console.log("Name: "+name);
            // console.log("Value: "+value );
            cookiesArray.push(new Cookie(name,value));
            
        }
        for (let i = 0; i < cookiesArray.length; i++) {
            //console.log("ALERT "+cookies[i].userName);
            let cookieName = cookiesArray[i].name;
            let cookieValue = cookiesArray[i].value;
           
            document.cookie = `${cookieName}=${cookieValue};domain=${domain};path=/;max-age=0`;
        }
    }
}