$(document).ready(function() {

	function refreshInfo(info) {
        $("#title").text(info.title);
        $("#username").text(info.username);
	}
    
    chrome.runtime.sendMessage({action: "query"}, refreshInfo);

    $("button").click(function() {
        chrome.runtime.sendMessage({action: this.id});
    })

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    	refreshInfo(request);
    });
});



$(document).ready(function () {
    chrome.tabs.getSelected(null, function(tab){
        var currentUrl = document.createElement("a");
        currentUrl.href = tab.url;
        // console.log(currentUrl.hostname);

        $(".hideme").hide();
        $("#add").click(AlertSave);
      
        function AlertSave() {
            if(currentUrl.hostname === "soundcloud.com"){
               $("#infor").fadeIn("slow").delay(1000).fadeOut("slow");
            } else {
               $("#wrong").fadeIn("slow").delay(1000).fadeOut("slow"); 
            }   
        };
    });
});

