var banyakData = document.querySelector("#banyakData");
var kolomData = document.querySelector("#kolomData");
var data = document.querySelector("#data");
var hasil = document.querySelector("#hasil");
var rumusnya = document.querySelector("#rumusnya");
var jumlahData;
var buttonMasukan = document.querySelector("#masukanBanyakData");
var buttonProses = document.querySelector("#prosesData");
var buttonCariY = document.querySelector("#cariY");
var nilaiX = [];
var nilaiY = [];
var nilaiXkuadrat = [];
var nilaiYkuadrat = [];
var nilaiXkaliY = [];
var jumlahNilaiX = 0;
var jumlahNilaiY = 0;
var jumlahNilaiXkuadrat = 0;
var jumlahNilaiYKuadrat = 0;
var jumlahNilaiXkaliY = 0;
var a;
var b;
var y;

//hasil
var xNumber = document.querySelector("#Xnumber");
var buttonCariY = document.querySelector("#cariY");
var hasilY = document.querySelector("#hasilY");
var hasilTable = document.querySelector("#hasilTable");
var solusiRumus = document.querySelector("#solusiRumus");
var Hkorelasi = document.querySelector("#korelasi");
var HrumusKorelasi = document.querySelector("#rumuskorelasi");
var kesimpulanKorelasiHasil = document.querySelector("#kesimpulankorelasi");

buttonCariY.addEventListener("click", function() {
    y = a + (b * Number(xNumber.value));
    hasilY.innerHTML = "Y = " + y.toFixed(2);
});


// rumus Y = a + bX;



buttonMasukan.addEventListener("click", function() {
    hasil.style.display = "none";
    kolomData.style.display = "block";

    jumlahData = Number(banyakData.value);
    var textsnya = "";
    textsnya += "<table class='isiTable'>";
    textsnya += "<tr>";
    textsnya += "<th>nomor</th>";
    textsnya += "<th>x</th>";
    textsnya += "<th>y</th>";
    textsnya += "</tr>";
    var no = 0;
    for (var i = 0; i < jumlahData; i++) {
        no++;
        textsnya += "<tr>";
        textsnya += '<td>' + no + '</td><td> <input class="x inputaK" type="text"> </td><td><input class="y inputaK" type="text"></td>';
        textsnya += "</tr>";
    }
    textsnya += "</table>";
    data.innerHTML = textsnya;
});



buttonProses.addEventListener("click", function() {
    for (var i = 0; i < jumlahData; i++) {
        // loop lakukan perhitungan dan pengambilan x2, y2, x * y
        nilaiX[i] = parseFloat(document.querySelectorAll(".x")[i].value);
        nilaiXkuadrat[i] = Math.pow(nilaiX[i], 2);
        nilaiY[i] = parseFloat(document.querySelectorAll(".y")[i].value);
        nilaiYkuadrat[i] = Math.pow(nilaiY[i], 2);
        nilaiXkaliY[i] = nilaiX[i] * nilaiY[i];
    }
    // lakukan pencarian nilai jumlah tiap varible arraay

    ambilJumlahNilai();
    pecahkanRumus();
    cetakTableHasil();
    cetakKonsataA();
    cetakKonsataB();
    cetakKorelasi();
    kesimpulanKorelasi();
    masukanMatikan();

});

function masukanMatikan() {
    buttonMasukan.disabled = true;
}

function penumlahanNilai(data) {
    return data.reduce(function(a, b) {
        return a + b;
    });
}

function hitungA() {
    a = (jumlahNilaiY * jumlahNilaiXkuadrat) - (jumlahNilaiX * jumlahNilaiXkaliY);
    return Number((a / ((jumlahData * jumlahNilaiXkuadrat) - Math.pow(jumlahNilaiX, 2))).toFixed(2));
}

function hitungB() {
    var b = (jumlahData * jumlahNilaiXkaliY) - (jumlahNilaiX * jumlahNilaiY);
    return Number((b / ((jumlahData * jumlahNilaiXkuadrat) - (Math.pow(jumlahNilaiX, 2)))).toFixed(2));
}

function pecahkanRumus() {
    hasil.style.display = "block";
    rumusnya.textContent = "Y = " + a + " + " + b + " * X ";

}

function ambilJumlahNilai() {
    jumlahNilaiX = penumlahanNilai(nilaiX);
    jumlahNilaiY = penumlahanNilai(nilaiY);
    jumlahNilaiXkaliY = penumlahanNilai(nilaiXkaliY);
    jumlahNilaiXkuadrat = penumlahanNilai(nilaiXkuadrat);
    jumlahNilaiYKuadrat = penumlahanNilai(nilaiYkuadrat);
    a = hitungA();
    b = hitungB();
}

function cetakTableHasil() {
    jumlahData = Number(banyakData.value);
    var textsnya = "";
    textsnya += "<table class='isiTable'>";
    textsnya += "<tr>";
    textsnya += "<th>nomor</th>";
    textsnya += "<th>X</th>";
    textsnya += "<th>Y</th>";
    textsnya += "<th>X^2</th>";
    textsnya += "<th>Y^2</th>";
    textsnya += "<th>X * Y</th>";
    textsnya += "</tr>";
    var no = 0;
    for (var i = 0; i < jumlahData; i++) {
        no++;
        textsnya += "<tr>";
        textsnya += '<td>' + no + '</td><td>' + nilaiX[i] +
            '</td><td>' + nilaiY[i] +
            '</td><td>' + nilaiXkuadrat[i] +
            '</td><td> ' + nilaiYkuadrat[i] +
            '</td><td> ' + nilaiXkaliY[i] +
            '</td>';
        textsnya += "</tr>";
    }
    textsnya += "<tr>";
    textsnya += "<td>Totalnya = </td>";
    textsnya += '<td>' + jumlahNilaiX +
        '</td><td>' + jumlahNilaiY +
        '</td><td> ' + jumlahNilaiXkuadrat +
        '</td><td>' + jumlahNilaiYKuadrat +
        '</td><td>' + jumlahNilaiXkaliY +
        '</td>';
    textsnya += "</td>";
    textsnya += "</table>";

    hasilTable.innerHTML = textsnya;
}

function cetakKonsataA() {
    var teks = "<p>a = ((Ey)(Ex^2) - (Ey)(Exy)) / n(Ex^2) - (Ex)^2</p>";
    teks += "<p>a = ((" + jumlahNilaiY + ")(" + jumlahNilaiXkuadrat + ") - (" + jumlahNilaiY +
        ")(" + jumlahNilaiXkaliY + ")) / " + jumlahData + "(" + jumlahNilaiXkuadrat + ") - (" +
        jumlahNilaiX + ")p2</p>";
    teks += "<p>a = " + a + "</p><hr>";
    solusiRumus.innerHTML = teks;
}

function cetakKonsataB() {
    var teks = solusiRumus.innerHTML;
    teks += "<p>b = (n(Exy) - (Ex)(Ey)) / n(Ex^2) - (Ex)^2</p>";
    teks += "<p>a = (" + jumlahData + "(" + jumlahNilaiXkaliY + ") - (" + jumlahNilaiX +
        ")(" + jumlahNilaiY + ")) / " + jumlahData + "(" + jumlahNilaiXkuadrat + ") - (" +
        jumlahNilaiX + ")p2</p>";
    teks += "<p>b = " + b + "</p>";
    solusiRumus.innerHTML = teks;
}

function korelasi() {
    var korelasia = (jumlahData * jumlahNilaiXkaliY) - (jumlahNilaiX * jumlahNilaiY);
    var korelasib = Math.sqrt(((jumlahData * jumlahNilaiXkuadrat) - Math.pow(jumlahNilaiX, 2)) * (
        (jumlahData * jumlahNilaiYKuadrat) - Math.pow(jumlahNilaiY, 2)));
    var korelasi = korelasia / korelasib;
    return korelasi.toFixed(2);
}

function rumusKorelasi() {
    var rumusKorelasi = "r = (" + jumlahData + "*" + jumlahNilaiXkaliY + ") - (" + jumlahNilaiX + "*" + jumlahNilaiY + ")";
    rumusKorelasi += " / akar((" + jumlahData + "*" + jumlahNilaiXkuadrat + ") - pangkat2(" + jumlahNilaiX + ") * ( (" +
        jumlahData + "*" + jumlahNilaiYKuadrat + ") - pangkat2(" + jumlahNilaiY + ") )";
    HrumusKorelasi.textContent = rumusKorelasi;
}

function cetakKorelasi() {
    rumusKorelasi();
    Hkorelasi.textContent = korelasi();
}

function kesimpulanKorelasi() {
    var hasilKesimpulan = korelasi();
    var kesimpulan = "Jadi Korelasinya ";
    if (hasilKesimpulan <= 0) {
        kesimpulan += " Tidak ada korelasi diantar dua variable (0 atau < 0)";
    } else if (hasilKesimpulan <= 0.25) {
        kesimpulan += " Korelasi sangat lemah (>0 - 0,25)";
    } else if (hasilKesimpulan <= 0.5) {
        kesimpulan += " Korelasi cukup  (>0.25 - 0.5)";
    } else if (hasilKesimpulan <= 0.75) {
        kesimpulan += " Korelasi kuat (>0.5 - 0.75)";
    } else if (hasilKesimpulan <= 0.99) {
        kesimpulan += " Korelasi sangat kuat (>0.75 - 0.99)";
    } else if (hasilKesimpulan <= 1) {
        kesimpulan += " Korelasi sempurna (>0.99 - 1)";
    }
    kesimpulanKorelasiHasil.textContent = kesimpulan;
}