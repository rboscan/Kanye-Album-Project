var tbody = d3.select("tbody");

d3.json('/result', function (jsondata) {
    // PLOT 1 DICTS AND NECESSARY VARIABLES
    // ACTIVE SLIDE IMAGE
    let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");
    // SLICK SLIDE 2ND PLOT
    var song_name2 = [];
    var positive2 = [];
    var negative2 = [];
    var neutral2 = [];
    for (var i = 0; i < jsondata.length; i++) {
        if (jsondata[i]['Album'] == inputElement) {
            var song_sentiment = jsondata[i]['Sentiment'];
            song_name2.push(jsondata[i]['Song']);
            if (song_sentiment > 0) {
                positive2.push(song_sentiment);
            } else if (song_sentiment === 0) {
                neutral2.push(song_sentiment);
            } else {
                negative2.push(song_sentiment);
            }
            pos_len2 = positive2.length;
            neut_len2 = neutral2.length;
            neg_len2 = negative2.length;

            var data2 = [{
                values: [pos_len2, neut_len2, neg_len2],
                labels: ['Positive', 'Neutral', 'Negative'],
                marker:{
                    colors: ['#F5D772','#F0A775','#ED6D59']
                },
                type: 'pie',
                hole: 0.6
            }];

            var layout2 = {
                legend: {
                    font: {
                        color:'rgb(228, 117, 59)'
                    }
                },
                title: {
                    text: 'Datum Distribution',
                    font: {
                        color:'rgb(228, 117, 59)'
                    }
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)'
            };
            Plotly.newPlot('plot2', data2, layout2, { responsive: true });
        };
    };

});

// SLICK SLIDE CHANGE
$('div').on("afterChange", function () {
    d3.json('/result', function (jsondata) {
        let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");
        // PLOT 2 SLICK SLIDE CHANGE
        var song_name2 = [];
        var positive2 = [];
        var negative2 = [];
        var neutral2 = [];
        for (var i = 0; i < jsondata.length; i++) {
            if (jsondata[i]['Album'] == inputElement) {
                var song_sentiment2 = jsondata[i]['Sentiment'];
                song_name2.push(jsondata[i]['Song']);
                if (song_sentiment2 > 0) {
                    positive2.push(song_sentiment2);
                } else if (song_sentiment2 === 0) {
                    neutral2.push(song_sentiment2);
                } else {
                    negative2.push(song_sentiment2);
                }
                pos_len2 = positive2.length;
                neut_len2 = neutral2.length;
                neg_len2 = negative2.length;

                var data2 = [{
                    values: [pos_len2, neut_len2, neg_len2],
                    labels: ['Positive', 'Neutral', 'Negative'],
                    type: 'pie',
                    marker:{
                        colors: ['#F5D772','#F0A775','#ED6D59']
                    },
                    hole: 0.6
                }];

                var layout2 = {
                    
                    legend: {
                        font: {
                            color:'rgb(228, 117, 59)'
                        }
                    },
                    title: {
                        text: 'Datum Distribution',
                        font: {
                            color:'rgb(228, 117, 59)'
                        }
                    },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)'
                };
                Plotly.newPlot('plot2', data2, layout2, { responsive: true });
            };
        };

    });
});