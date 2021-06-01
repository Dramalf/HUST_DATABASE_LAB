export function getToken() {
    return localStorage.getItem("token")
}
export function setToken(token) {
    localStorage.setItem("token", token);
}
export function isLogined() {
    console.log(localStorage.getItem("token"))
    return localStorage.getItem("token") ? true : false;
}
export function clearToken() {
    localStorage.removeItem("token")
}