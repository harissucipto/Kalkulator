/*
Z = x - X / s
x = bayak sampel
X = rata - rata sampel
s = simpangan baku
*/

var x;
var X;
var s;

$("#proses").on("click", function() {
    ekstrakNilai();
    $("#jawaban").html(temukanJawban());
});


function ekstrakNilai() {
    x = parseFloat($("#x").val());
    X = parseFloat($("#X").val());
    s = parseFloat($("#s").val());
}


function temukanJawban() {
    var teks = "";
    teks += "<p>= x - X / s</p>";
    teks += "<p>= " + x + " - " + X + " / " + s + "</p>";
    teks += "<p>= " + (x - X) + " / " + s + "</p>";
    teks += "<p>= " + ((x - X) / s).toFixed(3) + "</p>";
    return teks;
}