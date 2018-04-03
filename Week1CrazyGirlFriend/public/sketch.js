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
        // Do Something Here
        // Then recall the parent function to
        // create a recursive loop.
        var message = "Awwwwwww~~~ Here you are~~~ Love you baby <3 "
        if (numberOfFaces === 0){
          message = "WHERE ARE YOU??? Come back!!!!!!!"
        }  else if(numberOfFaces === 2) {
          message = " WHO IS THAT BIIIIIIITCH???? "
        } else if(numberOfFaces === 3) {
          message = "What the heck? Are you having a party without me? "
        }
        document.getElementById("message").innerHTML = message;
        timeout();
    }, 1000);
}


// function DrawFace(face) {

//   if (face.state === brfv4.BRFState.FACE_TRACKING_START ||
//       face.state === brfv4.BRFState.FACE_TRACKING) {
//     numberOfFaces +=1;
//   }
// }
