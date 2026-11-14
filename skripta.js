let prikazi_cenovnik=document.getElementById("vidi_cenovnik");
let sakrij_cenovnik=document.getElementById("zatvori_cenovnik");
let cenovnik_div=document.getElementById("prikaz_cene_div_rod");

prikazi_cenovnik.addEventListener("click" , ()=>{
    cenovnik_div.style.visibility="visible";
})

sakrij_cenovnik.addEventListener("click" , ()=>{
    cenovnik_div.style.visibility="hidden";
})

let vidi_sertifikate=document.getElementById("vidi_sertifikate");
let sakrij_sertifikate=document.getElementById("zatvori_sert");
let sert_div=document.getElementById("prikaz_sert_div_rod");

if(vidi_sertifikate){
    vidi_sertifikate.addEventListener("click" , ()=>{
        sert_div.style.visibility="visible";
    })
}

if(sakrij_sertifikate){
    sakrij_sertifikate.addEventListener("click" , ()=>{
        sert_div.style.visibility="hidden";
    })
}

let vidi_galeriju=document.getElementById("vidi_galeriju");
let galerija_pocetna=document.getElementById("galerija_slika");

if(vidi_galeriju){
    vidi_galeriju.addEventListener("click" , ()=>{
        galerija_pocetna.scrollIntoView({
            behavior: "smooth"
        })
    })
}

let vidi_galeriju_druga_stranica=document.getElementById("galerija_radova_dugme_hero");

if(vidi_galeriju_druga_stranica){
    vidi_galeriju_druga_stranica.addEventListener("click" , ()=>{
        window.location.href="galerija.html";
    })
}

let vidi_tim=document.getElementById("vidi_tim");
let tim=document.getElementById("tim");

if(vidi_tim){
    vidi_tim.addEventListener("click" , ()=>{
        tim.scrollIntoView({
            behavior: "smooth"
        })
    })
}

let vidi_recenzije=document.getElementById("vidi_recenzije");
let recenzije_div=document.getElementById("forma");

if(vidi_recenzije){
    vidi_recenzije.addEventListener("click" , ()=>{
        recenzije_div.scrollIntoView({
            behavior: "smooth"
        })
    })
}

//GALERIJA - prebrojava koliko ima slika

let tekst=document.getElementById("galerija_posebno_naslov");
let slike=document.getElementsByClassName("frizura");

let n=slike.length;

if(tekst!=null)
    tekst.textContent=`Galerija (${n})`;

//UPIS RECENZIJE

let ime_recenzija=document.getElementById("ime_forma");
let poruka_recenzija=document.getElementById("komentar_forma");
let posalji=document.getElementById("predaj_formu");
let datum=new Date();

if(posalji){
    posalji.addEventListener("click" , ()=>{
        if(poruka_recenzija.value.trim()==""){
            window.alert("Poštovani, polje za ostavljanje recenzije ne sme biti prazno.");
            window.location.reload();
        }

        else{
            fetch("/upisi_recenziju" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    ime: ime_recenzija.value,
                    poruka: poruka_recenzija.value,
                    datum: datum.toLocaleDateString("sr-RS"),
                    vreme: datum.toLocaleTimeString("sr-RS")
                })
            })
            .then(odg=>odg.text())
            .then(podatak => {
                console.log(podatak);

                if(podatak=="200"){
                    window.alert("Recenzija je uspešno dodata. Pričekajte par sekundi kako bi se pojavila na ekranu. Hvala!");
                    window.location.reload();
                }
            })
        }
    })
}

//CITANJE RECENZIJA

let recenzije_div_rod=document.getElementById("sve_recenzije");
let obavestenje=document.getElementById("obavestenje");

let br;
//prvo ucitavanje - bez vremena
fetch("/prikazi_recenzije")
.then(odg => odg.json())
.then(podaci => {
    br=podaci.length;

    if(br>0 && obavestenje){
        obavestenje.style.display="none";

        for(let i=br-1; i>=0; i--){
            let novi_ime=document.createElement("h3");
            let novi_poruka=document.createElement("p");
            let datum_vreme=document.createElement("p");
            datum_vreme.style.opacity="60%";

            let novi_div=document.createElement("div");
            novi_div.className="recenzija";

            novi_ime.textContent=podaci[i].ime_korisnika;
            novi_poruka.textContent=podaci[i].komentar_korisnika;
            datum_vreme.textContent=`${podaci[i].datum}, ${podaci[i].vreme}`;

            novi_div.append(novi_ime);
            novi_div.append(novi_poruka);
            novi_div.append(datum_vreme);

            recenzije_div_rod.append(novi_div);
        }
    }
})

//NAREDNA UCITAVANJA - na svakih 5 sekundi

setInterval(()=>{
    fetch("/prikazi_recenzije")
    .then(odg => odg.json())
    .then(podaci => {
        br=podaci.length;

        if(br>0 && obavestenje){
            obavestenje.style.display="none";

            for(let i=br-1; i>=0; i--){
                let novi_ime=document.createElement("h3");
                let novi_poruka=document.createElement("p");
                let datum_vreme=document.createElement("p");
                datum_vreme.style.opacity="60%";

                let novi_div=document.createElement("div");
                novi_div.className="recenzija";

                novi_ime.textContent=podaci[i].ime_korisnika;
                novi_poruka.textContent=podaci[i].komentar_korisnika;
                datum_vreme.textContent=`${podaci[i].datum}, ${podaci[i].vreme}`;

                novi_div.append(novi_ime);
                novi_div.append(novi_poruka);
                novi_div.append(datum_vreme);

                recenzije_div_rod.append(novi_div);
            }
        }
    })

    if(br>0 && obavestenje) recenzije_div_rod.innerHTML=` `;
}, 10000)