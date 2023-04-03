if(!localStorage.getItem('goods')) {
    localStorage.setItem('goods',JSON.stringify([])) //Patikrina, ar jau yra duomenų laikmena "goods" lokaliojoje atmintyje. Jei nėra, tada ji 
    // sukuria tuščią masyvą ir išsaugo jį kaip JSON eilutę, naudojant "localStorage.setItem()" metodą. Tai yra vadinama lokaliosios atminties inicijavimu. 
    // Tai reiškia, kad kai vartotojas pirmą kartą atsidaro svetainę, bus sukurta tuščia duomenų laikmena "goods", kuri bus naudojama vėliau.
} 
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false //sukuriamas nauja modulinio lango objektas, kuris yra susijęs su modaliniu langu, kuris atsiranda, kai vartotojas paspaudžia mygtuką
    //  "Pridėti naują prekę". Tai yra Bootstrap modulis, kuris yra naudojamas naudoti kai kuriuos elementus, pavyzdžiui, modalinius langus.
})

let options = {
    valueNames: ['name', 'price']
}

let userList

document.querySelector('button.add_new').addEventListener('click', function(e) { //priskiriamas reakcijos įvykis vartotojo paspaudimui ant mygtuko "Pridėti 
    // naują prekę". Kai šis mygtukas yra paspaudžiamas, JavaScript renka įvesties laukų duomenis. Tai daroma naudojant "document.getElementById()" metodą 
    // ir priskiriant atitinkamų įvesties laukų reikšmes kintamiesiems "name", "price" ir "count".
    let name = document.getElementById('good_name').value
    let price = document.getElementById('good_price').value
    let count = document.getElementById('good_count').value
    if(name && price && count) { //Toliau yra patikrinama, ar visi laukai užpildyti. Jei visi laukai užpildyti, tada laukų reikšmės yra išvalomos, naudojant
        //  "document.getElementById().value" metodą.
        document.getElementById('good_name').value = ''
        document.getElementById('good_price').value = ''
        document.getElementById('good_count').value  = '1'
        // Tada prekės informacija yra pridedama prie masyvo "goods", kuris yra gautas iš "localStorage". Masyvas "goods" yra pasiekiamas ir modifikuojamas
        //  naudojant "JSON.parse()" ir "JSON.stringify()" metodus. "JSON.parse()" konvertuoja "goods" masyvą iš JSON eilutės į JavaScript objektą, o 
        // "JSON.stringify()" konvertuoja JavaScript objektą į JSON eilutę. Po to masyvas "goods" yra iš naujo išsaugomas naudojant "localStorage.setItem()" metodą.
        let goods = JSON.parse(localStorage.getItem('goods'))
        goods.push(['good_'+goods.length, name, price, count, 0, 0, 0])
        localStorage.setItem('goods', JSON.stringify(goods))
        update_goods()
        myModal.hide() //Galiausiai modulinis langas yra paslėptas naudojant "myModal.hide()" metodą, ir vartotojas yra grąžinamas į pagrindinį puslapį.
    } else {
        Swal.fire({ // Jei bent vienas laukas nėra užpildytas, atsiranda pranešimas apie klaidą naudojant "SweetAlert" biblioteką. Tai padeda vartotojui
            //  suprasti, kad jis turi užpildyti visus laukus, kad galėtų pridėti prekę į savo krepšelį
            icon: 'error',
            title: 'Oops...',
            text: 'Please, fill in all the fields'
        })
    }
})

update_goods ()

function update_goods () {
    let result_price = 0; // sukuriamas kintamasis result_price ir jam priskiriama reikšmė 0.
    let tbody = document.querySelector('.list'); //sukuriamas kintamasis tbody ir jam priskiriama reikšmė rasti elementą su klase 'list'.
    tbody.innerHTML = ""; // išvalomas kintamojo tbody turinys.
    document.querySelector('.cart').innerHTML = ""; //išvalomas elementas su klase 'cart'.
    let goods = JSON.parse(localStorage.getItem('goods')); //sukuriamas kintamasis goods ir jam priskiriama reikšmė gauta iš local
                                                            //  storage elemento 'goods' ir paversta iš JSON formato į objektą.
    if(goods.length) { // jei goods objektas netuščias, vykdoma ši sąlyga.
        table1.hidden = false; //rodomas elementas su id 'table1'.
        table2.hidden  = false;
        for( let i=0; i < goods.length; i++) { //pradedamas ciklas per visus goods objekto elementus.
            tbody.insertAdjacentHTML('beforeend', //į kintamojo tbody turinį įdedama HTML eilutė.
            `
           <tr class="align-middle">
            <td>${i+1}</td> 
            <td class="name">${goods[i][1]}</td>
            <td class="price">${goods[i][2]}</td>
            <td>${goods[i][3]}</td>
            <td><button class="good_delete btn btn-danger" data-delete="${goods[i][0]}">&#10006;</button> </td>
            <td><button class="good_delete btn btn-primary" data-goods="${goods[i][0]}">&#10149;</button> </td>
           </tr>
           `
        //   ${i+1} - iteracijos numeris padidintas vienetu. //${goods[i][1]} - objekto elemento savybė, kurios raktas yra 1.
// ${goods[i][2]} - objekto elemento savybė, kurios raktas yra 2. // ${goods[i][3]} - objekto elemento savybė, kurios raktas yra 3.
// <button class="good_delete btn btn-danger" data-delete="${goods[i][0]}">&#10006;</button> - mygtukas, skirtas ištrinti objektą, jo reikšmė yra objekto elemento savybė, kurios raktas yra 0.
// <button class="good_delete btn btn-primary" data-goods="${goods[i][0]}">&#10149;</button> - mygtukas, skirtas atnaujinti objektą, jo reikšmė yra objekto elemento savybė, kurios raktas yra 0.

            );
            if(goods[i][4]>0) { // jei objekto elemento savybė, kurios raktas yra 4, yra didesnė už 0, vykdom
                goods[i][6] = goods [i][4]*goods[i][2] - goods[i][4]*goods[i][2]*goods[i][5]*0.01; //Skaičiuojama prekių kaina su nuolaida, kuri yra nustatyta kaip prekės elemento savybė (raktas 5) procentų dydis.
                result_price += goods[i][6] ; //Apskaičiuota prekių kaina pridedama prie bendros kainos (result_price).
            document.querySelector('.cart').insertAdjacentHTML('beforeend', //Sukuriamas naujas eilutės elementas (tr) krepšelio lentelėje su informacija apie prekę ir jos kainą
           ` 
         <tr class="align-middle">
            <td>${i+1}</td>
            <td class="price_name">${goods[i][1]}</td>
            <td class="price_one">${goods[i][2]}</td>
            <td class="price_count">${goods[i][4]}</td>
            <td class="price_discount"><input data-goodId="${goods[i][0]}" type="text" value="${goods[i][5]}" min="0" max="100"></td>
            <td>${goods[i][6]}</td>
            <td><button class="good_delete  btn btn-danger" data-delete="${goods[i][0]}"> &#10149; </button> </td>
           </tr>
           `
            ) ;
             }
        } 
        userList = new List('goods', options);
    }   else { //Priešingu atveju (jei nėra prekių užsakymų), lentelės yra paslėptos.
            table1.hidden = true 
            table2.hidden = true
        }
    document.querySelector('.price_result').innerHTML = result_price + '*&#8364;' //naudojama, kad atnaujintų kainą puslapio apačioje (kuri rodo bendrą krepšelio kainą). Jis pakeičia šio elemento HTML turinį į atnaujintą kainą
}

document.querySelector('.list').addEventListener('click', function(e) { //function(e) - tai įvykio klausytojo funkcija, kuri yra vykdoma, kai vartotojas 
    // paspaudžia .list elementą. Funkcijos parametras e yra įvykio objektas, kuris turi informaciją apie paspaudimo įvykį.
    if(!e.target.dataset.delete) { // ši eilutė patikrina, ar paspaudimo įvykis buvo iškvietas ant elemento, turinčio  data-delete atributą. Jei toks atributas neegzistuoja, funkcija grąžina undefined reikšmę ir nutraukia vykdymą.
        return
    }
    Swal.fire ({  //tai SweetAlert2 bibliotekos funkcija, kuri sukuria patvirtinimo dialogo langą. 
        title: 'Attention',
        text: 'Are you sure you want to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => { // tai funkcija, kuri bus iškviesta po patvirtinimo dialogo lango uždarymo. Jos parametras result yra SweetAlert2 bibliotekos grąžinamas objektas, kuriame yra informacija apie vartotojo pasirinkimą dialogo lange.
        if(result.isConfirmed) { //ši eilutė patikrina, ar vartotojas patvirtino operaciją paspaudęs mygtuką "Yes" dialogo lange. Jei taip, vykdoma kodo dalis, kuri ištrina pasirinktą prekę iš localStorage objekto ir atnaujina prekių sąrašą
            let goods = JSON.parse(localStorage.getItem('goods'))
            for(let i=0; i<goods.length; i++) {
              if(goods[i][0] == e.target.dataset.delete)  {
                goods.splice(i, 1) //ištrina vieną prekę iš goods masyvo, kurio indeksas yra i. splice() yra masyvo metodas, kuris leidžia iškelti vieną ar kelias elementų iš masyvo, t.y. pakeisti masyvą pačioje vietoje.
                localStorage.setItem('goods', JSON.stringify(goods))
                update_goods()
              }
            }
            Swal.fire( //ši funkcija sukurią informacinį langą, kuri praneša, kad pasirinkta prekė buvo sėkmingai pašalinta.
                "Removed",
                "Selected product was successfully removed",
                "success"
            )
        }
    })
})

document.querySelector('.list').addEventListener('click', function(e) { // funkcija yra priskirta click event'ui ant HTML elemento su klase list
    if(!e.target.dataset.goods) { 
        return
    }
    let goods = JSON.parse(localStorage.getItem('goods')) ////Sukuriamas kintamasis "goods", kuriam priskiriamas prekių sąrašas, saugomas "localStorage".
    for(let i=0; i<goods.length; i++) {
        if(goods[i][3]>0 && goods[i][0] == e.target.dataset.goods) {
           goods[i].splice(3,1,goods[i][3]-1) //Funkcija eina per prekių sąrašą ir ieško prekės, kurios kiekis yra daugiau nei 0 ir kurios ID sutampa su atributu "data-goods" spustelėtame HTML elemente. Jei toks elementas yra rastas, jo kiekis yra sumažinamas vienetu, o krepšelio kiekis padidinamas vienetu.
           goods[i].splice(4,1,goods[i][4]+1)
           localStorage.setItem('goods', JSON.stringify(goods))
           update_goods()
        }
    }
})

document.querySelector('.cart').addEventListener('click', function(e) { 
    if(!e.target.dataset.delete) { 
        return
    }
    let goods = JSON.parse(localStorage.getItem('goods')) 
    for(let i=0; i<goods.length; i++) {
        if(goods[i][4]>0 && goods[i][0] == e.target.dataset.delete) {
           goods[i].splice(3,1, goods[i][3]+1) 
           goods[i].splice(4,1, goods[i][4]-1)
           localStorage.setItem('goods', JSON.stringify(goods))
           update_goods()
        }
    }
})