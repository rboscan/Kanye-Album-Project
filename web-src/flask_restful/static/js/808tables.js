console.log(data);

// Populates table
var tbody = d3.select("tbody");

data.forEach((song) => {

    const tr = tbody.append("tr");

    Object.entries(song).forEach(([key, value]) => {

        tr.append("td").text(value);
    });
});

// Starting table when website loads
window.onload = function () {

    let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");

    let filter = data.filter(dictionary => dictionary.album === inputElement);

    tbody.html("");

    filter.forEach((song) => {

        const tr = tbody.append("tr");

        Object.entries(song).forEach(([key, value]) => {

            tr.append("td").text(value);
        });
    });
};

// Modifies tables according to table ID
let trtable = d3.selectAll("button")

trtable.on("click", function () {
    let inputElement = d3.select("div.slick-slide.slick-current.slick-active.slick-center").select("div").select("div").select("img").attr("id");

    let filter = data.filter(dictionary => dictionary.album === inputElement);

    tbody.html("");

    filter.forEach((song) => {

        const tr = tbody.append("tr");

        Object.entries(song).forEach(([key, value]) => {

            tr.append("td").text(value);
        });
    });
});