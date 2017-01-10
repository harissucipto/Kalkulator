var n;
var O = [];
var E = [];
var tahap1 = [];

function ekstrakbanyakKolom() {
    n = parseFloat($("#n").val());
}


$("#kolom").on("click", function() {
    ekstrakbanyakKolom();
    $("#tahap1").html(inputan());
});

$("#proses").on("click", function() {
    ekstrakInputan();
    $("#jawaban").html(temukanJawaban);
});

function inputan() {
    var teks = "";
    teks += "<table class='isiTable'>";
    teks += "<tr>";
    teks += "<th>nomor</th>";
    teks += "<th>O</th>";
    teks += "<th>E</th>";
    teks += "</tr>";
    var nomor = 1;
    for (var i = 0; i < n; i++) {
        teks += "<tr>";
        teks += "<td>" + nomor + "</td>";
        teks += "<td><input class='inputaK' type=text id='O" + i + "'></td>";
        teks += "<td><input class='inputaK' type=text id='E" + i + "'></td>";
        nomor++;
        teks += "</tr>";
    }
    teks += "</table>";
    nomor = 0;
    return teks;
}

function ekstrakInputan() {
    for (var i = 0; i < n; i++) {
        O[i] = parseFloat($("#O" + i).val());
        E[i] = parseFloat($("#E" + i).val());
    }
}



function temukanJawaban() {
    var teks = "";
    teks += "<table class='isiTable'>";
    teks += "<tr>";
    teks += "<th>nomor</th>";
    teks += "<th>O</th>";
    teks += "<th>E</th>";
    teks += "<th>(O[i] - E[i])</th>";
    teks += "<th>(O[i] - E[i])^2</th>";
    teks += "<th>(O[i] - E[i])^2 / E[i]</th>";
    teks += "</tr>";
    var nomor = 1;
    for (var i = 0; i < n; i++) {
        teks += "<tr>";
        teks += "<td>" + nomor + "</td>";
        teks += "<td>" + O[i] + "</td>";
        teks += "<td>" + E[i] + "</td>";
        teks += "<td>" + (O[i] - E[i]) + "</td>";
        teks += "<td>" + Math.pow((O[i] - E[i]), 2) + "</td>";
        tahap1[i] = (Math.pow((O[i] - E[i]), 2)) / E[i];
        teks += "<td>" + tahap1[i].toFixed(2) + "</td>";
        teks += "</tr>";
        nomor++;
    }
    nomor = 0;
    var hasil = tahap1.reduce(function(a, b) {
        return a + b;
    });
    teks += "<tr>";
    teks += "<th colspan=5>Maka</th>";
    teks += "<td>" + hasil.toFixed(2) + "</td>";
    teks += "</tr>";
    teks += "</table>";
    return teks;
}