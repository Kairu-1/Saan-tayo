# Saan Tayo? — Menus of Manila and Quezon City

A simple, phone-friendly website that lists cafes and restaurants and their menus.
No backend, no database, no build tools. Just 4 files.

## The files

| File | What it does | Do you edit it? |
|------|--------------|-----------------|
| `data.js` | All places, dishes and prices | **Yes, often.** This is how you update menus |
| `index.html` | The page structure | Sometimes (site name, new filter buttons) |
| `style.css` | Colors, fonts, layout | When you want to change the look |
| `script.js` | Search, filters, menu pop-up | Rarely. Play with it to learn |

## Run it on your computer

1. Install **VS Code**: https://code.visualstudio.com
2. Open VS Code > **File > Open Folder** > choose the `saan-tayo` folder.
3. Install the **Live Server** extension (Extensions icon on the left, search "Live Server", by Ritwick Dey).
4. Right-click `index.html` > **Open with Live Server**.
5. The site opens in your browser and **refreshes by itself every time you save**.

(Double-clicking `index.html` also works, but Live Server is nicer.)

## Update a menu

1. Open `data.js`.
2. Change a price, add a dish, or copy a whole place block to add a new place.
3. Save. Check it in the browser.
4. To put the change online, see "Publish" below (Step 6).

## Publish it for free with GitHub Pages

1. Make a free account at https://github.com
2. Click **+ > New repository**. Name it (for example `saan-tayo`), set it to **Public**, click **Create repository**.
3. On the new repo page click **uploading an existing file**, drag in `index.html`, `style.css`, `script.js`, `data.js`, then click **Commit changes**.
4. Go to **Settings > Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main** and folder **/ (root)**, then **Save**.
5. Wait 1 to 2 minutes. GitHub shows your link: `https://YOUR-USERNAME.github.io/saan-tayo/`
6. **To update later:** open `data.js` on GitHub, click the pencil icon (Edit), change it, click **Commit changes**. The live site updates in about a minute. You can even do this from a phone.

Later, when you're comfortable, you can use Git inside VS Code instead of the website upload.

## Test on phones

- Same wifi: with Live Server running, open `http://YOUR-COMPUTER-IP:5500` on your phone.
- Or just publish and open the GitHub Pages link on Android, iPhone and iPad.
- On a computer: browser DevTools (F12) > the phone/tablet icon shows phone sizes.

## Roadmap

1. **Now:** static site (this folder).
2. **Photos, map links, "open now"**: still no backend needed.
3. **Accounts + coffee log:** add a hosted backend such as **Supabase** (free tier, has login and a database, works with a static site). Ratings and notes would be saved per user.
4. **Nice extras:** "Add to Home Screen" support (PWA), a custom domain.

## Good manners with real menus

- Note the date you checked prices (the `updated` field does this).
- Ask permission before using a place's logo or photos.
