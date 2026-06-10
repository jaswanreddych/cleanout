function parseList(value) {
    return value
        .split(",")
        .map(item => item.trim())
        .filter(Boolean)
}

function requireValue(value, message) {
    if (!value) {
        throw new Error(message)
    }
    return value
}

function formatSize(bytes) {
    try {
        if (!Number.isInteger(bytes) || bytes < 1) {
            return "0 b"
        }
        const SIZES = ["b", "kb", "mb", "gb", "tb", "pb"]
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${SIZES[i]}`
    } catch {
        return "0 b"
    }
}

export { formatSize, parseList, requireValue }

