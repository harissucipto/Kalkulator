#Kalkulator
Sebuah Aplikasi Yang Dikembangkan Untuk Mempermudah dalam melakuakan perhitungan.

##Inital Setup
* Tambahankan Landing Page
* Tambahankan Calculators Page yang menampilkan semua list calculator

Setiap Calculator  mempunyai:
    * Nama
    * Gambar


##Layout and Basic Styling
* Buat header dan footer partials
* tambahkan boostrap kedalamnya
* tambahkan navbar juga
* tambahkan setiap header dan footer ke views

## tambahkan Mongoose
* Install dan konfigurasi Mongoose
* setup Calculator model
* gunakan Calculator model didalam rute yang telah dibikin

## tambahkan halaman show
* panggil script khusus dengan load method jquery
* pakai restful routes

## Refactor Mongoose code
* Bikin folder models
* gunakan module.exports
* pakai require

## hapus collection database Kalkulator dulu
* db.collection.drop()

## tambahkan seed file
* bikin file seeds.js
* seed file berguna untuk membuat prototype data.

##Auth Pt. 1 - Add User Model
* instal semua package untuk auth
* Define User model 

##Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt. 3 - Login
* Add login routes
* Add login template

##Auth Pt. 4 - Logout/Navbar
* Add logout routes
* Add links to navbar

##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar correctly

##Refactor The routes
* gunakan Express router untuk mengorganisasi semua rute

## tambahkan fitur bookmark
* overide method 
* rute bookmark pada calculator
* penambahan model schema bookmarks pada user 


## edit tampilan pengguna
* refix styling pada halaman
* optimasi tampilan halaman(sedikit)

## restruktur middleware dan tambahkan flash connect
* organisir middlware secara terpisah
* tambahkan flash connect untuk menampilkan popout error dan success
* oraganisir fungsi yang akan digunkan


## restyling situs dan perbaikan middleware
* restyle landing page.
* restyle home page
* restyle user page
* fix some probelm about middlware
* add more property schema
* still cant find solusition how can they error in middleware interface to show perkalkulator