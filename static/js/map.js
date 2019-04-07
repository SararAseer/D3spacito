var width = 600;
var height = 600;

var activeDistrict = null;

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
	});
}
