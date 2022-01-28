function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  //classifer = ml5.imageClassifer('MobileNet', modelLoaded);
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded() {
  console.log('modelloaded');
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}
var previousresults = "";

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    if ((results[0].confidence > 0.5) && (previousresults != results[0].label)) {
      console.log(results);
      previousresults = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = 'Object detected is - ' + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
      document.getElementById("result_object_name").innerHTML=results[0].label;
      document.getElementById("result_object_accurasy").innerHTML=results[0].confidence.toFixed(3);
    }
  }
}