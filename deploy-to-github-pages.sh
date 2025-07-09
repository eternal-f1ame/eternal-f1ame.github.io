#!/bin/bash
# Manual GitHub Pages Deployment Script

echo "🚀 Starting GitHub Pages deployment..."

# Build the static site
echo "📦 Building static site..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Static files generated in ./out directory"
    echo "📂 Contents of out directory:"
    ls -la out/ | head -10
    echo ""
    echo "🔄 Next steps:"
    echo "1. Push this repository to GitHub"
    echo "2. Go to your GitHub repository settings"
    echo "3. Navigate to Pages section"
    echo "4. Set source to 'GitHub Actions'"
    echo "5. The site will automatically deploy on push to main/master"
    echo ""
    echo "🌐 Your site will be available at:"
    echo "   https://[your-username].github.io/[repository-name]"
    echo ""
    echo "💡 Or test locally: python3 -m http.server 8080"
    echo "   Then visit: http://localhost:8080"
else
    echo "❌ Build failed! Check the errors above."
    exit 1
fi 