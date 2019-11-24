var tbody = d3.select("tbody");

d3.json('/result', function (jsondata) {
    var song_name = [];
    var positive = [];
    var negative = [];
    var neutral = [];
    for (var i = 0; i < jsondata.length; i++) {
        let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");
        if (jsondata[i]['Album'] == inputElement) {
            var song_sentiment = jsondata[i]['Sentiment'];
            song_name.push(jsondata[i]['Song']);
            if (song_sentiment > 0) {
                positive.push(song_sentiment);
            }
            else if (song_sentiment = 0) {
                neutral.push(song_sentiment);
            }
            else {
                negative.push(song_sentiment);
            }
        };
    };

    var pos = {
        x: ['Positive'],
        y: positive.length,
        name: 'Positive',
        type: 'bar'
    };

    var neg = {
        x: ['Negative'],
        y: negative.length,
        name: 'Negative',
        type: 'bar'
    };

    var neut = {
        x: ['Neutral'],
        y: neutral.length,
        name: 'Neutral',
        type: 'bar'
    };

    var data = [neg,neut,pos];

    var layout = {
        barmode: 'stack',
        autosize: true,
        xaxis: {
            range: [-4, 4],
        },
        yaxis: {
            range: [-4, 4],
        },
    };

    Plotly.newPlot('plot', data, layout);
});


$('div').on("afterChange", function () {
    d3.json('/result', function (jsondata) {
        var song_name = [];
        var positive = [];
        var negative = [];
        var neutral = [];
        for (var i = 0; i < jsondata.length; i++) {
            let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");
            if (jsondata[i]['Album'] == inputElement) {
                var song_sentiment = jsondata[i]['Sentiment'];
                song_name.push(jsondata[i]['Song']);
                if (song_sentiment > 0) {
                    positive.push(song_sentiment);
                }
                else if (song_sentiment = 0) {
                    neutral.push(song_sentiment);
                }
                else {
                    negative.push(song_sentiment);
                }
            };
        };
        var pos = {
            x: ['Positive'],
            y: positive.length,
            name: 'Positive',
            type: 'bar'
        };

        var neg = {
            x: ['Negative'],
            y: negative.length,
            name: 'Negative',
            type: 'bar'
        };

        var neut = {
            x: ['Neutral'],
            y: neutral.length,
            name: 'Neutral',
            type: 'bar'
        };

        var data = [pos, neg, neut];

        var layout = { barmode: 'relative' };

        Plotly.restyle('plot', data, layout);
    });
});