/* =====================================================================
   script.js  —  how the website BEHAVES.

   The big idea (the whole file in 4 lines):
     1. Read the list of places from data.js
     2. Keep track of what the visitor picked (city, type, search text)
     3. Filter the list to match, then draw a card for each place
     4. When a card's button is clicked, draw that place's menu in a pop-up

   Tip: open your browser's DevTools (F12) > Console tab. Any typo you make
   shows up there in red with a line number. Your best debugging friend.
   ===================================================================== */


/* ---------- 1. SETTINGS ---------- */

// Turns the "type" value in data.js into text people read.
// If you add a new type (like "bakery"), add it here too.
const TYPE_LABELS = {
  cafe: "Cafe",
  restaurant: "Restaurant"
};


/* ---------- 2. STATE ----------
   "State" = what the visitor has currently chosen.
   Whenever it changes, we call render() to redraw the page. */
const state = {
  city: "all",     // "all", "Quezon City", or "Manila"
  type: "all",     // "all", "cafe", or "restaurant"
  search: ""       // whatever is typed in the search box
};


/* ---------- 3. GRAB ELEMENTS FROM index.html ----------
   getElementById finds an element by its id="" so we can control it. */
const placeList   = document.getElementById("place-list");
const resultCount = document.getElementById("result-count");
const emptyMsg    = document.getElementById("empty");
const searchBox   = document.getElementById("search");
const dialog      = document.getElementById("menu-dialog");
const menuTitle   = document.getElementById("menu-title");
const menuContent = document.getElementById("menu-content");
const closeBtn    = document.getElementById("close-menu");


/* ---------- 4. HELPER FUNCTIONS ---------- */

// Makes text safe to put inside HTML. If a menu item ever contains
// a "<" or "&", this stops it from breaking the page.
function escapeHTML(text) {
  const replacements = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(text).replace(/[&<>"']/g, (char) => replacements[char]);
}

// 150 -> "₱150".  1250 -> "₱1,250".
// If you type a price as text (like "150-200"), it's shown as-is with a ₱.
function formatPrice(price) {
  if (typeof price === "number") {
    return "₱" + price.toLocaleString("en-PH");
  }
  return "₱" + price;
}

// Does this place match what the visitor typed in the search box?
// We search the name, area, description AND every dish name,
// so typing "matcha" or "sisig" finds the right places.
function matchesSearch(place, searchText) {
  if (searchText === "") return true;   // empty search = match everything

  const dishNames = place.menu.flatMap((cat) => [cat.category, ...cat.items.map((item) => item.name)]);

  const searchable = [place.name, place.area, place.city, place.description, ...dishNames]
    .join(" ")
    .toLowerCase();

  return searchable.includes(searchText.toLowerCase());
}

// Returns only the places that pass ALL three checks: city, type, search.
function getFilteredPlaces() {
  return PLACES.filter((place) => {
    const cityOK   = state.city === "all" || place.city === state.city;
    const typeOK   = state.type === "all" || place.type === state.type;
    const searchOK = matchesSearch(place, state.search.trim());
    return cityOK && typeOK && searchOK;
  });
}


/* ---------- 5. DRAWING THE CARDS ---------- */

// Builds the HTML for ONE card. `${...}` drops a value into the text.
function buildCard(place) {
  const typeLabel = TYPE_LABELS[place.type] || place.type;
  const sampleTag = place.isSample ? '<span class="tag sample">Sample</span>' : "";

  return `
    <article class="card" data-type="${escapeHTML(place.type)}">
      <div class="card-body">
        <div class="card-tags">
          <span class="tag">${escapeHTML(typeLabel)}</span>
          ${sampleTag}
        </div>
        <h3>${escapeHTML(place.name)}</h3>
        <p class="card-area">${escapeHTML(place.area)}, ${escapeHTML(place.city)}</p>
        <p class="card-desc">${escapeHTML(place.description)}</p>
        <button class="btn" data-place-id="${escapeHTML(place.id)}">View menu</button>
      </div>
    </article>
  `;
}

// Redraws the whole list. Called every time a filter or the search changes.
function render() {
  const places = getFilteredPlaces();

  // .map turns each place into card HTML; .join glues them into one string
  placeList.innerHTML = places.map(buildCard).join("");

  // "1 place" vs "3 places"
  resultCount.textContent = places.length + (places.length === 1 ? " place" : " places");

  // Show the "nothing found" message only when the list is empty
  emptyMsg.hidden = places.length > 0;
}


/* ---------- 6. THE MENU POP-UP ---------- */

function openMenu(placeId) {
  const place = PLACES.find((p) => p.id === placeId);
  if (!place) return;   // safety: unknown id, do nothing

  menuTitle.textContent = place.name;

  // Build the categories and dishes
  const categoriesHTML = place.menu.map((cat) => {
    const itemsHTML = cat.items.map((item) => `
      <li>
        <div class="item-row">
          <span class="item-name">${escapeHTML(item.name)}</span>
          <span class="item-dots" aria-hidden="true"></span>
          <span class="item-price">${escapeHTML(formatPrice(item.price))}</span>
        </div>
        ${item.note ? `<p class="item-note">${escapeHTML(item.note)}</p>` : ""}
      </li>
    `).join("");

    return `
      <h3 class="menu-category">${escapeHTML(cat.category)}</h3>
      <ul class="menu-items">${itemsHTML}</ul>
    `;
  }).join("");

  menuContent.innerHTML = `
    <div class="menu-meta">
      <p>${escapeHTML(place.area)}, ${escapeHTML(place.city)}</p>
      <p>Open ${escapeHTML(place.hours)}</p>
      <p>Prices last checked: ${escapeHTML(place.updated)}</p>
    </div>
    ${categoriesHTML}
  `;

  document.body.classList.add("no-scroll");

  // showModal() is the built-in way to open a <dialog> as a pop-up.
  // The fallback is for very old browsers that don't support it.
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }

  dialog.scrollTop = 0;   // always start at the top of the menu
}

function closeMenu() {
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
  document.body.classList.remove("no-scroll");
}


/* ---------- 7. LISTENING FOR CLICKS AND TYPING ----------
   "Event listeners" wait for the visitor to do something,
   then run our function. */

// Click on a card's "View menu" button.
// We listen on the whole list (not each button) because the cards get
// redrawn all the time. This trick is called "event delegation".
placeList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-place-id]");
  if (button) openMenu(button.dataset.placeId);
});

// Click on a filter chip (city or type)
document.querySelector(".filters").addEventListener("click", (event) => {
  const chip = event.target.closest(".chip");
  if (!chip) return;

  const filterName = chip.dataset.filter;   // "city" or "type"
  const value      = chip.dataset.value;    // e.g. "Manila"

  state[filterName] = value;

  // Highlight only the chip we clicked, within its own group
  chip.parentElement.querySelectorAll(".chip").forEach((other) => {
    const isSelected = other === chip;
    other.classList.toggle("is-active", isSelected);
    other.setAttribute("aria-pressed", String(isSelected));
  });

  render();
});

// Typing in the search box: "input" fires on every keystroke
searchBox.addEventListener("input", () => {
  state.search = searchBox.value;
  render();
});

// Close button
closeBtn.addEventListener("click", closeMenu);

// Clicking the dark area outside the pop-up closes it too
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeMenu();
});

// Pressing Esc closes a <dialog> automatically; we just tidy up after it
dialog.addEventListener("close", () => {
  document.body.classList.remove("no-scroll");
});


/* ---------- 8. START ----------
   Draw the page for the first time. */
render();


/* =====================================================================
   IDEAS TO PLAY WITH (try them one at a time!)

   Easy:
   - Change the colors in style.css (the :root block).
   - Add a real place to data.js.
   - Change the site name in index.html.

   Medium:
   - Add a "bakery" type: add a chip in index.html, an entry in TYPE_LABELS,
     and a color in style.css (.card[data-type="bakery"]).
   - Add an "area" filter (Maginhawa, Intramuros...) like the city chips.
   - Sort places A to Z inside getFilteredPlaces() using .sort().

   Later (needs a backend, see README.md):
   - Accounts + "My coffee log" with ratings and notes per drink.
     The item objects in data.js already have names you can attach reviews to.
   ===================================================================== */
