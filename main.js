img = "";
status = "";
object = []

function preload() {
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(640,420);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecing object ";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    object = results;
}

function draw() {
    image(video, 0, 0, 640, 420);
    
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult)
        for (let i = 0; i < object.length; i++) {
            
            document.getElementById("status").innerHTML = "Status: Object detected";
            document.getElementById("objectNo").innerHTML = "Number of objects detected: " + object.length;
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }

}