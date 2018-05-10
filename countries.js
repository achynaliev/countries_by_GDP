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

  const countryIndex = {'USA': 'https://api.worldbank.org/v2/countries/us/indicators/NY.GDP.MKTP.CD?format=json',
          'China': 'https://api.worldbank.org/v2/countries/cn/indicators/NY.GDP.MKTP.CD?format=json',
        'Japan': 'https://api.worldbank.org/v2/countries/jp/indicators/NY.GDP.MKTP.CD?format=json',
        'Germany': 'https://api.worldbank.org/v2/countries/de/indicators/NY.GDP.MKTP.CD?format=json',
      'France': 'https://api.worldbank.org/v2/countries/fr/indicators/NY.GDP.MKTP.CD?format=json',
      'UK': 'https://api.worldbank.org/v2/countries/gb/indicators/NY.GDP.MKTP.CD?format=json',
      'India': 'https://api.worldbank.org/v2/countries/in/indicators/NY.GDP.MKTP.CD?format=json',
      'Brazil': 'https://api.worldbank.org/v2/countries/br/indicators/NY.GDP.MKTP.CD?format=json',
      'Italy': 'https://api.worldbank.org/v2/countries/it/indicators/NY.GDP.MKTP.CD?format=json',
      "Canada": 'https://api.worldbank.org/v2/countries/ca/indicators/NY.GDP.MKTP.CD?format=json',
      "South Korea": 'https://api.worldbank.org/v2/countries/kr/indicators/NY.GDP.MKTP.CD?format=json',
      'Russia': 'https://api.worldbank.org/v2/countries/ru/indicators/NY.GDP.MKTP.CD?format=json',
      'Australia': 'https://api.worldbank.org/v2/countries/au/indicators/NY.GDP.MKTP.CD?format=json',
      'Spain': 'https://api.worldbank.org/v2/countries/es/indicators/NY.GDP.MKTP.CD?format=json',
      'Mexico': 'https://api.worldbank.org/v2/countries/mx/indicators/NY.GDP.MKTP.CD?format=json',
      'Indonesia': 'https://api.worldbank.org/v2/countries/id/indicators/NY.GDP.MKTP.CD?format=json',
      'Turkey': 'https://api.worldbank.org/v2/countries/tr/indicators/NY.GDP.MKTP.CD?format=json',
      'Netherlands': 'https://api.worldbank.org/v2/countries/nl/indicators/NY.GDP.MKTP.CD?format=json',
      'Switzerland': 'https://api.worldbank.org/v2/countries/ch/indicators/NY.GDP.MKTP.CD?format=json',
      'Saudi Arabia': 'https://api.worldbank.org/v2/countries/sa/indicators/NY.GDP.MKTP.CD?format=json',
      'Argentina': 'https://api.worldbank.org/v2/countries/ar/indicators/NY.GDP.MKTP.CD?format=json',
      'Sweden': 'https://api.worldbank.org/v2/countries/se/indicators/NY.GDP.MKTP.CD?format=json',
      'Poland': 'https://api.worldbank.org/v2/countries/pl/indicators/NY.GDP.MKTP.CD?format=json',
      'Belgium': 'https://api.worldbank.org/v2/countries/be/indicators/NY.GDP.MKTP.CD?format=json',
      'Thailand': 'https://api.worldbank.org/v2/countries/th/indicators/NY.GDP.MKTP.CD?format=json',
      'Iran': 'https://api.worldbank.org/v2/countries/ir/indicators/NY.GDP.MKTP.CD?format=json',
      'Austria' : 'https://api.worldbank.org/v2/countries/at/indicators/NY.GDP.MKTP.CD?format=json',
      'Egypt' : 'https://api.worldbank.org/v2/countries/eg/indicators/NY.GDP.MKTP.CD?format=json',
      'Nigeria': 'https://api.worldbank.org/v2/countries/ng/indicators/NY.GDP.MKTP.CD?format=json'}

  let more_information = function (d, selectedNode) {

    selectedNode.append("text")
        .attr("class", "innerText")
        .attr("text-anchor", "middle")
        .attr("font-size", 30)
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("dy", "-1.2em")
        .attr("font-weight", "500")
        .attr("pointer-events", "none")
        .text(d.id);

    selectedNode.append("text")
        .attr("class", "innerText")
        .attr("text-anchor", "middle")
        .attr("font-size", 24)
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("dy", "0em")
        .attr("font-weight", "500")
        .attr("pointer-events", "none")
        .text('GDP(nominal) $' + d.gdp2017 + " milllions");

    // selectedNode.append("text")
    //     .attr("class", "innerText")
    //     .attr("text-anchor", "middle")
    //     .attr("font-size", 24)
    //     .attr("x", d.x)
    //     .attr("y", d.y)
    //     .attr("dy", "0em")
    //     .attr("font-weight", "400")
    //     .attr("pointer-events", "none")
    //     .text("quality of life index " + d.qualityOfLife);
    //
    // selectedNode.append("text")
    //     .attr("class", "innerText")
    //     .attr("text-anchor", "middle")
    //     .attr("font-size", 24)
    //     .attr("x", d.x)
    //     .attr("y", d.y)
    //     .attr("dy", "1.2em")
    //     .attr("font-weight", "400")
    //     .attr("pointer-events", "none")
    //     .text("pollution index " + d.polution);
  }

  let bubbleChart = d3.select(".bubbleChart")
  let width = 1310;
  let height = 1150;

  let ifbtn = document.getElementById("backBtn");
  let ifdetailstext = document.getElementById("detailstext")
  if (ifbtn) {
    ifbtn.remove();
  }
  if (ifdetailstext) {
    ifdetailstext.remove();
  }

  let svg = bubbleChart
    .html("")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)");

    var format = d3.format(",d");

    var defs = svg.append("defs");

    $("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });

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


    var radiusScale = d3.scaleSqrt().domain([1,20000000]).range([10,665])

    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width/2).strength(0.05))
        .force("y", d3.forceY(height/2).strength(0.05))
        .force("collide", d3.forceCollide(function(d) {
          return radiusScale(d.gdp2017 /10) + 2;
        }))

    d3.queue()
    .defer(d3.csv, `./data/countries${gdpYear}.csv`)
    .await(ready)

    let color = d3.scaleOrdinal(d3.schemeCategory20);

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
          })
          .on('click', function(d) {
            let apiurl = countryIndex[d.id]

            var y = document.getElementsByClassName('barchartInfo');
            var btn = document.createElement("BUTTON");       // Create a <button> element
            var t = document.createTextNode("Go back");
            var detailstext = document.createElement("H3");
            var ttt = document.createTextNode(`GDP progression of ${d.id} for last 48 years`);
            detailstext.appendChild(ttt);
            detailstext.id = 'detailstext';

            btn.appendChild(t);
            document.getElementById('barchartInfo').appendChild(btn);
            document.getElementById('barchartInfo').appendChild(detailstext)
            btn.id = "backBtn"
            btn.addEventListener("click", () => GdpData(gdpYear))

            $.ajax({
              type: 'GET',
              url: `${apiurl}`,

              success: function(data) {
                let country = data[1].slice(1)
                country = country.reverse()
                var svg = d3.select("svg").html("").attr("width", "1400")
                .attr("height", "600"),
                    margin = {top: 20, right: 20, bottom: 50, left: 100},
                    width = +svg.attr("width") - margin.left - margin.right,
                    height = +svg.attr("height") - margin.top - margin.bottom;

                var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
                    y = d3.scaleLinear().rangeRound([height, 0]);

                var g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                  x.domain(country.map(function(d) { return d.date; }));
                  y.domain([0, d3.max(country, function(d) { return d.value; })]);

                  g.append("g")
                      .attr("class", "axis axis--x")
                      .attr("transform", "translate(0," + height + ")")
                      .call(d3.axisBottom(x));

                  g.append("g")
                      .attr("class", "axis axis--y")
                      .call(d3.axisLeft(y).ticks(10))
                    .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 10)
                      .attr("dy", "1em")
                      .attr("text-anchor", "end")
                      .text("Frequency");

                  console.log(x.bandwidth());

                  g.selectAll(".bar")
                    .data(country)
                    .enter().append("rect")
                      .attr("class", "bar")
                      .attr("x", function(d) { return x(d.date); })
                      .attr("y", function(d) { return y(d.value); })
                      .attr("width", x.bandwidth())
                      .attr("height", function(d) { return height - y(d.value); });

              }
            })
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
