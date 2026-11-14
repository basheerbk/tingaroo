# Tingaroo website status

Last checked: November 14, 2026

**Summary:** The live site at [tingaroo.com](https://tingaroo.com) is still the old single static page. This repo now holds an Astro version of the site (home, About, Privacy, and a lesson template) that has not been committed or deployed yet. The email signup forms are placeholders and do not collect addresses.

## Stack

- [Astro](https://astro.build) 7, static output only. No client-side framework and no CSS framework.
- Pages ship no JavaScript except the signup-form script, which loads only on pages with a form.
- Lessons are Markdown files in a content collection, rendered by one template.
- `@astrojs/sitemap` generates the sitemap.
- Hosted on Vercel and deployed from GitHub.

## Run it locally

You need Node.js 22.23.4 or newer, because Astro 7 refuses to run on older versions. The current LTS (Node 24) works. Check your version with `node --version`.

| Command | What it does |
|---|---|
| `npm install` | Installs dependencies. Run it once, and again after `package.json` changes. |
| `npm run dev` | Starts a local server at http://localhost:4321 that reloads as you edit. Draft lessons are visible here. |
| `npm run build` | Builds the site into `dist/`. Takes about 10 seconds. Draft lessons are left out. |
| `npm run preview` | Serves the built `dist/` folder, to check the build before you push. |

## Project layout

| Path | Purpose |
|---|---|
| `src/layouts/BaseLayout.astro` | Page shell: `<head>` (title, description, canonical URL, Open Graph tags), skip link, header, footer |
| `src/components/Header.astro` | Logo and main navigation. Links are root-relative, like `/#teachers`. |
| `src/components/Footer.astro` | About and Privacy links, the Scratch / MIT / TurboWarp disclaimer, "Last updated" date, copyright |
| `src/components/SignupForm.astro` | The email form, used twice on the home page and once on each lesson |
| `src/components/Logo.astro` | The Tingaroo mark |
| `src/scripts/signup.js` | Form validation and the email provider settings (`SIGNUP` at the top) |
| `src/styles/global.css` | All styles. Colors, fonts and spacing are variables at the top. |
| `src/consts.ts` | Site-wide "Last updated" date, donation URL, grade band names, date formatting |
| `src/pages/index.astro` | Home page |
| `src/pages/about.astro` | About page (`/about/`) |
| `src/pages/privacy.astro` | Privacy policy (`/privacy/`) |
| `src/pages/lessons/[...slug].astro` | The lesson template |
| `src/content.config.ts` | Lesson frontmatter schema |
| `src/content/lessons/` | One Markdown file per lesson |
| `public/` | Files served as they are: `favicon.svg`, `robots.txt` |
| `vercel.json` | Tells Vercel to build the site with Astro (see below) |

## Add a lesson

1. Copy `src/content/lessons/example-unit/01-example-lesson.md` into a folder for its unit, for example `src/content/lessons/physics-games/01-slingshot.md`. The URL becomes `/lessons/physics-games/01-slingshot/`.
2. Fill in every frontmatter field and replace every `[BRACKETED]` placeholder. The build fails if a required field is missing.
3. Write the step-by-step tutorial as the Markdown body. Start each step with `###`.
4. Put download files in `public/downloads/` and set `sb3File` and `pdfFile`.
5. Leave `draft: true` while you write. Run `npm run dev` to see the lesson.
6. Set `draft: false` (or delete the line) to publish it. The lesson then appears in the build and the sitemap.

The template finds the "Next lesson" link automatically: it is the lesson in the same `unit` with the next `lessonNumber`.

## How deploys work

| Item | Setting |
|---|---|
| Code | [github.com/basheerbk/tingaroo](https://github.com/basheerbk/tingaroo), branch `main` |
| Host | Vercel project `tingaroo` (account `basheers-projects-bacbc814`) |
| Production deploys | Every push to `main` |
| Preview deploys | Every other branch and pull request gets its own preview link |
| Preview protection | Preview links require a Vercel login. The custom domain is public. |
| Build | `npm run build`, output in `dist/`, Node 26.x (set in the Vercel project) |

The Vercel project was created when the site was a plain HTML file, so its framework setting is "Other" with no build command. Without `vercel.json`, Vercel would publish the repo files without building them, and the site would break. `vercel.json` sets the framework to Astro, the build command to `npm run build`, and the output folder to `dist`.

After the first push of the Astro version, open the deployment in the Vercel dashboard and confirm that the build ran and that https://tingaroo.com, /about/ and /privacy/ load.

## Live addresses

| Address | Result |
|---|---|
| https://tingaroo.com | Live (main address) |
| http://tingaroo.com | Redirects to https://tingaroo.com |
| https://www.tingaroo.com | Redirects to https://tingaroo.com |
| https://tingaroo.vercel.app | Live (Vercel's default address) |

These redirects are set in the Vercel domain settings, not in the code, so the Astro migration does not change them. The HTTPS certificate is from Let's Encrypt, valid until February 12, 2027. Vercel renews it automatically.

## Domain and DNS

The domain is registered at Namecheap, which also hosts its DNS (Namecheap BasicDNS nameservers).

| Type | Host | Value |
|---|---|---|
| A | `@` | `216.198.79.1` |
| A | `@` | `64.29.17.1` |
| CNAME | `www` | `7d42ef05ea8b5bcc.vercel-dns-017.com` |

## What changed in the Astro migration (November 14, 2026)

- Moved the site from three hand-written files (`index.html`, `styles.css`, `main.js`) to Astro. The home page content is unchanged.
- Split shared markup into a layout and components, so the header, footer and signup form exist in one place.
- Moved `styles.css` to `src/styles/global.css` without changing any existing rule. New rules were added for the footer links, text pages and lesson pages.
- Moved `main.js` to `src/scripts/signup.js`. It now wires up every signup form on a page instead of two fixed IDs.
- Moved `favicon.svg` and `robots.txt` into `public/`. Replaced the hand-written `sitemap.xml` with `@astrojs/sitemap`, which writes `sitemap-index.xml`. `robots.txt` now points to it.
- Added canonical and `og:url` tags to every page.
- Added the About page, a draft Privacy page, and links to Privacy from every signup form and the footer.
- Added the lesson content collection, the lesson template and one draft example lesson.
- Added `vercel.json`, and added `node_modules/`, `dist/` and `.astro/` to `.gitignore`.

Visible differences from the live home page:

- The footer has a new row with About and Privacy links (12px taller on desktop, 28px on phones).
- Each signup form's small print ends with "See our privacy policy." On phones, this adds one line to the lower form.

## Not done yet

### Must do before promoting the site

1. **Review the Privacy page.** It is a plain-language draft. Fill in `[EMAIL PROVIDER]`, `[POSTAL ADDRESS]` and `[CONTACT EMAIL]`, and check each `<!-- CONFIRM -->` comment.
2. **Connect the email signup to a provider.** Fill in the `SIGNUP` settings at the top of `src/scripts/signup.js`:

   | Provider | `emailField` | `action` |
   |---|---|---|
   | Kit (ConvertKit) | `email_address` | From the Kit embed form code |
   | Mailchimp | `EMAIL` | From Mailchimp's "Embedded forms" (also copy the hidden `b_...` field into `hiddenFields`) |
   | Buttondown | `email` | `https://buttondown.com/api/emails/embed-subscribe/YOUR_USERNAME` |

3. **Create the free tutorial** (Build a Slingshot Physics Game) and the email that delivers it.
4. **Decide on the home-page claims** about lessons, worksheets, standards and project files that do not exist yet.
5. **Check the About page** `<!-- CONFIRM -->` comments.

### Should do

6. **Add a social preview image**: an `og:image` of 1200 × 630 pixels.
7. **Add an `apple-touch-icon`**: a 180 × 180 PNG for iPhones.
8. **Set the donation link** in `DONATION_URL` in `src/consts.ts`. Lesson pages show `[DONATION LINK]` until then.
9. **Add analytics**, for example Vercel Web Analytics, and update the Privacy page to match.
10. **Submit the sitemap** (`https://tingaroo.com/sitemap-index.xml`) to Google Search Console.

### Later

11. **Write the first lessons.**
12. **Turn on two-factor authentication** on the Vercel account.

## Issues fixed during setup

- Vercel was serving a certificate for tingaroo.com that had expired on November 5, 2026. It had been issued when the domain was first added to Vercel and could not renew while DNS pointed elsewhere. A new certificate was issued once DNS was corrected.
- The `www` CNAME was missing at first and has since been added. `www` now redirects to the bare domain.
