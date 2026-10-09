# Authoria Writing prototype

Static HTML, CSS and JavaScript with mock data and browser-local state.
The application source is `dist/`. There are no dependencies to install.

## Build for GitHub Pages

Run `node scripts/build-pages.mjs` using Node 22. This checks JavaScript syntax,
verifies relative asset references, and copies only the five application files
to `_site/`, byte-for-byte. No UI or interaction changes are applied.

Asset URLs are document-relative, so the same output works at `/` or
`/<repository-name>/`. No hardcoded base path or router fallback is needed.

## Deployment

GitHub repository: https://github.com/LuSzy/authoria

The workflow deploys the `main` branch. Only the five prototype files are
included in the Pages artifact.

1. In the target GitHub repository, open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Ensure Actions are enabled. If the `github-pages` environment has branch
   restrictions, allow `main` (and approve any required environment review).
4. Push `main`. The **Deploy Authoria to GitHub Pages**
   workflow builds and publishes automatically. It can also be run manually
   from **Actions → Deploy Authoria to GitHub Pages → Run workflow**.

No personal access token or custom repository secret is required by the workflow.
It uses GitHub's automatic Actions token and Pages identity permissions.

Public URL: https://luszy.github.io/authoria/
The workflow deployment output reports the final URL. A public repository works
with GitHub Free; Pages from a private repository requires a supported paid plan.

Public visitors start with mock data. Browser-local drafts, comments and settings
are not uploaded by this workflow. Existing data on the prior hosting domain will
not transfer to the GitHub Pages origin.
