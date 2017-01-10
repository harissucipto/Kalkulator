// peluang dadu lebih digunakan untuk mencari banyaknya muncul jika banyaknya dua dadu ditos
// contoh penjumlahan 2 buah dadu peluang muncul dadu yang berjumlah 3 yaitu [1, 2], [2, 1]


function kemungkinan(cari, jumlahBarang, jenis) {
    var titikSample = [];
    var hasilCari = [];

    // sample semua
    for (var i = 0; i < jumlahBarang; i++) {
        var sementara = [];
        for (var x = 1; x <= jenis; x++) {
            sementara.push(x);
        }
        titikSample.push(sementara);
    }

    // lakukan pencarian nilai yang dicari

    titikSample[0][1], titikSample[1][0], titikSample[2][0];

    for (var i = 0; i < titikSample.length; i++) {
        titikSample[i][cari];
    }


    return hasilCari;
}


console.log(kemungkinan(8, 2, 6));


/*
    // lakukan pencarian nilai yang dicari
    for (var i = 0; i < jenis; i++) {

        var tempPerJenis = [];
        for (var perJenis = 0; perJenis < titikSample.length; perJenis++) {
            tempPerJenis.push(titikSample[perJenis][i]);
        }
        var totalPerbagian = tempPerJenis.reduce(function(a, b) {
            return a + b;
        });
        if (cari === totalPerbagian) {
            hasilCari.push(tempPerJenis);
        }
    }
*/