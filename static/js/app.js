// // When the browser window is resized, responsify() is called.
// d3.select(window).on('resize', makeResponsive);

// // When the browser loads, makeResponsive() is called.
// makeResponsive();

// // The code for the chart is wrapped inside a function that automatically resizes the chart
// function makeResponsive() {
//   var svgArea = d3.select('body').select('svg');
//   if (!svgArea.empty()) {
//       svgArea.remove();
//   }

  // SVG wrapper dimensions are determined by the current width and height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    right: 80,
    bottom: 180,
    left: 200
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append an SVG group
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Initial Params
  var chosenYAxis = "danceability";
  var chosenXAxis = "instrumentalness";

  // function used for updating x-scale var upon click on axis label
  function xScale(dataset, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(dataset, d => d[chosenXAxis]) * 0.8,
        d3.max(dataset, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);

      return xLinearScale;

  }

  function yScale(dataset, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(dataset, d => d[chosenYAxis]) * 0.8,
        d3.max(dataset, d => d[chosenYAxis]) * 1.2
      ])
      .range([height, 0])

      return yLinearScale;

  }
  // function used for updating xAxis var upon click on axis label
  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
      .duration(100)
      .call(bottomAxis);

    return xAxis;
  }

  // function used for updating yAxis var upon click on y axis label
  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
      .duration(100)
      .call(leftAxis);

    return yAxis;
  }

  // function used for updating circles group with a transition to
  // new circles
  function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(100)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .duration(100)
      .attr("cy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
  }

  // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

      var label1;
      var label2;

      if (chosenXAxis === "instrumentalness") {
        label1 = "Instrumentalness: ";
      }
      else if (chosenXAxis === "liveness") {
        label1 = "Liveness: ";
      }
      else {
          label1 = "Valence: ";
      }

      if (chosenYAxis === "danceability") {
        label2 = "Danceability: ";
      }
      
      else {
          label2 = "Popularity: ";
      }

      var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([0, 0])
      .html(function(d) {
        return (`${label1} ${d[chosenXAxis]} <br> ${label2} ${d[chosenYAxis]} `);
      });

      circlesGroup.call(toolTip);
      
      circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data, this);
        });

      return circlesGroup;

  }

  
  
 



function buildPlot(datasetName) {
    var dataPath = "data/" + datasetName +".csv";

  // Retrieve data from the CSV file and execute everything below
  d3.csv(dataPath).then(function(dataset, err) {
    if (err) throw err;

    // parse data
    dataset.forEach(function(data) {
      data.danceability = +data.danceability;
      data.popularity = +data.popularity;
      data.instrumentalness = +data.instrumentalness;
      data.liveness = +data.liveness;
      data.valence = +data.valence;
      
    });

    // xLinearScale function above csv import
    var xLinearScale = xScale(dataset, chosenXAxis);

    // Create y scale function
    var yLinearScale = yScale(dataset, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
      .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll(".stateCircle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d[chosenYAxis]))
      .attr("r", 5)
      .classed("stateCircle", true)
      .attr("opacity", ".8");
      
    
    // Create group for three x-axis labels
    var labelsXGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var instrumentalnessLabel = labelsXGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "instrumentalness") // value to grab for event listener
      .classed("x-axis active", true)
      .text("Instrumentalness");

    var livenessLabel = labelsXGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "liveness") // value to grab for event listener
      .classed("x-axis inactive", true)
      .text("Liveness");

    var valenceLabel = labelsXGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "valence") // value to grab for event listener
      .classed("x-axis inactive", true)
      .text("Valence");

     // Create group for three y-axis labels
    var labelsYGroup = chartGroup
      .append("g")
      .attr("transform", "rotate(-90)");

    var danceabilityLabel = labelsYGroup.append("text")
      .attr("y", 0 - (margin.left))
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("value", "danceability") // value to grab for event listener
      .classed("y-axis active", true)
      .text("Danceability");

    var popularityLabel = labelsYGroup.append("text")
      .attr("y", 0 - (margin.left-20))
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("value", "popularity") // value to grab for event listener
      .classed("y-axis inactive", true)
      .text("Popularity");

    
    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
    
    // x axis labels event listener
    labelsXGroup.selectAll(".x-axis")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

          // replaces chosenXAxis with value
          chosenXAxis = value;

          // console.log(chosenXAxis)

          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(dataset, chosenXAxis);

          // updates x axis with transition
          xAxis = renderXAxes(xLinearScale, xAxis);

          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // changes classes to change bold text
          if (chosenXAxis === "instrumentalness") {
            instrumentalnessLabel
              .classed("active", true)
              .classed("inactive", false);
            livenessLabel
              .classed("active", false)
              .classed("inactive", true);
            valenceLabel
              .classed("active", false)
              .classed("inactive", true);
          }

          else if (chosenXAxis === "liveness") {
            instrumentalnessLabel
              .classed("active", false)
              .classed("inactive", true);
            livenessLabel
              .classed("active", true)
              .classed("inactive", false);
            valenceLabel
              .classed("active", false)
              .classed("inactive", true);
          }

          else {
            instrumentalnessLabel
              .classed("active", false)
              .classed("inactive", true);
            livenessLabel
              .classed("active", false)
              .classed("inactive", true);
            valenceLabel
              .classed("active", true)
              .classed("inactive", false);
          }

                   
          textAnalysis(chosenXAxis);

          function textAnalysis(axisValue)  {
            var text = parent.document.getElementById('analysis');

            console.log(axisValue);

          
            var responses = ["<h3> <strong> Correlations Discovered:  </strong> </h3> <br> .... ",
                            "<h3> <strong> Correlations Discovered:  </strong> </h3> <br> ......",
                            "<h3> <strong> Correlations Discovered:  </strong> </h3> <br> ......",
                            ];
          
            var answer;
          
            if (axisValue === "instrumentalness") {
                  answer = responses[0];
              }
            else if (axisValue === "liveness")  {
                answer = responses[1];
              }
            else {
                answer = responses[2];
              }

            text.innerHTML = answer;

          };

         }
      });

    // y axis labels event listener
    labelsYGroup.selectAll(".y-axis")
      .on("click", function() {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {

      // replaces chosenYAxis with value
      chosenYAxis = value;

      // console.log(chosenYAxis)

      // functions here found above csv import
      // updates y scale for new data
      yLinearScale = yScale(dataset, chosenYAxis);

      // updates y axis with transition
      yAxis = renderYAxes(yLinearScale, yAxis);

      // updates circles with new y values
      circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

      // // updates abbr group with new y values
      // abbrGroup = renderAbbr(abbrGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

      // changes classes to change bold text

      if (chosenYAxis === "danceability") {
        danceabilityLabel
          .classed("active", true)
          .classed("inactive", false);
        popularityLabel
          .classed("active", false)
          .classed("inactive", true);
       
      }

      else {
        danceabilityLabel
          .classed("active", false)
          .classed("inactive", true);
        popularityLabel
          .classed("active", true)
          .classed("inactive", false);
        
      }

    }
    });


    
  }).catch(function(error) {
    console.log(error);
  });


};



function init() {

  datasetName = "data_by_artist";
  buildPlot(datasetName);

}


// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var label = d3.select("#dataset").node().value;
    // console.log(label);
    if (label !== datasetName) {

    // replaces chosenXAxis with value
    datasetName = label;

//   // clear the input value
//  d3.select("#scatter").node().innerHTML = "";
//   // Build the plot with the new dataset
  
  buildPlot(datasetName);
  }


}

init();

// Add event listener for submit button
d3.select("#selDataset").on("change", handleSubmit);