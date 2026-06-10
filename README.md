# 🧹 cleanout

> *Clean out the clutter, ship the code; one command and your project is clean.*

**`cleanout`** is a lightning-fast CLI tool designed to help you quickly scan and remove unnecessary files and folders from your project directories, freeing up valuable disk space. It automatically targets `node_modules`, build outputs, and log files, while being fully configurable to suit your needs.

---

## ⚡ Features

- **🚀 Fast & Efficient**: Rapidly scans your project to find junk files.
- **🛡️ Safe by Default**: Always prompts for confirmation before deleting anything (unless you use `--yes`).
- **🔍 Dry Run Mode**: Preview exactly what will be deleted without touching any files using `--dry-run`.
- **⚙️ Highly Configurable**: Use a `cleanout.config.json` file or CLI arguments to customize what gets cleaned.
- **🎨 Beautiful Output**: Colorful and readable CLI interface to easily understand what is using your disk space.

---

## 📦 Installation

Since it's an NPM package, you can run it via `npx` directly, or install it globally to use anywhere on your system.

**Install globally (Recommended):**
```bash
npm install -g cleanout
```

**Run via npx (Without installing):**
```bash
npx cleanout
```

---

## 💻 Usage

Run `cleanout` in any project directory:

```bash
cd my-project
cleanout
```

### 🛠️ Options & Flags

| Flag | Alias | Description |
|---|---|---|
| `--dry-run` | `-dr` | Preview actions without deleting anything. |
| `--yes` | `-y` | Skip confirmation prompts (Warning: Deletes immediately). |
| `--depth=<n>` | `-d` | Set maximum folder scan depth (Default: Infinity). |
| `--include=<list>`| `-i` | Comma-separated extra patterns to clean (e.g., `dist,tmp,*.log`). |
| `--exclude=<list>`| `-e` | Comma-separated patterns to ignore (e.g., `node_modules,build`). |
| `--stats` | `-st` | Display folder statistics. |
| `--help` | `-h` | Show help information. |

### 💡 Examples

```bash
# Preview what would be deleted in the src folder without actually deleting it
cleanout src --dry-run

# Quick cleanup in the current directory without prompts, limiting depth to 3 levels
cleanout . --yes --depth=3

# Clean the current directory but skip node_modules and dist
cleanout . --exclude=node_modules,dist

# Also clean up *.log and tmp files
cleanout . --include=*.log,tmp
```

---

## ⚙️ Configuration (Optional)

You can create a `cleanout.config.json` file in your project root to define default behaviors. 

CLI arguments will always override the values in your config file.

**Sample `cleanout.config.json`:**
```json
{
  "dryRun": false,
  "yes": false,
  "depth": 5,
  "include": [
    "*.log",
    "tmp",
    ".cache"
  ],
  "exclude": [
    "dist",
    "important_logs"
  ]
}
```

---

## 📄 License

MIT © Jaswan Reddy Ch
