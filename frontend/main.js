document.addEventListener('DOMContentLoaded',function(){
var mylocation = document.querySelector('.mylocation')
var location ={}
var long;
var lat;

mylocation.addEventListener('click',function(){

  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

  var map;
  var infowindow;
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };


  function success(pos) {
    var crd = pos.coords;
    long = crd.latitude;
    lat = crd.longitude;
    console.log('More or less ' + crd.accuracy + ' meters.');
    console.log(long,lat);

  };
  console.log(long,lat);

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

navigator.geolocation.getCurrentPosition(success, error, options);






  function initMap() {
    var pyrmont = location;

    map = new google.maps.Map(document.querySelector('#map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['store']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

});//location closing tag


});//DOMContentLoaded closing tag
