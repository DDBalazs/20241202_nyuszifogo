// globális állandók, változók
let score=items=0;	// pontszám és nyuszik darabszáma
let myInterval;		// időzítés
let speed=2000;		// időzítéshez ezredmásodperc
const windowWidth=window.innerWidth-50;	// böngésző belső szélessége képpontban
const windowHeight=window.innerHeight-100;	// böngésző belső magassága képpontban
const brendonWidth=50;		// egy nyuszi szélessége
const brendonHeight=100;		// egy nyuszi magassága
const brendonMin=2;			// nyuszik minimum darabszáma
const brendonMax=5;			// nyuszik maximum darabszáma

// általános véletlenszám generáló függvény (tól,ig)
function rnd(from,to) {
	return from+Math.floor(Math.random()*(to-from+1));
}

// alapbeállítások új játék indításakor
/*
	ponszám nullázása	
	gomb eltüntetése	
	nyuszi darabszámának generálása
	nyuszi darabszám kiírása
	nyuszik létrehozása - put()
	nyuszik elrendezése - jump()
	időzítés(elrendzésre) indítása
*/
function newgame() {
	score=0;
	gomb.style.display="none";
	items=rnd(brendonMin,brendonMax);
	szoveg.innerHTML="Segíts lelőni <span id='brendon'>"+items+"</span> szökni próbáló Brendonokat!";
	put();
	jump();
	myInterval=setInterval('jump()',speed);
}


// nyuszik létrehozása
/*
	ciklus (i=0-tól, darabszám-1-ig, egyesével)
		egy nyuszikép megadása stílus, id és onclick paraméterrel
*/
function put() {
	playground.innerHTML="";
	for (i=0; i<(items); i++) { 
		playground.innerHTML+="<img style='display:block;' src='img/brendon.png' id='"+i+"' onclick='newScore(this)'>";
	}
}

// nyuszik elrendezése
/*
	alapértékek beállítása (mettől meddig lehet arrébb rakni egy nyuszit)
	ciklus (i= 0-tól, darabszám-1-ig, egyesével)
		nyuszi[i] kép beazonosítása
		nyuszi helye balról véletlenszerűen
		nyuszi helye fentről véletlenszerűen
*/
function jump() {
	let brendonTopFrom=100; // ez a szám függ a képernyő tetején lévő kiírásoktól
	let brendonTopTo=windowHeight-brendonHeight;
	let brendonLeftFrom=0;
	let brendonLeftTo=windowWidth-brendonWidth;
	
	for (i=0; i<(items); i++) {
		brendon=document.getElementById(i);
		brendon.style.left=rnd(brendonLeftFrom,brendonLeftTo)+"px";
		brendon.style.top=rnd(brendonTopFrom,brendonTopTo)+"px";
	}
}

// kattintáskor (elkaptunk egy nyuszit) newscore()
/*
	hang elindítása
	ponszám növelése
	darabszám csökkentése
	adott nyuszi eltüntetése
	ha (darabszám >0)
		új darabszám kiírása
	különben
		játék vége kiírása
		gomb megjelenítése
		időzítés leállítása
*/

function newScore(brendon) {
	sound.play();
	score++;	
	brendon.style.display="none";
	if (items-score>0)
		rabbits.innerHTML=items-score;
	else {
		szoveg.innerHTML="Lelötted mind a(z) "+items+" Brendont!";
		gomb.style.display="block";
		clearInterval(myInterval);
	}
}
