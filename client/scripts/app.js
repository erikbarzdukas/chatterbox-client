// YOUR CODE HERE:

var App = function(){
  this.friends = [];
}
App.prototype.constructor = App;

App.prototype.init = function(){
  var that = this;
  $('.username').on("click", function(e){
    that.addFriend($(e.target).text());
  });

  $('form').on("submit", function(e){
    console.log('Event listener heard submit');
    e.preventDefault();
    that.handleSubmit($('#message').val());
    $('#message').val('');
  });
}

App.prototype.send = function(message){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data){
      console.log('chatterbox: Message sent');
    },
    error: function(data){
      console.error('chatterbox: Failed to send message');
    }
  });
}

App.prototype.fetch = function() {
  $.ajax({
    success: function(data){
     console.log('chatterbox: Sent message');
    } 
  });
}

App.prototype.clearMessages = function(){
  $('#chats').remove();
}

App.prototype.addMessage = function(message){
    var safeText = document.createTextNode(message.text);
    var safeUser = document.createTextNode(message.username);
    var safeRoom = document.createTextNode(message.roomname);
    var $messageDiv = $('<div></div>');
    var $user = $('<b class="username"></b>');
    var $message = $('<p></p>');
    var $chats = $('#chats');
    if($chats.length < 1){
      $chats = $('<div id="chats"></div>');
    }

    $user.append(safeUser);
    $message.append(safeText);
    $messageDiv.append($user);
    $messageDiv.append($message);
    $chats.append($messageDiv);
    $('#main').append($chats);

}

App.prototype.addRoom = function(room){
  var $room = $('<option>' + room + '</option>');
  $('#roomSelect').append($room);
}

App.prototype.addFriend = function(){
}

App.prototype.handleSubmit = function(message){
  this.send(message);
}

var app = new App();


