import React from "react";

// libreria que se encarga de dar los 
// datos de la camara y de decodificar el codigo
// de barras
import { BrowserBarcodeReader, Exception, Result } from "@zxing/library";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

// componente ReactCodebarReader
function ReactCodebarReader(props = {}){

    // function que se ocupa de la lectura del
    // texto obtenido
    let reader = function(result){
        try {
            let {onRead, onClose} = (typeof props === "object" ? props : {});
            if( result.cancelled === false )
                typeof onRead == "function" ? onRead({format: result.format,text: result.text}) : null;
            typeof onClose == "function" ? onClose(true) : console.error("No se ha encontrado el prototipo onClose");
        } catch(error){
            console.error(error);
        }
    }

    // iniciando la camara para escanear
    let start = function(){
        try {

            if(typeof cordova !== "object" ){
                window.alert("Disculpe esta funcion solo funciona en el te telefono");
                throw "el plugin Cordova no ha sido detectado, por favor visita la siguiente pagina https://guide.meteor.com/cordova.html";
            }

            let {onRead, open} = (typeof props == "object" ? props : {});
            if(typeof onRead != "function" )
                throw `el prototipo onRead no es ta definido ${onRead}`;
            if( typeof open == "function" )
                console.error(`El prototipo "open" no ha sido definido en el componente`);

            cordova.plugins.barcodeScanner.scan(reader, console.error, {
                preferFrontCamera : true, // iOS and Android
                showFlipCameraButton : true, // iOS and Android
                showTorchButton : true, // iOS and Android
                torchOn: true, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt : "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats : "all_1D,aztec,codabar,code_128,code_39,code_93,data_MATRIX, itf,maxicode,msi,pdf_417,plessey,qr_CODE,rss_14,rss_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
                // orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations : true, // iOS
                disableSuccessBeep: false // iOS and Android
            });
        } catch(error){
            console.error( error );
        }
    }

    // designando el color a recibir
    let {color} = props;
    if( color == null )
        color = "primary";

    // rendirizacion del componente    
    return (
        <Button
            variant="contained"
            color = {color}
            startIcon={<PhotoCamera />}
            onClick = {start}
        >
            Escanear
        </Button>
    );
}

export default ReactCodebarReader;