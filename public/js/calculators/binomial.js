// http://hypervolu.me/~erik/fraction.js/releases/fraction-0.3.js
function manggil() {
    var n = $("#n").val(); //  kejadian
    var x = $("#x").val(); // banyak kali
    var pa = $("#pa").val(); // ruang kemunculan
    var ps = $("#ps").val(); // ruang sampel

    var p = (new Fraction(pa / ps)).toFraction(true);
    var q = (new Fraction(1 - (pa / ps))).toFraction(true);


    // ( n! / (n - x)! x! ) * p^x * q^(n-x)

    var kalimat1 = "<p>( n! / (n - x)! x! ) * p^x * q^(n-x)<p>";
    kalimat1 = kalimat1 + "<p>( " + n + "! / (" + n + "-" + x + ")! " +
        x + "! ) *  " + "(" + p + ")" + "^" + x + " * (" +
        q + ")^(" + n + "-" + x + ")</p>";
    kalimat1 = kalimat1 + "<p>( " + n + "! / " + (n - x) + "! " +
        x + "! ) * " + "(" + p + ")" + "^" + x + " * (" +
        q + ")^" + (n - x) + "</p>";


    // Looping untuk mendapatkan pengurangan dan pembagian factorial
    var tempFactorialn = "";
    var hasiln = 1;
    for (var i = parseInt(n); i > parseInt(n - x); i--) {
        hasiln *= i;
        tempFactorialn += i + " x ";
    }
    var tempFactorialnx = "";
    var hasilnx = 1;
    for (var i = parseInt(x); i > 1; i--) {
        hasilnx *= i;
        tempFactorialnx += i + " x ";
    }

    p = (new Fraction(pa / ps));
    // pn adalah numerator dari p
    // kalikan degan pangakat x;
    ppow = p.pow(x);
    stringppow = ppow.toFraction(true);
    // pangakat n - x;
    q = (new Fraction(1 - (pa / ps)));
    pnx = n - x;
    qpow = q.pow(pnx);
    stringqpow = qpow.toFraction(true);



    kalimat1 = kalimat1 + "<p>( " + tempFactorialn + " / " + tempFactorialnx +
        ") * " + "(" + stringppow + ")" + " * (" +
        stringqpow + ")</p>";

    kalimat1 = kalimat1 + "<p>( " + hasiln + " / " + hasilnx +
        ") * " + "(" + stringppow + ")" + " * (" +
        stringqpow + ")</p>";


    var bagindeganx = hasiln / hasilnx;
    var fractBagideganX = (new Fraction(bagindeganx));
    var hasil = fractBagideganX.mul(ppow.mul(qpow));

    kalimat1 = kalimat1 + "<p>( " + fractBagideganX.toFraction(true) +
        ") * " + "(" + stringppow + ")" + " * (" +
        stringqpow + ") = " + hasil.toFraction(true) + "</p>";


    // kesimpulan
    kalimat1 = kalimat1 + "<p>Jadi, peluang muncul " + n + "nana sebanyak " + x +
        " kali dalah " + hasil.toFraction(true) + "</p>";
    return kalimat1;
}


// ketika tombol diklik
$("#proses").on("click", function() {
    $("#jawaban").html(manggil());
});