const topNav = document.querySelector(".top-nav");

if (topNav) {
	let lastScrollY = window.scrollY;
	const threshold = 8;
	const revealOffset = 80;

	window.addEventListener(
		"scroll",
		() => {
			const currentScrollY = window.scrollY;
			const scrollDelta = currentScrollY - lastScrollY;

			if (Math.abs(scrollDelta) < threshold) {
				return;
			}

			if (scrollDelta > 0 && currentScrollY > revealOffset) {
				topNav.classList.add("top-nav-hidden");
			} else {
				topNav.classList.remove("top-nav-hidden");
			}

			lastScrollY = Math.max(currentScrollY, 0);
		},
		{ passive: true }
	);
}

const siteGagLabel = document.querySelector(".site-gag");
const gagTooltip = document.querySelector(".gag-tooltip");

if (siteGagLabel && gagTooltip) {
	let gagTimer = null;

	siteGagLabel.addEventListener("mouseenter", () => {
		gagTimer = window.setTimeout(() => {
			gagTooltip.classList.add("is-visible");
		}, 1000);
	});

	siteGagLabel.addEventListener("mouseleave", () => {
		if (gagTimer !== null) {
			window.clearTimeout(gagTimer);
			gagTimer = null;
		}

		gagTooltip.classList.remove("is-visible");
	});
}
