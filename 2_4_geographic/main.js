/* CONSTANTS AND GLOBALS */
const  margin = {top: 50, right: 30, bottom: 30, left: 60};
const width = window.innerWidth * .7 - margin.left - margin.right;
const  height = window.innerHeight * .7 - margin.top - margin.bottom;

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
 Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, heat]) => {

  const svg = d3.select("#container")
  .append("svg")
  .attr("width", width )
  .attr("height", height)
  .attr("overflow", "visible")
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
  
  // SPECIFY PROJECTION
const projection = d3.geoAlbersUsa()
  .fitSize([
    width, height
  ], geojson)

  // DEFINE PATH FUNCTION
const path = d3.geoPath(projection)

  // APPEND GEOJSON PATH    
const state = svg.selectAll("path.state")
    .data(geojson.features)
    .join("path")
    .attr("class", "state")
    .attr("d", coords => path(coords))
    .attr("fill", "transparent")
    .attr("stroke", "black")
  
  // APPEND DATA AS SHAPE
const heatEx = svg.selectAll("circles.heat")
  .data(heat)
  .join("circle")
  .attr("class", "heat")
  .attr("r", "3")
  .attr("fill", "lightsalmon")
  .attr("transform", (d) => {
    const [x,y] = projection([d.Long, d.Lat]);
    return `translate(${x}, ${y})`
  })

svg.append("text")
  .attr("x", width/2)
  .attr("y", margin.top*-1)
  .attr("text-anchor", "middle")
  .style("fill", "Blue")
  .style("font-size", "2em")
  .text("US Extreme Heat")
});