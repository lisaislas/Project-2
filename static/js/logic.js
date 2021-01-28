
// !!!!!!!! WARNING !!!!!!!!! : There is a visual bug with chart.js that requires you to zoom in the browser window before the charts will appear


// ~~~~~~ CHART ONE (SCATTER) ~~~~~~

// grabs energy vs danceability data
var points = [];

getData1();
function getData1() {
    fetch('http://127.0.0.1:5000/energy_vs_danceability')
    .then(res => res.json())
    .then(data => {
        data.forEach(value => {
            temp = {x: value.energy, y: value.danceability};
            points.push(temp);
        })
    })
}

// grabs tempo vs danceability data
var points1 = [];

getData2();
function getData2() {
    fetch('http://127.0.0.1:5000/popularity_vs_danceability')
    .then(res => res.json())
    .then(data => {
        data.forEach(value => {
            temp = {x: value.popularity, y: value.danceability};
            points1.push(temp);
        })
    })
}

// creates scatter plot 
var myChart1 = document.getElementById("myChart").getContext('2d');

var chart1 = new Chart(myChart1, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Energy',
            data: points,
            pointBackgroundColor: "rgba(73, 169, 234, 1)",
            backgroundColor: "rgba(73, 169, 234, 1)"
        },
        {
            label: 'Popularity',
            data: points1,
            pointBackgroundColor: "rgba(179, 112, 207, 1)",
            backgroundColor: "rgba(179, 112, 207, 1)"
        }]
    },
    options: {
        title: {
            text: "vs. Danceability",
            fontSize: 25,
            fontColor: '#b3b3b3',
            display: true
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    zeroLineColor: "#b3b3b3"
                },
                ticks: {
                    fontColor: "#b3b3b3",
                    fontSize: 16
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    zeroLineColor: "#b3b3b3"
                },
                ticks: {
                    fontColor: "#b3b3b3",
                    fontSize: 16
                }
            }]
        }
    }
})



// ~~~~~~ CHART TWO (HORIZONTAL BAR) ~~~~~~

// grabs most danceable genres data
var xlabel = [];
var ylabel = [];

getData3();
function getData3() {
    fetch('http://127.0.0.1:5000/most_danceable_genres')
    .then(res => res.json())
    .then(data => {
        data.forEach(value => {
            xlabel.push(value.genres);
            ylabel.push(value.total_danceability);
        })
    })
}

// creates horizontal bar chart
var colors = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#49A9EA', '#36CAAB'];

var myChart2 = document.getElementById("myChart2").getContext('2d');

var chart2 = new Chart(myChart2, {
    type: 'horizontalBar',
    data: {
        labels: xlabel,
        datasets: [{
            label: 'Danceability',
            data: ylabel,
            backgroundColor: colors
        }]
    },
    options: {
        title: {
            text: "Most Danceable Genres (Top 10)",
            fontSize: 25,
            fontColor: '#b3b3b3',
            display: true
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    zeroLineColor: "#b3b3b3"
                },
                ticks: {
                    fontColor: "#b3b3b3",
                    fontSize: 16
                }
            }],
            yAxes: [{
                display: true,
                ticks: {
                    fontColor: "#b3b3b3",
                    fontSize: 16
                }
            }]
        }
    }
})



// ~~~~~~ CHART THREE (RADAR) ~~~~~~

// grabs attributes data for edm genre
var edmLabel = [];
var edmAttributes = [];

getData5();
function getData5() {
    fetch('http://127.0.0.1:5000/edm')
    .then(res => res.json())
    .then(data => {
        data.forEach(value => {
            edmLabel.push(value.genres);
            edmAttributes.push(value.acousticness);
            edmAttributes.push(value.danceability);
            edmAttributes.push(value.energy);
            edmAttributes.push(value.instrumentalness);
            edmAttributes.push(value.speechiness);
        })
    })
}

// grabs attributes data for hip hop genre
var hiphopLabel = [];
var hiphopAttributes = [];

getData6();
function getData6() {
    fetch('http://127.0.0.1:5000/hiphop')
    .then(res => res.json())
    .then(data => {
        data.forEach(value => {
            hiphopLabel.push(value.genres);
            hiphopAttributes.push(value.acousticness);
            hiphopAttributes.push(value.danceability);
            hiphopAttributes.push(value.energy);
            hiphopAttributes.push(value.instrumentalness);
            hiphopAttributes.push(value.speechiness);
        })
    })
}

// grabs attributes data for rock genre
var rockLabel = [];
var rockAttributes = [];

getData7();
function getData7() {
    fetch('http://127.0.0.1:5000/rock')
    .then(res => res.json())
    .then(data => {
        data.forEach(value => {
            rockLabel.push(value.genres);
            rockAttributes.push(value.acousticness);
            rockAttributes.push(value.danceability);
            rockAttributes.push(value.energy);
            rockAttributes.push(value.instrumentalness);
            rockAttributes.push(value.speechiness);
        })
    })
}

// creates radar plot
var attributeKeys = ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Speechiness'];

var myChart3 = document.getElementById("myChart3").getContext('2d');

var chart3 = new Chart(myChart3, {
    type: 'radar',
    data: {
        labels: attributeKeys,
        datasets: [{
            label: edmLabel,
            fill: true,
            backgroundColor: "rgba(168, 230, 207, 0.2)",
            borderColor: "rgba(168, 230, 207, 1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(168, 230, 207, 1)",
            data: edmAttributes
        },
        {
            label: hiphopLabel,
            fill: true,
            backgroundColor: "rgba(255, 211, 182, 0.2)",
            borderColor: "rgba(255, 211, 182, 1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(255, 211, 182, 1)",
            data: hiphopAttributes
        },
        {
            label: rockLabel,
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            data: rockAttributes
        }
    ]
    },
    options: {
        title: {
            text: "Attributes of Popular Genres",
            fontSize: 25,
            fontColor: '#b3b3b3',
            display: true
        },
        legend: {
            display: true
        },
        scale: {
            pointLabels: {
                fontSize: 16,
                fontColor: "#b3b3b3"
            },
            gridLines: {
                color: "rgba(179, 179, 179, 0.2)"
            },
            angleLines: {
                color: "#rgba(179, 179, 179, 0.2)"
            }
        }
    }
})



// ~~~~~~ CHART FOUR (LINE) ~~~~~~

// grabs danceability by year data
let xlabel1 = [];
let ylabel1 = [];

getData4();
function getData4() {
    fetch('http://127.0.0.1:5000/danceability_by_year')
    .then(res => res.json())
    .then(data => {
        data.forEach(value => {
            xlabel1.push(value.year);
            ylabel1.push(value.total_danceability);
        })
    })
}

// creates line chart
var myChart4 = document.getElementById("myChart4").getContext('2d');

var chart4 = new Chart(myChart4, {
    type: 'line',
    data: {
        labels: xlabel1,
        datasets: [{
            label: 'Danceability',
            data: ylabel1,
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderColor: "rgba(255, 99, 132, 0.5)"
        }]
    },
    options: {
        title: {
            text: "Danceability by Year",
            fontSize: 25,
            fontColor: '#b3b3b3',
            display: true
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    zeroLineColor: "#b3b3b3"
                },
                ticks: {
                    fontColor: "#b3b3b3",
                    fontSize: 16
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    zeroLineColor: "#b3b3b3"
                },
                ticks: {
                    fontColor: "#b3b3b3",
                    fontSize: 16
                }
            }]
        }     
    }
})