var width = 600;
var height = 600;

var activeDistrict = null;
var activeQuestion = null;
var survey_data = null;

var svg = d3.select( "#map" )
	.append( "svg" )
	.attr( "width", width )
	.attr( "height", height );

var proj = d3.geo.conicEqualArea()
	.scale( 77423.06161113291 )
	.center( [ -73.92389357849065, 40.69483904240502 ] )
	.parallels( [ 40.496133987610385, 40.91553277650213 ] )
	.rotate( [ 73.92389357849065 ] )
	.translate( [ -66755.26684646154, -29714.320463485623 ] );

var p = d3.geo.path().projection( proj );

queue().defer( d3.json, "static/data/nyc_school_districts.geojson" ).await( rd );

function rd( error, districts ) {
	svg.append( "g" ).selectAll( "path" ).data( districts.features ).enter().append( "path" ).attr( "d", p ).attr( "class", "district" ).on( "mouseover", function ( d ) {
		d3.select( "h2" ).text( "District " + d.properties.district );
		d3.select(this)[0][0].classList.toggle("hover");
	}).on( "mouseout", function ( d ) {
		if(activeDistrict){
			d3.select( "h2" ).text( "District " +  activeDistrict );
		} else {
			d3.select( "h2" ).text( "Select a District" );
		}
		d3.select(this)[0][0].classList.toggle("hover");
	}).on( "click", function (d) {
		if(document.getElementsByClassName("district-active").length > 0){
			document.getElementsByClassName("district-active")[0].classList.toggle("district-active");
		}
		d3.select(this)[0][0].classList.toggle("district-active");
		activeDistrict = d.properties.district;
		document.getElementById("district-num").innerHTML = activeDistrict;
		loadData(activeDistrict, activeQuestion);
	});
}

d3.json("static/data/student_survery_data.json", function(json){
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

    var existing = document.getElementById("chart")
    while (existing.firstChild) {
        existing.removeChild(existing.firstChild);
    }

    var data = []
    for (var key in survey_data[district][question]) {
        data.push({
            name: key,
            value: survey_data[district][question][key]
        });
    }


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
