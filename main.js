pp_song = "";
hp_theme_song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";

function preload()
{
    pp_song = loadSound("peter_pans_flight.mp3");
    hp_theme_song = loadSound("harry_potter_theme_1.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet Is Initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristX = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    song1_status = pp_song.isPlaying();
    song2_status = hp_theme_song.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        hp_theme_song.stop();
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        pp_song.stop();
    }

    if(pp_song == false)
    {
        pp_song.play();
        document.getElementById("song_name").innerHTML = "Song Name";
    }

    if(hp_theme_song === false)
    {
        hp_theme_song.play();
        document.getElementById("song_name").innerHTML = "Song Name";
    }
}