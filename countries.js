function byYear(){
  let e = document.getElementById("yearSelect");
  let gdpYear = e.options[e.selectedIndex].value;

  e.addEventListener("change", function() {
    FuckData(e.options[e.selectedIndex].value);
  });

  FuckData(e.options[e.selectedIndex].value)

};

byYear();


function FuckData(gdpYear) {

  let more_information = function (d, selectedNode) {

    selectedNode.append("text")
        .attr("class", "innerText")
        .attr("text-anchor", "middle")
        .attr("font-size", 30)
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("dy", "-3em")
        .attr("font-weight", "500")
        .attr("pointer-events", "none")
        .text(d.id);

    selectedNode.append("text")
        .attr("class", "innerText")
        .attr("text-anchor", "middle")
        .attr("font-size", 24)
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("dy", "-1.2em")
        .attr("font-weight", "500")
        .attr("pointer-events", "none")
        .text('GDP(nominal) $' + d.gdp2017 + " milllions");

    selectedNode.append("text")
        .attr("class", "innerText")
        .attr("text-anchor", "middle")
        .attr("font-size", 24)
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("dy", "0em")
        .attr("font-weight", "400")
        .attr("pointer-events", "none")
        .text("quality of life index " + d.qualityOfLife);

    selectedNode.append("text")
        .attr("class", "innerText")
        .attr("text-anchor", "middle")
        .attr("font-size", 24)
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("dy", "1.2em")
        .attr("font-weight", "400")
        .attr("pointer-events", "none")
        .text("pollution index " + d.polution);
  }

  let bubbleChart = d3.select(".bubbleChart")
  let width = 1250;
  let height = 1220;

  let svg = bubbleChart
    .html("")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)");

    var format = d3.format(",d");

    var defs = svg.append("defs");

    defs.append("pattern")
      .attr("id", "us")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRation", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xlink:href", "us.png")


    var radiusScale = d3.scaleSqrt().domain([1,20000000]).range([10,650])

    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width/2).strength(0.05))
        .force("y", d3.forceY(height/2).strength(0.05))
        .force("collide", d3.forceCollide(function(d) {
          return radiusScale(d.gdp2017 /10) + 2;
        }))

    d3.queue()
    .defer(d3.csv, `./data/countries${gdpYear}.csv`)
    .await(ready)

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    function ready (error, datapoints ) {

      var circles = svg.selectAll(".node")
        .data(datapoints)
        .enter().append('circle')
        .attr("class", "node")
        .attr("r", function(d) {
          return radiusScale(d.gdp2017 / 10)
        })
        .attr("fill", function(d) { return color(Math.random()); })
        .attr("cx", 500)
        .attr("cy", 500)
        .style("opacity", 0.95)
        .style("stroke", "white")
        .style('stroke-width', 1)
        .on('mouseenter', function(d){"",
              d3.selectAll("circle").style('opacity', 0.3);
              var mouseNode = d3.select(this);
              mouseNode.style('opacity', 1);
              mouseNode.transition().duration(200).delay(100).attr('r', 210);
              mouseNode.style('stroke-width', 5);
              d3.selectAll("text").attr("visibility","hidden");
              mouseNode.attr("visibility","visible");
              selectedNode = svg.selectAll(".innerText")
                  .data(mouseNode.data())
                  .enter().append('g');
              setTimeout(function(){if(mouseNode.style("opacity") == 1){
                more_information(d, selectedNode);
              }}, 200)
            })
        .on('mouseleave', function(d){"",
              d3.select(this).transition().duration(200).delay(0).attr('r', function(d) {
                return radiusScale(d.gdp2017 / 10)
              });
              d3.select(this).style('stroke-width', 1);
              d3.selectAll("circle").style('opacity', 0.95);
              d3.selectAll("text").attr("visibility","visible");
              d3.selectAll("#normalText").attr("visibility","none");
              d3.selectAll(".innerText").remove();
          });

      let texts = svg.selectAll(null)
                      .data(datapoints)
                      .enter()
                      .append("g")
        //
        circles.append("clipPath")
              .attr("id", function(d) { return "clip-" + d.id; })
            .append("use")
              .attr("xlink:href", function(d) { return "#" + d.id; });

      texts.append("text")
          .attr("text-anchor", "middle")
          .each(function(d){
              let arr = d.id.split(/(?=[A-Z][^A-Z])/g);
              d3.select(this).selectAll(null)
                  .data(arr)
                  .enter()
                  .append("tspan")
                  .attr("text-anchor", "middle")
                  .attr("x", 0)
                  .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
              .text(String)
          });

          simulation.nodes(datapoints).on('tick', ticked)

          function ticked() {
              circles.attr("cx", function(d) {
                return d.x
              })
              .attr("cy", function(d) {
                return d.y
              })

              texts.attr("transform", function(d) {
                  return "translate(" + d.x + "," + d.y + ")"
                })
            }
    };
}
