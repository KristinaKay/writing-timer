# Contributing to A Timer to Write

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/writing-timer.git
   cd writing-timer
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the dev server**:

   ```bash
   npm run dev
   ```

5. **Make your changes** and test them
6. **Submit a pull request**

## 🛠️ Development Workflow

### Making Changes

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our code style (see below)

3. Test your changes:

   ```bash
   npm run lint    # Check for code quality issues
   npm run build   # Ensure it builds successfully
   ```

4. Commit with clear messages:

   ```bash
   git commit -m "feat: add new feature description"
   ```

5. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a pull request on GitHub

### Commit Message Convention

We use conventional commits for clear history:

- `feat: ...` - New features
- `fix: ...` - Bug fixes
- `docs: ...` - Documentation changes
- `style: ...` - Code style/formatting (no logic change)
- `refactor: ...` - Code restructuring
- `test: ...` - Adding/updating tests
- `chore: ...` - Maintenance tasks

Example: `feat(timer): add custom sound notifications`

## 📋 Code Guidelines

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use meaningful component and variable names

### CSS

- Use CSS modules or component-specific CSS files
- Leverage CSS variables for theming
- Ensure WCAG AA contrast compliance (4.5:1 for text, 3:1 for UI elements)
- Respect `prefers-reduced-motion` for animations

### Accessibility

- All interactive elements must be keyboard accessible
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Include ARIA labels where needed
- Minimum 44×44px touch targets
- Test with keyboard navigation

### File Structure

```text
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── assets/         # Images, fonts, etc.
├── App.jsx         # Main application component
├── App.css         # Global styles
└── main.jsx        # Entry point
```

## 🐛 Reporting Issues

### Bug Reports

Include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if applicable

### Feature Requests

Describe:

- The problem you're trying to solve
- Proposed solution
- Alternative solutions considered
- Any additional context

## 🎨 Design Principles

1. **Writer-focused**: Features should help writers focus and track productivity
2. **Accessible**: WCAG AA compliance is non-negotiable
3. **Privacy-first**: All data stored locally, no tracking
4. **Lightweight**: Fast load times, minimal dependencies
5. **Customizable**: Users should control their experience

## 🧪 Testing

Before submitting:

1. **Lint your code**: `npm run lint`
2. **Build successfully**: `npm run build`
3. **Test in multiple browsers**: Chrome, Firefox, Safari
4. **Check mobile responsiveness**
5. **Verify keyboard navigation works**
6. **Test with screen reader** (if accessibility changes)

## 📝 Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Changes are tested locally
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention
- [ ] PR description explains changes clearly

## ❓ Questions?

- Open a [discussion](https://github.com/KristinaKay/writing-timer/discussions) on GitHub
- Check existing [issues](https://github.com/KristinaKay/writing-timer/issues)
- Read the [documentation](docs/) in the docs folder

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
