# 🔄 PrivateVOD Scripts Auto-Update System

This repository includes a comprehensive auto-update system for all TamperMonkey scripts.

## 🚀 **Automatic Update Methods**

### **1. TamperMonkey Built-in Updates**
All scripts now include `@updateURL` and `@downloadURL` headers:

```javascript
// @updateURL    https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/...
// @downloadURL  https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/...
```

**How it works:**
- TamperMonkey automatically checks for updates
- Users get notified when new versions are available
- One-click update installation

### **2. Update Checker Script**
A dedicated script (`update-checker.js`) that:
- ✅ Checks for updates every 24 hours
- ✅ Shows desktop notifications for new versions
- ✅ Tracks update history
- ✅ Provides manual check function

**Installation:**
1. Install the `update-checker.js` script
2. It will automatically monitor all other scripts
3. Use `PrivateVODUpdateCheck.check()` for manual checks


## 📋 **Script Update URLs**

| Script | Update URL |
|--------|------------|
| Auto Favourite Video | [Update](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Auto%20Favourite%20Video/privatevod%20auto%20favourite%20video.user.js) |
| Auto Favourite Star | [Update](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Auto%20Favourite%20Star/privatevod%20auto%20favourite%20star.user.js) |
| Element Mover | [Update](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Element%20Mover/privatevod%20element%20mover.user.js) |
| Element Blocker | [Update](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Element%20Blocker/privatevod%20element%20blocker.user.js) |
| Favourite & Like Tracker | [Update](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Favourite%20%26%20Like%20Tracker/privatevod%20favourite%20and%20like%20tracker.user.js) |
| Hide Favourite Videos | [Update](https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/PrivateVOD%20Hide%20Favourite%20Videos/privatevod%20hide%20favourite%20videos.user.js) |

## 🔧 **How to Enable Auto-Updates**

### **Method 1: TamperMonkey Settings**
1. Open TamperMonkey Dashboard
2. Go to **Settings** → **General**
3. Enable **"Check for userscript updates"**
4. Set **"Check interval"** to your preference (recommended: 24 hours)

### **Method 2: Install Update Checker**
1. Install `update-checker.js` script
2. It will automatically monitor all scripts
3. Shows desktop notifications for updates

### **Method 3: Manual Check**
```javascript
// In browser console
PrivateVODUpdateCheck.check();
```

## 📊 **Update Notifications**

### **Desktop Notifications**
- Shows when new versions are available
- Click to open download page
- Prevents duplicate notifications

### **Console Logging**
- Detailed update information
- Version comparison
- Error reporting

### **TamperMonkey Dashboard**
- Shows update status for all scripts
- One-click update installation
- Version comparison

## 🛠️ **For Developers**

### **Adding Update URLs to New Scripts**
```javascript
// @updateURL    https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/Path%20to%20Script/script-name.user.js
// @downloadURL  https://raw.githubusercontent.com/sharoon7171/PrivateVOD-TamperMonkey-Scripts/main/Path%20to%20Script/script-name.user.js
```

### **Updating Script Versions**
1. Change `@version` in script header
2. Commit and push changes
3. TamperMonkey will detect updates automatically


## 🔍 **Troubleshooting**

### **Updates Not Working?**
1. Check TamperMonkey update settings
2. Verify script URLs are accessible
3. Check browser console for errors
4. Try manual update check

### **Script Conflicts?**
1. Disable other update checkers
2. Check for duplicate scripts
3. Clear TamperMonkey cache

### **Network Issues?**
1. Check internet connection
2. Verify GitHub access
3. Try different browser

## 📈 **Update Statistics**

The system tracks:
- ✅ Last update check time
- ✅ Script versions
- ✅ Update notifications sent
- ✅ Download success rates

## 🎯 **Benefits**

- **🔄 Automatic Updates**: No manual intervention needed
- **🔔 Smart Notifications**: Only when updates are available
- **📊 Version Tracking**: Complete update history
- **🛡️ Error Handling**: Robust error management
- **⚡ Fast Updates**: Network-level optimizations

---

**Made with ❤️ by [SQ Tech](https://sqtech.dev) for seamless script management**
