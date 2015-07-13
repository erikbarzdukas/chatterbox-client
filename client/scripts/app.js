// YOUR CODE HERE:
$.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  dataType: 'json',
  success: function(data){
    console.log(data);
    _.each(data.results, function(value, index, results){
     var safeText = document.createTextNode(value.text);
     $('#messages').append(safeText);
    }); 
  }
})
