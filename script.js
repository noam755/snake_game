function hello(){
let x = prompt("enter number")
if (x**2 % 2 == 0){
    document.writeln("<div class =userinput>"+ x +"</div>")
}
}
hello()
function bye(){
let x = prompt("enter number")
let y = Math.sqrt(x)
document.writeln("<div class =userinput>"+ y +"</div>")
}
bye()