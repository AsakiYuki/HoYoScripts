export function now() {
    return Math.floor(Date.now() / 1000);
}

export function timestamp() {
    return new Date().toISOString();
}
