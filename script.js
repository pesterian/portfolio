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
	let gagAutoCloseTimer = null;
	const gagAutoCloseDelay = 3000;

	const closeGagTooltip = () => {
		if (gagAutoCloseTimer !== null) {
			window.clearTimeout(gagAutoCloseTimer);
			gagAutoCloseTimer = null;
		}

		gagTooltip.classList.remove("is-visible");
		siteGagLabel.setAttribute("aria-expanded", "false");
	};

	const toggleGagTooltip = () => {
		const isVisible = gagTooltip.classList.toggle("is-visible");
		siteGagLabel.setAttribute("aria-expanded", String(isVisible));

		if (gagAutoCloseTimer !== null) {
			window.clearTimeout(gagAutoCloseTimer);
			gagAutoCloseTimer = null;
		}

		if (isVisible) {
			gagAutoCloseTimer = window.setTimeout(closeGagTooltip, gagAutoCloseDelay);
		}
	};

	siteGagLabel.addEventListener("click", (event) => {
		event.stopPropagation();
		toggleGagTooltip();
	});

	siteGagLabel.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			toggleGagTooltip();
		}
	});

	document.addEventListener("click", (event) => {
		if (!siteGagLabel.contains(event.target)) {
			closeGagTooltip();
		}
	});

	window.addEventListener("scroll", closeGagTooltip, { passive: true });
}