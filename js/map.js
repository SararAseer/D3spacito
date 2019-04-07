var width = window.innerWidth + 10 - 10;
var height = window.innerHeight + 10 - 10;

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

queue().defer( d3.json, "data/nyc_school_districts.geojson" ).await( rd );

function rd( error, districts ) {
	console.log( districts );
	svg.append( "g" )
		.selectAll( "path" )
		.data( districts.features )
		.enter()
		.append( "path" )
		.attr( "d", p )
		.attr( "class", "district" )
		.on( "mouseover", function ( d ) {
			d3.select( "h2" )
				.text( d.properties.district );
			d3.select( this )
				.attr( "class", "district hover" );
		} )
		.on( "mouseout", function ( d ) {
			d3.select( "h2" )
				.text( "" );
			d3.select( this )
				.attr( "class", "district" );
		} );
}
