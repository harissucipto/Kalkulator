// http://hypervolu.me/~erik/fraction.js/releases/fraction-0.3.js
function manggil() {
    var teks = "";
    var n = $("#n").val(); //  kejadian
    var x = $("#x").val(); // banyak kali
    var pa = $("#pa").val(); // ruang kemunculan
    var ps = $("#ps").val(); // ruang sampel

    var p = (new Fraction(pa / ps));
    var q = (new Fraction(1 - (pa / ps)));


    teks += "<p> = ( n! / (n - x)! x! ) * p^x * q^(n-x) </p>";
    teks += "<p> = ( " + n + "! / (" + n + " - " + x + ")! " + x + "! ) * " + p.toFraction(true) + "^" + x + " * " + q.toFraction(true) + "^(" + n + "-" + x + ") </p>";
    teks += "<p> = ( " + faktorial(n) + " / (" + (n - x) + ")! " + faktorial(x) + " ) * " + p.pow(x).toFraction(true) + " * " + q.toFraction(true) + "^(" + (n - x) + ") </p>";
    teks += "<p> = ( " + faktorial(n) + " / " + faktorial((n - x)) + " " + faktorial(x) + " ) * " + p.pow(x).toFraction(true) + " * " + q.pow((n - x)).toFraction(true) + " </p>";
    teks += "<p> = ( " + faktorial(n) + " / " + (faktorial((n - x)) * faktorial(x)) + " ) * " + p.pow(x).mul(q.pow((n - x))).toFraction(true) + " </p>";
    teks += "<p> = ( " + (new Fraction(faktorial(n) / (faktorial((n - x)) * faktorial(x)))) + " ) * " + p.pow(x).mul(q.pow((n - x))).toFraction(true) + " </p>";
    teks += "<p> = " + (new Fraction(faktorial(n) / (faktorial((n - x)) * faktorial(x)))).mul(p.pow(x).mul(q.pow((n - x)))).toFraction(true) + " </p>";
    teks += "<p> = " + parseFloat((new Fraction(faktorial(n) / (faktorial((n - x)) * faktorial(x)))).mul(p.pow(x).mul(q.pow((n - x))))).toFixed(2) + " </p>";
    return teks;
}


// ketika tombol diklik
$("#proses").on("click", function() {
    $("#jawaban").html(manggil());
});


function faktorial(nilai) {
    if (nilai === 1) {
        return 1;
    }
    return nilai * faktorial(nilai - 1);
}