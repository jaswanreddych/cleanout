import { DEFAULT_TARGETS } from "../constants/targets.js";
import { c } from "../constants/color.js";
import fsp from "fs/promises";
import path from "path";

function globToRegex(pattern) {
    const escaped = pattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*");

    return new RegExp(`^${escaped}$`, "i");
}

async function searchDir(dir, matchers, depth, maxDepth) {
    if (depth > maxDepth) {
        return [];
    }

    let entries;

    try {
        entries = await fsp.readdir(dir, { withFileTypes: true });
    } catch {
        return [];
    }

    const results = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        const matched = matchers.find(({ regex }) =>
            regex.test(entry.name)
        );

        if (matched) {
            results.push({
                name: entry.name,
                path: fullPath,
                isDirectory: entry.isDirectory(),
                category: matched.category,
                pattern: matched.pattern,
                color: matched.color
            });
            continue;
        }

        if (entry.isDirectory()) {
            const nestedResults = await searchDir(
                fullPath,
                matchers,
                depth + 1,
                maxDepth
            );

            results.push(...nestedResults);
        }
    }

    return results;
}

export async function scan(targetDir, depth, include, exclude) {
    const targets = [
        ...DEFAULT_TARGETS,
        {
            name: "Custom Includes",
            patterns: include,
            color: c.yellow,
        },
    ];

    const matchers = targets.flatMap(target =>
        target.patterns
            .filter(pattern => pattern && !exclude.includes(pattern))
            .map(pattern => ({
                category: target.name,
                color: target.color,
                pattern,
                regex: globToRegex(pattern),
            }))
    );

    return searchDir(
        targetDir,
        matchers,
        0,
        depth
    );
}

export async function getSize(targetPath) {
    try {
        const stat = await fsp.stat(targetPath)
        if (!stat.isDirectory()) return stat.size
        const files = await fsp.readdir(targetPath)
        const sizes = await Promise.all(
            files.map(file => getSize(path.join(targetPath, file)))
        )
        return sizes.reduce((acc, s) => acc + s, 0)
    } catch {
        return 0
    }
}