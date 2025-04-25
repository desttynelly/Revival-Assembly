


document.querySelector(".hamm").addEventListener("click", function(){
    // alert("kkkk")
    document.querySelector("nav").classList.toggle("active")
})





document.querySelector(".give").addEventListener("click", function(){

    document.querySelector(".giving").classList.add("active")
})

document.querySelector(".fa").addEventListener("click", function(){

    document.querySelector(".giving").classList.remove("active")
})


let where = document.querySelector(".where");
where.style.display = "none"; 

function changeBgColor(){

       let seed = document.querySelector("#type").value;


       if( seed == 'seed'){
        document.querySelector("#choose").classList.add("active")
        where.style.display = "flex"; 
       }else{
        document.querySelector("#choose").classList.remove("active")
        where.style.display = "none"; 
       }
}


let pastor = document.querySelector(".pastor");
pastor.style.display = "none"; 

let pastori = document.querySelector(".pastori");
pastori.style.display = "none"; 

function changeBgColor2(){

       let pas = document.querySelector("#choose").value;


       if( pas == 'S Pastor'){
        pastor.style.display = "flex"; 
        pastori.style.display = "flex";
       }else{
        pastor.style.display = "none"; 
        pastori.style.display = "none"; 
       }
}
    
