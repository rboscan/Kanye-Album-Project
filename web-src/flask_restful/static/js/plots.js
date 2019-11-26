var tbody = d3.select("tbody");

d3.json('/result', function (jsondata) {
    // PLOT 1 DICTS AND NECESSARY VARIABLES

    // ACTIVE SLIDE IMAGE
    let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");
    var song_name = [];
    var album_name = [];
    var positive = [];
    var negative = [];
    var neutral = [];
    // PLOT 1 START
    for (var i = 0; i < jsondata.length; i++) {
        if (jsondata[i]['Album'] == inputElement) {
            var album = jsondata[i]['Album'];
            album_name.push(album);
            var song_sentiment = jsondata[i]['Sentiment'];
            song_name.push(jsondata[i]['Song']);
            if (song_sentiment > 0) {
                positive.push(song_sentiment);
            } else if (song_sentiment === 0) {
                neutral.push(song_sentiment);
            } else {
                negative.push(song_sentiment);
            }
        };
    };
    pos_len = positive.length
    neg_len = negative.length
    neut_len = neutral.length
    var pos = {
        x: [pos_len],
        y: ['Bar'],
        name: 'Positive',
        orientation: 'h',
        marker: {
            color: 'rgba(243, 216, 112, 0.9)',
            width: 1
        },
        type: 'bar'
    };

    var neg = {
        x: [neg_len],
        y: ['Bar'],
        name: 'Negative',
        orientation: 'h',
        marker: {
            color: 'rgba(236, 112, 86, 0.9)',
            width: 1
        },
        type: 'bar'
    };

    var neut = {
        x: [neut_len],
        y: ['Bar'],
        name: 'Neutral',
        orientation: 'h',
        marker: {
            color: 'rgba(244, 181, 116, 0.9)',
            width: 1
        },
        type: 'bar'
    };

    var data = [neg, neut, pos];

    var layout = {
        title: {
            text: "Datum Distribution",
        },
        xaxis: {
            title: {
                text: "Sentiment Score",
            },
        },
        yaxis: {
            title: {
                text: "Sentiment Distribution by Count",
            },
        },
        barmode: 'stack'
    };

    Plotly.newPlot('plot1', data, layout, { responsive: true });

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
                type: 'pie',
                hole: 0.6
            }];

            var layout2 = {
                title: {
                    text: 'Datum Distribution',
                }
            };
            Plotly.newPlot('plot2', data2, layout2, { responsive: true });
        };
    };

});

// SLICK SLIDE CHANGE
$('div').on("afterChange", function () {
    d3.json('/result', function (jsondata) {
        var song_name = [];
        var positive = [];
        var negative = [];
        var neutral = [];
        var album_name = [];
        let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");
        for (var i = 0; i < jsondata.length; i++) {
            var album = jsondata[i]['Album'];
            album_name.push(album);
            if (jsondata[i]['Album'] == inputElement) {
                var song_sentiment = jsondata[i]['Sentiment'];
                song_name.push(jsondata[i]['Song']);
                if (song_sentiment > 0) {
                    positive.push(song_sentiment);
                } else if (song_sentiment === 0) {
                    neutral.push(song_sentiment);
                } else {
                    negative.push(song_sentiment);
                }
            };
        };
        pos_len = positive.length
        neg_len = negative.length
        neut_len = neutral.length
        var pos = {
            x: [pos_len],
            y: ['Bar'],
            name: 'Positive',
            orientation: 'h',
            marker: {
                color: 'rgba(243, 216, 112, 0.9)',
                width: 1
            },
            type: 'bar'
        };

        var neg = {
            x: [neg_len],
            y: ['Bar'],
            name: 'Negative',
            orientation: 'h',
            marker: {
                color: 'rgba(236, 112, 86, 0.9)',
                width: 1
            },
            type: 'bar'
        };

        var neut = {
            x: [neut_len],
            y: ['Bar'],
            name: 'Neutral',
            orientation: 'h',
            marker: {
                color: 'rgba(244, 181, 116, 0.9)',
                width: 1
            },
            type: 'bar'
        };

        var data = [neg, neut, pos];

        var layout = {
            title: {
                text: 'Datum Distribution',
            },
            xaxis: {
                title: {
                    text: "Sentiment Score",
                },
            },
            yaxis: {
                title: {
                    text: "Sentiment Distribution by Count",
                },
            },
            barmode: 'stack'
        };

        Plotly.newPlot('plot1', data, layout, { responsive: true });

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
                    hole: 0.6
                }];
               
                var layout2 = {
                    title: {
                        text: 'Datum Distribution',
                    }
                };
                Plotly.newPlot('plot2', data2, layout2, { responsive: true });
            };
        };

    });
});