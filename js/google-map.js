var map;
var markerLocation;

function initMap() {
	address = "1111 Ross Street, Red Deer, Alberta";
	geocoder = new google.maps.Geocoder();

	var mapCanvas = document.getElementById('google-map');
	var mapOptions = {
		center: new google.maps.LatLng(44.5403, -78.5463),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(mapCanvas, mapOptions);

	if (geocoder) {
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          markerLocation = results[0].geometry.location;
          map.setCenter(markerLocation);

          var infowindow = new google.maps.InfoWindow({
            content: '<b>' + address + '</b>',
            size: new google.maps.Size(150, 50)
          });

          var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: address
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });

        } else {
          alert("No results found");
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}

$(initMap);