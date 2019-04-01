var width = 1250, height = 550;

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height)

// Get the correctly organized data from python
var data = JSON.parse(document.getElementsByClassName("wifi.json")[0].innerHTML);
// console.log(data)

var x_scale = d3.scaleLinear()

var y_scale = d3.scaleLinear()
    .domain([0,100])
    .range([500,0]);

var x_axis = d3.axisBottom()
    .scale(x_scale).tickFormat(d3.format("d"))

var y_axis = d3.axisLeft()
    .scale(y_scale)


chart.append('g')
    .attr("transform","translate (25,530)")
    .call(x_axis)

chart.append('g')
    .attr("transform","translate (25,30)")
    .call(y_axis)
