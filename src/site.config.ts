import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "Ichsan Maulana",
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: "Ichsanspace",
	// Meta property used as the default description meta property
	description: "Personal Blog of Ichsan Maulana",
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: "id",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "id",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "id",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	webmentions: {
		link: "",
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string; targetBlank: boolean }> = [
	{
		title: "Halaman Utama",
		path: "/",
	},
	{
		title: "Tulisan",
		path: "/posts/",
	},
	{
		title: "Tentang Saya",
		path: "https://www.ichsanmaulana.com/about",
		targetBlank: true,
	},
];
