let prikazi_cenovnik=document.getElementById("vidi_cenovnik");
let sakrij_cenovnik=document.getElementById("zatvori_cenovnik");
let cenovnik_div=document.getElementById("prikaz_cene_div_rod");

prikazi_cenovnik.addEventListener("click" , ()=>{
    cenovnik_div.style.visibility="visible";
})

sakrij_cenovnik.addEventListener("click" , ()=>{
    cenovnik_div.style.visibility="hidden";
})

let vidi_galeriju=document.getElementById("vidi_galeriju");
let galerija_pocetna=document.getElementById("poz");

vidi_galeriju.addEventListener("click" , ()=>{
    galerija_pocetna.scrollIntoView({
        behavior: "smooth"
    })
})

let vidi_tim=document.getElementById("vidi_tim");
let tim=document.getElementById("tim");

vidi_tim.addEventListener("click" , ()=>{
    tim.scrollIntoView({
        behavior: "smooth"
    })
})

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
                poruka: poruka_recenzija.value
            })
        })
        .then(odg=>odg.text())
        .then(podatak => {
            console.log(podatak);

            if(podatak=="200"){
                window.alert("Recenzija je uspešno dodata. Pričekajte par sekundi kako bi se recenzija pojavila na ekranu. Hvala!");
            }
        })
    }
})

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

        for(let i=0; i<br; i++){
            let novi_ime=document.createElement("h3");
            let novi_poruka=document.createElement("p");
            let novi_div=document.createElement("div");
            novi_div.className="recenzija";

            novi_ime.textContent=podaci[i].ime_korisnika;
            novi_poruka.textContent=podaci[i].komentar_korisnika;

            novi_div.append(novi_ime);
            novi_div.append(novi_poruka);

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

            for(let i=0; i<br; i++){
                let novi_ime=document.createElement("h3");
                let novi_poruka=document.createElement("p");
                let novi_div=document.createElement("div");
                novi_div.className="recenzija";

                novi_ime.textContent=podaci[i].ime_korisnika;
                novi_poruka.textContent=podaci[i].komentar_korisnika;

                novi_div.append(novi_ime);
                novi_div.append(novi_poruka);

                recenzije_div_rod.append(novi_div);
            }
        }
    })

    recenzije_div_rod.innerHTML=` `;
}, 5000)