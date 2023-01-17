song1= "";
song2= "";
song3= "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songStatus = "";
function preload()
{
    song1=loadSound("song1.mp3");
    song2=loadSound("song2.mp3");
    song3=loadSound("song3.mp3");
}
function setup()
{
    canvas=createCanvas(600, 500);
    canvas.center;

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video, 0, 0, 600, 500);
    song1.setVolume(1);
    song1.rate(1);
    song2.setVolume(1);
    song2.rate(1);
    song3.setVolume(1);
    song3.rate(1);

    fill("#FF0000");
    stroke("FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        song1.play();
        songStatus = "song1";
    }
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, righttWristY, 20);
        song1.stop();
        song2.play();
        songStatus = "song2"
    }
}
function play()
{
    song1.stop();
    song2.play();
    songStatus = "song2"
}
function modelLoaded()
{
    console.log('PoseNet is initialized!');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreLeftWrist = " + scoreLeftWrist);

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftwristx = " + leftWristX + "leftwristy = " + leftWristY + "rightwristx = " + rightWristX + "rightwristy = " + rightWristY);
    }
}
