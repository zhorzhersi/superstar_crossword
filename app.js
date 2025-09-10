// Grid dimensions 
const GRID_ROWS = 11;
const GRID_COLS = 14;
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
        word: "POSTPEJDTARIFA",
        clue: "Suprotno od pripejd tarife",
        startRow: 0,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 2,
        word: "PUSTOLOVINA",
        clue: "Avantura",
        startRow: 0,
        startCol: 0,
        orientation: "vertical"
    },
    {
        number: 3,
        word: "USISIVAČ",
        clue: "Mali kućni aparat",
        startRow: 1,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 4,
        word: "OSTATI",
        clue: "Ne otići",
        startRow: 0,
        startCol: 1,
        orientation: "vertical"
    },
    {
        number: 5,
        word: "SIRTAKI",
        clue: "Najpoznatiji grčki ples",
        startRow: 0,
        startCol: 2,
        orientation: "vertical"
    },
    {
        number: 6,
        word: "TSI",
        clue: "Turbocharged Stratified Injection (skr.)",
        startRow: 0,
        startCol: 3,
        orientation: "vertical"
    },
    {
        number: 7,
        word: "STRIKAN",
        clue: "Stric odmila",
        startRow: 2,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 8,
        word: "TAT",
        clue: "Grad u Mađarskoj",
        startRow: 3,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 9,
        word: "PIKANTAN",
        clue: "Snažno začinjen",
        startRow: 0,
        startCol: 4,
        orientation: "vertical"
    },
    {
        number: 10,
        word: "EVA",
        clue: "Ime prve žene",
        startRow: 0,
        startCol: 5,
        orientation: "vertical"
    },
    {
        number: 11,
        word: "JAN",
        clue: "Često muško nemačko ime",
        startRow: 0,
        startCol: 6,
        orientation: "vertical"
    },
    {
        number: 12,
        word: "DČ",
        clue: "Dragomir Čumić",
        startRow: 0,
        startCol: 7,
        orientation: "vertical"
    },
    {
        number: 13,
        word: "OTA",
        clue: "Bežični prenospodataka (eng.)",
        startRow: 4,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 14,
        word: "LIK",
        clue: "Crte lica",
        startRow: 5,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 15,
        word: "O",
        clue: "Okruglo slovo",
        startRow: 6,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 16,
        word: "VI",
        clue: "Lična zamenica",
        startRow: 7,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 17,
        word: "T",
        clue: "Tona (skr.)",
        startRow: 0,
        startCol: 8,
        orientation: "vertical"
    },
    {
        number: 18,
        word: "AZIJA",
        clue: "Jedan kontinent",
        startRow: 0,
        startCol: 9,
        orientation: "vertical"
    },
    {
        number: 19,
        word: "RV",
        clue: "Ratno vazduhoplovstvo (skr.)",
        startRow: 0,
        startCol: 10,
        orientation: "vertical"
    },
    {
        number: 20,
        word: "IRVAS",
        clue: "Severni jelen",
        startRow: 0,
        startCol: 11,
        orientation: "vertical"
    },
    {
        number: 21,
        word: "FK",
        clue: "Fudbalski klub (skr.)",
        startRow: 0,
        startCol: 12,
        orientation: "vertical"
    },
    {
        number: 22,
        word: "A",
        clue: "Prvo slovo azbuke",
        startRow: 0,
        startCol: 13,
        orientation: "vertical"
    },
    {
        number: 23,
        word: "IVA",
        clue: "Popularno žensko ime",
        startRow: 8,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 24,
        word: "NASTAVNIK",
        clue: "Predavač u osnovnoj školi",
        startRow: 9,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 25,
        word: "ANALITIKA",
        clue: "Teorija analize",
        startRow: 10,
        startCol: 0,
        orientation: "horizontal"
    },
    {
        number: 26,
        word: "TL",
        clue: "Talijum",
        startRow: 9,
        startCol: 3,
        orientation: "vertical"
    },
    {
        number: 27,
        word: "AI",
        clue: "Veštačka inteligencija (eng)",
        startRow: 9,
        startCol: 4,
        orientation: "vertical"
    },
    {
        number: 28,
        word: "VT",
        clue: "Viša tarifa (skr.)",
        startRow: 9,
        startCol: 5,
        orientation: "vertical"
    },
    {
        number: 29,
        word: "ANA",
        clue: "Naša bivša teniserka Ivanović",
        startRow: 8,
        startCol: 6,
        orientation: "horizontal"
    },
    {
        number: 30,
        word: "[LJ]A",
        clue: "Inicijali jugoslovenske glumice Ljubice Adžović",
        startRow: 7,
        startCol: 6,
        orientation: "horizontal"
    },
    {
        number: 34,
        word: "VČ",
        clue: "Vinston Čerčil",
        startRow: 6,
        startCol: 6,
        orientation: "horizontal"
    },
    {
        number: 31,
        word: "AKA",
        clue: "'Also known as'",
        startRow: 8,
        startCol: 8,
        orientation: "vertical"
    },
    {
        number: 32,
        word: "ASA",
        clue: "Army Security Agency",
        startRow: 8,
        startCol: 2,
        orientation: "vertical"
    },
    {
        number: 33,
        word: "NN",
        clue: "Nepoznata osoba",
        startRow: 7,
        startCol: 3,
        orientation: "horizontal"
    },
    {
        number: 35,
        word: "IVAN",
        clue: "Često muško ime",
        startRow: 7,
        startCol: 1,
        orientation: "vertical"
    },
    {
        number: 36,
        word: "INA",
        clue: "Ines odmila",
        startRow: 6,
        startCol: 2,
        orientation: "horizontal"
    },
    {
        number: 37,
        word: "TROVO",
        clue: "Platforma za strimovanje sadržaja",
        startRow: 5,
        startCol: 4,
        orientation: "horizontal"
    },
    {
        number: 38,
        word: "NANO",
        clue: "Prefiks za milijarditi deo",
        startRow: 4,
        startCol: 4,
        orientation: "horizontal"
    },
    {
        number: 39,
        word: "A",
        clue: "Austrija",
        startRow: 3,
        startCol: 4,
        orientation: "horizontal"
    },
    {
        number: 40,
        word: "AR",
        clue: "Jedinica za merenje površine zemljišta",
        startRow: 4,
        startCol: 5,
        orientation: "vertical"
    },
    {
        number: 41,
        word: "NOV[LJ]ANI",
        clue: "Stanovnici Herceg Novog",
        startRow: 4,
        startCol: 6,
        orientation: "vertical"
    },
    {
        number: 42,
        word: "NAJMA[NJ]I",
        clue: "Superlativ prideva mali",
        startRow: 3,
        startCol: 7,
        orientation: "horizontal"
    },
    {
        number: 43,
        word: "NOVČANIK",
        clue: "Buđelar",
        startRow: 3,
        startCol: 7,
        orientation: "vertical"
    },
    {
        number: 44,
        word: "O",
        clue: "Obim",
        startRow: 5,
        startCol: 8,
        orientation: "vertical"
    },
    {
        number: 45,
        word: "A",
        clue: "Najčešće slovo",
        startRow: 4,
        startCol: 9,
        orientation: "horizontal"
    },
    {
        number: 46,
        word: "TI",
        clue: "Lična zamenica",
        startRow: 2,
        startCol: 8,
        orientation: "horizontal"
    },
    {
        number: 47,
        word: "ZVRK",
        clue: "Naziv nove mts tarife za najmlađe",
        startRow: 1,
        startCol: 9,
        orientation: "horizontal"
    },
    {
        number: 48,
        word: "V",
        clue: "3. slovo azbuke",
        startRow: 2,
        startCol: 11,
        orientation: "horizontal"
    },
    {
        number: 49,
        word: "M",
        clue: "Metar (skr.)",
        startRow: 3,
        startCol: 10,
        orientation: "vertical"
    },
    {
        number: 50,
        word: "SAT",
        clue: "Može biti zidni ili peščani",
        startRow: 4,
        startCol: 11,
        orientation: "horizontal"
    },
    {
        number: 51,
        word: "[NJ]A",
        clue: "17. i 1. slovo azbuke",
        startRow: 3,
        startCol: 12,
        orientation: "vertical"
    },
    
    {
        number: 52,
        word: "BIT",
        clue: "Naziv nove mts tarife za mlade",
        startRow: 2,
        startCol: 13,
        orientation: "vertical"
    },
   

    
];

// New array to define images in the grid
const gridImages = [
    {
        id: "img",
        src: "./src/bit.jpg", // Placeholder image for MTS Logo
        alt: "BIT Tarifa",
        startRow: 5, // Top-left row of the image
        startCol: 9, // Top-left column of the image
        rowSpan: 6, // Image spans 7 rows
        colSpan: 5  // Image spans 6 columns
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
        // Umesto 'true', sada šaljemo string 'success'
        showMessageModal("Čestitamo! Rešili ste mts ukrštenicu!", 'success');
    } else {
        // Ovde šaljemo string 'error'
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
            title: 'Mts ukrštene reči',
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
