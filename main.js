status = "";
objects = [];

function preload() {
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(400, 380);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("object").innerHTML = "Detecting Object";
}

function modelLoaded() {
    console.log("modelloaded");
    status = true;
}

function gotResult(result, error) {
    if (error) {
        console.log(error);
    } else {
        document.getElementById("object").innerHTML = "Object Detected";
        console.log(result);
        objects = result;
    }
}

function draw() {
    image(camera, 0, 0, 400, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(camera, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("object").innerHTML = "Object Detected";
            fill(rgb);
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            stroke(rgb);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("main_info").innerHTML = "Baby Found";
                song.stop();
            } else {
                document.getElementById("main_info").innerHTML = "Baby not Found";
                song.play();
                song.setVolume(0.6);
            }
        }
    }
}