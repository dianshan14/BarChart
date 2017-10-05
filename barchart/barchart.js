var data = [
    {name:"A" , num:.08167},
    {name:"B" , num:.01492},
    {name:"C" , num:.02780},
    {name:"D" , num:.04253},
    {name:"E" , num:.12702},
    {name:"F" , num:.02288},
    {name:"G" , num:.02022},
    {name:"H" , num:.06094},
    {name:"I" , num:.06973},
    {name:"J" , num:.00153},
    {name:"K" , num:.00747},
    {name:"L" , num:.04025},
    {name:"M" , num:.02517},
    {name:"N" , num:.06749},
    {name:"O" , num:.07507},
    {name:"P" , num:.01929},
    {name:"Q" , num:.00098},
    {name:"R" , num:.05987},
    {name:"S" , num:.06333},
    {name:"T" , num:.09056},
    {name:"U" , num:.02758},
    {name:"V" , num:.01037},
    {name:"W" , num:.02465},
    {name:"X" , num:.00150},
    {name:"Y" , num:.01971},
    {name:"Z" , num:.00074},
];

var margin = { top: 40, right: 20, bottom: 30, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body")
            .append("svg")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
            .attr('transform', "translate(" + margin.left + "," + margin.top + ")");
            // append a group. all of elements in group should have the same attribute

var yScale = d3.scaleLinear()
               .domain([0, 100*d3.max(data, function(d){ return d.num; })])
               .range([height, 0]); //position

var xScale = d3.scaleBand()
               .domain(data.map(function(d){ return d.name; }))
               .range([0, width])
               .padding(0.1);


svg.selectAll("rect")
   .data(data)
   .enter()
   .append("rect")
   .attr('class', "bar")
   .attr('x', function(d,i){ return xScale(d.name) })
   .attr('y', function(d,i){ return yScale(d.num*100); })
   .attr('width', xScale.bandwidth())
   .attr('height', function(d,i){ return height-yScale(d.num*100); })
   .attr('class', "bar")
   .attr('fill', "#FFB300")
   .on("mouseenter", function(d,i){
        d3.selectAll("svg g text.value")
          .filter(function(d,ind){ return ind === i;})
          .style("display", "initial");
   })
   .on("mouseleave", function(d,i){
        d3.selectAll("svg g text.value")
          .style("display", "none");
   });




svg.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   .attr('x', function(d,i){ return xScale(d.name); })
   .attr('y', function(d,i){ return yScale(d.num*100); })
   .attr('fill', "red")
   .style('text-anchor', 'start')
   .text(function(d){ return d.num.toFixed(3); })
   .attr('class', "value");
 

var yAxis = d3.axisLeft(yScale)
              .tickFormat(function(d){ return d+"%" ;});

svg.append("g")
   .attr('transform', "translate(-10,0)")
   .call(yAxis)
   .selectAll("*")
   .style('stroke', "white");

var xAxis = d3.axisBottom(xScale);

svg.append("g")
   .attr('transform', "translate(0," + height + ")")
   .call(xAxis)
   .selectAll("*")
   .style('stroke', "white");