$("#tahap2").hide();
var kemungkinan = 0;
var n;
var n2;
var x = [];
var x2 = [];
var x3;
var p = [];
var p2 = [];
var p3;



// proses menampilkan kemungkinan
$("#proses").on("click", function() {

    kemungkinan = $("#kemungkinan").val();
    kolomInputan(kemungkinan);
});

// menghitung
$("#hitung").on("click", function() {
    ekstrakNilai();
    temukanJawaban();
});


// tampilkan kolom inputan 
function kolomInputan(banyak) {
    $("#tahap2").show();
    var teks = $("#tahap2").html();
    teks += '<p>Masukan n: <input class="inputan" type="number" id="n"><p><hr>';
    var nomor = 1;
    for (var i = 0; i < banyak; i++) {
        teks += '<p>x' + nomor + ': <input class="inputan" type="number" id="x' + i + '"></p>';
        nomor += 1;
    }
    nomor = 1;
    for (var i = 0; i < banyak; i++) {
        teks += '<p>p' + nomor + ': <input class="inputan" type="teks" id="p' + i + '"></p>';
        nomor += 1;
    }
    teks += "<button id='hitung'>hitung</button>";
    $("#tahap2").html(teks);
}


// hitung
function ekstrakNilai() {
    for (var i = 0; i < kemungkinan; i++) {
        x[i] = $("#x" + i).val();
        p[i] = new Fraction($("#p" + i).val());
    }
    n = parseInt($("#n").val());

}

// temukanJawaban
function temukanJawaban() {
    var teks = "";
    var komponen = cetakKomponen();
    n2 = faktorial(n);
    x3 = x2.reduce(function(a, b) {
        return a * b;
    });
    p3 = new Fraction(p2.reduce(function(a, b) {
        return a.mul(b);
    }));
    var akhir = new Fraction(n2, x3).mul(p3);

    teks += "<p>p(x1,x2,...xk) = (n! / x1! x2! ...xk) p1^x1 * p2^x2 * pk^xk</p>";
    teks += "<p>p(" + komponen[0] + ") = (" + n + "! / " + komponen[1] + ") " + komponen[2] + "</p>";
    teks += "<p>p(" + komponen[0] + ") = (" + n2 + "/ " + komponen[3] + ") " + komponen[4] + "</p>";
    teks += "<p>p(" + komponen[0] + ") = (" + n2 + "/ " + x3 + ") " + p3.toFraction(true) + "</p>";
    teks += "<p>p(" + komponen[0] + ") = " + akhir.toFraction(true) + "</p>";
    teks += "<p>p(" + komponen[0] + ") = " + parseFloat(akhir).toFixed(2) + "</p>";
    $("#jawaban").html(teks);
}

function faktorial(n) {
    if (n == 1) {
        return 1;
    }
    return n * faktorial(n - 1);
}

function cetakKomponen() {
    var teks = [];
    var komponenX = "";
    var komponenX2 = "";
    var komponenP = "";
    var komponenP2 = "";
    var komponenxkecil = "";
    for (var i = 0; i < kemungkinan; i++) {
        komponenX += x[i] + "! ";
        komponenP += p[i].toFraction(true) + "^" + x[i] + " ";
        komponenxkecil += x[i] + ",";

        p2[i] = p[i].pow(x[i]);
        komponenP2 += p2[i].toFraction(true) + ".";

        x2[i] = faktorial(x[i]);
        komponenX2 += x2[i] + ".";
    }
    teks.push(komponenxkecil);
    teks.push(komponenX);
    teks.push(komponenP);
    teks.push(komponenX2);
    teks.push(komponenP2);
    return teks;
}