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
