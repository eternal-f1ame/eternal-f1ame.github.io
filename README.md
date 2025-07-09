# Aaditya Baranwal - Portfolio Website

A modern, responsive portfolio website built with Next.js and deployed on GitHub Pages.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build for GitHub Pages
npm run build:github
```

## 📋 GitHub Pages Deployment

This website is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Repository Settings:**
   - Go to your repository → Settings → Pages
   - Source: "GitHub Actions"
   - No need to select a branch

2. **Automatic Deployment:**
   - Every push to `main` branch triggers automatic deployment
   - The workflow builds the site and deploys to GitHub Pages
   - Check the "Actions" tab to monitor deployment status

3. **Manual Deployment:**
   ```bash
   # Build the static site locally
   npm run build:github
   
   # The output will be in the `out/` directory
   ```

### Important Configuration:

- ✅ `next.config.mjs` configured for static export
- ✅ GitHub Actions workflow in `.github/workflows/deploy.yml`
- ✅ `.nojekyll` file prevents Jekyll processing
- ✅ Circular favicons optimized for all devices
- ✅ Password protection disabled for static hosting compatibility

## 🛠️ Technology Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** SCSS with Once UI design system
- **Deployment:** GitHub Pages with GitHub Actions
- **Image Processing:** Sharp for optimization
- **Content:** MDX for blog posts and project descriptions

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js 13+ app directory
│   ├── components/          # React components
│   ├── once-ui/            # Design system components
│   └── resources/          # Content and configuration
├── public/                 # Static assets (favicons, etc.)
├── assets/                 # Source images and content
└── out/                   # Built static site (auto-generated)
```

## 🎨 Customization

### Content Updates:
- Edit `src/app/resources/content.js` for personal information
- Add blog posts in `src/app/blog/posts/`
- Update project details in `src/app/work/projects/`

### Favicon Updates:
- Replace images in `assets/favicon_ico/`
- Run `python3 crop_favicon_circular.py` to create circular versions
- Use `./update_circular_favicons.sh` for automatic processing

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📱 Features

- ✅ Responsive design for all devices
- ✅ Dark/light theme support
- ✅ SEO optimized with metadata
- ✅ Gallery with image modal viewers
- ✅ Blog with MDX support
- ✅ Project showcase pages
- ✅ Circular favicon design
- ✅ GitHub Pages ready

## 🚨 Troubleshooting

### Build Issues:
- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf .next out && npm run build:github`

### Deployment Issues:
- Check GitHub Actions tab for error details
- Verify repository settings → Pages is set to "GitHub Actions"
- Ensure main branch protection doesn't block workflow

### GitHub Pages 404 Issues (About/Gallery pages):

**If you get 404 errors for `/about` or `/gallery`:**

1. **Check Repository Settings:**
   ```
   Repository → Settings → Pages → Source: "GitHub Actions"
   ```

2. **Verify Build Output:**
   - Run `npm run build:github` locally
   - Check that `out/about/index.html` and `out/gallery/index.html` exist

3. **URL Format:**
   - ✅ Correct: `https://eternal-f1ame.github.io/about/`
   - ✅ Correct: `https://eternal-f1ame.github.io/gallery/`
   - ❌ Avoid: `https://eternal-f1ame.github.io/about` (without trailing slash)

4. **Clear Browser Cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Try incognito/private browsing mode

5. **Wait for Deployment:**
   - GitHub Pages can take 5-10 minutes to update
   - Check the "Actions" tab for deployment status

6. **Verify baseURL:**
   - Ensure `src/app/resources/config.js` has the correct baseURL
   - Should be: `"eternal-f1ame.github.io"`

### Favicon Issues:
- Clear browser cache (Ctrl+Shift+R)
- Wait 5-10 minutes for CDN propagation
- Check favicons are present in `public/` directory

## 📞 Support

For questions or issues, please open an issue in this repository.

---

Built with ❤️ using Next.js and Once UI 