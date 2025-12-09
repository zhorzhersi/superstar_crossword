/* === NAVIGATOR.JS === */
/* Ovaj fajl sadrži listu SVIH ukrštenica na sajtu */

// 1. Definiši sve svoje ukrštenice ovde
// (Stavi najnoviju na VRH liste)
const allCrosswords = [
    {
        title: "Decembar (5G mreža)",
        url: "https://resirec.rs"
    },
    {
        title: "Novembar (Copy-Paste)",
        url: "https://resirec.rs/copy-paste"
    },
    {
        title: "Oktobar (Crna Svadba)",
        url: "https://resirec.rs/crnasvadba"
    },
    {
        title: "Septembar (BIT Tarifa)",
        url: "https://resirec.rs/bit"
    }
    // KADA DODAJEŠ NOVU (npr. Decembar):
    // {
    //     title: "Decembar - Nova Tema",
    //     url: "https://resirec.rs/decembar"
    // },
];

// 2. Ova funkcija se pokreće kad se stranica učita
document.addEventListener('DOMContentLoaded', () => {
    
    // Pronađi mesto gde treba da ubacimo meni
    const placeholder = document.getElementById('crossword-navigator-placeholder');
    
    // Ako ne nađemo placeholder, nemoj raditi ništa
    if (!placeholder) { 
        console.warn("Nije pronađen '#crossword-navigator-placeholder'. Preskačem pravljenje menija.");
        return; 
    }

    // 3. Kreiraj HTML za padajući meni
    let html = `
        <div class="crossword-selector-wrapper">
            <label for="crossword-selector">Izaberi drugu ukrštenicu:</label>
            <select id="crossword-selector">
    `;

    // 4. Saznaj koja je TRENUTNA stranica
    const currentPageUrl = window.location.href.replace(/\/$/, ""); // Ukloni / sa kraja ako postoji

    // 5. Dodaj svaku ukrštenicu kao <option> u meni
    allCrosswords.forEach(crossword => {
        // Ukloni / sa kraja URL-a iz liste radi poređenja
        const crosswordUrl = crossword.url.replace(/\/$/, "");
        
        // Proveri da li je ovo trenutna stranica
        const isSelected = (currentPageUrl === crosswordUrl);
        
        html += `<option value="${crossword.url}" ${isSelected ? 'selected' : ''}>
                    ${crossword.title}
                 </option>`;
    });

    html += `
            </select>
        </div>
    `;

    // 6. Ubaci gotov HTML u placeholder
    placeholder.innerHTML = html;

    // 7. Dodaj listener da te prebaci na drugu stranicu kad se izabere
    const selector = document.getElementById('crossword-selector');
    selector.addEventListener('change', function() {
        // Preusmeri korisnika na izabrani URL
        window.location.href = this.value;
    });
});