/*
P ( x ; μ ) = e^–μ . μ^x
X !	Dimana : e = 2.71828
μ = rata – ratakeberhasilan = n . p
x = Banyaknya unsur berhasil dalam sampel
n = Jumlah / ukuran populasi
p = probabilitas kelas sukses

*/
var e = 2.71828;
var u;
var x;
var n;
var p;
var P;

$("#proses").on("click", function() {
    ekstrakNilai();
    temukanRumus();
    cetakHasil();

});


function ekstrakNilai() {
    n = parseFloat($("input#n.inputan").val());
    p = parseFloat($("input#p.inputan").val());
    x = parseFloat($("input#x.inputan").val());
}

function temukanRumus() {
    u = n * p;
    P = Math.pow(e, -u) * Math.pow(u, x);
}

function cetakHasil() {
    var teks = "";
    teks += "<p>(P ( x ; u ) = e ^ -u . u^x ) / x!</p>";
    teks += "<p><p>P ( " + x + " ; " + u + " ) = (" + e + "^ -" + u + " . " +
        u + "^" + x + " ) / " + x + "!</p></p>";
    teks += "<p><p>P ( " + x + " ; " + u + " ) = (" + Math.pow(e, -u).toFixed(5) + " . " +
        Math.pow(u, x).toFixed(2) + ") /" + faktorial(x) + "</p></p>";
    teks += "<p><p>P ( " + x + " ; " + u + " ) = " + P.toFixed(2) / faktorial(x) + "</p></p>";
    $("#jawaban").html(teks);
}

function faktorial(angka) {
    if (angka === 1) {
        return 1;
    }
    return angka * faktorial(angka - 1);
}