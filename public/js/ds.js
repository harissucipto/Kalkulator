var x;
var u;
var s;
var n;


$("#proses").on("click", function() {
    ekstrakValue();
    $("#jawaban").html(temukanJawaban());

});

function ekstrakValue() {
    x = parseFloat($("#x").val());
    u = parseFloat($("#u").val());
    s = parseFloat($("#s").val());
    n = parseFloat($("#n").val());
}


function temukanJawaban() {
    var teks = "";
    teks += "<p>=  x - u / (s / akar(n)) </p>";
    teks += "<p>= " + x + " - " + u + " / (" + s + " / akar(" + n + ")) </p>";
    teks += "<p>= " + (x - u) + " / (" + s + " / akar(" + Math.sqrt(n).toFixed(3) + ")) </p>";
    teks += "<p>= " + (x - u) + " / (" + (s / Math.sqrt(n)).toFixed(3) + ") </p>";
    teks += "<p>= " + ((x - u) / (s / Math.sqrt(n))).toFixed(3) + "</p>";
    return teks;
}