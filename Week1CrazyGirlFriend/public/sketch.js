var faces = [];

var numberOfFaces = 0;

// var zoom = 2;



function setup() {
  ellipseMode(CENTER);
  angleMode(DEGREES);
  timeout();

}

function draw() {
  background(255);
  numberOfFaces = faces.filter(function (face) { return face.state === brfv4.BRFState.FACE_TRACKING_START || face.state === brfv4.BRFState.FACE_TRACKING}).length;
  console.log(numberOfFaces + ":" + faces.length);

}

document.body.innerHTML = " ";

function timeout() {
    setTimeout(function () {
       
        var message=[];
                    
        if (numberOfFaces === 0){
          message = ["baby where are you???","Don't leave me alone!","Just come back!!!", "I'm calling all your friends now!"]; 
          document.getElementById("message").innerHTML = message[Math.floor(Math.random() * message.length)];
        timeout();
        }  else if(numberOfFaces === 2) {
          var message1 =["Who is that biiiiitch?","Are you cheating on me?", "I'm gonna kill you!!!! And her!!!", "I'm so hurt!!!"]; 
          document.getElementById("message").innerHTML = message1[Math.floor(Math.random() * message1.length)];
        timeout();
        } else if(numberOfFaces === 3) {
          var message2 =["Are you having a party without me?","Why are you doing this?","You just don't care about me!"]; 
          document.getElementById("message").innerHTML = message2[Math.floor(Math.random() * message2.length)];
        timeout();
        } else {
          var message3 =["Hey, baby!","I love you so much <3","I want to be with you forever, doing nothing just like now"]; 
          document.getElementById("message").innerHTML = message3[Math.floor(Math.random() * message3.length)];
        timeout();
        }
    }, 1000);
}


// function DrawFace(face) {

//   if (face.state === brfv4.BRFState.FACE_TRACKING_START ||
//       face.state === brfv4.BRFState.FACE_TRACKING) {
//     numberOfFaces +=1;
//   }
// }
