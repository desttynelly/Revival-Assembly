


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


function changeBgColor(){

       let seed = document.querySelector("#type").value;


       if( seed == 'seed'){
        document.querySelector("#choose").classList.add("active")
       }else{
        document.querySelector("#choose").classList.remove("active")
       }
}
    
