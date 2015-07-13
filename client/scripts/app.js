// YOUR CODE HERE:

/**
 * Escape the data, add it to page if user is in
 * current chat room. Also bold content if the 
 * speaker is a user's friend
 */
var updateMessages = function(data){
    console.log(data);
    _.each(data.results, function(value, index, results){
      var safeText = document.createTextNode(value.text);
      var safeUser = document.createTextNode(value.username);
      var safeRoom = document.createTextNode(value.roomname);
      var $messageDiv = $('<div></div>');
      var $user = $('<b></b>');
      var $message = $('<p></p>');

      $user.append(safeUser);
      $message.append(safeText);
      $messageDiv.append($user);
      $messageDiv.append($message);
      console.log($messageDiv);
      $('#messages').append($messageDiv);
    }); 
  }

$.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  dataType: 'json',
  success: updateMessages
});


