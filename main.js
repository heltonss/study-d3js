// d3.selectAll("p").style("color", "blue");
// d3.selectAll("p").style("color", function () {
//     return "hsl(" + Math.random() * 360 + ", 100%, 50% )";
// });

// d3.selectAll("p")
// .data([16, 23, 42])
// .style("font-size", function (d) {
//     return d + "px";
// })

// d3.select("body")
//     .selectAll("p")
//     .data([4, 8, 15, 16, 23, 42])
//     .enter().append("p")
//     .text(function (d) { return "I’m number " + d + "!"; });

// var p = d3.select("body")
//     .selectAll("p")
//     .data([4, 8, 15, 16, 23, 42])
//     .text(function (d) { return d; });

// // Enter…
// p.enter().append("p")
//     .text(function (d) { return d; });

// // Exit…
// p.exit().remove();

// d3.select("body").transition()
//     .style("background-color", "yellow");

// d3.selectAll("circle").transition()
//     .duration(750)
//     .delay(function (d, i) { return i * 10; })
//     .attr("r", function (d) { return Math.sqrt(d * scale); });

// d3.select('.some').text() // get the innerText of #someDiv
// d3.select('.some').text('Hello World!') // set the innerText of #someDiv
// d3.select('.some').html() // get the innerHTML of #someDiv
// d3.select('.some').html('<h5>Hello World!</h5>')

// const data = [90, 70, 50, 30, 10]

// d3.select('#chart')
//     .selectAll('div')
//     .data(data) // pair each number in the array with an empty div
//     .attr('class', 'bar') // color, height, and spacing via CSS
//     .style('height', function (d) {
//         return d + 'px' // use the data items as pixel widths
//     })
// d3.select('#chart')
//     .selectAll('div')
//     .data(data) // pair each number in the array with an empty div
//     .enter()
//     .append('div')
//     .attr('class', 'bar') // color, height, and spacing via CSS
//     .style('height', function (d) {
//         return d + 'px' // use the data items as pixel widths
//     })

const datax = [
    { name: 'Alice', math: 93, science: 84 },
    { name: 'Bobby', math: 81, science: 97 },
    { name: 'Carol', math: 74, science: 88 },
    { name: 'David', math: 64, science: 76 },
    { name: 'Emily', math: 80, science: 94 }
]

// const render = (subject) => {

//     d3.select('#exChart') 
//         .selectAll('div') 
//         .remove()

//     d3.select('#exChart')
//         .selectAll('div')
//         .data(datax)
//         .enter()
//         .append('div')
//         .attr('class', 'barx')
//         .style('height', function (d) {
//             return d[subject] + 'px'
//         })
// }

// render('math')

// add bars animated
const render = (subject) => {
    const margin = { top: 10, right: 10, bottom: 20, left: 50 }
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width])

    const yScale = d3.scaleBand()
        .domain(datax.map(function (d) { return d.name }))
        .range([0, height])

    // console.log('teste', subject)
    // d3.select('#exChart')
    //     .selectAll('div')
    //     .remove();

    const bars = d3.select('#exChart')
        .selectAll('div')
        .data(datax, function (d) {
            return d.name
        })

    const newsBar = bars.enter().append('div')
        .attr('class', 'barx')
        .style('width', 0)
        .style('height', function (d) {
            // use the height calculated by the band scale
            return yScale.bandwidth() - 2 + 'px'
        })

    newsBar.merge(bars)
        .transition()
        .style('width', function (d) {
            return xScale(d[subject]) + 'px';
        })

    const svg = d3.select('#exChart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('position', 'absolute')
        .style('top', 0)
        .style('left', 0)

    const axisContainer = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    axisContainer.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))

    axisContainer.append('g')
        .call(d3.axisLeft(yScale));
}

render('math');

