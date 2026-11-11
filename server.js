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
const recenzija=mongoose.model("BANErecenzija" , shema_rezencija);

//serviranje svega
server.use(express.static(__dirname));

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