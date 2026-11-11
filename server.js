const express = require('express');
const server=express();
const mongoose=require('mongoose');
require('dotenv').config();
const cors=require('cors');
const path=require('path');

async function povezi(){
    try{
        await mongoose.connect(process.env.URI);
        console.log("Baza je povezana!");

        server.listen(3000, ()=>{
            console.log("Server je pokrenut!");
        })
    }

    catch(error){
        throw error;
    }
}

povezi();
server.use(cors());

const shema=mongoose.Schema;
const shema_rezencija=new shema({
    ime_korisnika: String,
    komentar_korisnika: String
})
const recenzija=mongoose.model("banerecenzija" , shema_rezencija);

//serviranje svega
server.use(express.static(__dirname));

//MORA LAKSE ALI RADI:
server.get('/KOSA.jpg', (odg) => odg.sendFile(path.join(__dirname, "KOSA.jpg")));
server.get('/ig.png', (odg) => odg.sendFile(path.join(__dirname, "ig.png")));
server.get('/home.png', (odg) => odg.sendFile(path.join(__dirname, "home.png")));
server.get('/logo.png', (odg) => odg.sendFile(path.join(__dirname, "logo.png")));
server.get('/nasa_prica_slika3.jpg', (odg) => odg.sendFile(path.join(__dirname, "nasa_prica_slika3.jpg")));
server.get('/nasa_prica_slika2.jpg', (odg) => odg.sendFile(path.join(__dirname, "nasa_prica_slika2.jpg")));
server.get('/baby-boy.png', (odg) => odg.sendFile(path.join(__dirname, "baby-boy.png")));
server.get('/man-with-beard.png', (odg) => odg.sendFile(path.join(__dirname, "man-with-beard.png")));
server.get('/tim2.jpg', (odg) => odg.sendFile(path.join(__dirname, "tim2.jpg")));
server.get('/tim1.jpg', (odg) => odg.sendFile(path.join(__dirname, "tim1.jpg")));
server.get('/person.png', (odg) => odg.sendFile(path.join(__dirname, "person.png")));
server.get('/image-galery.png', (odg) => odg.sendFile(path.join(__dirname, "image-galery.png")));
server.get('/2.jpg', (odg) => odg.sendFile(path.join(__dirname, "2.jpg")));
server.get('/mapa.png', (odg) => odg.sendFile(path.join(__dirname, "mapa.png")));
server.get('/1.jpg', (odg) => odg.sendFile(path.join(__dirname, "1.jpg")));
server.get('/3.jpg', (odg) => odg.sendFile(path.join(__dirname, "3.jpg")));
server.get('/diplom.png', (odg) => odg.sendFile(path.join(__dirname, "diplom.png")));
server.get('/5.jpg', (odg) => odg.sendFile(path.join(__dirname, "5.jpg")));
server.get('/4.jpg', (odg) => odg.sendFile(path.join(__dirname, "4.jpg")));
server.get('/hair.png', (odg) => odg.sendFile(path.join(__dirname, "hair.png")));
server.get('/Hero.jpg', (odg) => odg.sendFile(path.join(__dirname, "Hero.jpg")));
server.get('/nasa_prica_slika.jpg', (odg) => odg.sendFile(path.join(__dirname, "nasa_prica_slika.jpg")));
server.get('/makaze_poz.jpg', (odg) => odg.sendFile(path.join(__dirname, "makaze_poz.jpg")));

//upisi u bazu:

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.post('/upisi_recenziju' , async (zahtev, odg) => {
    const ime=zahtev.body.ime;
    const poruka=zahtev.body.poruka;

    try{
        await recenzija.create({
            ime_korisnika: ime,
            komentar_korisnika: poruka
        })
    }
    
    catch(error){
        throw error;
    }

    odg.send("200");
})

//citaj iz baze:

server.get('/prikazi_recenzije' , async (zahtev, odg) => {
    const sve_rezcenzije = await recenzija.find();

    odg.json(sve_rezcenzije);
})