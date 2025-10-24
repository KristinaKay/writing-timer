# Contributing to A Timer to Write

Thank you for your interest in contributing to A Timer to Write! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project follows a simple code of conduct:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your work
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 16+ and npm
- Git
- A modern code editor (VS Code recommended)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/writing-timer.git
cd writing-timer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Running Tests

```bash
# Run visual smoke test
npm run smoke

# Run linter
npm run lint
```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**: Fix issues in the codebase
- ✨ **Features**: Add new functionality
- 📝 **Documentation**: Improve or add documentation
- 🎨 **Design**: UI/UX improvements
- ♿ **Accessibility**: Improve WCAG compliance
- 🌍 **Internationalization**: Add language support
- 🧪 **Tests**: Add or improve test coverage
- 🔧 **Refactoring**: Code quality improvements

### Contribution Workflow

1. **Check existing issues** to avoid duplicate work
2. **Create an issue** if one doesn't exist (for significant changes)
3. **Fork and branch** from `master`
4. **Develop** your changes following our coding standards
5. **Test** your changes thoroughly
6. **Document** any new features or changes
7. **Submit a pull request** with a clear description

## Coding Standards

### JavaScript/React Guidelines

- Use **functional components** with hooks
- Follow **React best practices**
- Keep components **small and focused**
- Use **meaningful variable names**
- Add **comments for complex logic**
- Maintain **consistent formatting** (Prettier/ESLint)

### CSS Guidelines

- Use **CSS variables** for theming
- Follow **BEM naming convention** where applicable
- Keep selectors **specific but not overly nested**
- Group related styles together
- Add comments for non-obvious styling

### Accessibility Requirements

- Maintain **WCAG AA compliance**
- Test with **keyboard navigation**
- Ensure **proper ARIA labels**
- Test with **screen readers** when possible
- Use **semantic HTML elements**
- Maintain **4.5:1 contrast ratios** for text
- Keep **touch targets at 44×44px minimum**

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `a11y`: Accessibility improvements

### Examples

```bash
feat(timer): Add pause functionality to Pomodoro timer

fix(tasks): Resolve drag-and-drop reordering bug

docs(readme): Update installation instructions

a11y(buttons): Increase touch target sizes to 44px minimum
```

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add tests** for new features when applicable
3. **Ensure all tests pass** and lint checks succeed
4. **Update CHANGELOG.md** with your changes
5. **Reference related issues** in your PR description
6. **Request review** from maintainers
7. **Address feedback** promptly and professionally

### PR Title Format

Use the same format as commit messages:

```
feat: Add custom timer duration input
fix: Resolve theme persistence issue on reload
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List key changes
- Be specific and clear

## Testing
- [ ] Tested locally
- [ ] Smoke tests pass
- [ ] Accessibility tested

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #123
```

## Reporting Bugs

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs. actual behavior
4. **Screenshots or videos** if applicable
5. **Environment details**:
   - OS and version
   - Browser and version
   - Node.js version (if development issue)
6. **Console errors** (if any)

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. Windows 11]
 - Browser: [e.g. Chrome 120]
 - Version: [e.g. 1.0.0]

**Additional context**
Any other relevant information.
```

## Suggesting Features

We welcome feature suggestions! When proposing a feature:

1. **Check existing issues** to avoid duplicates
2. **Describe the problem** you're trying to solve
3. **Explain your proposed solution**
4. **Consider alternatives** you've thought about
5. **Think about impact** on existing functionality
6. **Be open to discussion** and feedback

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Any other relevant information, mockups, or examples.
```

## Questions?

If you have questions about contributing:

- 📝 Check existing [documentation](../README.md)
- 💬 Open a [discussion](https://github.com/KristinaKay/writing-timer/discussions)
- 📧 Contact the maintainer: [@KristinaKay](https://github.com/KristinaKay)

---

Thank you for contributing to A Timer to Write! 🎉
