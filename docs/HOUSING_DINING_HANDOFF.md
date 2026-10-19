# Housing and Dining — first implementation

Owner: Anwar Khan. Branch: feature/housing-dining.

## Run on your Mac
1. Install Node.js 22 or later if it is not already installed.
2. Open the project folder in VS Code.
3. Open Terminal > New Terminal.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the localhost address printed by Vite (normally http://localhost:5173).

Keep the terminal open. Press Control+C to stop both servers.

## Implemented
- React Housing and Dining pages with responsive layouts.
- Search and category filters; vegan filter on Dining.
- GET /api/housing, /api/dining, /api/housing/:id, /api/dining/:id, /api/health.
- Loading, retry, no-results and clear-filter states.
- Official source links, review dates, and explicitly unavailable fields.
- API tests: `npm test`. Production build: `npm run build`.
- After building, `npm start` serves the app and API at http://localhost:3001.

## Scope and limitations
This is a curated starter directory. Housing has six entries: three residence halls and three guidance/support entries. Dining has five records. No live prices, availability, or hours are claimed. Links include the residence hall directory, official rates, off-campus guidance, individual dining pages and the dining hours directory. Dietary entries not verified are explicitly labeled. No housing bookings or purchases.

The Home page comes from PR #1 (ff7a4bd); only Housing and Dining navigation links were added to it. Your React section is in frontend/housing-dining.html and frontend/src/. Vite builds both HTML entry points. Coordinate with the team before merging root package files or Vite config. The team had not committed a framework setup at the base revision used here. This implementation uses React/Vite plus a Node HTTP backend; the team may choose a different backend later.

Login, persistent saved items, and database storage are not implemented in this section. Coordinate with Yash for saving listings to accounts. API data currently lives in backend/data/listings.js. Do not describe those unimplemented features as finished.

## Files to understand
frontend/index.html: teammate Home page from PR #1 plus two navigation links.
frontend/housing-dining.html: entry point for your section.
frontend/src/main.jsx: displays pages, reads filters, requests API results.
frontend/src/style.css: desktop/mobile styling.
backend/data/listings.js: directory records and filtering.
backend/server.js: receives API requests and returns JSON; serves built frontend.
backend/test/api.test.js: checks API responses and filtering behavior.

## Suggested Trello update after reviewing and running
Housing/Dining first implementation: pages, directory endpoints, search/filtering and error states ready for team review. Remaining: expand verified listings, deeper official links, shared navigation/account integration, team acceptance testing.

## Upload from your local clone
Confirm you are on feature/housing-dining before staging changes:
`git status`
`git add package.json package-lock.json vite.config.js .gitignore frontend backend docs/HOUSING_DINING_HANDOFF.md`
`git commit -m "Add housing and dining pages with directory APIs"`
`git push -u origin feature/housing-dining`
Then open a pull request into main for team review. Do not claim work was pushed until GitHub shows it.

## Sources reviewed October 19, 2026
https://housing.unt.edu/
https://dining.unt.edu/

## Demo checklist for the midnight meeting
1. Start with `npm run dev`, open the printed localhost URL.
2. Show the Home page and click Housing.
3. Show the six housing entries; search "Maple" and explain that the API filters the data.
4. Clear the search; choose Off-campus guidance from Category.
5. Open the official housing source or rates link.
6. Select Dining and choose Vegan. Mean Greens should be the one result.
7. Search a nonexistent word to demonstrate the no-results message; click Clear filters.
8. Click Back to Home.

## Short explanation (adapt to your own words)
My section covers Housing and Dining. The pages request listings from our backend instead of keeping the listings inside the page. Users can search by text and filter by category, and Dining also includes a verified vegan option. Each entry links to official information and shows its review date. I added loading, retry and no-results states. This version uses a curated data file; live hours, a database, and account-based saving are not implemented yet.

## Verification
Three automated API tests passed and the multipage production build succeeded. Automated browser testing was blocked because a browser binary could not be downloaded. Run the demo checklist on your Mac before recording. Test both desktop and phone-sized layouts.

## Integration note
The Home page and its existing local-device bookmarks are your teammate's work from PR #1, not your contribution. Your code does not replace that bookmark system or claim account-based saving.
