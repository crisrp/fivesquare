document.addEventListener('DOMContentLoaded',function(){
  var userinput = document.querySelector('.userInput');
  var location = document.querySelector('.location')

  location.addEventListener('click',function(){
    navigator.geolocation.getCurrentPosition(success, error, options);
  });//location addEventListener Closing tags

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };







});//DOMContentLoaded closing tag
