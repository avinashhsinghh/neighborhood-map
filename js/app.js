/**
* Create a model that stores the data
*/
var Places = [
	{
		name: 'Bowers Museum',
		address: '2002 N Main St, Santa Ana, CA 92706'
	},
	{
		name: 'Fountain Bowl',
		address: '17110 Brookhurst St, Fountain Valley, CA 92708'
	},
	{
		name: 'Newport Pier',
		address: '72 Mc Fadden Pl, Newport Beach, CA 92663'
	},
	{
		name: 'Disneyland',
		address: '1313 Disneyland Dr, Anaheim, CA 92802'
	},
	{
		name: 'Knott’s Berry Farm',
		address: '8039 Beach Blvd, Buena Park, CA 90620'
	},
	{
		name: 'Sumran Thai',
		address: '6482 Westminster Ave, Westminster, CA 92683'
	},
	{
		name: 'Brodard Chateau',
		address: '9100 Trask Ave, Garden Grove, CA 92844'
	},
	{
		name: 'Santa Ana Zoo',
		address: '1801 E Chestnut Ave, Santa Ana, CA 92701'
	},
	{
		name: 'Paris Baguette',
		address: '8899 Garden Grove Blvd, Garden Grove, CA 92844'
	},
	{
		name: 'Adventure City',
		address: '1238 S Beach Blvd, Anaheim, CA 92804'
	},
	{
		name: 'The Boiling Crab',
		address: '14241 Euclid St, Garden Grove, CA 92843'
	}
];

/**
* Generate a random number for use in Yelp API Oauth.
*/
function generateNonce() {
	return (Math.floor(Math.random() * 1e12).toString());
}

/**
* Use Yelp API to search business information.
*/
function getYelpInfo(place) {
	var yelp_url = "https://api.yelp.com/v2/search";
	var consumer_secret = "tJuIiRK3ofSyGrUB0naeQy0urZ0";
	var token_secret = "HcGZLB5oXS6NbbDI0_WyoLTnqvI";

	// Create parameters that are used for Ajax request.
	var params = {
		oauth_consumer_key: "3F_BTxhDD_fmiPnp_lXagA",
		oauth_token: "tE27kYnJw1B0TT3kqBqZSiNQBOb2J1eH",
		oauth_signature_method: 'HMAC-SHA1',
		oauth_timestamp: Math.floor(Date.now()/1000),
		oauth_nonce: generateNonce(),
		oauth_version: '1.0',
		callback: 'cb',
		term: place.name,
		location: 'Orange County, CA',
		limit: 1
	}

	// Generate Oauth signature
	var encodedSignature = oauthSignature.generate('GET', yelp_url, params, consumer_secret, token_secret);
	params.oauth_signature = encodedSignature;

	// Perform an Ajax request
	$.ajax({
		url: yelp_url,
		data: params,
		cache: true,
		dataType: 'jsonp'
	}).done(function(data) {
		var phone = data.businesses[0].display_phone;
		var rating = data.businesses[0].rating_img_url;
		var snippet = data.businesses[0].snippet_text;
		var link = data.businesses[0].url;
		var category = data.businesses[0].categories[0][0];

		// Create info window that displays information of a place.
		var contentString = '<div><h3>'+ place.name + '</h3>'+
			'<p>'+ place.address + '</p>' +
            '<p><strong>Category: </strong>'+ category + '</p>'+
			'<p><strong>Phone: </strong>'+ phone + '</p>' +
			'<p><strong>Yelp Ratings: </strong>'+ '<img src="'+ rating + '"></p>' +
			'<p><strong>Reviews: </strong>'+ snippet +'<a href="'+ link + '">Read more</a></p>'+
			'</div>';
		infoWindow.setContent(contentString);
		infoWindow.open(map, place.marker);

	}).fail(function() {
		// Pop up window that alerts users if Yelp API failed to load.
		alert("Failed to load Yelp.");
	});
}

/**
* Create an infoWindow to display info and an array to store markers.
*/
var markers = [];
var infoWindow;

/**
* Handle error if Google map failed to load.
*/
function mapError() {
	alert("Failed to load Google Map.");
}

/**
* Initialize Google map.
*/
function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
		styles: [
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#242f3e"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#746855"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#242f3e"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.locality",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#d59563"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#d59563"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#263c3f"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#6b9a76"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#38414e"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#212a37"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9ca5b3"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#746855"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#1f2835"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#f3d19c"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#2f3948"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.station",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#d59563"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#17263c"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#515c6d"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#17263c"
		      }
		    ]
		  }
		]
	});

	infoWindow = new google.maps.InfoWindow();

	var geocoder = new google.maps.Geocoder();

	// Call geocodeAddress() on each place in the Places array.
	Places.forEach(function(place) {
		geocodeAddress(geocoder, map, place);
	});

	ko.applyBindings(new ViewModel());
}

/**
* geocodeAddress() converts addresses into geographic coordinates and place markers accordingly.
*/
function geocodeAddress(geocoder, resultsMap, place) {
	var address = place.address;
	var customIcon = 'images/favorite-place.png';

	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			resultsMap.setCenter(results[0].geometry.location);
			place.marker = new google.maps.Marker({
				map: resultsMap,
				animation: google.maps.Animation.DROP,
				icon: customIcon,
				position: results[0].geometry.location
			});

			// When a marker was clicked, marker bounces and Yelp API is called.
			google.maps.event.addListener(place.marker, 'click', function() {
				getYelpInfo(place);
				toggleBounce(place.marker);
			});

			markers.push({
				name: place.name,
				marker: place.marker
			});

		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}

/**
* Enable the marker to bounce.
*/
function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			marker.setAnimation(null);
		}, 1400);
	}
}

/**
* Open marker info window when corresponding item was clicked.
*/
function clickedMarker(name) {
	markers.forEach(function(markerItem) {
		if (markerItem.name == name) {
			google.maps.event.trigger(markerItem.marker, 'click');
		}
	});
}

/**
* Create ViewModel.
*/
var ViewModel = function() {
	var self = this;

	this.filter = ko.observable("");

	// Filter places based on user input.
	this.filteredPlaces = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if (!filter) {
			Places.forEach(function(place) {
				if (place.marker) {
					place.marker.setVisible(true);
				}
			});
			return Places;
		} else {
			return ko.utils.arrayFilter(Places, function(place) {
		 		var match = place.name.toLowerCase().indexOf(filter) !== -1;
		 		if (match) {
		 			place.marker.setVisible(true);
		 		} else {
		 			place.marker.setVisible(false);
		 		}
		 		return match;
		 	});
		}
	});
};