widgetName = null;
$popup = null;

function openPopup(event) {
	
	if (event != undefined)
		event.preventDefault();
	
	text = $(this).find(".widget-title").text();
	borderColor = $(this).css("border-top-color");

	widgetName = text.toLowerCase().split(" ");
	widgetName = widgetName.length == 1 ?
		widgetName[0] : widgetName[1];

	$popup.find(".pop-up-title").text(text);
	$popup.find("#pop-up-header")
		.css("border-bottom-color", borderColor);
	$popup.css("display", "block");

	$popup.find(".pop-up-" + widgetName).css("display", "inline-block");

	if (widgetName === "contact") {
		google.maps.event.trigger(map, 'resize');
		map.setCenter(markerLocation);
	}
}

function closePopup(event) {
	
	$popup.css("display", "none");

	$popup.find(".pop-up-" + widgetName).css("display", "none");
}

function init() {
	$popup = $("#pop-up");

	$(".widget").click(function() {
	  $("html, body").animate({ scrollTop: 0 }, "slow");
	  return false;
	});

	$("#widgets button").click(openPopup);
	$("#pop-up-close-button").click(closePopup);
	$("#pop-up-background").click(closePopup);

	$("#contact-button").click(function(event) {
		closePopup(event);
		openPopup.call($("button.widget-contact"), event);
	});
}

$(init);