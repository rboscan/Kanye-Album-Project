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
            color: 'rgba(205, 182, 93, 0.9)',
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
            color: 'rgba(217, 102, 55, 0.9)',
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
            color: 'rgba(196, 148, 86, 0.9)',
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

    Plotly.newPlot('plot1', data, layout, {responsive: true});

    // SLICK SLIDE 2ND PLOT

    // var song_name2 = [];
    // var positive2 = [];
    // var negative2 = [];
    // var neutral2 = [];
    // for (var i = 0; i < jsondata.length; i++) {
    //     if (jsondata[i]['Album'] == inputElement) {
    //         var song_sentiment = jsondata[i]['Sentiment'];
    //         song_name2.push(jsondata[i]['Song']);
    //         if (song_sentiment > 0) {
    //             positive2.push(song_sentiment);
    //         } else if (song_sentiment === 0) {
    //             neutral2.push(song_sentiment);
    //         } else {
    //             negative2.push(song_sentiment);
    //         }
    //     };
    // };
    // pos_len2 = positive2.reduce((a,b) => a+b, 0);
    // console.log(pos_len2);
    // neg_len2 = negative2.reduce((a,b) => a+b, 0);
    // neut_len2 = neutral2.reduce((a,b) => a+b, 0);
    // var pos2 = {
    //     x: [pos_len2],
    //     y: ['Bar'],
    //     name: 'Positive',
    //     orientation: 'h',
    //     marker: {
    //         color: 'rgba(47, 204, 16, 0.438)',
    //         width: 1
    //     },
    //     type: 'bar'
    // };

    // var neg2 = {
    //     x: [neg_len2],
    //     y: ['Bar'],
    //     name: 'Negative',
    //     orientation: 'h',
    //     marker: {
    //         color: 'rgba(218, 11, 11, 0.438)',
    //         width: 1
    //     },
    //     type: 'bar'
    // };

    // var neut2 = {
    //     x: [neut_len2],
    //     y: ['Bar'],
    //     name: 'Neutral',
    //     orientation: 'h',
    //     marker: {
    //         color: 'rgba(2, 0, 138, 0.438)',
    //         width: 1
    //     },
    //     type: 'bar'
    // };

    // var data2 = [pos2, neut2, neg2];

    // var layout2 = {
    //     barmode: 'stack'
    // };

    // Plotly.newPlot('plot2', data2, layout2);
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
                color: 'rgba(47, 204, 16)',
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
                color: 'rgba(218, 11, 11)',
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
                color: 'rgba(2, 0, 138)',
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

        Plotly.newPlot('plot1', data, layout, {responsive: true});

        // PLOT 2 SLICK SLIDE CHANGE

        //     var song_name2 = [];
        //     var positive2 = [];
        //     var negative2 = [];
        //     var neutral2 = [];
        //     for (var i = 0; i < jsondata.length; i++) {
        //         if (jsondata[i]['Album'] == inputElement) {
        //             var song_sentiment2 = jsondata[i]['Sentiment'];
        //             song_name2.push(jsondata[i]['Song']);
        //             if (song_sentiment2 > 0) {
        //                 positive2.push(song_sentiment2);
        //             } else if (song_sentiment2 === 0) {
        //                 neutral2.push(song_sentiment2);
        //             } else {
        //                 negative2.push(song_sentiment2);
        //             }
        //         };
        //     };
        //     pos_len2 = positive2.reduce((a,b) => a+b, 0);
        //     console.log(pos_len2);
        //     neg_len2 = negative2.reduce((a,b) => a+b, 0);
        //     neut_len2 = neutral2.reduce((a,b) => a+b, 0);
        //     var pos2 = {
        //         x: [pos_len2],
        //         y: ['Bar'],
        //         name: 'Positive',
        //         orientation: 'h',
        //         marker: {
        //             color: 'rgba(47, 204, 16, 0.438)',
        //             width: 1
        //         },
        //         type: 'bar'
        //     };

        //     var neg2 = {
        //         x: [neg_len2],
        //         y: ['Bar'],
        //         name: 'Negative',
        //         orientation: 'h',
        //         marker: {
        //             color: 'rgba(218, 11, 11, 0.438)',
        //             width: 1
        //         },
        //         type: 'bar'
        //     };

        //     var neut2 = {
        //         x: [neut_len2],
        //         y: ['Bar'],
        //         name: 'Neutral',
        //         orientation: 'h',
        //         marker: {
        //             color: 'rgba(2, 0, 138, 0.438)',
        //             width: 1
        //         },
        //         type: 'bar'
        //     };

        //     var data2 = [pos2, neut2, neg2];

        //     var layout2 = {
        //         barmode: 'stack'
        //     };

        //     Plotly.newPlot('plot2', data2, layout2);
        // });
    });
});