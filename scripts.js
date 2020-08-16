// setup a list containing sentences of lorem lipsum
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at sodales lectus, eget dictum tellus. Praesent tincidunt orci ante, vitae tincidunt arcu sagittis non. Vestibulum quam mi, porttitor nec rutrum ut, mollis at metus. Nulla sagittis, diam id placerat varius, eros ante lacinia odio, a pharetra metus ex tincidunt urna. Nulla eget accumsan mauris. Aliquam et erat ut dolor tristique scelerisque. Maecenas a turpis non diam hendrerit condimentum. Praesent pretium, libero sit amet pulvinar euismod, elit metus mattis justo, at viverra dui augue in dui. Maecenas fermentum turpis eu nunc mollis dapibus. Cras et tristique nulla. Duis semper sagittis ante eget commodo. Suspendisse a enim et sem iaculis fringilla at sit amet ex. Aliquam ex nibh, efficitur eu scelerisque vel, fringilla venenatis libero. Maecenas molestie tellus vitae leo molestie, sit amet ultrices ligula fringilla. Phasellus dictum volutpat augue sed volutpat. Sed tristique sem in iaculis ultrices. Suspendisse ut elit congue, laoreet turpis vel, vehicula sem. Phasellus mollis arcu sem, quis tincidunt est finibus sed. Donec efficitur, nisl et posuere efficitur, felis ante faucibus nibh, ut finibus arcu lacus a nibh. Phasellus pulvinar sit amet arcu id consectetur. Sed nisi dui, gravida sit amet mi nec, finibus eleifend est. Curabitur gravida, libero ac mattis aliquam, metus massa gravida orci, eu eleifend diam dolor non ex. Phasellus vel convallis nisl, non pretium nulla. Vivamus at massa vitae ligula consequat posuere. Cras erat elit, viverra sit amet dui a, gravida varius tellus. Donec at mauris rhoncus, dictum turpis at, ullamcorper velit. Ut lobortis magna sit amet massa maximus, finibus laoreet leo pretium. Aenean ac tristique nibh. Aenean euismod pretium urna quis lobortis. Fusce condimentum odio non facilisis varius. Suspendisse tempus tristique molestie. Pellentesque ut orci vitae turpis pretium finibus eget vel eros. In risus felis, consectetur accumsan laoreet ut, pharetra in neque. Etiam placerat tristique scelerisque. Pellentesque lacinia auctor ante, et eleifend ligula pulvinar eget. Duis semper purus ac consequat sodales. Praesent congue, ante sit amet gravida vestibulum, diam velit consectetur mauris, consequat maximus nibh odio non mi. Nunc eu mi ac ante posuere sollicitudin. Cras commodo purus non vehicula pellentesque. Curabitur auctor mi vitae felis vulputate, sit amet consequat odio scelerisque. In vulputate lectus dignissim tortor eleifend dictum. Curabitur pulvinar libero nisl, vitae lobortis lorem vehicula posuere. Nulla lacinia mauris nunc, ac ornare nulla pharetra et. Quisque commodo, risus sit amet ultricies accumsan, lectus est aliquam justo, sed semper leo nibh ac dolor. Sed nibh velit, porttitor vitae tincidunt et, posuere sodales diam. Sed commodo, quam at sagittis congue, justo dui tempor augue, non congue risus velit ac ipsum. Nullam facilisis libero et nulla auctor, a ornare lacus consequat. Phasellus lobortis sit amet augue ac commodo. Aliquam condimentum elit non urna euismod vulputate. Vivamus venenatis sit amet ipsum at bibendum. Quisque scelerisque vel urna quis suscipit. Nam feugiat nec urna non euismod. Curabitur et purus bibendum justo feugiat auctor. Vestibulum nec rhoncus nibh, congue sollicitudin velit.";
const sentence = sentenceList(text);

document.getElementById("textInput").select();

// set eventlisteners for button click and enter press when input is selected
// to call update()
document.getElementById("inputSubmit").addEventListener('click',update);
document.getElementById("textInput").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        update();
    }
});

// clear error message on input change
document.getElementById("textInput").addEventListener('input', function (e) {
    document.getElementById("submit-error").innerHTML=``;
});

// calls different functions based on user input
function update(){

    // save the input value
    let value = document.getElementById("textInput").value;


    if (value==""){
        document.getElementById("submit-error").innerHTML=`<p>Kirjoita syöte.</p>`;
        return;
    }
    // set up list of objects that are "master"-objects properties, that have
    // their two methods: their unique function and toString(), that is also the command they respond to

    const list = [];
    for (let i=0; i < Object.keys(master).length; i++){
        list.push(Object.values(master)[i]);
    }

    // list containing of each above mentioned objects toString();
    const list_value = [];
    list.forEach(item => list_value.push(item.toString()));

    document.getElementById("textInput").select();

    // seperates parametrs if more than 1 word 
    let argumentz = seperateWords(value).slice(1);

    // check the value and call accordingly
    // compares given input to list_value, calling the corresponding object's function from list
    if (argumentz.length>0){
        if (list_value.indexOf(seperateWords(value)[0])>-1){ // if user inputs first word is found in list_value
         list[list_value.indexOf(seperateWords(value)[0])].func.apply(null,argumentz); // calls it with properly calling with arguments
         return;
        } else if (list_value.indexOf(value)>-1){ // ensures "tee popup" still works too
            list[list_value.indexOf(value)].func.apply(null,argumentz);
            return;
        }
    } else {
        if (list_value.indexOf(value)>-1){ //if no arguments (1 word)
            list[list_value.indexOf(value)].func();      
            return;
        }
    }

    if (isNumber(value) && value!=""){ // if input doesn't match any of the commands and is a number
       if (value<2001){ // ensure no too large operations
            number.func(value);
            return;
       } else{
           document.getElementById("submit-error").innerHTML=`<p>Liian korkea arvo!</p>`;
           return;
       }
     
    }
 
    // if the code gets to this point (input doesnt match anything) return an error
    document.getElementById("submit-error").innerHTML=`<p>Epäkelpo syöte.</p>`;
    
}


// ---------------------------------!!!!!!!!!!!!!!!!!!!!!!------------------------------------
// a) initiate objects that have 
//  1) individual functions ( Object.(func(opt value)) ) 
//  2) toString() that returns the string that it corresponds to when fed to site input
//      - in other words, the value of toString is the command the object reacts to
//
// b) set these objects as "master"-object's properties to call them through it

// func sets a text and a link for google
let google = {
    func(){
        clearElements(1);
        document.getElementById("lower-right").className = "lower-column"; // guarantee right style
        // establish element & it's inner HTML
        let div = document.createElement('div'); 
        div.innerHTML = `
            <p>Siirrytäänkö googleen?</p><br>
            <a href="https://google.fi" target="_blank">Kyllä</a>
             `;

        // set id for element
        div.className="divr"
        
        // append element to correct element (lower-left)
        document.getElementById("lower-right").appendChild(div);},

        // returns string the object corresponds to 
        toString(){
        return "google";
    }
}

// func parses toString()s from master objects properties (set up objects), and lists them
// on the document's lower-left -element. Makes the items links and creates eventlisteners for them
let lista = {
    func(){

        clearElements();
        const list = [];
        // list from master object
        for (let i=0; i < Object.keys(master).length; i++){
            list.push(Object.values(master)[i]);
        }
        let div = document.createElement('div');

        // parses list of viable commands(objects) and creates element that contains a list 
        // of each command's(object's) toString as a link to blank target
        //  with id of it's toString()
        div.innerHTML = `<ul>`;
        for (let i = 0; i < list.length; i++){
            div.innerHTML = div.innerHTML + `
            <li><a href="#" id="${list[i]}">${list[i]}</a></li>
            `;
        } 
        div.innerHTML = div.innerHTML + `</ul>`;
        //--------------------------------------------------------------

        // give class for identifying and place element
        div.className="divl"
        document.getElementById("lower-left").appendChild(div);

        // places an eventlistener for each added link on above mentioned list, targetting
        // id's on each link, calling a function that enters the links corresponding
        // toString() to the input element and moves selector to input
        for (let i = 0; i < list.length; i++){
            document.getElementById(`${list[i]}`).addEventListener("click", function(){{
                document.getElementById("textInput").value = `${list[i]}`;
                document.getElementById("textInput").select();
            }});
        }
        //----------------------------------------------------------------------------
        
    },
    toString(){
        return "listaa";
    }
}

// func places a picture on bottom-right
let eetu = {
    func(){
        clearElements(1);
        document.getElementById("lower-right").className = "lower-column"; // guarantee right style
        let div = document.createElement('div');

        div.innerHTML =`
            <img src="https://i.kym-cdn.com/photos/images/facebook/001/476/528/d03" alt="this is fine">
        `;
        div.className="divr"
        document.getElementById("lower-right").appendChild(div);

    },

    toString(){
        return "eetu";
    }
}

// func places value amount of random quotes in bottom-right
// with order number in front of each quote and <br> behind
let number = {

    fakevalue: Math.floor(Math.random()*100), //sets a random value to represent the command at listing
    func(value){
        clearElements(1);
        // due to how the function is called, this enables it to work when called with the value of number.fakevalue
        if (!value){ 
            value=this.fakevalue;
        }


        document.getElementById("lower-right").className = "lower-column"; // guarantee right style
        let div = document.createElement('div');
            // places i amount of random quotes with calling getRandomItem()
        div.innerHTML = "";
        for (let i = 0; i < value; i++){
            div.innerHTML = div.innerHTML + `<p>${i+1}. ${getRandomItem()}<p><br>
            `;
        }

        div.className="divr"
        document.getElementById("lower-right").appendChild(div);
        
    },
    toString(){
        return ""+this.fakevalue;
    }
}

// func plays a sound
let soita = {
    func(){

        var audio = new Audio('https://bigsoundbank.com/UPLOAD/mp3/0148.mp3');
        audio.play();

    },
    toString(){
        return "soita";
    }
}

// func creates a div with id=ilmestynyt with text
let popup = {
    func(){
        clearElements(1);
        document.getElementById("lower-right").className = "lower-column";
        let div = document.createElement('div');
        div.innerHTML = `<p>Tässä <b>pyydetty</b> popup.</p>`;
        div.id="ilmestynyt";
        div.className="divr"
        document.getElementById("lower-right").appendChild(div);
        
    },
    toString(){
        return "tee popup";
    }
}

// draws a canvas on lower-left element ~2,5times/second.
// canvas consists of random letters on a xy-coordinate system
let sade = {

    func(){
        clearElements(1);
        document.getElementById("lower-right").className = "lower-column"; // ensure right style

        // set up the canvas with proper id & class and add it
        let div = document.createElement('canvas');
        div.id="output";
        div.className="divr"
        document.getElementById("lower-right").appendChild(div);
        const outputCanvas = document.querySelector('#output'); // select canvas
        const outputContext = outputCanvas.getContext('2d'); // create context 
        let z=0; // counter to slowdown the update rate later
        // array of letters used for print
        outputContext.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', '+', '-', '*', '/', '=', '%', '"', '\'', '#', '&', '_', '(', ')', ',', '.', ';', ':', '?', '!', '\\', '|', '{', '}', '<', '>', '[', ']', '^', '~'];
        // ------------------------------------------
        
        const processFrame = () =>{ // actual function that draws the canvas
            // get the size from canvas, that is sized based on parent element
            let positionInfo = outputCanvas.getBoundingClientRect();
            let height = positionInfo.height;
            let width = positionInfo.width;
            const fontHeight = 15; // set font size
            z++;
            if(z%20==0){ // counter to slowdown the update rate
            if (width && height){
                outputCanvas.height = height;
                outputCanvas.width = width;
                // set font
                // fontWidth and fontHeight are used for size of 1 row/column
                outputContext.font = `bold ${fontHeight}px Courier`; // monospace font for constant row width / better look
                const text = outputContext.measureText('@');
                const fontWidth = parseInt(text.width); 
                outputContext.textBaseline = 'top'; // prints at correct position relative to coordinates

                for (let x = 0; x < width; x += fontWidth){
                    for (let y = 0; y < height; y += fontHeight){ // fontWidth and fontHeight are used for size of 1 row/column
                        let c = Math.floor(Math.random()*170); // random 0-170 used later for color
                        let opacity = Math.random()*0.5;

                        // fades out the edges
                        if (x<2 || x > width-2*fontWidth-1 || y < 2 || y > height - 2*fontHeight-1){
                            opacity = Math.random()*0.2;
                        }
                        let color = "rgba("+c + ","+c+","+c+","+opacity+")"; // sets random rgb 0-170 gray
                        // rare red letters
                        if (Math.random()>0.95){
                            color = "rgba(200,0,0,"+opacity+")";
                        }
                        
                        // sets style ands draws letters (twice with different char for effect)
                        outputContext.fillStyle = color;
                        let char1 = outputContext.letters[Math.floor(Math.random()*outputContext.letters.length)];
                        let char2 = outputContext.letters[Math.floor(Math.random()*outputContext.letters.length)];
       
                        outputContext.fillText(char1,x,y);
                        outputContext.fillText(char2,x,y);
                    }
                }
            }
            }
            window.requestAnimationFrame(processFrame) // calls upon itself to keep animating
        }

        processFrame();
    },
    toString(){
        return "sade";
    }
}

// toggles colors of certain elements of the page
let colorToggle = {
    toggle: 0,
    func() {
        if (this.toggle==0){
            document.getElementById("wrapwrapper").style.backgroundColor=`#e7e7e7`
            document.getElementById("wrapper").style.backgroundColor=`#e7e7e7`
            document.getElementById("upper").style.backgroundColor=`#A09CAB`
            document.getElementById("lower-wrap").style.backgroundColor=`#A09CAB`
            document.getElementById("user-input").style.backgroundColor=`#3E3D4A`
            document.getElementById("user-submit").style.backgroundColor=`#3E3D4A`
            document.getElementById("lower-left").style.backgroundColor=`#3E3D4A`
            document.getElementById("lower-right").style.backgroundColor=`#3E3D4A`
            this.toggle = 1;
        } else {
            document.getElementById("wrapwrapper").style.backgroundColor=`#F6F9F8`
            document.getElementById("wrapper").style.backgroundColor=`#F6F9F8`
            document.getElementById("upper").style.backgroundColor=`#97BFCB`
            document.getElementById("lower-wrap").style.backgroundColor=`#97BFCB`
            document.getElementById("user-input").style.backgroundColor=`#2A7488`
            document.getElementById("user-submit").style.backgroundColor=`#2A7488`
            document.getElementById("lower-left").style.backgroundColor=`#2A7488`
            document.getElementById("lower-right").style.backgroundColor=`#2A7488`
            this.toggle = 0;
        }
        
    },
    toString(){
        return "väri";
    }
}


// func takes 2 inputs.
// 1. input's 1. word is used to create functions name / the command it answers to,
// with rest of input's words saved as parameters
// 2. input is the code that is executed through eval
//
// comments: i) doesnt handle strings (or something inside brackets/parentehesis) 
// as parametres (seperates them via spaces) <= change the function that breaks the input down
// ii) Doesn't check for existing commands <= compare to a list
// iii) Doesn't properly check the input code for what is a variable when transcripting
// the code, so in "komento a" "alert(a);" both a's in the code "alert(a)" will
// be treted as variable a and breaks the code. <= modify the transcript function to
// be smart about correctly finding what is a variable (inside bracket/paranthesis, next to space, dot, operators)
// iv) limited amount of parameters (5) <= not sure, smarter code (something relating to func(a)(b)(c) style of coding?)
// However I decided to leave it be as is considering the assigment.
let addOwnCode = {
    func(){ 
        const list = []; // updated list for later use
        for (let i=0; i < Object.keys(master).length; i++){
            list.push(Object.values(master)[i]);
        }
        clearElements(1);
        clearElements();
        alert(`HUOM! Kirjoita & suorita omaa koodia omalla vastuullasi.
Jos koodi rikkoo apin, avaa sivu uudestaan.`);



        // ------------------SETUP ELEMENTS---------------------------------------------
        // ------------------SETUP ELEMENTS LEFT
        document.getElementById("lower-right").className = "lower-column2"; // change style of lower-right element
        let div10 = document.createElement("div");
        div10.className="divr";
        div10.innerHTML = `<p>Anna komento, joka suorittaa koodin</p>`
        let div20 = document.createElement("div");
        div20.className="divr";
        div20.innerHTML = `<p>Anna suoritettava koodi</p>`
        let div1 = document.createElement("input");
        div1.type = "text";
        div1.className = "divr";
        div1.id = "create_input_name"
        let div2 = document.createElement("textarea");
        div2.type = "text";
        div2.className = "divr";
        div2.id = "create_input_code";
        let div3 = document.createElement("input");
        div3.type ="button";
        div3.id="send_input_code";
        div3.className="divr";
        div3.value = `Lähetä`;
        div2.placeholder = `alert('moi');
alert(param1);` //placeholder for code input
        div1.placeholder = `komento param1 param2 param3`; //placeholder for command + param input
        document.getElementById("lower-right").appendChild(div10);
        document.getElementById("lower-right").appendChild(div1);
        document.getElementById("lower-right").appendChild(div20);
        document.getElementById("lower-right").appendChild(div2);
        document.getElementById("lower-right").appendChild(div3);
        div1.select();  
        // ------------------SETUP ELEMENTS RIGHT 
        let div4 = document.createElement("div");
        div4.className="divl";
        div4.innerHTML = `<h2>Oman koodisi kirjoitus</h2>
            <p>Jos käytät koodissasi parametrejä tai muuttujia, nimeä ne uniikisti(väh. 4 merkkiä), jotta ohjelman toiminta saattaa jatkua häiriöttömänä.</p>
            <p>HUOM! Kirjoita & suorita omaa koodia omalla vastuullasi.
            Jos koodi rikkoo apin, lataa sivu uudestaan.</p>`;
        document.getElementById("lower-left").appendChild(div4);
        // ----------------------------------------
        // ----------------------------------------------------------------------------------



        // if enter pressed on upper input selects lower input
        div1.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                if (div1.value.length>0){
                    div2.select();            
                }
            }
        });
        
        // eventlistener for button click
        div3.addEventListener('click', function (e) {
            
                if (div1.value.length>0 & div2.value.length>0){
                    if (confirm(`Haluatko asettaa komennon: ${div1.value}
koodilla:
${div2.value}`)){ // confirm inputs
                    
                    // if 1st input has parametres saves them in an array & creates "blank" parametrs for later calls
                    let args = [];
                    if (wordCount(div1.value) > 1){
                        args = seperateWords(div1.value);
                    }
                    for (let i = 0; i < 6; i++){
                        args.push("");
                    }
                    let funcname = args[0]; // saves the functions name / call signal

                    // generalizes user given parametres inside the "code" (=lower text input) to different strings ("param0","param1",..)
                    // done because the "code" is a string that is evaluated
                    // code has 5 param max
                    let funcUpdated = updateFunction(div2.value,args[1],args[2],args[3],args[4],args[5]);
                    
                    // creates an object as master object's property
                    // making it correspond to funcname and func to essentially eval(input 2)
                    master[funcname]= {
                        func(param0,param1,param2,param3,param4,param5) { evalFunction(funcUpdated,param0,param1,param2,param3,param4,param5) },
                        toString() { return funcname },
                    }
  
                    if (document.getElementsByClassName("divl").length>0){ // if lista is drawn update it
                        const list = [];
                        for (let i=0; i < Object.keys(master).length; i++){
                            list.push(Object.values(master)[i]);
                        }
                        lista.func(list);
                    }
                    clearElements(1);
                    
                    document.getElementById("textInput").select();
                    }
                }
            
        });

 

    },
    toString(){
        return "koodaa";
    }
}

let refreshPage = {
    func(){
        window.location.reload(true);
    },
    toString(){
        return "refresh"
    }

}

// "master" object.
// if we want to add commands to the program, we add objects as properties
// with 1) function named func and 2) toString() (string) that determines what input calls the func
let master = {
    f1: lista,
    f2: google,
    f3: soita,
    f4: popup,
    f7: eetu,
    f8: number,
    f5: sade,
    f6: colorToggle,
    f9: addOwnCode,
    f10: refreshPage,
}


// ---------------------------------!!!!!!!!!!!!!!!!!!!!!!------------------------------------
//                                   supporting functions




// evaluates a string as function, str may have parameters written "OIKLKXPOW0" (random letters) etc
function evalFunction(str, OIKLKXPOW0, OIKLKXPOW1, OIKLKXPOW2, OIKLKXPOW3, OIKLKXPOW4, OIKLKXPOW5){

    for (let i = 1; i<6; i++){
        if (isNumber(arguments[i])){
            
            arguments[i] = +arguments[i];
        }
    }
        eval(str);
    
}

// returns if n is a number
function isNumber(n){ 
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}


// replaces any found arg in str to corresponding OIKLKXPOW0, OIKLKXPOW1,...OIKLKXPOWN
// (OIKLKXPOW is a random sequence of letters that is unlikely found in user inputted code)
function updateFunction(str, ...args){

    for (let i = 0; i < args.length; i++){
        if (args[i].length>0){
            if (str.indexOf(args[i])>-1){
                let index = str.indexOf(args[i]);
                return str = updateFunction(str.slice(0,index)+`OIKLKXPOW${args.indexOf(args[i])}`+str.slice(index+args[i].length),...args);             
            }
        }
    }

    return str;
}



// clears the user's command input line and clears elements from bottom-left & bottom-right elements
// by default value clears bottom-left element. on value 1 clears bottom-right element.
function clearElements(direction=0){

    document.getElementById("textInput").value='';
    if (direction==1){
        if (document.getElementsByClassName("divr").length>0){
            document.getElementsByClassName("divr")[0].parentNode.removeChild(document.getElementsByClassName("divr")[0]);
            clearElements(1);
        }
    } else{ 
        if (document.getElementsByClassName("divl").length>0){
            document.getElementsByClassName("divl")[0].parentNode.removeChild(document.getElementsByClassName("divl")[0]);
            clearElements();
        }

    }
}

// returns a list of items' generated from str's sentences (separeted by ". ")
function sentenceList(str){
    let sentence = [];
    let temp = "";
    for (let i = 0, len = text.length; i < len; i++){
        if (text.charAt(i)!="."){
            temp = temp + text.charAt(i);
        } else{
            sentence.push(temp);
            temp = "";
            i++;
        }
    }

    return sentence;
}

// returns a list that containing words in str seperated by " "
function seperateWords(str){
    let result=[];
    let temp ="";

    for (let i=0;i<str.length;i++){
                            
        if (str[i]!=" "){
            temp = ""+temp + str[i];
        } else if (str[i] = " " && temp != ""){
         
          result.push(temp);
          temp = "";
      }

    }
    if (temp!=""){
        result.push(temp);
    }
    return result;
}

//returns a random item from sentence -variable (initiated at 4. line)
function getRandomItem(){
    return sentence[Math.floor(Math.random()*sentence.length)];
}

// gives wourd count of str (wordsd are seperated by " ")
function wordCount(str){

    let count=1;
    for (let i = 0, len = str.length; i < len; i++){
        if (str[i]==" " && i!=len-1 && str[i+1]!=" "){ count++ }
    }
    return count;
}