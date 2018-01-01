var val_cont;
var mat_gauss;
var col_resultado;
var x = $(document);
x.ready(inicializar);


function inicializar(){    
    val_cont = obtenerVariable();
    alert(val_cont);    
    col_resultado = val_cont + 1;
    mat_gauss = new Array(val_cont);
    for (var i = 0; i < mat_gauss.length; i++) mat_gauss[i] = new Array(col_resultado);

    var x = $("#calcular");        
    x.click(calcularGaussJordan);
}


function obtenerVariable(){
    if (document.getElementById("val2").checked){
        return 2;
    }
    else if (document.getElementById("val3").checked){
        return 3;
    }
    else if (document.getElementById("val4").checked){
        return 4;
    }
}


function imprimirMatriz(){
    for (var i = 0; i < mat_gauss.length; i++) {
        for (var j = 0; j < mat_gauss[i].length; j++) {
            document.write(mat_gauss[i][j] + " ");            
        }
        document.write("<br>");
    }
}


function cargarMatriz(){
    for (var i = 0; i < mat_gauss.length; i++) {
        for (var j = 0; j < mat_gauss[i].length; j++) {
            mat_gauss[i][j] = parseInt($("#c"+i+j).val());            
        }        
    }
}


function calcularGaussJordan() {
    cargarMatriz();     
    //Algoritmo de Gauss-Jordan   
    for (var i = 0, j = 0; i <= mat_gauss.length - 1; i++, j++){
        var num = mat_gauss[i][j]; //Se guarda el numero
        var k = Math.pow(num, -1); //El pivote

        //Convierte el valor de la diagonal en 1 y sus demas columnas
        for(var f = 0; f <= mat_gauss.length; f++){
            //Operacion elemental: Multiplicar una ecuacion por un escalar no nulo
            mat_gauss[i][f] *= k; 
        }

        num = mat_gauss[i][j]; //Se guarda el numero
        //Ahora recorrer las filas de la columna
        for (var f = 0; f < mat_gauss.length; f++) {
            if (f !== i) {
                var num2 = mat_gauss[f][i];
                k = -(num2/num); //Otro pivote                
                for (var g = 0; g < mat_gauss[f].length; g++) {                    
                    ////Operacion elemental: Sumar a una ecuación un multiplo de otra
                                    //  K * Ri + Rj                                                    
                    mat_gauss[f][g] = ( k * mat_gauss[i][g] ) + mat_gauss[f][g];                                                             
                }
            }            
        }
    }    

    for (var f = 0; f < mat_gauss.length; f++) {
        if (mat_gauss[f][3] < 0){
                            mat_gauss[f][3] = (-1) * Math.round(Math.abs(mat_gauss[f][3])); //Por problemas de redondeo
                        } else {
                            mat_gauss[f][3] = Math.round(mat_gauss[f][3]);
                        }
        
    }
    imprimirMatriz();    
}

