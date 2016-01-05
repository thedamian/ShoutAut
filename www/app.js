$(document).on('pageshow', '#pagehome', function (event) {
    max_height();
        navigator.geolocation.getCurrentPosition(onSuccess, onError,{'enableHighAccuracy':true,'timeout':20000});
});

function max_height() {
    var header = $.mobile.activePage.find("div[data-role='header']:visible");
    var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
    var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
    var viewport_height = $(window).height();
    
    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
    if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
        content_height -= (content.outerHeight() - content.height());
    } 
    $.mobile.activePage.find('[data-role="content"]').height(content_height);
}

var map;

function onSuccess(position) {       
    var minZoomLevel = 15;
    
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: minZoomLevel,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });    


    var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          draggable: true,
          raiseOnDrag: true,
          title: 'My Shout'
      });


  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Your Shout</h1>'+
      '<div id="bodyContent">'+
      '<p>Hello World...and WELCOME!</p>'+
      '<p><a href="https://twitter.com/share" class="twitter-share-button" data-via="DamianMontero" data-size="large">Tweet</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script></p>'+
      '</div>'+
      '</div>';

     var infowindow = new google.maps.InfoWindow({
      content: contentString
     });


    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

    for (var i=1;i<4;i++)
    {

    var myLatlng = new google.maps.LatLng(position.coords.latitude + (0.005 * Math.random()),
                          position.coords.longitude +  (0.005 * Math.random()));
    var marker2 = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Hello World!'
      });        


  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Your Shout</h1>'+
      '<div id="bodyContent">'+
      '<p>Hello World'+ i + '...and WELCOME!</p>'+
      '<p><a href="https://twitter.com/share" class="twitter-share-button" data-via="DamianMontero" data-size="large">Tweet</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script></p>'+
      '</div>'+
      '</div>';

     var infowindow = new google.maps.InfoWindow({
      content: contentString
     });


    google.maps.event.addListener(marker2, 'click', function() {
        infowindow.open(map,marker2);
    });


    }



}

function onError(value) {
    alert('Error: ' + value);
}





$(function () {
        
       var chatHub = $.connection.sRChatServer;

        // Start the connection
        $.connection.hub.url = "http://gpsmsg.azurewebsites.net/signalr/hubs";
        $.connection.hub.start();


        // Declare a function on the blog hub so the server can invoke it
        chatHub.client.addMessage = function (user, message) {
            $('#messages').prepend('<li><strong>' + user + '</strong>: ' + message + '</li>');
        };

        // */


        function SendChat() {
            $username = $("#txtUsername").val();
            if ( ($username=="") || ($username=='')) 
            {
               $username= "anonymous"; 
            }
            $msg = $username + ": " + $("#txtMessage").val()
            chatHub.server.sendMessage("", $msg);
            $("#txtMessage").val("")
            $("#txtMessage").focus();
        }


        $("#txtMessage").keyup(function (event) {
            if (event.keyCode == 13) {
                SendChat();
            }
        });



        $("#btnSendChat").click(function (event) {
            SendChat();
        });

        $("#btnClear").click(function (event) {
            $("#txtMessage").val("")
        });

        $("#btnSaveUserName").click(function (event) {
            alert("Saved!");
        });

        $("#btnClearUserName").click(function (event) {
            $("#txtUsername").val("")
        });
    });
