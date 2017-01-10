var mongoose = require("mongoose"),
    Calculator = require("./models/calculator.js");


var data = [{
        name: "Simple Regeresi Linear",
        image: "images/1.PNG",
        urlscript: "/calculators/srl.html",
        description: "Simple Regeresi Linear adalah Metode Statistik yang berfungsi untuk menguji sejauh mana hubungan sebab akibat antara Variabel Faktor Penyebab (X) terhadap Variabel Akibatnya."
    },
    {
        name: "Binomial",
        image: "images/2.PNG",
        urlscript: "/calculators/binomial.html",
        description: "Binomial adalah distribusi probabilitas diskret jumlah keberhasilan dalam n percobaan ya/tidak (berhasil/gagal) yang saling bebas, dimana setiap hasil percobaan memiliki probabilitas p. Eksperimen berhasil/gagal juga disebut percobaan bernoulli."
    },
    {
        name: "Multinomial",
        image: "images/3.PNG",
        urlscript: "/calculators/multinomial.html",
        description: "Percobaan multinomial terjadi bila tiap usaha dapat memberikan lebih dari 2 hasil yangmungkin.Jadi pembagian hasil pabrik jadi ringan, berat/masih dapat diterima, demikaian jugapercobaan kecelakaan disuatu simpang jalan menurut hari dalam seminggu merupakan percobaanmultinomial."
    },
    {
        name: "Distribusi Hiper Geometry",
        image: "images/4.PNG",
        urlscript: "/calculators/dhg.html",
        description: "Distribusi peluang peubah acak hipergeometrik adalah banyaknya sukses (x) dalam sampel acak ukuran n yang diambil dari populasi sebanyak N yang mengandung jumlah sukses sebanyak k."
    },
    {
        name: "Distribusi Posion",
        image: "images/5.PNG",
        urlscript: "/calculators/dp.html",
        description: "Distribusi Posion adalah distribusi probabilitas diskret yang menyatakan peluang jumlah peristiwa yang terjadi pada periode waktu tertentu apabila rata-rata kejadian tersebut diketahui dan dalam waktu yang saling bebas sejak kejadian terakhir."
    },
    {
        name: "Distribusi Z",
        image: "images/6.PNG",
        urlscript: "/calculators/dz.html",
        description: "Distribusi normal dikenal juga sebagai distribusi Z, merupakan salah satu distribusi peluang kontinu dengan grafik berbentuk bel/genta"
    },
    {
        name: "distribusi Student",
        image: "images/7.PNG",
        urlscript: "/calculators/ds.html",
        description: "Distribusi Student atau distribusi t, ialah Distribusi dengan variabel acak kontinu lainnya, selain daripada distribusi normal dengan fungsi densitasnya"
    },
    {
        name: "Distribusi Chi Square",
        image: "images/8.PNG",
        urlscript: "/calculators/dcs.html",
        description: "Distribusi Chi Square adalah salah satu jenis uji komparatif non parametris yang dilakukan pada dua variabel, di mana skala data kedua variabel adalah nominal"
    },
    {
        name: "Fraction Calculator",
        image: "images/9.PNG",
        urlscript: "/calculators/hitungFraction.html",
        description: "Kalkulator Fraction sederhana"
    }
];


function seedDB() {
    //Remove all calculators
    Calculator.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed calculators");
        // tambahkan perkalkulator
        data.forEach(function(seed) {
            Calculator.create(seed, function(err, calculator) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a calculator " + calculator.name);
                }
            });
        });
    });
}

module.exports = seedDB;