// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {

    const carouselInner = document.querySelector("#skillsCarousel .carousel-inner")

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {

            // on parcourt les compétences par groupe de 3
            for (let i = 0; i < data.length; i += 3) {
                const slide  = document.createElement("div")
                slide.classList.add("carousel-item")

                if (i === 0) {
                    slide.classList.add("active")
                }

                let row = document.createElement("div")
                row.classList.add("row")

                // ajout max 3 compétences par slide
                for (let j = i; j < i + 3 && j < data.length; j++) {
                    const item = data[j]
                    const card = document.createElement("div")
                    card.classList.add("col-lg-4", "mt-4")
                    card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="logo ${item.title}" />
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                            <div class="text-center mt-3">
                                <span class="skill-level ${item.level.toLowerCase()}">${item.level}</span>
                            </div>
                        </div>
                    </div>
                `;
                row.appendChild(card);
                }
                slide.appendChild(row)

                carouselInner.appendChild(slide)
            }
        });
}
// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `

                    <div class="portfolio-card card h-100">

                        <img 
                            class="portfolio-image"
                            src="images/${item.image}"
                            alt="Projet ${item.title}"
                            style="width:100%; height:280px; object-fit: contain"
                        >

                        <div class="portfolio-overlay">
                        
                            <h3 class="card-title">${item.title}</h3>

                            <p class="card-category"><em>${item.category}</em></p>

                            <p class="card-text">${item.text}</p>

                            <a href="${item.link}" class="btn btn-success rounded-pill shadow" target="_blank" >Lien</a>

                        </div>

                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
