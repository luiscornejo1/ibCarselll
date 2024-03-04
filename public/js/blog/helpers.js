export const fetchUrl = async function (url) {
    try {
        const response = await fetch(url)
        const jsonResponse = await response.json()
        return jsonResponse
    } catch (e) {
        throw e
    }
}
