// Ensure the Swiper bundle is loaded via a <script> tag in the HTML.
const swiper = new Swiper(".mySwiper", {
	loop: true,
	autoplay: {
		delay: 3000,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});
// Function to show toast message
function showToast(message) {
	var x = document.getElementById("toast");
	x.innerHTML = message; // Jo message dikhana hai
	x.className = "toast show"; // Show class add karo

	// 3 second baad 'show' class hata do
	setTimeout(function () {
		x.className = x.className.replace("show", "");
	}, 3000);
}

// --- 1. SEARCH PLACEHOLDER ANIMATION ---
const inputField = document.getElementById("search-input");
const listItems = [
	"Search for 'Aashirvaad Atta'",
	"Search for 'Amul Milk'",
	"Search for 'Fortune Oil'",
	"Search for 'Maggi Noodles'",
	"Search for 'Fresh Onions'",
	"Search for 'Surf Excel'",
	"Search for 'Tata Salt'",
	"Search for 'Basmati Rice'",
	"Search for 'Cold Drinks'",
	"Search for 'Moong Dal'",
];

let itemIndex = 0;

function swipePlaceholder() {
	if (!inputField) return;
	inputField.style.transition = "all 0.3s ease-in";
	inputField.style.opacity = "0.3";
	inputField.style.transform = "translateY(-2px)";

	setTimeout(() => {
		itemIndex = (itemIndex + 1) % listItems.length;
		inputField.placeholder = listItems[itemIndex];
		inputField.style.transform = "translateY(2px)";
		setTimeout(() => {
			inputField.style.opacity = "1";
			inputField.style.transform = "translateY(0)";
		}, 50);
	}, 300);
}
setInterval(swipePlaceholder, 3000);

// --- 2. PREMIUM LIST MODAL LOGIC ---
// --- 2. PREMIUM BOTTOM SHEET MODAL LOGIC ---

function openListModal() {
	const modal = document.getElementById("listModal");
	const writeSection = document.getElementById("writeSection");
	const cards = document.querySelectorAll(".opt-card");

	if (modal) {
		modal.style.display = "block";
		document.body.style.overflow = "hidden"; // Background scroll stop

		// Modal khulte hi textarea chhupa do aur active class hata do
		if (writeSection) writeSection.style.display = "none";
		cards.forEach((card) => card.classList.remove("active"));
	}
}

function closeListModal() {
	const modal = document.getElementById("listModal");
	if (modal) {
		modal.style.display = "none";
		document.body.style.overflow = "auto"; // Scroll restore
	}
}

// "Write your list" toggle function
function toggleWriteSection() {
	const section = document.getElementById("writeSection");
	const writeCard =
		document.querySelector(".opt-card.active") ||
		document.querySelectorAll(".opt-card")[2];

	if (section.style.display === "none" || section.style.display === "") {
		section.style.display = "block";
		writeCard.classList.add("active");

		// Modal ke andar scroll karne ke liye
		setTimeout(() => {
			section.scrollIntoView({ behavior: "smooth", block: "center" });
		}, 200);
	} else {
		section.style.display = "none";
		writeCard.classList.remove("active");
	}
}

// Overlay click to close
window.onclick = function (event) {
	if (event.target.classList.contains("modal-overlay")) {
		closeListModal();
	}
};

// --- 3. SMART LIST PROCESSING LOGIC ---

function processList() {
	const listArea = document.getElementById("listText");
	let text = listArea.value.toLowerCase().trim();

	if (text === "") {
		alert("Bhai, pehle kuch likho toh sahi! 😂");
		return;
	}

	// Comma ya New line se items alag karo
	let items = text.split(/[,\n]/);
	closeListModal();

	let products = document.querySelectorAll(".product-card");
	let foundCount = 0;

	items.forEach((item) => {
		let cleanItem = item.trim();
		if (cleanItem.length > 2) {
			products.forEach((card) => {
				let productName = card
					.querySelector("h3")
					.innerText.toLowerCase();

				if (productName.includes(cleanItem)) {
					// Premium Highlight Effect
					card.style.border = "2px solid #008282";
					card.style.boxShadow = "0 0 15px rgba(0, 130, 130, 0.3)";
					card.style.transition = "all 0.5s ease";

					card.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
					foundCount++;
				}
			});
		}
	});

	if (foundCount > 0) {
		alert(`Mubarak ho! ${foundCount} items mil gaye! ✅`);
		listArea.value = ""; // Reset after search
	} else {
		alert("Oops! Koi item nahi mila. Naam check karo bhai. ❌");
	}
}

// Toast helper (Optional)
function showToast(msg) {
	console.log("App Toast: " + msg);
}
