var nilaiA;
var nilaiB;
var pangkatA;
// ekstrakNilai



$("#tambah").on("click", function() {
    getNilai();
    var teks = "";
    teks += "<p>" + nilaiA.toFraction(true) +
        " + " + nilaiB.toFraction(true) + " = " +
        nilaiA.add(nilaiB).toFraction(true) + "</p>";
    teks += "<p>" + nilaiA.toFraction(true) +
        " + " + nilaiB.toFraction(true) + " = " +
        nilaiA.add(nilaiB) + "</p>";
    $("#jawaban").html(teks);
});

$("#kurang").on("click", function() {
    getNilai();
    var teks = "";
    teks += "<p>" + nilaiA.toFraction(true) +
        " - " + nilaiB.toFraction(true) + " = " +
        nilaiA.sub(nilaiB).toFraction(true) + "</p>";
    teks += "<p>" + nilaiA.toFraction(true) +
        " - " + nilaiB.toFraction(true) + " = " +
        nilaiA.sub(nilaiB) + "</p>";
    $("#jawaban").html(teks);
});

$("#bagi").on("click", function() {
    getNilai();
    var teks = "";
    teks += "<p>" + nilaiA.toFraction(true) +
        " / " + nilaiB.toFraction(true) + " = " +
        nilaiA.div(nilaiB).toFraction(true) + "</p>";
    teks += "<p>" + nilaiA.toFraction(true) +
        " / " + nilaiB.toFraction(true) + " = " +
        nilaiA.div(nilaiB) + "</p>";
    $("#jawaban").html(teks);
});

$("#kali").on("click", function() {
    getNilai();
    var teks = "";
    teks += "<p>" + nilaiA.toFraction(true) +
        " X " + nilaiB.toFraction(true) + " = " +
        nilaiA.mul(nilaiB).toFraction(true) + "</p>";
    teks += "<p>" + nilaiA.toFraction(true) +
        " X " + nilaiB.toFraction(true) + " = " +
        nilaiA.mul(nilaiB) + "</p>";
    $("#jawaban").html(teks);
});

$("#cApangkat").on("click", function() {
    getNilai();
    pangkatA = $("#pangkatA").val();
    var teks = "";
    teks += "<p> A pangkat = " + nilaiA.toFraction(true) + "^" +
        pangkatA + " = " +
        nilaiA.pow(pangkatA) + "</p>";
    teks += "<p> A pangkat = " + nilaiA.toFraction(true) + "^" +
        pangkatA + " = " +
        nilaiA.pow(pangkatA).toFraction(true) + "</p>";

    $("#jawaban").html(teks);
});

$("#cBpangkat").on("click", function() {
    getNilai();
    pangkatB = $("#pangkatB").val();
    var teks = "";
    teks += "<p> B pangkat = " + nilaiB.toFraction(true) + "^" +
        pangkatB + " = " +
        nilaiB.pow(pangkatB) + "</p>";
    teks += "<p> B pangkat = " + nilaiB.toFraction(true) + "^" +
        pangkatB + " = " +
        nilaiB.pow(pangkatB).toFraction(true) + "</p>";

    $("#jawaban").html(teks);
});

function getNilai() {
    nilaiA = new Fraction($("#A").val());
    nilaiB = new Fraction($("#B").val());
}