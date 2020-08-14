


document.getElementById("inputSubmit").addEventListener("click",update);


function update(){
    let value = document.getElementById("textInput").value;

    if (value=="google"){
        clearElements();
        addGoogle();
    }

    if (value=="clear"){
        clearElements();
    }
}

function addGoogle(){
    let div = document.createElement('div');

    div.innerHTML = `
    <p>Siirrytäänkö googleen?</p><br>
    <a href="https://google.fi" target="_blank">Google</a>

    `;
    div.id="divr";

    document.getElementById("lower-left").appendChild(div);
}

function clearElements(){
    if (document.getElementById("divr")!=null){
        document.getElementById("divr").parentNode.removeChild(document.getElementById("divr"));
    }
    if (document.getElementById("divl")!=null){
        document.getElementById("divl").parentNode.removeChild(document.getElementById("divl"));
    }
}