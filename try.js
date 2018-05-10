function byYear(){
  let e = document.getElementById("yearSelect");
  let gdpYear = e.options[e.selectedIndex].value;

  e.addEventListener("change", function() {
    GdpData(e.options[e.selectedIndex].value);
  });

  GdpData(e.options[e.selectedIndex].value)

};

byYear();

function GdpData(gdpYear) {

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

    var svg = d3.select(".bubbleChart")
    let width = 1300;
    let height = 1220;

    var format = d3.format(",d");
    var color = d3.scaleOrdinal(d3.schemeCategory20c);
    var pack = d3.pack()
        .size([width, height])
        .padding(3);
    d3.csv("./data/countries2017.csv", function(d) {
      if (d.gdp2017) return d;
    }, function(error, classes) {
      console.log(classes);
      if (error) throw error;
      var root = d3.hierarchy({children: classes})
          .sum(function(d) { return d.gdp2017; })
          .each(function(d) {
            if (id = d.id) {
              var id, i = id.lastIndexOf(".");
              d.id = id;
              d.package = id.slice(0, i);
              d.class = id.slice(i + 1);
              console.log();
            }
          });

      var node = svg.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("circle")
          .attr("id", function(d) { return d.id; })
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { return color(Math.random()); });

      node.append("clipPath")
          .attr("id", function(d) { return "clip-" + d.id; })
        .append("use")
          .attr("xlink:href", function(d) { return "#" + d.id; });

      node.append("text")
          .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
        .selectAll("tspan")
        .data(function(d) { return d.gdp2017.split(/(?=[A-Z][^A-Z])/g); })
        .enter().append("tspan")
          .attr("x", 0)
          .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
          .text(function(d) { return d; });

      node.append("title")
          .text(function(d) { return d.id + "\n" + format(d.gdp2017); });
    });

};
