$( document ).ready(function() {

var gifs = ["Ciara", "2 Chainz", "Lil Boosie", "Curren$y", "Andre 3000"];

function buttons() {
	$("#button").html("<div></div>");

	$.each(gifs, function(index, topic) {
		var btn = $("<button>");
		btn.append(topic);
		btn.addClass("gif-click");
		btn.attr("gif-name", topic);
    btn.attr("data-state", "still");
		$("#button").append(btn);	
	});
};

$("#gif-button").click(function(event) {
	event.preventDefault();
	
	var userInput = $("#gif-text").val();
	gifs.push(userInput);
	console.log(gifs);
	buttons();
});

buttons();



$('#button').on('click', '.gif-click', function() {
	var image = $(this).attr("gif-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        image + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>"); //creates a var that is a div 

            var rating = results[i].rating; //

            var p = $("<p>").text("Rating: " + rating); //paragraph text to grab the rating form the ajax gif
            p.addClass("rating");

            var image = $("<img>"); // image = image 
            image.attr("src", results[i].images.fixed_height.url);
            image.attr("data-state", "still");
            image.addClass("gif");

            gifDiv.prepend(p);
            gifDiv.prepend(image);
            console.log(results);
            $("#gifs").prepend(gifDiv);
          };
        });
        console.log("button clicked");
});

$("body").on("click", ".gif", function() {
	//pauses
  var state = $(this).attr("data-state"); // this is ref the "body"
  var src = $(this).attr("src") // img from ajaxapi

  if (state === "still") {
    $(this).attr("src", src.replace(/\.gif/i, "_s.gif")); //replaces with a image
    $(this).attr("data-state", "animate");
  } 
  else {
    $(this).attr("src", src.replace(/\_s\.gif/i, ".gif"));
    $(this).attr("data-state", "still");
  }

});


}); // onReady function




