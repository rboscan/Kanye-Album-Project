var data;

d3.json('/result', function (jsondata) {
    data = jsondata;

    data.forEach((song) => {
        let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");
        if (song['Album'] == inputElement) {
            
            var tbody = d3.select("tbody");

            const tr = tbody.append("tr");

            Object.entries(song).forEach(([key, value]) => {
                tr.append("td").text(value);
            });
        }
    });
});

var tbody = d3.select("tbody");
$('div').on("afterChange", function () {
    d3.json('/result', function (jsondata) {
        data = jsondata;
        tbody.html("");
        data.forEach((song) => {
            let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");
            if (song['Album'] == inputElement) {

                var tbody = d3.select("tbody");

                const tr = tbody.append("tr");

                Object.entries(song).forEach(([key, value]) => {
                    tr.append("td").text(value);
                });
            }
        });
    });
});