if(!localStorage.getItem('goods')) {
    localStorage.setItem('goods',JSON.stringify([])) //Patikrina, ar jau yra duomenų laikmena "goods" lokaliojoje atmintyje. Jei nėra, tada ji 
    // sukuria tuščią masyvą ir išsaugo jį kaip JSON eilutę, naudojant "localStorage.setItem()" metodą. Tai yra vadinama lokaliosios atminties inicijavimu. 
    // Tai reiškia, kad kai vartotojas pirmą kartą atsidaro svetainę, bus sukurta tuščia duomenų laikmena "goods", kuri bus naudojama vėliau.
} 
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false //sukuriamas nauja modulinio lango objektas, kuris yra susijęs su modaliniu langu, kuris atsiranda, kai vartotojas paspaudžia mygtuką
    //  "Pridėti naują prekę". Tai yra Bootstrap modulis, kuris yra naudojamas naudoti kai kuriuos elementus, pavyzdžiui, modalinius langus.
})

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
        //TODO: update_goods()
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