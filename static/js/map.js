// Sets up dimensions for the map
var map_width = 600;
var map_height = 600;

var activeDistrict = null;
var activeQuestion = null;
var survey_data = null;

// Creates d3 canvas and the geographical limits for the map
var svg = d3.select( "#map" )
	.append( "svg" )
	.attr( "width", map_width )
	.attr( "height", map_height );

var proj = d3.geo.conicEqualArea()
	.scale( 77423.06161113291 )
	.center( [ -73.92389357849065, 40.69483904240502 ] )
	.parallels( [ 40.496133987610385, 40.91553277650213 ] )
	.rotate( [ 73.92389357849065 ] )
	.translate( [ -66755.26684646154, -29714.320463485623 ] );

var p = d3.geo.path().projection( proj );

queue().defer( d3.json, "static/data/nyc_school_districts.geojson" ).await( rd );

function rd( error, districts ) {
	// ''' Users will get to know the district that their mouse is hovered over. If they click on that district, \
	// it will be highlighted and data will be generated although no graph will be produced yet '''
	svg.append( "g" ).selectAll( "path" ).data( districts.features ).enter().append( "path" ).attr( "d", p ).attr( "class", "district" ).on( "mouseover", function ( d ) {
		d3.select( "h2" ).text( "District " + d.properties.district );
		d3.select(this)[0][0].classList.toggle("hover");
	}).on( "mouseout", function ( d ) {
		// Highlights a given district or tells the user to select one
		if(activeDistrict){
			d3.select( "h2" ).text( "District " +  activeDistrict );
		} else {
			d3.select( "h2" ).text( "Select a District" );
		}
		// If a user clicks on a district, it will turn red and data will be generated on it
		d3.select(this)[0][0].classList.toggle("hover");
	}).on( "click", function (d) {
		if(document.getElementsByClassName("district-active").length > 0){
			document.getElementsByClassName("district-active")[0].classList.toggle("district-active");
		}
		d3.select(this)[0][0].classList.toggle("district-active");
		activeDistrict = d.properties.district;
		// Sets the innerHTML so user knows which district they are receiving data on
		document.getElementById("district-num").innerHTML = activeDistrict;
		// Starts to save data based on the district and question
		loadData(activeDistrict, activeQuestion);
	});
}

d3.json("static/data/student_survery_data.json", function(json){
	// '''Checks if the user has changed their question, loads new data if so '''
	survey_data = json;

	selection = document.getElementById("question-select");

	selection.addEventListener("change", function(e){
		activeQuestion = this.value;
		loadData(activeDistrict, activeQuestion);
	});

	activeQuestion = Object.keys(survey_data[1])[0];

	loadQuestions();
});

function loadQuestions(){
	// ''' Creates the list of questions that the user can choose from regarding the survey questions '''
	while (selection.firstChild) {
	    selection.removeChild(selection.firstChild);
	}

	for(var key in survey_data[1]){
		var option = document.createElement("option");
		option.value = key;
		option.text = key;
		selection.appendChild(option);
	}
}


function loadData(district, question) {
//  Based on the question the user selects, finds the corresponding values and generates a dictionary around it.
    var existing = document.getElementById("chart")
    while (existing.firstChild) {
        existing.removeChild(existing.firstChild);
    }
// Makes a dictionary
    var data = []
    for (var key in survey_data[district][question]) {
        data.push({
            name: key,
            value: survey_data[district][question][key]
        });
    }

// Donut graph based on dictionary data
    var height = 400
    var width = 1000
    var totalRadius = Math.min(width, height) / 2
    var donutHoleRadius = totalRadius * 0.5
    var color = d3.scale.category20c()

    var svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', `translate(${totalRadius + 100}, ${height / 2})`)

    var arc = d3.svg.arc().innerRadius(totalRadius - donutHoleRadius).outerRadius(totalRadius)

    var pie = d3.layout.pie().value((d) => d.value).sort(null)

    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(d.data.name))
// Creates a legend based on the options from the given data questions
    var legendItemSize = 18
    var legendSpacing = 4

    var legend = svg
        .selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => {
            var height = legendItemSize + legendSpacing
            var offset = height * color.domain().length / 2
            var x = totalRadius + 100;
            var y = (i * height) - offset
            return `translate(${x}, ${y})`
        })
// Completes the legend
    legend
        .append('rect')
        .attr('width', legendItemSize)
        .attr('height', legendItemSize)
        .style('fill', color);

    legend
        .append('text')
        .attr('x', legendItemSize + legendSpacing)
        .attr('y', legendItemSize - legendSpacing)
        .text((d) => d)

}
