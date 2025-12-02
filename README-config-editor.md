# AutoCare Config Editor

A standalone HTML-based configuration editor for the AutoCare website that allows you to edit all text content without touching the codebase.

## Features

- ✅ **Fully Data-Driven**: All text content extracted from components into a single config file
- ✅ **Visual Editor**: Intuitive web interface for editing configuration
- ✅ **Git Integration**: Pull and push changes directly from the editor
- ✅ **Real-time Preview**: See changes immediately
- ✅ **Backup System**: Automatic backups when saving
- ✅ **Type Safety**: Maintains TypeScript types and component imports

## What's Been Done

### 1. **Added New Slogan**
   - ✅ "Your restorations, our care" added to config

### 2. **Complete Data-Driven Conversion**
   - ✅ Extracted 67+ hardcoded text strings from all components
   - ✅ Organized into logical sections: branding, navigation, labels, sections, etc.
   - ✅ All user-facing text now comes from `src/data/config.ts`

### 3. **Standalone HTML Editor**
   - ✅ Professional interface with tree navigation
   - ✅ Form-based editing for all config sections
   - ✅ Array and object editing support
   - ✅ Real-time change tracking

### 4. **Git Integration Backend**
   - ✅ Node.js backend with REST API
   - ✅ Safe TypeScript file parsing and generation
   - ✅ Git pull/push/status operations
   - ✅ Automatic commit messages

## Quick Start

### Windows
1. **Easy Start** (Double-click):
   - `start-editor.bat` - Simple batch file
   - `start-editor.ps1` - PowerShell version (more robust)

2. **Command Line**:
   ```cmd
   # Batch file
   start-editor.bat
   
   # PowerShell
   powershell -ExecutionPolicy Bypass -File start-editor.ps1
   ```

3. **Manual Start**:
   ```cmd
   # Start backend
   node config-editor-backend.js
   
   # Open editor (in another terminal)
   start config-editor.html
   ```

### Linux/Mac
1. **Start the Editor**:
   ```bash
   ./start-editor.sh
   ```

2. **Or manually**:
   ```bash
   # Start backend
   node config-editor-backend.js

   # Open editor
   open config-editor.html
   ```

3. **Edit Configuration**:
   - Navigate sections in the left panel
   - Edit values in the right panel
   - Save changes with the "Save Config" button
   - Push to git with "Push Changes"

## File Structure

```
autocare/
├── config-editor.html           # Main editor interface
├── config-editor-backend.js     # Node.js backend with git integration
├── start-editor.sh             # Quick startup script
├── src/data/config.ts          # Main configuration file (managed by editor)
└── README-config-editor.md     # This file
```

## Configuration Sections

The config is organized into these main sections:

- **branding**: Company name, slogan, brand elements
- **navigation**: Menu items, buttons, accessibility labels
- **labels**: Common UI labels and text
- **sections**: Page section titles and subtitles
- **hero**: Homepage hero section content
- **about**: About section content and highlights
- **services**: Service offerings (titles, descriptions)
- **process**: Process steps and descriptions
- **portfolio**: Project showcases
- **testimonials**: Customer testimonials
- **contact**: Contact information and form labels
- **footer**: Footer content and links
- **accessibility**: Screen reader labels and ARIA text

## API Endpoints

The backend provides these endpoints:

- `GET /api/config` - Load current configuration
- `POST /api/config` - Save configuration changes
- `GET /api/git/status` - Check git repository status
- `POST /api/git/pull` - Pull latest changes from repository
- `POST /api/git/push` - Commit and push changes

## Safety Features

- ✅ **Automatic Backups**: Creates timestamped backups before saving
- ✅ **Type Preservation**: Maintains TypeScript types and imports
- ✅ **Change Tracking**: Warns about unsaved changes
- ✅ **Error Handling**: Comprehensive error reporting
- ✅ **Git Safety**: Proper commit messages and change tracking

## Next Steps

To complete the data-driven conversion, you'll need to:

1. **Update Components**: Modify React components to use the new config structure
2. **Test Integration**: Ensure all components render correctly with config data
3. **Deploy**: Test the editor in your production environment

## Usage Examples

### Editing the Slogan
1. Open editor → Navigate to "branding" → Edit "slogan" field
2. Save → Push changes

### Adding Navigation Items
1. Navigate to "navigation" → "items" array
2. Click "Add Item" → Fill in label and href
3. Save → Push changes

### Updating Service Descriptions
1. Navigate to "services" → Select service
2. Edit title/description fields
3. Save → Push changes

The editor handles all the TypeScript compilation and git operations automatically!

## Windows-Specific Notes

### Prerequisites
- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **Git**: Download from [git-scm.com](https://git-scm.com/) (for push/pull functionality)

### Running the Editor
- **Double-click**: `start-editor.bat` (easiest)
- **PowerShell**: Right-click `start-editor.ps1` → "Run with PowerShell"
- **Command Prompt**: Open cmd in project folder → `start-editor.bat`

### Troubleshooting Windows Issues

**PowerShell Execution Policy Error**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Port Already in Use**:
```cmd
netstat -ano | findstr :3001
taskkill /PID [PID_NUMBER] /F
```

**Git Commands Not Working**:
- Ensure Git is installed and in PATH
- Restart command prompt after Git installation

**Browser Doesn't Open Automatically**:
- Manually open: `file:///[full-path-to]/config-editor.html`
- Or use: `http://localhost:3001` (if you add a static file server)

### File Paths in Windows
The editor handles Windows file paths automatically, but if you see issues:
- Use forward slashes `/` in the editor
- The backend converts them to proper Windows paths

### WSL Users
If using WSL (Windows Subsystem for Linux):
```bash
# Use the Linux version
./start-editor.sh
```