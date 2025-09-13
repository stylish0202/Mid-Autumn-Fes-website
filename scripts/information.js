// ---------------------------------------------------------------------------
// Variables
// ---------------------------------------------------------------------------
const cultureData = {
  china: {
    title: "China",
    description:
      "The birthplace of the Mid-Autumn Festival, where families gather under the full moon to share mooncakes and honor Chang'e, the Moon Goddess.",
    facts: [
      "The festival dates back over 3,000 years to the Shang Dynasty.",
      "Mooncakes often contain salted egg yolks to symbolize the full moon.",
      "The legend of Hou Yi and Chang'e is central to Chinese celebrations.",
    ],
    image: "../images/culture-china-min.jpg",
    alt: "image of china celebrating mid-autumn festival",
  },
  vietnam: {
    title: "Vietnam",
    description:
      "Known as Tết Trung Thu, Vietnam celebrates with lion dances, paper lanterns, and a strong focus on children's joy and well-being.",
    facts: [
      "Children parade in the streets with star-shaped lanterns.",
      "Mooncakes include both sweet and savory varieties like mung bean and meat.",
      "The festival is considered a 'Children's Festival' in Vietnam.",
    ],
    image: "../images/culture-vietnam2-min.jpg",
    alt: "image of vietnamese celebrating mid-autumn festival",
  },
  singapore: {
    title: "Singapore",
    description:
      "A multicultural celebration with vibrant lantern displays, mooncake fairs, and events blending Chinese tradition with modern city life.",
    facts: [
      "Gardens by the Bay hosts stunning lantern exhibitions.",
      "Mooncakes come in diverse flavors, from durian to matcha.",
      "The Chinatown Mid-Autumn Festival draws thousands of visitors annually.",
    ],
    image: "../images/culture-singapore.avif",
    alt: "image of singaporean celebrating mid-autumn festival",
  },
  hongkong: {
    title: "Hong Kong",
    description:
      "A dazzling spectacle of lantern carnivals and fire dragon dances, blending folklore with festive modernity.",
    facts: [
      "The Tai Hang Fire Dragon Dance uses incense-covered dragon structures.",
      "Victoria Park hosts massive lantern displays and night markets.",
      "Families gather to admire the full moon from city rooftops and parks.",
    ],
    image: "../images/culture-hongkong-min.jpg",
    alt: "image of hongkong celebrating mid-autumn festival",
  },
  japan: {
    title: "Japan",
    description:
      "Known as Tsukimi (Moon Viewing), Japan's version focuses on serene moon appreciation, poetry, and offerings of rice dumplings called tsukimi dango.",
    facts: [
      "Susuki (pampas grass) is displayed as an offering to the moon.",
      "Tsukimi is often celebrated with minimalism and reflection.",
      "Seasonal foods like taro and chestnuts are part of the offerings.",
    ],
    image: "../images/culture-japan-min.jpg",
    alt: "image of japan celebrating mid-autumn festival",
  },
};

// ---------------------------------------------------------------------------
// Img Attribution
// ---------------------------------------------------------------------------
// img attr for china:
// Photo by <a href="https://unsplash.com/@yiranding?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Yiran Ding</a> on <a href="https://unsplash.com/photos/people-walking-between-establishments-with-lanterns-above-FXzdsbhH5Dw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

// img attr for vietnam:
// Photo by <a href="https://unsplash.com/@kslupski?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Chris Slupski</a> on <a href="https://unsplash.com/photos/people-walking-between-food-stalls-under-chinese-lanterns-tCM6cQjIQ7Q?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

// img attr for singapore:
// https://www.monsterdaytours.com/post/lights-lanterns-and-joy-mid-autumn-festival-singapore-2023 by honeycomber

// img attr for hongkong:
// https://www.discoverhongkong.com/eng/explore/culture/mid-autumn-festival-traditions-festivities-and-delicacies.html

// img attr for japan:
// Photo by <a href="https://unsplash.com/@phonghai649?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Nguyen TP Hai</a> on <a href="https://unsplash.com/photos/a-person-standing-in-front-of-a-wall-of-lights-2yLp1uPIfjQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>






// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

// Build the culture cards and connect it to the modal
function showCultureGrid() {
  const grid = document.getElementById("cultureGrid");
  if (!grid) return;

  let html = "";
  for (const key in cultureData) {
    const d = cultureData[key];
    const img = d.image;
    const alt = d.alt;
    const desc = d.description;

    html += `
      <div class="col">
        <div class="card h-100 text-dark card-for-modal" data-key="${key}">
          <img src="${img}" alt="${alt}" class="card-img-top">
          <div class="card-body d-flex flex-column">
            <h3 class="h5 card-title mb-1">${d.title}</h3>
            <p class="card-text small flex-grow-1">${desc}</p>
            <button class="btn btn-warning w-100 mt-2" data-key="${key}">Learn more</button>
          </div>
        </div>
      </div>`;
  }
  grid.innerHTML = html;

  // One click listener for the whole grid (event delegation)
  grid.addEventListener("click", function (e) {
    const cardOrBtn = e.target.closest("[data-key]");
    if (!cardOrBtn) return;

    const key = cardOrBtn.getAttribute("data-key");
    const data = cultureData[key];
    if (!data) return;

    // Fill the modal
    document.getElementById("cultureTitle").textContent = data.title;

    const imgEl = document.getElementById("cultureImage");
    imgEl.src = data.image;
    imgEl.alt = data.alt;

    const descEl = document.getElementById("cultureDescriptionModal");
    if (descEl) descEl.textContent = data.description; // modal-specific description

    document.getElementById("cultureFacts").innerHTML = data.facts
      .map((f) => `<li>${f}</li>`)
      .join("");

    // Open it
    const modal = new bootstrap.Modal(document.getElementById("cultureModal"));
    modal.show();
  });
}

// Run once when the page is ready
document.addEventListener("DOMContentLoaded", showCultureGrid);
