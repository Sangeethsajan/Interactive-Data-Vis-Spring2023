console.log('hello world');
document.getElementById("metacounter").style.display = "none";
document.getElementById("fillvalue").style.display = "none";
var fullname =''
function onSubmit(){
    console.log("Entered 1")
    var fname = document.getElementById('fname').value
    var lname = document.getElementById('lname').value
    console.log(fname)
    if (fname !== "" && lname !== ""){
        fullname = fname +" "+ lname
        document.getElementById("fillvalue").style.display = "none";
        console.log("Entered 2")
        document.getElementById("warning").style.display = "none";
        document.getElementById("metacounter").style.display = "block";

    }
    else{
        console.log("Entered 3")
        document.getElementById("fillvalue").style.display = "block";
        document.getElementById("metacounter").style.display = "none";
        document.getElementById("warning").style.display = "block";

    }
}

function counterFunction(){
    document.getElementById('counter').innerHTML = parseInt(document.getElementById('counter').innerHTML) + 1
    document.getElementById('name').innerHTML = fullname
    console.log(counter)
}
