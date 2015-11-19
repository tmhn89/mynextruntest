// var url = 'https://randomuser.me/api/';
var url = 'https://api-test.mynextrun.com/site/v1/event-stats';

$.ajax({
    url: url,
    dataType: 'json',
    success: function(data){
      console.log(data);
    }
});

$(function() {
    $('#data').html('xx');
})