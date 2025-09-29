// Grid dimensions 
const GRID_ROWS = 13;
const GRID_COLS = 16;
// Internal grid to store solutions (letters, '#', or '#IMG#')
let solutionGrid = [];
// Internal grid to store user input
let inputGrid = [];

// Declare crosswordGridElement globally or in a scope accessible by showClueTooltip
// It will be initialized inside DOMContentLoaded
let crosswordGridElement;

// Initialize empty grids
function initializeGrids() {
    solutionGrid = [];
    inputGrid = [];
    for (let i = 0; i < GRID_ROWS; i++) {
        solutionGrid[i] = [];
        inputGrid[i] = [];
        for (let j = 0; j < GRID_COLS; j++) {
            solutionGrid[i][j] = ''; // Empty cell initially
            inputGrid[i][j] = ''; // Empty cell for user input
        }
    }
}

// Definition of words for the crossword puzzle
// Important: Words are in UPPERCASE for easier checking
// Adjusted positions to fit 12x15 grid
const crosswordWords = [
    {
        number: 1,
        word: "SKZ",
        clue: "Srpska književna zadruga",
        startRow: 0,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 2,
        word: "SVETAC",
        clue: "Svetitelj",
        startRow: 0,
        startCol: 0,
        orientation: "vertical"
    },
    {
        number: 3,
        word: "VOLBU",
        clue: "Mesto u Norveškoj",
        startRow: 1,
        startCol: 0,
        orientation: "horizontal"
    },

   {
        number: 4,
        word: "EŠA",
        clue: "Indijska glumica Gupta",
        startRow: 2,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 5,
        word: "KOŠMAR",
        clue: "Ružan san",
        startRow: 0,
        startCol: 1,
        orientation: "vertical"
    },
    {
        number: 6,
        word: "ZLATANVIDOVIĆ",
        clue: "Naš glumac",
        startRow: 0,
        startCol: 2,
        orientation: "vertical"
    },
    {
        number: 7,
        word: "TMT",
        clue: "Međunarodna skraćenica za turkmenistanski manat",
        startRow: 3,
        startCol: 0,
        orientation: "horizontal"
    },
   {
        number: 8,
        word: "AAA",
        clue: "American Automobile Association",
        startRow: 4,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 9,
        word: "CRNASVADBA",
        clue: "Naša serija",
        startRow: 5,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 10,
        word: "SUMO",
        clue: "Tradicionalni japanski način rvanja",
        startRow: 0,
        startCol: 4,
        orientation: "horizontal"
    },
    {
        number: 11,
        word: "B",
        clue: "Broj",
        startRow: 1,
        startCol: 3,
        orientation: "vertical"
    },
    {
        number: 12,
        word: "P",
        clue: "Fosfor",
        startRow: 2,
        startCol: 4,
        orientation: "horizontal"
    },
    {
        number: 13,
        word: "EMU",
        clue: "Jedna ptica",
        startRow: 3,
        startCol: 4,
        orientation: "horizontal"
    },
    {
        number: 14,
        word: "RILO",
        clue: "Surla, rilica",
        startRow: 4,
        startCol: 4,
        orientation: "horizontal"
    },
    {
        number: 15,
        word: "ARTERIJA",
        clue: "Krvni sud koji prenosi krv od srca",
        startRow: 5,
        startCol: 3,
        orientation: "vertical"
    },
    {
        number: 16,
        word: "ŠPE",
        clue: "Nemački džepni bojni brod (Admiral Graf)",
        startRow: 7,
        startCol: 0,
        orientation: "vertical"
    },
    {
        number: 17,
        word: "VRTI",
        clue: "Bašta (pesn.) (mn.)",
        startRow: 6,
        startCol: 2,
        orientation: "horizontal"
    },
    {
        number: 18,
        word: "NU",
        clue: "Nevenka Urbanova",
        startRow: 7,
        startCol: 1,
        orientation: "vertical"
    },
    {
        number: 19,
        word: "ŠNITA",
        clue: "Komad, parče",
        startRow: 7,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 20,
        word: "PUDER",
        clue: "Sredstvo u kozmetici",
        startRow: 8,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 21,
        word: "E",
        clue: "Međunarodna oznaka za Španiju",
        startRow: 9,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 22,
        word: "OR",
        clue: "Operating Range",
        startRow: 9,
        startCol: 2,
        orientation: "horizontal"
    },
    {
        number: 23,
        word: "ORO",
        clue: "Narodna igra Crne Gore",
        startRow: 10,
        startCol: 1,
        orientation: "vertical"
    },
    {
        number: 24,
        word: "VV",
        clue: "Vlastimir Velisavljević",
        startRow: 11,
        startCol: 0,
        orientation: "vertical"
    },
    {
        number: 25,
        word: "VRIJ",
        clue: "Holandski fudbaler Stefan de",
        startRow: 11,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 26,
        word: "VOĆAR",
        clue: "Prodavac voća",
        startRow: 12,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 27,
        word: "OVID",
        clue: "Ovidije odmila ",
        startRow: 10,
        startCol: 1,
        orientation: "horizontal"
    },
    {
        number: 28,
        word: "SUPERSTAR",
        clue: "Naziv TV kanala na kojem će serija biti emitovana",
        startRow: 0,
        startCol: 4,
        orientation: "vertical"
    },
    {
        number: 29,
        word: "U",
        clue: "Unutra",
        startRow: 0,
        startCol: 5,
        orientation: "vertical"
    },
    {
        number: 30,
        word: "MIKULA",
        clue: "Ime vračare iz serije",
        startRow: 0,
        startCol: 6,
        orientation: "vertical"
    },
    {
        number: 31,
        word: "ONA",
        clue: "Nije ona, nego...",
        startRow: 0,
        startCol: 7,
        orientation: "vertical"
    },
    {
        number: 32,
        word: "IV",
        clue: "Ivana odmila",
        startRow: 1,
        startCol: 6,
        orientation: "horizontal"
    },
    {
        number: 33,
        word: "KA",
        clue: "Kuzmanović Andrija",
        startRow: 2,
        startCol: 6,
        orientation: "horizontal"
    },
    {
        number: 34,
        word: "MIVI",
        clue: "Molecular Immunology, Virology and Inflammation",
        startRow: 3,
        startCol: 5,
        orientation: "vertical"
    },
    {
        number: 35,
        word: "LASO",
        clue: "Kaubojsko uže sa omčom za hvatanje divljih konja",
        startRow: 3,
        startCol: 8,
        orientation: "horizontal"
    },
    {
        number: 36,
        word: "ODBRANITI",
        clue: "Zaštititi, sačuvati",
        startRow: 4,
        startCol: 7,
        orientation: "vertical"
    },
    {
        number: 37,
        word: "KATABAZA",
        clue: "Kretanje nizbrdo, spuštanje, potonuće",
        startRow: 0,
        startCol: 9,
        orientation: "vertical"
    },
    {
        number: 38,
        word: "VLASI",
        clue: "Čuveni su po magiji",
        startRow: 0,
        startCol: 10,
        orientation: "vertical"
    },
    {
        number: 39,
        word: "PIROT",
        clue: "Grad u Srbiji",
        startRow: 0,
        startCol: 11,
        orientation: "vertical"
    },
    {
        number: 40,
        word: "SA",
        clue: "Registarska oznaka za Sentu",
        startRow: 1,
        startCol: 12,
        orientation: "vertical"
    },
    {
        number: 41,
        word: "LER",
        clue: "Prazan hod motora",
        startRow: 0,
        startCol: 13,
        orientation: "horizontal"
    },
    {
        number: 42,
        word: "LA",
        clue: "Jedna nota",
        startRow: 0,
        startCol: 13,
        orientation: "vertical"
    },
    {
        number: 43,
        word: "E",
        clue: "Energija",
        startRow: 0,
        startCol: 14,
        orientation: "vertical"
    },
    {
        number: 44,
        word: "ROBIN",
        clue: "Betmenov pomagač",
        startRow: 0,
        startCol: 15,
        orientation: "vertical"
    },
    {
        number: 45,
        word: "KVP",
        clue: "Kompjuterizovano vidno polje (med. skr.)",
        startRow: 0,
        startCol: 9,
        orientation: "horizontal"
    },
    {
        number: 46,
        word: "ALISA",
        clue: "Nalazi se u zemlju čuda",
        startRow: 1,
        startCol: 9,
        orientation: "horizontal"
    },
    {
        number: 47,
        word: "TARA",
        clue: "Planina u Srbiji",
        startRow: 2,
        startCol: 9,
        orientation: "horizontal"
    },
    {
        number: 48,
        word: "L",
        clue: "Litar",
        startRow: 3,
        startCol: 8,
        orientation: "vertical"
    },
    {
        number: 49,
        word: "BITKOIN",
        clue: "Najstarija i najpoznatija kriptovaluta",
        startRow: 4,
        startCol: 9,
        orientation: "horizontal"
    },
    {
        number: 50,
        word: "BEKJAREV",
        clue: "Naš glumac Ivan",
        startRow: 5,
        startCol: 8,
        orientation: "vertical"
    },
    {
        number: 51,
        word: "O",
        clue: "Okruglo slovo",
        startRow: 1,
        startCol: 15,
        orientation: "horizontal"
    },
    {
        number: 52,
        word: "ALI",
        clue: "Bokser Muhamed",
        startRow: 2,
        startCol: 14,
        orientation: "vertical"
    },
    {
        number: 53,
        word: "AB",
        clue: "Početak azbuke",
        startRow: 2,
        startCol: 14,
        orientation: "horizontal"
    },
    {
        number: 54,
        word: "IO",
        clue: "3. i 4. samoglasnik",
        startRow: 3,
        startCol: 13,
        orientation: "vertical"
    },
    {
        number: 55,
        word: "ILI",
        clue: "Rastavni veznik",
        startRow: 3,
        startCol: 13,
        orientation: "horizontal"
    },
    {
        number: 56,
        word: "K",
        clue: "Karat",
        startRow: 4,
        startCol: 12,
        orientation: "vertical"
    },
    {
        number: 57,
        word: "VENAC",
        clue: "Zeleni ili Savski",
        startRow: 9,
        startCol: 5,
        orientation: "horizontal"
    },
    {
        number: 58,
        word: "D",
        clue: "Jedan vitamin",
        startRow: 10,
        startCol: 4,
        orientation: "vertical"
    },
    {
        number: 59,
        word: "R",
        clue: "Skup realnih brojeva",
        startRow: 12,
        startCol: 4,
        orientation: "vertical"
    },
    {
        number:60,
        word: "TETER",
        clue: "Jedna kriptovaluta",
        startRow: 11,
        startCol: 5,
        orientation: "horizontal"
    },
    {
        number:61,
        word: "NIVA",
        clue: "Model Lade",
        startRow: 12,
        startCol: 6,
        orientation: "horizontal"
    },
    {
        number:62,
        word: "T",
        clue: "Tona",
        startRow: 11,
        startCol: 5,
        orientation: "vertical"
    },
    {
        number:63,
        word: "ČIR",
        clue: "Ulkus",
        startRow: 10,
        startCol: 6,
        orientation: "horizontal"
    },
    {
        number:64,
        word: "ORKA",
        clue: "Kit ubica",
        startRow: 7,
        startCol: 6,
        orientation: "horizontal"
    },
    {
        number:65,
        word: "TAJ",
        clue: "Pokazna zamenica",
        startRow: 8,
        startCol: 6,
        orientation: "horizontal"
    },
    {
        number:66,
        word: "C",
        clue: "Cent",
        startRow: 9,
        startCol: 9,
        orientation: "vertical"
    },
    {
        number:67,
        word: "RA",
        clue: "Raška",
        startRow: 11,
        startCol: 9,
        orientation: "vertical"
    },
    {
        number:68,
        word: "OTEČEN",
        clue: "Naduven, baburast",
        startRow: 7,
        startCol: 6,
        orientation: "vertical"
    },
    {
        number: 69,
        word: "V",
        clue: "Rimski broj 5",
        startRow: 9,
        startCol: 5,
        orientation: "vertical"
    },
    {
        number: 70,
        word: "BEZ",
        clue: "Jedan predlog",
        startRow: 6,
        startCol: 7,
        orientation: "horizontal"
    },



    
];

// New array to define images in the grid
const gridImages = [
    {
        id: "img",
       // src: "./src/bit.jpg", // Placeholder image for MTS Logo
        alt: "BIT Tarifa",
        startRow: 5, // Top-left row of the image
        startCol: 10, // Top-left column of the image
        rowSpan: 8, // Image spans 7 rows
        colSpan: 6  // Image spans 6 columns
    }
];

// Function to populate the solution grid with words and image markers
function populateSolutionGrid() {
    initializeGrids(); // Always start with empty grids

    // 1. Place words in the solutionGrid
   crosswordWords.forEach(wordData => {
    const { word, startRow, startCol, orientation } = wordData;
    
    let cellIndex = 0; // Brojač za polja u ukrštenici
    for (let i = 0; i < word.length; i++) {
        let letter = '';

        // Proveravamo da li je slovo digraf (počinje sa '[')
        if (word[i] === '[') {
            letter = word.substring(i + 1, i + 3); // Uzimamo 2 slova unutar zagrada (npr. LJ)
            i += 3; // Preskačemo '[', 'L', 'J', ']'
        } else {
            letter = word[i];
        }

        let row = startRow;
        let col = startCol;

        if (orientation === "horizontal") {
            col += cellIndex;
        } else { // vertical
            row += cellIndex;
        }

        if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
            solutionGrid[row][col] = letter; // Smeštamo ili 'A' ili 'LJ'
        }

        cellIndex++;
    }
});

    // 2. Place image markers in the solutionGrid
    gridImages.forEach(imgData => {
        for (let r = imgData.startRow; r < imgData.startRow + imgData.rowSpan; r++) {
            for (let c = imgData.startCol; c < imgData.startCol + imgData.colSpan; c++) {
                // Check against new GRID_ROWS and GRID_COLS
                if (r >= 0 && r < GRID_ROWS && c >= 0 && c < GRID_COLS) {
                    // Mark cells covered by an image with '#IMG#'
                    solutionGrid[r][c] = '#IMG#';
                }
            }
        }
    });

    // 3. Mark remaining empty cells as black ('#')
    // This fills any cell not covered by a word or an image with a black cell marker
    for (let r = 0; r < GRID_ROWS; r++) {
        for (let k = 0; k < GRID_COLS; k++) {
            if (solutionGrid[r][k] === '') {
                solutionGrid[r][k] = '#'; // Mark as a black cell
            }
        }
    }
}

// Function to generate the HTML grid cells and place images
function generateHtmlGrid() {
    crosswordGridElement = document.getElementById('crossword-grid');
    crosswordGridElement.innerHTML = ''; // Clear previous content

    // First, create all grid-cell divs based on solutionGrid
    for (let r = 0; r < GRID_ROWS; r++) {
        for (let k = 0; k < GRID_COLS; k++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.row = r;
            cell.dataset.col = k;

            if (solutionGrid[r][k] === '#') { // Explicitly black cell
                cell.classList.add('black');
            } else if (solutionGrid[r][k] === '#IMG#') { // Cell covered by an image
                cell.classList.add('image-cell-placeholder');
                // No input element here, as it's part of an image
            } else { // It's a letter cell
                const input = document.createElement('input');
                input.type = 'text';
                if (solutionGrid[r][k].length > 1) {
                input.maxLength = solutionGrid[r][k].length; 
                 } else {
                input.maxLength = '1';
                }
                
                input.dataset.row = r;
                input.dataset.col = k;
                input.value = inputGrid[r][k]; // Restore previous input on reset
                cell.appendChild(input);

                // Find all words that start at this cell
                const wordsStartingHere = crosswordWords.filter(word =>
                    (word.startRow === r && word.startCol === k)
                );

                if (wordsStartingHere.length > 0) {
                    const clueNumberSpan = document.createElement('span');
                    clueNumberSpan.classList.add('clue-number');
                    // Join the numbers of all words starting at this cell
                    clueNumberSpan.textContent = wordsStartingHere.map(word => word.number).join('/');
                    cell.appendChild(clueNumberSpan);
                }
            }
            crosswordGridElement.appendChild(cell);
        }
    }

    // Now, add the image wrappers on top of the grid cells
    gridImages.forEach(imgData => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('crossword-image-wrapper');
        // Set grid position and span using CSS Grid properties
        // +1 because grid-column/row start from 1, not 0
        imageWrapper.style.gridColumn = `${imgData.startCol + 1} / span ${imgData.colSpan}`;
        imageWrapper.style.gridRow = `${imgData.startRow + 1} / span ${imgData.rowSpan}`;

        const imgElement = document.createElement('img');
        imgElement.src = imgData.src;
        imgElement.alt = imgData.alt;
        imgElement.loading = 'lazy'; // Improve performance for images
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover'; // Ensures image covers the area

        // Add onerror handler to the image
        imgElement.onerror = () => {
            console.error(`Failed to load image: ${imgData.src}. Displaying placeholder background.`);
            // Fallback: If image fails to load, set a background color on the wrapper
            imageWrapper.style.backgroundColor = '#cccccc'; // Light gray fallback
            // Optionally, display a placeholder text or icon
            imageWrapper.innerHTML = `<span style="color: #666; font-size: 0.8em; text-align: center;"></span>`;
        };

        imageWrapper.appendChild(imgElement);
        crosswordGridElement.appendChild(imageWrapper);
    });
}

// Function to generate and display clues
function generateClues() {
    const horizontalCluesList = document.getElementById('horizontal-clues');
    const verticalCluesList = document.getElementById('vertical-clues');

    horizontalCluesList.innerHTML = ''; // Clear previous content
    verticalCluesList.innerHTML = ''; // Clear previous content

    crosswordWords.sort((a, b) => a.number - b.number).forEach(wordData => {
        const listItem = document.createElement('li');
        listItem.textContent = `${wordData.number}. ${wordData.clue}`;

        if (wordData.orientation === "horizontal") {
            horizontalCluesList.appendChild(listItem);
        } else {
            verticalCluesList.appendChild(listItem);
        }
    });
}

// Function to display a message modal
function showMessageModal(message, type = 'neutral') { // type može biti 'success', 'error' ili 'neutral'
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    const facebookBtn = document.getElementById('facebookShareBtn');
    const icon = document.getElementById('modal-icon'); // Dohvatamo kontejner za ikonicu

    // Prvo resetujemo klase ikonice
    icon.className = ''; 

    // Dodajemo odgovarajuću klasu u zavisnosti od tipa poruke
    if (type === 'success') {
        icon.classList.add('success');
    } else if (type === 'error') {
        icon.classList.add('error');
    }

    modalMessage.innerHTML = message;
    modal.style.display = 'flex';

    // Prikazujemo Facebook dugme samo u slučaju uspeha
    if (type === 'success') {
        facebookBtn.style.display = 'inline-block';
    } else {
        facebookBtn.style.display = 'none';
    }
}

// Function to close the message modal
function closeMessageModal() {
    const modal = document.getElementById('messageModal');
    modal.style.display = 'none'; // Hide modal
}

// Function to check the solution
function checkSolution() {
    let allCorrect = true;
    let filledCells = 0;
    let correctCells = 0;

    for (let r = 0; r < GRID_ROWS; r++) {
        for (let k = 0; k < GRID_COLS; k++) {
            // Only check cells that are meant for letter input
            if (solutionGrid[r][k] !== '#' && solutionGrid[r][k] !== '#IMG#') {
                const inputElement = document.querySelector(`input[data-row="${r}"][data-col="${k}"]`);
                if (inputElement) { // Ensure input element exists
                    filledCells++;
                    const enteredChar = inputElement.value.toUpperCase();
                    const correctChar = solutionGrid[r][k];

                    if (enteredChar === correctChar) {
                        inputElement.style.backgroundColor = '#d4edda'; // Light green for correct
                        correctCells++;
                    } else {
                        inputElement.style.backgroundColor = '#f8d7da'; // Light red for incorrect
                        allCorrect = false; // If at least one is incorrect, the whole crossword is not correct
                    }
                }
            }
        }
    }

   if (allCorrect && filledCells === correctCells) {
        // Proveravamo da li gtag funkcija postoji pre nego što je pozovemo
        if (typeof gtag === 'function') {
            gtag('event', 'crossword_solved');
        } else {
            console.warn('Google Analytics gtag funkcija nije pronađena.');
        }
        
        showMessageModal("Čestitamo! Rešili ste mts ukrštenicu!", 'success');
    } else {
        // Proveravamo da li gtag funkcija postoji pre nego što je pozovemo
        if (typeof gtag === 'function') {
            gtag('event', 'solution_checked_incorrect');
        } else {
            console.warn('Google Analytics gtag funkcija nije pronađena.');
        }

        showMessageModal("Neke reči su netačne. <br>Proverite crveno naznačena polja!", 'error');
    }
}


// Funkcija za prikaz celog rešenja
function showSolution() {
    for (let r = 0; r < GRID_ROWS; r++) { // Koristite GRID_ROWS umesto DIMENZIJA_MATRICE
        for (let k = 0; k < GRID_COLS; k++) { // Koristite GRID_COLS umesto DIMENZIJA_MATRICE
            // Popunite samo input polja (ne crna polja ili polja sa slikama ako ih imate)
            if (solutionGrid[r][k] !== '#' && solutionGrid[r][k] !== '#IMG#') { // Dodata provera za #IMG#
                const inputElement = document.querySelector(`input[data-row="${r}"][data-col="${k}"]`);
                if (inputElement) {
                    inputElement.value = solutionGrid[r][k]; // Postavi tačno slovo
                    inputElement.style.backgroundColor = 'transparent'; // Resetuj boju pozadine na default
                }
            }
        }
    }
    showMessageModal("Prikazano je rešenje mts ukrštenice!");
}



// Function to reset the game
function resetGame() {
    initializeGrids(); // Reset internal grids (inputGrid is cleared)
    populateSolutionGrid(); // Repopulate solutionGrid (words, black cells, image markers)
    generateHtmlGrid(); // Regenerate the HTML grid based on the new state
    generateClues(); // Regenerate clues (if necessary, though they don't change)

    // Reset background color of input cells to default
    const firstInput = document.querySelector('#crossword-grid input');
    if (firstInput) {
        firstInput.focus();
    };
    showMessageModal("Ukrštenica je resetovana!");
}

// Function to show a tooltip with clue information
let currentTooltip = null; // To keep track of the currently displayed tooltip

function showClueTooltip(event) {
    // Remove any existing tooltip
    if (currentTooltip) {
        currentTooltip.remove();
        currentTooltip = null;
    }

    const targetCell = event.target.closest('.grid-cell');
    // Log to console if mouseover event is detected on a cell
    if (targetCell) {
        const row = parseInt(targetCell.dataset.row);
        const col = parseInt(targetCell.dataset.col);
        console.log(`Mouse over cell: (${row}, ${col})`);
    }


    if (!targetCell || targetCell.classList.contains('black') || targetCell.classList.contains('image-cell-placeholder')) {
        console.log("Not a playable cell or is black/image placeholder. Not showing tooltip.");
        return; // Do nothing if it's not a playable cell
    }

    const row = parseInt(targetCell.dataset.row);
    const col = parseInt(targetCell.dataset.col);

    let horizontalStartingClue = null;
    let verticalStartingClue = null;

    // Find if a word starts exactly at this cell
    crosswordWords.forEach(wordData => {
        if (wordData.startRow === row && wordData.startCol === col) {
            if (wordData.orientation === "horizontal") {
                horizontalStartingClue = wordData;
                console.log(`Found horizontal starting clue: ${wordData.clue}`);
            } else { // vertical
                verticalStartingClue = wordData;
                console.log(`Found vertical starting clue: ${wordData.clue}`);
            }
        }
    });

    // If no clues start at this cell, do nothing
    if (!horizontalStartingClue && !verticalStartingClue) {
        console.log("No word starts at this cell. Not showing tooltip.");
        return;
    }

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.classList.add('clue-tooltip');

    let tooltipContent = '';
    if (horizontalStartingClue) {
        tooltipContent += `<div class="clue-item">${horizontalStartingClue.number}. Horizontalno: ${horizontalStartingClue.clue}</div>`;
    }
    if (horizontalStartingClue && verticalStartingClue) {
        tooltipContent += `<div class="clue-separator"></div>`;
    }
    if (verticalStartingClue) {
        tooltipContent += `<div class="clue-item">${verticalStartingClue.number}. Vertikalno: ${verticalStartingClue.clue}</div>`;
    }

    tooltip.innerHTML = tooltipContent;
    document.body.appendChild(tooltip); // Append to body to ensure it's on top

    // Position the tooltip
    const cellRect = targetCell.getBoundingClientRect();
    const gridRect = crosswordGridElement.getBoundingClientRect();

    // Calculate position relative to the grid container
    let tooltipX = cellRect.left - gridRect.left + (cellRect.width / 2);
    let tooltipY = cellRect.top - gridRect.top - tooltip.offsetHeight - 10; // 10px above the cell

    // Adjust if it goes off screen (right side)
    if (tooltipX + tooltip.offsetWidth > gridRect.width) {
        tooltipX = gridRect.width - tooltip.offsetWidth;
    }
    // Adjust if it goes off screen (left side)
    if (tooltipX < 0) {
        tooltipX = 0;
    }
    // Adjust if it goes off screen (top side)
    if (tooltipY < 0) {
        tooltipY = cellRect.top - gridRect.top + cellRect.height + 10; // 10px below the cell
    }


    tooltip.style.left = `${gridRect.left + tooltipX}px`;
    tooltip.style.top = `${gridRect.top + tooltipY}px`;

    // Make it visible with a slight delay for smooth transition
    setTimeout(() => {
        tooltip.classList.add('visible');
    }, 50);

    currentTooltip = tooltip;
    console.log("Tooltip created and attempting to show.");
}

function hideClueTooltip(event) {
    // Log to console when mouseout event is detected
    const targetCell = event.target.closest('.grid-cell');
    if (targetCell) {
        const row = parseInt(targetCell.dataset.row);
        const col = parseInt(targetCell.dataset.col);
        console.log(`Mouse out of cell: (${row}, ${col})`);
    }

    if (currentTooltip) {
        currentTooltip.classList.remove('visible');
        // Remove after transition to allow fade out
        setTimeout(() => {
            if (currentTooltip) { // Check again in case another tooltip was shown/hidden quickly
                currentTooltip.remove();
                currentTooltip = null;
                console.log("Tooltip removed.");
            }
        }, 200); // Match CSS transition duration
    }
}


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    populateSolutionGrid(); // Populate the solution grid with words and black cells
    generateHtmlGrid();    // Generate the HTML grid
    generateClues();      // Generate clues
   
    // Initialize crosswordGridElement here, after it's declared in a higher scope
    // This ensures it's available when generateHtmlGrid and showClueTooltip are called.
    crosswordGridElement = document.getElementById('crossword-grid');

    const checkSolutionBtn = document.getElementById('checkSolutionBtn');
    const resetGameBtn = document.getElementById('resetGameBtn');
    const modalCloseBtn = document.querySelector('#messageModal .modal-close');
    // ... unutar document.addEventListener('DOMContentLoaded', () => { ...
    const showSolutionBtn = document.getElementById('showSolutionBtn'); // Dohvati referencu na novo dugme
     const genericShareBtn = document.getElementById('genericShareBtn');
    const facebookShareBtn = document.getElementById('facebookShareBtn');
// ...



    showSolutionBtn.addEventListener('click', () => {
        console.log("Show Solution button clicked!"); // Dodato za dijagnostiku
        showSolution();
    });


    // Event listener for letter input and navigation
    crosswordGridElement.addEventListener('input', (event) => {
        const target = event.target;
        if (target.tagName === 'INPUT') {
            const row = parseInt(target.dataset.row);
            const col = parseInt(target.dataset.col);
            const enteredChar = target.value.toUpperCase();

            // Update the input grid
            inputGrid[row][col] = enteredChar;

            // Automatic navigation to the next available cell (horizontal then vertical)
            if (target.value.length >= target.maxLength) {
                let nextInputFound = false;
                // Try horizontal
                for (let c = col + 1; c < GRID_COLS; c++) { // Use GRID_COLS
                    // Find next cell that is not black
                    if (solutionGrid[row][c] !== '#' && solutionGrid[row][c] !== '#IMG#') { // Added #IMG# check
                        const nextInput = document.querySelector(`input[data-row="${row}"][data-col="${c}"]`);
                        if (nextInput) {
                            nextInput.focus();
                            nextInputFound = true;
                            break;
                        }
                    }
                }
                // If no more horizontal in current row, try the beginning of the next row
                if (!nextInputFound) {
                    for (let r = row + 1; r < GRID_ROWS; r++) { // Use GRID_ROWS
                        for (let c = 0; c < GRID_COLS; c++) { // Use GRID_COLS
                            // Find next cell that is not black
                            if (solutionGrid[r][c] !== '#' && solutionGrid[r][c] !== '#IMG#') { // Added #IMG# check
                                const nextInput = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
                                if (nextInput) {
                                    nextInput.focus();
                                    nextInputFound = true;
                                    return; // End function after focus
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    // Event listener for arrow keys (for advanced navigation)
    crosswordGridElement.addEventListener('keydown', (event) => {
        const target = event.target;
        if (target.tagName === 'INPUT') {
            const row = parseInt(target.dataset.row);
            const col = parseInt(target.dataset.col);
            let nextRow = row;
            let nextCol = col;

            switch (event.key) {
                case 'ArrowRight':
                    nextCol++;
                    break;
                case 'ArrowLeft':
                    nextCol--;
                    break;
                case 'ArrowDown':
                    nextRow++;
                    break;
                case 'ArrowUp':
                    nextRow--;
                    break;
                default:
                    return; // Do nothing for other keys
            }

            // Prevent default arrow key behavior (page scrolling)
            event.preventDefault();

            // Find the next input cell, skipping black cells
            let nextInput = null;
            while (nextRow >= 0 && nextRow < GRID_ROWS && nextCol >= 0 && nextCol < GRID_COLS) { // Use GRID_ROWS and GRID_COLS
                if (solutionGrid[nextRow][nextCol] !== '#' && solutionGrid[nextRow][nextCol] !== '#IMG#') { // Added #IMG# check
                    nextInput = document.querySelector(`input[data-row="${nextRow}"][data-col="${nextCol}"]`);
                    if (nextInput) {
                        break; // Found an input cell
                    }
                }
                // If not an input cell, or input not found, move to the next logical cell
                if (event.key === 'ArrowRight') nextCol++;
                else if (event.key === 'ArrowLeft') nextCol--;
                else if (event.key === 'ArrowDown') nextRow++;
                else if (event.key === 'ArrowUp') nextRow--;
            }

            if (nextInput) {
                nextInput.focus();
            }
        }
    });

    // Event listeners for showing/hiding clue tooltip on grid cells
    crosswordGridElement.addEventListener('mouseover', showClueTooltip);
    crosswordGridElement.addEventListener('mouseout', hideClueTooltip);


    // Event listener for "Check Solution" button
    checkSolutionBtn.addEventListener('click', checkSolution);

    // Event listener for "Reset Game" button
    resetGameBtn.addEventListener('click', resetGame);

    genericShareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'mts ukrštene reči',
            text: 'Reši i ti mts ukrštenicu!',
            url: window.location.href // Deli link trenutne stranice
        };
         if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Uspešno podeljeno!');
            } catch (err) {
                console.error('Greška pri deljenju:', err);
            }
        } else {
            // Fallback za desktop browsere: kopiraj link u klipbord
            try {
                await navigator.clipboard.writeText(window.location.href);
                showMessageModal("Link je kopiran u klipbord!");
            } catch (err) {
                console.error('Neuspešno kopiranje:', err);
                showMessageModal("Greška pri kopiranju linka.");
            }
        }
    });

     facebookShareBtn.addEventListener('click', () => {
        const pageUrl = window.location.href;
        const shareText = "Ukrštenica je rešena! Probaj i ti!";
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareText)}`;

        // Otvori prozor za deljenje
        window.open(facebookUrl, '_blank', 'width=600,height=400');
    });

    // Event listener for closing the modal
    modalCloseBtn.addEventListener('click', closeMessageModal);
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('messageModal');
        if (event.target === modal) {
            closeMessageModal();
        }
    });
    

});
