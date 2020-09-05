import * as Types from "../Types";

/**
 * Gets all gpa stats from api
 */
export async function getGPAstats(): Promise<Types.GpaStat[]> {

    return await fetch(global.domain + "/about/gpastats", {
        method: "GET"
    }).then((response) => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            throw { "error": response.status }
        }
    }).catch((error) => {
        console.log(error)
        throw { "error": "Unexpected response" }
    })
}

/**
 * Gets all language stats from api
 */
export async function getLanguageStats(): Promise<Types.LanguageStat[]> {
    return await fetch(global.domain + "/about/languagestats", {
        method: "GET",

    }).then((response) => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            throw { "error": response.status }
        }
    }).catch((error) => {
        console.log(error);
        throw { "error": "Unexpected error" }
    })
}