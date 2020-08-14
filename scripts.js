
// setup a list containing sentences of lorem lipsum
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at sodales lectus, eget dictum tellus. Praesent tincidunt orci ante, vitae tincidunt arcu sagittis non. Vestibulum quam mi, porttitor nec rutrum ut, mollis at metus. Nulla sagittis, diam id placerat varius, eros ante lacinia odio, a pharetra metus ex tincidunt urna. Nulla eget accumsan mauris. Aliquam et erat ut dolor tristique scelerisque. Maecenas a turpis non diam hendrerit condimentum. Praesent pretium, libero sit amet pulvinar euismod, elit metus mattis justo, at viverra dui augue in dui. Maecenas fermentum turpis eu nunc mollis dapibus. Cras et tristique nulla. Duis semper sagittis ante eget commodo. Suspendisse a enim et sem iaculis fringilla at sit amet ex. Aliquam ex nibh, efficitur eu scelerisque vel, fringilla venenatis libero. Maecenas molestie tellus vitae leo molestie, sit amet ultrices ligula fringilla. Phasellus dictum volutpat augue sed volutpat. Sed tristique sem in iaculis ultrices. Suspendisse ut elit congue, laoreet turpis vel, vehicula sem. Phasellus mollis arcu sem, quis tincidunt est finibus sed. Donec efficitur, nisl et posuere efficitur, felis ante faucibus nibh, ut finibus arcu lacus a nibh. Phasellus pulvinar sit amet arcu id consectetur. Sed nisi dui, gravida sit amet mi nec, finibus eleifend est. Curabitur gravida, libero ac mattis aliquam, metus massa gravida orci, eu eleifend diam dolor non ex. Phasellus vel convallis nisl, non pretium nulla. Vivamus at massa vitae ligula consequat posuere. Cras erat elit, viverra sit amet dui a, gravida varius tellus. Donec at mauris rhoncus, dictum turpis at, ullamcorper velit. Ut lobortis magna sit amet massa maximus, finibus laoreet leo pretium. Aenean ac tristique nibh. Aenean euismod pretium urna quis lobortis. Fusce condimentum odio non facilisis varius. Suspendisse tempus tristique molestie. Pellentesque ut orci vitae turpis pretium finibus eget vel eros. In risus felis, consectetur accumsan laoreet ut, pharetra in neque. Etiam placerat tristique scelerisque. Pellentesque lacinia auctor ante, et eleifend ligula pulvinar eget. Duis semper purus ac consequat sodales. Praesent congue, ante sit amet gravida vestibulum, diam velit consectetur mauris, consequat maximus nibh odio non mi. Nunc eu mi ac ante posuere sollicitudin. Cras commodo purus non vehicula pellentesque. Curabitur auctor mi vitae felis vulputate, sit amet consequat odio scelerisque. In vulputate lectus dignissim tortor eleifend dictum. Curabitur pulvinar libero nisl, vitae lobortis lorem vehicula posuere. Nulla lacinia mauris nunc, ac ornare nulla pharetra et. Quisque commodo, risus sit amet ultricies accumsan, lectus est aliquam justo, sed semper leo nibh ac dolor. Sed nibh velit, porttitor vitae tincidunt et, posuere sodales diam. Sed commodo, quam at sagittis congue, justo dui tempor augue, non congue risus velit ac ipsum. Nullam facilisis libero et nulla auctor, a ornare lacus consequat. Phasellus lobortis sit amet augue ac commodo. Aliquam condimentum elit non urna euismod vulputate. Vivamus venenatis sit amet ipsum at bibendum. Quisque scelerisque vel urna quis suscipit. Nam feugiat nec urna non euismod. Curabitur et purus bibendum justo feugiat auctor. Vestibulum nec rhoncus nibh, congue sollicitudin velit.";
const sentence = sentenceList(text);

// set eventlisteners for button click and enter press when input is selected
// to call update()
document.getElementById("inputSubmit").addEventListener('click',update);
document.getElementById("textInput").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        update();
    }
});


document.getElementById("textInput").addEventListener('input', function (e) {
    console.log("w");
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
    // set up list of objects ("input commands") that have
    // their two methods: their unique function and toString()
    const list = [google,lista,eetu,number,soita,popup,sade,colorToggle];

    // list containing of each above mentioned objects toString();
    const list_value = [];
    list.forEach(item => list_value.push(item.toString()));
    
    document.getElementById("textInput").select();
    
 

    // check the value and call accordingly
    // compares given input to list_value, calling the corresponding object's function from list
    if (list_value.indexOf(value)>-1){
        list[list_value.indexOf(value)].func(list, value);
        return;
    }

    if (!isNaN(value) && value!=""){
       if (value<2001){
            number.func(value);
            return;
       } else{
           document.getElementById("submit-error").innerHTML=`<p>Liian korkea arvo!</p>`;
           return;
       }
     
    }


    
    document.getElementById("submit-error").innerHTML=`<p>Epäkelpo syöte.</p>`;
    
}
// ---------------------------------!!!!!!!!!!!!!!!!!!!!!!------------------------------------
// initiate objects that have 
// 1) individual functions ( Object.(func(opt value)) ) 
// 2) toString() that returns the string that it corresponds to when fed to site input
// in other words, the value of toString is the command the object reacts to

let google = {
    func(){
        clearElements(1);

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

let lista = {
    func(list){
        clearElements();

        let div = document.createElement('div');

        // parses list of viable commands(objects) and creates element that contains a list 
        // of each command's(object's) toString as a link to blank target
        //  with id of its toString()
        div.innerHTML = `<ul>`;
        for (let i = 0; i < list.length; i++){
            div.innerHTML = div.innerHTML + `
            <li><a href="#" id="${list[i]}">${list[i]}</a></li>
            `;
        } 
        div.innerHTML = div.innerHTML + `</ul>`;
        //--------------------------------------------------------------

        // give id and place element
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
        return this.fakevalue;
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
        let div = document.createElement('div');
        div.innerHTML = `<p>Tässä <b>pyydetty</b> teksti.`;
        div.id="ilmestynyt";
        div.className="divr"
        document.getElementById("lower-right").appendChild(div);
        
    },
    toString(){
        return "tee popup";
    }
}

// draws a canvas on lower-left element ~3times/second.
// canvas consists of random letters on a xy-coordinate system
let sade = {

    func(){
        clearElements(1);

        // set up the canvas with proper id & class and add it
    
        let div = document.createElement('canvas');
        div.id="output";
        div.className="divr"
        document.getElementById("lower-right").appendChild(div);
        const outputCanvas = document.querySelector('#output'); // selecet canvas
        const outputContext = outputCanvas.getContext('2d'); // create context 
        let z=0; // counter to slowdown the update rate
        outputContext.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', '+', '-', '*', '/', '=', '%', '"', '\'', '#', '&', '_', '(', ')', ',', '.', ';', ':', '?', '!', '\\', '|', '{', '}', '<', '>', '[', ']', '^', '~'];
       
        
        const processFrame = () =>{ // actual function that draws the canvas
            // get the size from the parent element
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
                outputContext.font = `bold ${fontHeight}px Courier`;
                const text = outputContext.measureText('@');
                const fontWidth = parseInt(text.width); 
                outputContext.textBaseline = 'top'; // prints at correct position

                for (let x = 0; x < width; x += fontWidth){
                    for (let y = 0; y < height; y += fontHeight){
                        let c = Math.floor(Math.random()*170); // random 0,170
                        let opacity = Math.random()*0.5;

                        // fades out the edges
                        if (x<2 || x > width-2*fontWidth-1 || y < 2 || y > height - 2*fontHeight-1){
                            opacity = Math.random()*0.2;
                        }
                        let color = "rgba("+c + ","+c+","+c+","+opacity+")"; // random color 0-170 gray
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
            window.requestAnimationFrame(processFrame) // class upon itself to keep animating
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
            console.log("juu");
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


// ---------------------------------!!!!!!!!!!!!!!!!!!!!!!------------------------------------

// supporting functions


// clears the user input and clears elements from bottom-left & bottom-right elements
// by default value clears bottom-left element. on value 1 clears bottom-right element.
function clearElements(direction=0){

    document.getElementById("textInput").value='';
    if (direction==1){
        if (document.getElementsByClassName("divr").length>0){
            document.getElementsByClassName("divr")[0].parentNode.removeChild(document.getElementsByClassName("divr")[0]);
        }
    } else{ 
        if (document.getElementsByClassName("divl").length>0){
            document.getElementsByClassName("divl")[0].parentNode.removeChild(document.getElementsByClassName("divl")[0]);
       }

    }
}

// param string
// returns a list of which items are strings sentences (separeted by ". ")
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

//returns a random item from sentence -list (init at 4.)
function getRandomItem(){
    return sentence[Math.floor(Math.random()*sentence.length)];
}


