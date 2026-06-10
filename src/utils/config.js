import fs from "fs"
import path from "path"
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

export function loadConfig(targetDir, args) {
    const userConfigPath = path.join(targetDir, "cleanout.config.json");

    let userConfig = {};

    if (fs.existsSync(userConfigPath)) {
        try {
            userConfig = JSON.parse(
                fs.readFileSync(userConfigPath, "utf-8")
            );
        } catch {
            throw new Error("Invalid cleanout.config.json file");
        }
    }

    return {
        ...userConfig,
        ...args,
        include: [
            ...(userConfig.include ?? []),
            ...(args.include ?? [])
        ],
        exclude: [
            ...(userConfig.exclude ?? []),
            ...(args.exclude ?? [])
        ]
    };
}