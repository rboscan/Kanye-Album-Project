var tbody = d3.select("tbody");

d3.json('/result', function (jsondata) {
    // PLOT 1 DICTS AND NECESSARY VARIABLES
    // ACTIVE SLIDE IMAGE

    let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");

    var song_name_pos = [];
    var song_name_neg = [];
    var song_name_neut = [];
    var positive = [];
    var negative = [];
    var neutral = [];

    for (var i = 0; i < jsondata.length; i++) {
        if (jsondata[i]['Album'] == inputElement) {

            var song_sentiment = jsondata[i]['Sentiment'];

            var song_name = jsondata[i]['Song'];

            if (song_sentiment > 0) {
                positive.push(song_sentiment);
                song_name_pos.push(song_name);
            } else if (song_sentiment === 0) {
                neutral.push(song_sentiment);
                song_name_neut.push(song_name);
            } else {
                negative.push(song_sentiment);
                song_name_neg.push(song_name);
            }

            var pos_len = positive.length;
            var neut_len = neutral.length;
            var neg_len = negative.length;

            var data = [{
                values: [pos_len, neut_len, neg_len],
                labels: ['Positive', 'Neutral', 'Negative'],
                marker: {
                    colors: ['#F5D772', '#F0A775', '#ED6D59']
                },
                type: 'pie',
                hole: 0.6
            }];

            var layout = {

                font: {
                    color: 'rgb(228, 117, 59)'
                },
                title: {
                    text: 'Datum Distribution',
                },
                xaxis: {
                    tickangle: 45,
                    automargin: true
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                margin: {}
            };
            Plotly.newPlot('plot1', data, layout, {
                responsive: true
            });

            var data2 = [{
                    type: 'bar',
                    x: song_name_pos,
                    y: positive,
                    base: [positive],
                    marker: {
                        color: 'blue'
                    },
                    name: 'positive'
                },
                {
                    type: 'bar',
                    x: song_name_neut,
                    y: neutral,
                    base: [neutral],
                    marker: {
                        color: 'yellow'
                    },
                    name: 'neutral'
                },
                {
                    type: 'bar',
                    x: song_name_neg,
                    y: negative,
                    base: [negative],
                    marker: {
                        color: 'red'
                    },
                    name: 'negative'
                }
            ]

            Plotly.newPlot('plot2', data2, layout, {
                responsive: true
            });
        };
    };
});

// SLICK SLIDE CHANGE
$('div').on("afterChange", function () {
    d3.json('/result', function (jsondata) {
        // PLOT 1 DICTS AND NECESSARY VARIABLES
        // ACTIVE SLIDE IMAGE

        let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");

        var song_name_pos = [];
        var song_name_neg = [];
        var song_name_neut = [];
        var positive = [];
        var negative = [];
        var neutral = [];

        for (var i = 0; i < jsondata.length; i++) {
            if (jsondata[i]['Album'] == inputElement) {

                var song_sentiment = jsondata[i]['Sentiment'];

                var song_name = jsondata[i]['Song'];

                if (song_sentiment > 0) {
                    positive.push(song_sentiment);
                    song_name_pos.push(song_name);
                } else if (song_sentiment === 0) {
                    neutral.push(song_sentiment);
                    song_name_neut.push(song_name);
                } else {
                    negative.push(song_sentiment);
                    song_name_neg.push(song_name);
                }

                var pos_len = positive.length;
                var neut_len = neutral.length;
                var neg_len = negative.length;

                var data = [{
                    values: [pos_len, neut_len, neg_len],
                    labels: ['Positive', 'Neutral', 'Negative'],
                    marker: {
                        colors: ['#F5D772', '#F0A775', '#ED6D59']
                    },
                    type: 'pie',
                    hole: 0.6
                }];

                var layout = {

                    font: {
                        color: 'rgb(228, 117, 59)'
                    },
                    title: {
                        text: 'Datum Distribution',
                    },
                    xaxis: {
                        tickangle: 45,
                        automargin: true
                    },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    margin: {}
                };
                Plotly.newPlot('plot1', data, layout, {
                    responsive: true
                });

                var data2 = [{
                        type: 'bar',
                        x: song_name_pos,
                        y: positive,
                        base: [positive],
                        marker: {
                            color: 'blue'
                        },
                        name: 'positive'
                    },
                    {
                        type: 'bar',
                        x: song_name_neut,
                        y: neutral,
                        base: [neutral],
                        marker: {
                            color: 'yellow'
                        },
                        name: 'neutral'
                    },
                    {
                        type: 'bar',
                        x: song_name_neg,
                        y: negative,
                        base: [negative],
                        marker: {
                            color: 'red'
                        },
                        name: 'negative'
                    }
                ]

                Plotly.newPlot('plot2', data2, layout, {
                    responsive: true
                });
            };
        };
    });
});