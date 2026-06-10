import fs from "fs"
import { fileURLToPath } from "url"

export function getVersion() {
    try {
        const packagePath = fileURLToPath(new URL("../../package.json", import.meta.url))
        const packageJSon = JSON.parse(fs.readFileSync(packagePath, "utf-8"))
        return packageJSon.version ?? "0.0.0"
    } catch {
        return "0.0.0"
    }
}