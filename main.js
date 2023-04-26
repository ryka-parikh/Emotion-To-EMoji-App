var prediction1 = "";
var prediction2 = "";

Webcam.set({
width: 350, height: 300, image_format: "png", png_quality: 90
});

var camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src= "'+data_uri+'"/>';
    });
}

console.log("ml5 version",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vbdOC4fUb/model.json",model_loaded);

function model_loaded(){
    console.log("Model is loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data1  = "The First Prediction is:"+prediction1;
    var speak_data2 = "The Second Prediction is:"+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    utterThis.rate= 0.5;
    synth.speak(utterThis);
}

function check(){
img= document.getElementById('captured_image');
classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(results[0].label=="Happy"){
           document.getElementById("update_emoji").innerHTML = "&#128522";
        }
        else if(results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532";
        }
        else{
            document.getElementById("update_emoji").innerHTML = "&#128548";
        }



        if(results[1].label=="Happy"){
            document.getElementById("update_emoji_2").innerHTML = "&#128522";
         }
         else if(results[1].label=="Sad"){
             document.getElementById("update_emoji_2").innerHTML = "&#128532";
         }
         else{
             document.getElementById("update_emoji_2").innerHTML = "&#128548";
         }
    }
}




