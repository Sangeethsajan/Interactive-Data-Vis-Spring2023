const margin = {top: 10, right: 100, bottom: 200, left: 100},
    width = 1460 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// create color scale
const color = d3.scaleThreshold().domain([1000,10000,100000,1000000])
  .range(['#ADD8E6', '#7DF9FF', '#00FFFF', '#0096FF','#0047AB']);

// us map projection
var projection = d3.geoAlbersUsa()
  .translate([width / 2 - 300, height / 2]) // translate to center of screen
  .scale([1000]); // scale to see entire US

var path = d3.geoPath()
  .projection(projection);

// specify inital selected variable in dropdown menu
var selectedVariable = 'Total'

// create svg element and append map
const svg = d3.select("#container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);


// create tooltip
var div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .attr('opacity', 0);

// load us states geojson data and merge with states data
d3.csv('Data-Final.csv', function(data) {
  d3.json('us-states.json', function(json) {
    for (var i = 0; i < data.length; i++) {
      var state = data[i].Label;
      var Total = data[i].Total;
      var walked = data[i].walked;

      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;
        if (state == jsonState) {
          json.features[j].properties.walked = walked;
          json.features[j].properties.Total = Total;
          break;
        }
      }
      console.log(json)
    }

    map = svg.selectAll('path')
      .data(json.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('stroke', '#000')
      .attr('stroke-width', '0.5')
      .attr('fill', function(d) { return color(d.properties[selectedVariable]) })
      .call(updateMap)
      .on('mouseover', function(d) {
        div.style('display', 'inline');
      })
      .on('mousemove', function(d) {
        div.html(d.properties.name + '<br>' + 'Total: ' + d.properties.Total +
        '<br>' + 'Walked: ' + d.properties.walked)
        .style('left', (d3.event.pageX - (parseInt(div.style('width'), 10) / 2)) + 'px')
        .style('top', (d3.event.pageY - parseInt(div.style('height'), 10) - 10) + 'px');
      })
      .on('mouseout', function(d) {
        div.style('display', 'none');
      });
  });
});

// create dropdown menu that changes map
// create dropdown menu options and map options to variable names in data
var dropdownOptions = ['Total', 'Walked'];
var variableNames = {'Total': 'Total', 'Walked': 'walked'};

// handler for user selections in dropdown
var dropdownChange = function() {
    var variable = d3.select(this).property('value')
    selectedVariable = variableNames[variable]
    map.call(updateMap)
};

// var dropdown = d3.select('#selectButton')
//   .insert('select', 'svg')
//   .on('change', dropdownChange);

var dropdown = d3.select('#selectButton')
.on('change', dropdownChange);


dropdown.selectAll('option')
  .data(dropdownOptions)
  .enter().append('option')
  .attr('value', function (d) { return d; })
  .text(function (d) { return d; });

function updateMap(selection) {
  selection.transition()
    .duration(500)
    .attr('fill', function(d) { return color(d.properties[selectedVariable]) })
};

const legendRectSize = 30;
const legendSpacing = 10;

var legend = svg.append('g')
  .selectAll('g')
  .data(color.domain().reverse() )
  .enter()
  .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var height = legendRectSize;
      var x = 0;
      var y = i * height;
      return 'translate(' + 850 + ',' + y + ')';
    });

legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .attr('fill', color)
  .attr('stroke', '#000')
  .attr('stroke-width', '1')

legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) { return d; });
