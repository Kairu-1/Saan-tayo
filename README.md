# Saan Tayo? — Menus of Manila and Quezon City

A phone-friendly website that lists cafes and restaurants and their menus.
It's plain HTML, CSS and JavaScript with no build tools. The menus live in a
**Supabase** database, and a private page called the Menu Builder is how you
add to it.

## The files

| File | What it does | Do you edit it? |
|------|--------------|-----------------|
| `index.html` | The page structure | Sometimes (site name, new filter buttons) |
| `style.css` | Colors, fonts, layout | When you want to change the look |
| `script.js` | Loads menus from Supabase, search, filters, menu pop-up | Rarely |
| `menu-builder.html` | Your private tool for adding places and menus | No, just use it |

## How it fits together

- **Visitors** open `index.html`. `script.js` reads the `places`,
  `menu_categories` and `menu_items` tables from Supabase and draws the cards.
- **You** open `menu-builder.html`, sign in, fill the form and tap
  **Save to site**. The new place shows up on the live site after a refresh.
- The key in `script.js` and `menu-builder.html` is Supabase's **publishable**
  key. It is safe to be public because the database rules (Row Level
  Security) let anyone *read* but only your signed-in account *write*.
- **Never paste the secret key into any file in this repo.**

## Run it on your computer

1. Install **VS Code**: https://code.visualstudio.com
2. **File > Open Folder** and choose the `saan-tayo` folder.
3. Install the **Live Server** extension (search "Live Server", by Ritwick Dey).
4. Right-click `index.html` > **Open with Live Server**. The page refreshes
   every time you save.

The site needs internet, since the menus come from Supabase.

## Add a place or a menu

1. Open `menu-builder.html` with Live Server and sign in.
2. Choose **A new place**, or **New categories for a place that's already on
   the site**.
3. Fill in the details, add categories and dishes, then tap **Save to site**.
4. If anything fails, nothing is saved. The builder undoes partial saves.

To fix a price or remove a dish for now, use Supabase's **Table Editor**
(`menu_items` for dishes, `menu_categories` for categories, `places` for
places). Deleting a place also deletes its menu.

## The database

Three tables, linked top to bottom:

- `places`: one row per cafe or restaurant (`slug`, `name`, `type`, `city`,
  `area`, `hours`, `description`, `updated`, `is_sample`)
- `menu_categories`: belongs to a place (`name`, `sort_order`)
- `menu_items`: belongs to a category (`name`, `price`, `note`, `sort_order`)

Rules in place:

- Anyone can read all three tables.
- Only the owner account can insert, update or delete.
- Public sign-ups are turned off in Supabase (Authentication settings), so
  nobody else can make an account.

## Publish it for free with GitHub Pages

1. In the repo, go to **Settings > Pages**.
2. Set Source to **Deploy from a branch**, Branch to **main**, folder
   **/ (root)**, then **Save**.
3. After a minute or two your link appears:
   `https://YOUR-USERNAME.github.io/saan-tayo/`
4. Commit and push changes to `index.html`, `style.css` or `script.js` and the
   live site updates. Menu changes don't need a push at all, since they go
   straight to the database.

Keep `menu-builder.html` out of the public site's links. It is safe because
it only works after you sign in, but there's no reason to advertise it.

## Test on phones

- Same wifi: with Live Server running, open `http://YOUR-COMPUTER-IP:5500` on
  your phone.
- Or open the published link on Android, iPhone and iPad.
- On a computer: DevTools (F12) > the phone/tablet icon shows phone sizes.

## If the site says "Couldn't load the menus"

- Open DevTools (F12) > **Console** and read the red message.
- Free Supabase projects can pause after a period of inactivity. Open the
  Supabase dashboard and restore the project if it shows as paused.

## Roadmap

1. **Next:** edit and delete screens in the Menu Builder (fix prices and
   remove dishes without the Table Editor).
2. **Photos, map links, "open now"**
3. **Accounts + coffee log:** Supabase already handles login, so ratings and
   notes per user are possible.
4. **Extras:** "Add to Home Screen" support (PWA), a custom domain.

## Good manners with real menus

- Note the date you checked prices (the `updated` field does this).
- Ask permission before using a place's logo or photos.
