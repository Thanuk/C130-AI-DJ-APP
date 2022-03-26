song = "";
song2 = "";
song_status = "";
song2_status = "";
song_name = "Harry Potter Theme song";
song2_name = "Peter Pan song";

leftWrist_x = 0;
leftWrist_y = 0;
scoreLeftWrist = 0;

rightWrist_x = 0;
rightWrist_y = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw(){
    image(video, 0, 0, 400, 400);

    fill("red");
    stroke("red");

    song_status = song.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWrist_x, leftWrist_y, 20);
        song2.stop();

        if(song_status == "false"){
            song.play();
            document.getElementById("song_name").innerHTML = " - "+ song_name;
        }
    }

    song2_status = song2.isPlaying();

    if(scoreRightWrist > 0.2){
        circle(rightWrist_x, rightWrist_y, 20);
        song.stop();

        if(song2_status == "false"){
            song2.play();
            document.getElementById("song_name").innerHTML = " - "+ song2_name;
        }
    }
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score = "+ scoreLeftWrist);
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist x = "+ leftWrist_x + "Left Wrist y = "+ leftWrist_y);
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score = "+ scoreLeftWrist);
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("Right Wrist x = "+ rightWrist_x + "Right Wrist y = "+ rightWrist_y);
    }
}