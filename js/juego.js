var intentos = 0;
var ganaste = false ;
var numeroPC = new Array() ;

inicializarNumPC();

/*VOID*/function replay (){
    intentos=0;
    ganaste=false;
    inicializarNumPC();
    vaciarTabla();
}
/*VOID*/function inicializarNumPC(){
    for(var i=0; i<4; i++){
        do{
            numeroPC[i] = Math.floor(Math.random()*10).toString();
        } while(seRepite(numeroPC[i], i));
    }
    document.getElementById("textField").disabled = false;
}
/*BOOL*/function seRepite(num, pos){
    for(var i=0; i<pos; i++){
        if(numeroPC[i] == num){
            return true;
        }
    }
    return false;
}
/*VOID*/function adivinar(){
    var bien = 0, 
        regular = 0, 
        mal = 0 ;
    var numeroUser = document.getElementById("textField").value;

    if(numeroUser.length == 4){
        intentos++;
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                if(numeroUser[i] == numeroPC[j]){
                    if(i==j){
                        bien++;
                    } else {
                        regular++;
                    }
                }
            }
        }
        mal = 4 - bien - regular;
        
        showTabla(bien, regular, mal, numeroUser);
        
        if(bien==4) {
            ganaste = true;
            alert("GANASTE");
            document.getElementById("textField").disabled = true;
            document.getElementById("playBtn").disabled = true;
        } else{
            if(intentos==10){
                alert("PERDISTE\nEl numero correcto era: " + numero(numeroPC));
                document.getElementById("textField").disabled = true;
            }
            document.getElementById("textField").value = "";
            document.getElementById("textField").focus();
        }
    } else{
        alert("NÚMERO INVÁLIDO; INGRESA UN NÚMERO DE 4 DÍGITOS");
        document.getElementById("textField").value = "";
        document.getElementById("textField").focus();
    }
}
/*VOID*/function vaciarTabla(){
    for(var i=0; i<10; i++){
        document.getElementById("bien"+i).innerHTML = "";
        document.getElementById("reg"+i).innerHTML = "";
        document.getElementById("mal"+i).innerHTML = "";
        document.getElementById("int"+i).innerHTML = "";
    }
    document.getElementById("header").style.visibility = "hidden";
    document.getElementById("gamePanel").style.marginTop = "0%";
    document.getElementById("textField").focus();
}
/*VOID*/function showTabla(bien, regular, mal, numeroUser){
	if(intentos==1){
        document.getElementById("header").style.visibility = "visible";
        document.getElementById("gamePanel").style.marginTop = "10%";
    }
    document.getElementById("bien"+(intentos-1)).innerHTML = bien;
    document.getElementById("reg"+(intentos-1)).innerHTML = regular;
    document.getElementById("mal"+(intentos-1)).innerHTML = mal;
    document.getElementById("int"+(intentos-1)).innerHTML = numeroUser + " (" + intentos + ")";
    document.getElementById("textField").value = "";
    document.getElementById("textField").focus();
}  
/*STRING*/ function numero(num){
    var cadena = num[0] + num[1] + num[2] + num[3];
    return cadena;
}

