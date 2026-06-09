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
    return value?.trim()
}

export { parseList, requireValue }