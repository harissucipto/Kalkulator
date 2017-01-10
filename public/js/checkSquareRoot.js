function cekPow(nilai, pangkat) {
    var hasil = Math.pow(nilai, Math.abs(pangkat));
    if (pangkat < 0) {
        if (pangkat % 2 !== 0) {
            return hasil;
        } else {
            return Number("-" + hasil);
        }
    } else {
        return hasil;
    }
}


console.log(-(Math.pow(2.71828, -2)) * Math.pow(2, 3));