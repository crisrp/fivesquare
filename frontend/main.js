
  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
  var list = document.querySelector('#list')
  var map;
  var infowindow;

  function initMap(){
    var pyrmont = {lat: 40.740, lng: -73.989};

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });



    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: '1000',
      types: ['restaurant']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        // console.log(results[i]);
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
      var name = place.name;
      var rating = place.rating;
      var newele = document.createElement('div')
      var input = "<input id='rating-input' type='text' placeholder='My Rating' name='name' value=''>"
      var submit = "<button id='submit' type='button' name='button'>Submit</button>"

      newele.innerHTML = "<b>Name</b>:"+ name + '</br>' + "<b>Rating</b>: "+ rating + "</br>" + input + submit;
      list.appendChild(newele);
      document.querySelector('#submit').addEventListener('click',function(){
           console.log(document.querySelector('#rating-input').value);
      });
    });
  }
