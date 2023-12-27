import type { APIContext, GetStaticPaths } from "astro";
import { getEntryBySlug } from "astro:content";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import { siteConfig } from "@/site-config";
import { getAllPosts, getFormattedDate } from "@/utils";

import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";

const ogOptions: SatoriOptions = {
	width: 1200,
	height: 630,
	// debug: true,
	fonts: [
		{
			name: "Roboto Mono",
			data: Buffer.from(RobotoMono),
			weight: 400,
			style: "normal",
		},
		{
			name: "Roboto Mono",
			data: Buffer.from(RobotoMonoBold),
			weight: 700,
			style: "normal",
		},
	],
};

const markup = (title: string, pubDate: string) =>
	html`<div tw="flex flex-col w-full h-full bg-[#171212] text-[#ededed]">
		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<p tw="text-2xl mb-6">${pubDate}</p>
			<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
		</div>
		<div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
			<div tw="flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128">
					<linearGradient
						id="notoManAstronaut0"
						x1="63.75"
						x2="63.75"
						y1="4.379"
						y2="35.655"
						gradientTransform="matrix(1 0 0 -1 0 128)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" stop-color="#B3B3B3" />
						<stop offset=".033" stop-color="#B7B7B7" />
						<stop offset=".374" stop-color="#D9D9D9" />
						<stop offset=".559" stop-color="#E6E6E6" />
					</linearGradient>
					<path
						fill="url(#notoManAstronaut0)"
						d="M64.28 92.23h-.13c-25.82.04-52.19 9.31-52.19 31.37v.37h103.58v-.37c0-20.79-25.33-31.37-51.26-31.37"
					/>
					<path
						fill="#A6A6A6"
						d="M89 123.97v-8.7c0-2.19-1.79-3.99-3.99-3.99H44.57c-2.19 0-3.99 1.79-3.99 3.99v8.7z"
					/>
					<path
						fill="#757575"
						d="M116.04 123.97v-.35c0-5.12-2.25-8.34-3.4-11.25l-8.06 2.81l3.29 8.8h8.17zm-95.66 0c.19-1.03.3-2.08.3-3.16c0-4.02-1.62-7.73-4.43-10.77c-2.73 3.6-4.2 7.67-4.2 12.22v1.71z"
					/>
					<linearGradient
						id="notoManAstronaut1"
						x1="63.858"
						x2="63.858"
						y1="36.135"
						y2="18.107"
						gradientTransform="matrix(1 0 0 -1 0 128)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset=".004" stop-color="#E6E6E6" />
						<stop offset=".333" stop-color="#D9D9D9" />
						<stop offset=".941" stop-color="#B7B7B7" />
						<stop offset="1" stop-color="#B3B3B3" />
					</linearGradient>
					<path
						fill="url(#notoManAstronaut1)"
						d="M97.33 102.53c-11.44 4.91-23.94 7.24-36.38 6.81a84.918 84.918 0 0 1-18.15-2.61c-3.09-.79-6.14-1.76-9.12-2.89c-2.67-1.02-5.37-2.03-7.34-4.2c-1.75-1.93-2.85-4.62-2.26-7.24c.59-2.6 2.58-4.82 5.02-5.83c2.79-1.16 5.77-.89 8.5.24c2.8 1.17 5.66 2.17 8.58 2.96c11.9 3.23 24.63 3.12 36.48-.3c1.69-.49 3.36-1.04 5.01-1.66c1.63-.61 3.21-1.45 4.92-1.8c2.92-.6 6.24.03 8.51 2.05c2.3 2.05 3.34 5.28 2.34 8.23c-.98 2.86-3.39 5.07-6.11 6.24"
					/>
					<ellipse cx="63.88" cy="52.98" fill="#4C4C4C" rx="49.17" ry="48.69" />
					<path
						fill="#212121"
						d="M110.32 53.04a45.432 45.432 0 0 1-9.11 27.24c-.59.8-1.21 1.57-1.85 2.32a46.65 46.65 0 0 1-8.49 7.75a46.16 46.16 0 0 1-16.08 7.28c-.61.16-1.22.29-1.84.41a47.105 47.105 0 0 1-18.17.01c-.66-.13-1.31-.27-1.95-.43a46.345 46.345 0 0 1-16.53-7.7c-2.99-2.18-5.7-4.71-8.06-7.52c-.55-.65-1.07-1.3-1.58-1.98v-.01c-.35-.45-.69-.91-1.01-1.38c-5.19-7.43-8.23-16.44-8.21-26.13c.02-11.97 4.68-22.88 12.29-31.05C38.25 12.72 50.44 7 63.95 7.02c14.58.02 27.6 6.72 36.1 17.17c6.44 7.9 10.29 17.94 10.27 28.85"
					/>
					<path
						fill="#E59600"
						d="M88.93 54.03H38.57c-5.43 0-9.87 4.73-9.87 10.52s4.44 10.52 9.87 10.52h50.36c5.43 0 9.87-4.73 9.87-10.52s-4.44-10.52-9.87-10.52"
					/>
					<path
						fill="#FFCA28"
						d="M63.75 17.76c-16.04 0-30.89 17.15-30.89 41.83c0 24.55 15.3 36.68 30.89 36.68s30.89-12.14 30.89-36.68c0-24.68-14.85-41.83-30.89-41.83"
					/>
					<g fill="#404040">
						<ellipse cx="48.6" cy="61.75" rx="4.54" ry="4.7" />
						<ellipse cx="78.9" cy="61.75" rx="4.54" ry="4.7" />
					</g>
					<path
						fill="#795548"
						d="M71.51 77.72c-2.94 1.75-12.56 1.75-15.49 0c-1.69-1-3.41.53-2.71 2.06c.69 1.51 5.94 5 10.48 5s9.72-3.49 10.41-5c.69-1.53-1.01-3.06-2.69-2.06"
					/>
					<path
						fill="#E59600"
						d="M67.31 70.27c-.1-.04-.2-.06-.3-.08h-6.52c-.1.01-.2.04-.3.08c-.59.24-.92.85-.64 1.5s1.58 2.48 4.19 2.48c2.62 0 3.91-1.83 4.19-2.48c.29-.65-.03-1.26-.62-1.5"
					/>
					<path
						fill="#543930"
						d="M63.79 11.15h-.04c-42.23.22-33.58 48.46-33.58 48.46s1.89 4.97 2.76 7.17c.12.32.58.28.66-.05c.9-4.03 4.15-18.33 5.78-22.68c.96-2.56 3.62-4.05 6.31-3.56c4.14.75 10.73 1.68 18 1.68h.16c7.27 0 13.86-.93 18-1.68c2.69-.49 5.35 1 6.32 3.56c1.63 4.33 4.85 18.55 5.76 22.64c.07.33.54.37.66.05l2.77-7.12c.02-.01 8.67-48.24-33.56-48.47"
					/>
					<radialGradient
						id="notoManAstronaut2"
						cx="63.775"
						cy="76.82"
						r="35.403"
						gradientTransform="matrix(1 0 0 -1.1282 0 137.847)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset=".794" stop-color="#6D4C41" stop-opacity="0" />
						<stop offset="1" stop-color="#6D4C41" />
					</radialGradient>
					<path
						fill="url(#notoManAstronaut2)"
						d="M97.37 59.61s8.65-48.23-33.58-48.46h-.03c-.66 0-1.3.02-1.93.05c-1.26.05-2.47.15-3.64.29h-.04l-.24.03C22.36 16 30.18 59.61 30.18 59.61l2.77 7.13c.12.32.58.28.65-.05c.91-4.08 4.15-18.32 5.78-22.65c.96-2.56 3.62-4.05 6.31-3.56c4.14.75 10.73 1.68 18 1.68h.16c7.27 0 13.86-.93 18-1.68c2.69-.49 5.35 1 6.32 3.56c1.64 4.35 4.88 18.68 5.78 22.69c.07.33.53.36.65.05c.86-2.18 2.77-7.17 2.77-7.17"
					/>
					<radialGradient
						id="notoManAstronaut3"
						cx="64.648"
						cy="120.469"
						r="26.001"
						gradientTransform="matrix(1 0 0 -1 0 128)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset=".005" stop-color="#F2F2F2" />
						<stop offset=".422" stop-color="#E5E5E5" />
						<stop offset="1" stop-color="#CCC" />
					</radialGradient>
					<path
						fill="url(#notoManAstronaut3)"
						d="M113.06 53.21c0 .24-.01.48-.01.73a54.424 54.424 0 0 0-13.77-18.15a53.93 53.93 0 0 0-16.45-9.74a53.872 53.872 0 0 0-18.94-3.41c-6.85 0-13.39 1.27-19.42 3.59c-6 2.29-11.49 5.64-16.25 9.79a54.641 54.641 0 0 0-13.49 17.92c0-.25-.02-.49-.02-.73c-.42-26.8 21.72-49.18 49.18-49.18c27.16 0 49.17 22.02 49.17 49.18"
					/>
					<path
						fill="#6D4C41"
						d="M41.62 54.29c2.76-3.91 9.03-4.27 12.62-1.37c.57.46 1.33 1.11 1.55 1.83c.37 1.17-.76 2.08-1.85 1.81c-.7-.18-1.35-.55-2.05-.77c-1.26-.4-2.18-.51-3.31-.51c-1.68-.01-2.76.2-4.35.85c-.66.27-1.19.69-1.94.38c-.86-.35-1.19-1.45-.67-2.22m42.53 2.22c-.27-.12-.53-.27-.8-.38c-1.64-.69-2.58-.85-4.35-.85c-1.57.01-2.51.22-3.73.64c-.75.26-1.7.91-2.53.65c-1.21-.37-1.18-1.7-.51-2.54c.79-1 1.88-1.76 3.04-2.26c2.68-1.16 5.95-1 8.47.51c.83.49 1.72 1.17 2.22 2.01c.71 1.21-.39 2.8-1.81 2.22"
					/>
				</svg>

				<p tw="ml-3 font-semibold">${siteConfig.title}</p>
			</div>
			<p>by ${siteConfig.author}</p>
		</div>
	</div>`;

export async function GET({ params: { slug } }: APIContext) {
	const post = await getEntryBySlug("post", slug!);
	const title = post?.data.title ?? siteConfig.title;
	const postDate = getFormattedDate(
		post?.data.updatedDate ?? post?.data.publishDate ?? Date.now(),
		{
			weekday: "long",
			month: "long",
		},
	);
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getAllPosts();
	return posts.filter(({ data }) => !data.ogImage).map(({ slug }) => ({ params: { slug } }));
};
