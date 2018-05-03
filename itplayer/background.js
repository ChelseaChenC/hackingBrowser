 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAfyvwsdJgyxPm-wFYcHy638kGX9JnaMYo",
    authDomain: "itplayer-b1a8a.firebaseapp.com",
    databaseURL: "https://itplayer-b1a8a.firebaseio.com",
    projectId: "itplayer-b1a8a",
    storageBucket: "",
    messagingSenderId: "380458452317"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  // var s = "soundcloud.com";


function getPlaylist(callback) {
    var ref = database.ref("songs/");
    ref.once("value", function(snapshot){
        // console.log("woohoo");
        var data= snapshot.val();
        console.log(data);
        var songs = [];
        for (var key in data) {
            data.firebaseId = key;
            songs.push(data[key]);
        }
        callback(songs);
    }, function(err) {
        console.error('got an error',err);
    });
}


$(document).ready(function() {
    var iframe = document.querySelector('.iframe');
    var widget = SC.Widget(iframe);
    var defaultOptions = {
        "auto_play": true,
        // "buying": true,
        // "liking": true,
        // "download": true,
        // "sharing": true,
        // "show_artwork": true,
        // "show_comments": true,
        // "show_playcount": true,
        // "show_user": true,
        // "hide_related": false,
        // "visual": true,
        // "start_track": "0",
    };

    var playlist = [];
    var lastPlayed = 0;
    var soundInfo = {title: "", username: ""};

    function play(index) {
        console.log('attempting to play song at index:',index);
        // index %= playlist.length;
        // widget.load(playlist[index], defaultOptions);
        // lastPlayed = index;
        getPlaylist(function(songs) {
            index += songs.length;
            index %= songs.length;
            lastPlayed = index;
            var song = songs[index];
            var url = song.url;
            console.log('!! playing url:',url);
            widget.load(url, {
                auto_play: true
            });
            // play song at index
        });
    }

    function add(url) {
        if (playlist.indexOf(url) === -1) {
            playlist.push(url);
        }
        var ref = database.ref("songs/");
        var result = ref.push();
        result.set({"url": url});

        // setTimeout(() => {
        //     chrome.browserAction.setIcon({path: "add.png"});
        //  }, 1000);     
    }
    
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        switch (request.action) {
            case "add":
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    var tab = tabs[0];
                    if (tab.url.startsWith("https://soundcloud.com/")){
                        add(tab.url);
                    };
                });
                break;
            case "play":
                widget.play();
                break;
                // chrome.browserAction.setIcon({path: "play.png"});
            case "pause":
                widget.pause();
                // chrome.browserAction.setIcon({path: "pause.png"});              
                break;
            case "next":
               // lastPlayed = lastPlayed + 1;
                play(lastPlayed+1);
                break;
            case "prev":
                // lastPlayed = lastPlayed - 1;
                play(lastPlayed-1);
                break;
            case "query":
                sendResponse(soundInfo);
            default:
                sendResponse({state: "error"});
                break;
        };
    });

    widget.bind(SC.Widget.Events.FINISH, function() {
        play(lastPlayed + 1);
        // chrome.browserAction.setIcon({path: "play.png"});
    });

    widget.bind(SC.Widget.Events.PLAY, function(event) {
        var soundId = event.soundId;
        var scAPI = `https://api.soundcloud.com/tracks/${soundId}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z&oauth_token=2-274121-85658-y9KQYyZ6qG9oT2uvPq&callback=?`;
        $.getJSON(scAPI, function(response) {
            soundInfo = {title: response.title, username: response.user.username};
            chrome.runtime.sendMessage(soundInfo);
        });
    });
});