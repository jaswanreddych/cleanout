import { c } from "../constants/color.js";

export function success(message) {
    console.log(`\n ${c.success} ${message} ${c.reset}\n`)
}
export function error(message) {
    console.log(`\n ${c.error} ${message} ${c.reset}\n`)
}
export function info(message) {
    console.log(`\n ${c.info} ${message} ${c.reset}\n`)
}
export function warning(message) {
    console.log(`\n ${c.warning} ${message} ${c.reset}\n`)
}