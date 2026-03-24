# Changelog

All notable changes to MGZON CLI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial support for plugin system
- Webhook simulation tools
- Advanced debugging capabilities

### Changed
- Improved error messages and user feedback
- Enhanced documentation structure

## [2.0.8] - 2024-12-23

### Fixed
- ✅ **Critical fix**: Resolved `pkg` compatibility issue with `axios` version 1.x
- ✅ Fixed binary execution errors caused by missing `axios.cjs` module
- ✅ Corrected cross-platform binary naming in CI/CD pipelines
- ✅ Fixed GUI build output paths and AppImage generation
- ✅ Resolved dependency conflicts between CLI and GUI packages
- ✅ Fixed Docker multi-stage build for production optimization

### Changed
- 🔄 **Dependency update**: Downgraded `axios` to `0.27.2` for full `pkg` compatibility
- 🔄 **Build system**: Created custom `scripts/build-pkg.js` for reliable binary creation
- 🔄 **Workflow optimization**: Enhanced GitHub Actions for better multi-platform support
- 🔄 **Documentation**: Updated all documentation to reflect current state (v2.0.8)

### Added
- ➕ **New build script**: `fix-pkg.js` to automate dependency fixes
- ➕ **New npm script**: `fix:deps` for easy dependency management
- ➕ **Enhanced testing**: Added comprehensive setup script `setup-and-test.sh`
- ➕ **Security**: Added automatic checksum generation for all binaries
- ➕ **Automation**: Complete CI/CD pipeline for automated releases

## [2.0.7] - 2024-12-23

### Fixed
- ✅ Complete compatibility fixes between CLI and GUI
- ✅ Fixed `pkg` issues with `open/xdg-open`
- ✅ Updated all workflows to work seamlessly
- ✅ Fixed `dmg-license` issue on non-macOS systems
- ✅ Fixed GUI build issues for different platforms
- ✅ Updated dependencies to fix security warnings
- ✅ Fixed cross-platform binary naming
- ✅ Resolved GitHub Actions pipeline conflicts

### Changed
- 🔄 Updated minimum Node.js version to 18+
- 🔄 Updated Electron to version 29.0.0
- 🔄 Updated electron-builder to 24.13.3
- 🔄 Improved `pkg` configuration to include required assets
- 🔄 Simplified scripts in package.json
- 🔄 Updated Dockerfile for better security and multi-architecture support

### Added
- ➕ Full CI/CD support with automated releases
- ➕ Automatic version bumping on push
- ➕ Automated publishing to npm
- ➕ Cross-platform binary generation
- ➕ Docker multi-architecture builds
- ➕ Jest testing framework integration
- ➕ Automatic checksums for all binaries
- ➕ GitHub Packages publishing support
- ➕ Comprehensive release notes automation

## [2.0.6] - 2024-12-22

### Fixed
- ✅ Resolved TypeScript compilation errors
- ✅ Fixed GUI icon conversion script
- ✅ Corrected Electron builder configuration
- ✅ Fixed path resolution in GUI main process

### Added
- ➕ Complete GUI application with Electron
- ➕ Icon generation from SVG source
- ➕ Cross-platform GUI packaging support
- ➕ Integrated CLI execution from GUI

## [2.0.5] - 2024-12-22

### Fixed
- ✅ Fixed Docker build caching issues
- ✅ Resolved npm audit vulnerabilities
- ✅ Corrected workflow file permissions

### Added
- ➕ Docker multi-stage build support
- ➕ GitHub Container Registry publishing
- ➕ Automated Docker image testing

## [2.0.0] - 2024-12-21

### Breaking Changes
- ⚠️ **Package name changed**: From `@mgzon/cli` to `@mg-cli/cli`
- ⚠️ **Repository migrated**: New GitHub organization structure

### Added
- ➕ Complete rewrite of build system
- ➕ Multi-platform binary support with `pkg`
- ➕ GitHub Actions automation
- ➕ Comprehensive documentation
- ➕ Security scanning integration

## [1.0.0] - 2024-12-20

### Added
- 🚀 Initial public release of MGZON CLI
- 🔐 Core authentication commands: `login`, `logout`, `whoami`
- 🔑 API key management: `keys:list`, `keys:generate`, `keys:revoke`
- 🏗️ Project initialization: `init` command with multiple templates
- 🚦 Local development server: `serve` command
- 🚢 Deployment pipeline: `deploy` command
- ⚙️ Environment configuration system
- 💬 Interactive prompts with inquirer
- ⏳ Loading spinners with ora
- 🎨 ASCII art banner with figlet
- 📖 Command-line help system
- 🔄 Auto-update notifications
- 🔌 Plugin system foundation
- 🐛 Comprehensive error reporting
- 📄 JSON/YAML configuration support

### Templates
- 🎯 Next.js template (TypeScript + Tailwind CSS)
- ⚛️ React template (Vite + TypeScript)
- 🖖 Vue.js template (Vue 3 + Vite)
- 📄 Static site template (HTML/CSS/JS)
- 🛒 E-commerce template (Next.js + Stripe)

### Security
- 🔒 Secure API key storage using OS keychain
- 🔐 Encrypted configuration files
- 🔑 SSL/TLS verification for all API calls
- 🛡️ Rate limiting protection
- ✅ Input validation for all commands

## [0.9.0] - 2023-12-15

### Added
- Beta testing release
- Core command structure
- HTTP client with axios
- Configuration file management
- Project validation system
- Build system with TypeScript
- Testing framework with Jest

### Changed
- Improved error messages
- Enhanced command help text
- Better API response handling

### Fixed
- Fixed installation script for Windows
- Resolved path issues on Unix systems
- Fixed authentication token refresh

## [0.8.0] - 2023-11-30

### Added
- Alpha testing version
- Basic command structure
- Authentication flow
- API client implementation
- File system utilities
- Logging system
- Progress indicators

### Changed
- Refactored command architecture
- Improved TypeScript configuration
- Enhanced build process

### Fixed
- Package installation issues
- Command alias conflicts
- Path resolution problems

## [0.1.0] - 2023-10-01

### Added
- Initial development version
- Project setup and structure
- Basic CLI framework with Commander
- TypeScript configuration
- Development tooling (ESLint, Prettier, Jest)
- CI/CD pipeline setup
- Documentation structure

---

## Migration Guides

### From v1.x to v2.x

1. **Update installation:**
   ```bash
   npm uninstall -g @mgzon/cli
   npm install -g @mg-cli/cli
   ```

2. **Update configuration:**
   ```bash
   # The configuration format remains compatible
   # API keys and settings will automatically migrate
   ```

3. **Key changes:**
   - New package name: `@mg-cli/cli` (instead of `@mgzon/cli`)
   - Enhanced security features
   - Improved multi-platform support
   - Automated updates via CI/CD

### From v0.x to v1.0

1. **Update your CLI:**
   ```bash
   npm update -g @mgzon/cli
   ```

2. **Migrate configuration:**
   ```bash
   mz config:migrate
   ```

3. **Check breaking changes:**
   - Updated API endpoint URLs
   - New configuration file format (.mgzonrc)
   - Changed command syntax for better consistency

## Deprecation Notices

### v2.0.0
- Old package name `@mgzon/cli` is deprecated in favor of `@mg-cli/cli`
- Legacy build system deprecated in favor of `pkg`-based binaries

### v1.0.0
- Old configuration format (`~/.mgzon/config.json`) is deprecated in favor of `~/.mgzonrc`
- Legacy API endpoints sunset on 2024-06-01

---

## Release Process

### Automated Release (Current)
1. **Push to master**: Triggers GitHub Actions workflow
2. **Version bump**: Automatic patch version increment
3. **Build**: Multi-platform binaries created
4. **Test**: Automated testing on all platforms
5. **Publish**: Automatic publishing to npm and GitHub Packages
6. **Release**: GitHub release created with binaries
7. **Documentation**: Changelog and documentation updated

### Manual Release (Legacy)
1. **Planning**: Features planned in GitHub Projects
2. **Development**: Features developed in feature branches
3. **Testing**: All changes tested with Jest and E2E tests
4. **Review**: Code review by at least one maintainer
5. **Release**: Version bump and changelog update
6. **Publish**: Manual publish to npm registry
7. **Announce**: Release announcement on Discord and Twitter

---

## Semantic Versioning

- **MAJOR** version (X.0.0): Incompatible API changes
- **MINOR** version (0.X.0): New functionality in backward compatible manner
- **PATCH** version (0.0.X): Backward compatible bug fixes

## Support Timeline

| Version | Release Date | Active Support Until | Security Support Until | Status |
|---------|--------------|---------------------|------------------------|--------|
| 2.x     | 2024-12-21   | 2025-12-31          | 2026-12-31             | ✅ Active |
| 1.x     | 2024-12-20   | 2025-06-30          | 2025-12-31             | ⚠️ Security only |
| 0.9.x   | 2023-12-15   | 2024-06-01          | 2024-12-31             | ❌ Ended |
| 0.8.x   | 2023-11-30   | 2024-03-31          | 2024-09-30             | ❌ Ended |

## Support Policy

- **Active Support**: Bug fixes, security patches, new features
- **Security Support**: Critical security patches only
- **End of Life**: No further updates, migrate to newer version

---

*Changelog maintained with ❤️ by the MGZON Team*
*Automated releases powered by GitHub Actions*
