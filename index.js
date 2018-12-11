
var gender = {}
d3.csv("./data/gender.csv",(data)=>{
	if(gender[data.Country] == undefined){
		gender[data.Country] = {}
	}
	gender[data.Country][data.Gender] = +data.Count
	
})

var database = {}
d3.csv("./data/database.csv",(data)=>{
	if(database[data.Country] == undefined){
		database[data.Country] = {}
	}
	database[data.Country][data.DatabaseWorkedWith] = +data.Count
})

var language = {}
d3.csv("./data/language.csv",(data)=>{
	if(language[data.Country] == undefined){
		language[data.Country] = {}
	}
	language[data.Country][data.LanguageWorkedWith] = +data.Count
})

var platform = {}
d3.csv("./data/platform.csv",(data)=>{
	if(platform[data.Country] == undefined){
		platform[data.Country] = {}
	}
	platform[data.Country][data.PlatformWorkedWith] = +data.Count
})



function setup_barcharts(country){
	d3.select("#bar_gender").html("")
	if(gender[country] != undefined){
		dict = gender[country]
		var bars = Object.keys(dict).map(function(key) {
		  return [key, dict[key]];
		});

		// Sort the array based on the second element
		bars.sort(function(first, second) {
		  return second[1] - first[1];
		});

		keys = Object.keys(dict)
		values = Object.keys(dict).map(function(key) {
		  return dict[key];
		});
		create_barchart(bars,keys,values,"#bar_gender")
	}

	d3.select("#bar_database").html("")
	if(database[country] != undefined){
		dict = database[country]
		console.log(dict)
		var bars = Object.keys(dict).map(function(key) {
		  return [key, dict[key]];
		});

		// Sort the array based on the second element
		bars.sort(function(first, second) {
		  return second[1] - first[1];
		});

		bars = 	bars.slice(0,3)

		keys = bars.map(function(ele) {
		  return ele[0]
		});
		values = bars.map(function(ele) {
		  return ele[1]
		});
		create_barchart(bars,keys,values,"#bar_database")
	}

	d3.select("#bar_language").html("")
	if(language[country] != undefined){
		dict = language[country]
		console.log(dict)
		var bars = Object.keys(dict).map(function(key) {
		  return [key, dict[key]];
		});

		// Sort the array based on the second element
		bars.sort(function(first, second) {
		  return second[1] - first[1];
		});

		bars = 	bars.slice(0,3)

		keys = bars.map(function(ele) {
		  return ele[0]
		});
		values = bars.map(function(ele) {
		  return ele[1]
		});
		create_barchart(bars,keys,values,"#bar_language")
	}

	d3.select("#bar_platform").html("")
	if(platform[country] != undefined){
		dict = platform[country]
		console.log(dict)
		var bars = Object.keys(dict).map(function(key) {
		  return [key, dict[key]];
		});

		// Sort the array based on the second element
		bars.sort(function(first, second) {
		  return second[1] - first[1];
		});

		bars = 	bars.slice(0,3)

		keys = bars.map(function(ele) {
		  return ele[0]
		});
		values = bars.map(function(ele) {
		  return ele[1]
		});
		create_barchart(bars,keys,values,"#bar_platform")
	}

	
}



function create_barchart(bars,keys,values,id){
  var w = 500;
  var h = 400;
  var margin = {top: 25, right: 25, bottom: 25,
      left: 25};
  var innerWidth = w - margin.left - margin.right;
  var innerHeight = h - margin.top - margin.bottom;
  var svg = d3.select(id)
    .append("svg")
      .attr("width", w)
      .attr("height", h);
  svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "lightblue");
  var xScale = d3.scaleBand()
      .domain(keys)	
      .range([0, innerWidth])
      .paddingInner(.1);
  var xAxis = d3.axisBottom()                       // NEW
      .scale(xScale);
  var yScale = d3.scaleLinear()
      .domain([0, d3.max(values)])
      .range([innerHeight, 0])
  var yAxis = d3.axisLeft()                       // NEW
      .scale(yScale);
  var bars = svg.append("g")
      .attr("id", "plot")                         // NEW
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
    .selectAll("rect")
      .data(bars);
  bars.enter().append("rect")
      .attr("x", (d, i) => xScale(d[0]))
      .attr("y", d => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d[1]))
      .attr("fill", "blue");
  svg.append("g")                                  // NEW
      .attr("class", "yAxis")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
      .call(yAxis);
   svg.append("g")                                  // NEW
      .attr("class", "xAxis")
      .attr("transform", `translate (${margin.left}, ${margin.top+innerHeight})`)
      .call(xAxis);
}



// General Update Pattern
  // function update(data) {
  //   xScale.domain(d3.range(data.length));
  //   yScale.domain([0, d3.max(data)]);
    
  //   var bars = svg.select("#plot")
  //       .selectAll("rect")
  //       .data(data);
  //   bars.enter().append("rect")
  //     .merge(bars)
  //     .attr("x", (d, i) => xScale(i))
  //     .attr("y", d => yScale(d))
  //     .attr("width", xScale.bandwidth())
  //     .attr("height", d => innerHeight - yScale(d))
  //     .attr("fill", "blue");
  //   bars.exit().remove();
    
  //   svg.select(".yAxis")                        // NEW
  //         .call(yAxis);
  //   svg.select(".xAxis")                        // NEW
  //         .call(xAxis);
  // }