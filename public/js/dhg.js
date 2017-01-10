var x;
var N;
var n;
var k;

function exstrakValue() {
    x = parseFloat($("#x").val());
    N = parseFloat($("#N").val());
    n = parseFloat($("#n").val());
    k = parseFloat($("#k").val());
}


$("#proses").on("click", function() {
    exstrakValue();
    $("#jawaban").html(temukanJawaban());
});


function temukanJawaban() {
    var teks = "<p>= (k x)((N - k)(n - x)) / (N n)</p>";
    teks += "<p>= (" + k + " " + x + ")((" + N + " - " + k + ")(" + n + " - " + x + ")) / (" + N + " " + n + ")</p>";
    teks += "<p>= (" + k + " " + x + ")( " + (N - k) + " " + (n - x) + ") / (" + N + " " + n + ")</p>";
    teks += "<p>= (" + kombinasi(k, x) + ")( " + kombinasi((N - k), (n - x)) + ") / (" + kombinasi(N, n) + ")</p>";
    teks += "<p>= (" + ((kombinasi(k, x)) * (kombinasi((N - k), (n - x)))) + ") / (" + kombinasi(N, n) + ")</p>";
    teks += "<p>= (" + (((kombinasi(k, x)) * (kombinasi((N - k), (n - x)))) / kombinasi(N, n)).toFixed(3) + ")</p>";
    return teks;
}


function kombinasi(n, k) {
    var temp1 = n - k;
    return faktorial(n) / (faktorial(temp1) * faktorial(k));
}

function faktorial(n) {
    if (n === 1) {
        return 1;
    }
    return n * faktorial(n - 1);
}