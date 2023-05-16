const width = window.innerWidth * 0.8,
height = window.innerHeight * 0.8,
  margin = 100;
//   radius = ;

/* LOAD DATA */
d3.csv("squirrelActivities.csv", d3.autoType)
  .then(data => {
    console.log(data)

    // append svg
    const svg = d3.select("#container").append("svg")
      .attr("width", width)
      .attr("height", height)

    /* SCALES */
    const xScale = d3.scaleLinear()
      .domain([0, Math.max(...data.map(d => d.count))]) 
      .range([margin,width - margin]) 

    const yScale = d3.scaleBand()
    // .domain(d3.extent(data.map(d => d.count))) // how ever many activites there are
    .domain(['running', 'chasing', 'climbing', 'eating', 'foraging'])
    // .range([height, 0])
    .range([height - margin, margin])
    .paddingInner(.2)

    var tooltipForData = d3
.select("#container")
.append("div")
.attr("id", "tooltip")
.style("opacity", 0);



    /* HTML ELEMENTS */

    // append rectangles 
    svg.selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", xScale(0))
    .attr("y", d => yScale(d.activity))
    .attr("width", d => xScale(0))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#69b3a2")
    .attr("text","Hello")
    .on('mouseover', function(event,d) {
      d3.select(this).attr('stroke', '#333').attr('stroke-width', 2).attr("fill", "lavender");
      tooltipForData.transition().duration(100).style("opacity", 0.95);
      tooltipForData
        .html(
          "<span>Year: </span>" +
          d.activity +
          "<br>" +
           "<span>Polio Deaths: </span>" +
          d.count
           )
      })
      .on('mouseout', function() {
        d3.select(this).attr('stroke', null).attr("fill", "#69b3a2");
        tooltipForData.transition().duration(100).style("opacity", 0)
      })

    svg.selectAll("rect.bar")
  .transition()
  .duration(1000)
  .attr("x", function(d) { return xScale(0); })
  .attr("width", function(d) { return xScale(d.count)-margin; })
  .delay(function(d,i){console.log(i) ; return(i*100)})
    /* Axes */
    const xAxis = d3.axisBottom(xScale)
    console.log(xAxis) 
    const yAxis = d3.axisLeft(yScale)
    

    svg
      .append("g")
      .style("transform", `translate(0px, ${height - margin}px)`) 
      .call(d3.axisBottom(xScale))
    svg
      .append("g")
      .style("transform", `translate(${margin}px, 0px)`)
      .call(yAxis)

svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .style("font-size", "25px")
        .attr("x", width/2)
        .attr("y", height-30)
        .text("Count")
    
svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .style("font-size", "25px")
        .attr("y", 20)
        .attr("x", -240)
        .text("Activities");

svg.append("text")
        .attr("text-anchor", "middle")
        .style("fill", "blue")
        .style("font-size", "2em")
        .attr("x", width/2)
        .attr("y", 45 )
        .text("Squirrel Activities")

  });