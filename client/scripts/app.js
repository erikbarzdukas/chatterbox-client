// YOUR CODE HERE:

var App = function(){
  this.friends = [];
  this.rooms = [];
  this.messages = {};
}
App.prototype.constructor = App;

App.prototype.init = function(){
  var that = this;
  $('.username').on("click", function(e){
    that.addFriend($(e.target).text());
  });

  $('#send').on("submit", function(e){
    e.preventDefault();
    that.handleSubmit($('#message').val());
    $('#message').val('');
  });

  $('#newroom').on('submit', function(e){
    e.preventDefault();
    that.addRoom($('#roomname').val());
    $('#roomname').val('');
  });

  $('#roomselect').on('click', function(e){
    that.clearMessages();
    _.each(that.messages[$(this).val()], function(message){
      that.addMessage(message);
    });
  }); 

  this.fetch();
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
  var that = this;

  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    success: function(data){
      console.log(data);
      _.each(data.results, function(message, index){
        that.addRoom(message.roomname);

        //Organize new messages by room
        if(!that.messages[message.roomname]){
          that.messages[message.roomname] = [];
        }
        that.messages[message.roomname].push(message);

        that.addMessage(message);

      }); 
    }
 });
}

App.prototype.clearMessages = function(){
  $('#chats').remove();
}

App.prototype.addMessage = function(message){
    var $messageDiv = $('<div></div>');
    var $user = $('<b class="username"></b>');
    var $message = $('<p></p>');
    var $chats = $('#chats');
    if($chats.length < 1){
      $chats = $('<div id="chats"></div>');
    }

    $user.text(message.username);
    $message.text(message.text);
    $messageDiv.append($user);
    $messageDiv.append($message);
    $chats.append($messageDiv);
    $('#main').append($chats);

}

App.prototype.addRoom = function(room){
  var unique = true;
  if(room === undefined || room === null || room === ''){
    return
  }
  if(this.rooms.indexOf(room) === -1) {
    this.rooms.push(room);
  }
  $('option').each(function(){
    if($(this).val() === room){
      unique = false;
      return;
    }
  });

  
  if(unique){
    var $room = $('<option>' + room + '</option>');
    $('#roomselect').append($room);
  }
}

App.prototype.addFriend = function(friend){
  if(this.friends.indexOf(friend) === -1){
    this.friends.push(friend);
  }
}

App.prototype.handleSubmit = function(message){
  this.send(message);
}

var app = new App();
$(document).ready(function(){
  app.init();
});

