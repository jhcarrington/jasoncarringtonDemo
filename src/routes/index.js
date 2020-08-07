
// import fetch from "isomorphic-unfetch";
// import global from "../global"
import * as Types from "../Types";
/**@typedef {{outof:Number, title:String, score:Number}} gpaStat */

/**
 * @returns {[gpaStat]}
 */
export async function getGPAstats() {
    console.log(global.domain)
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
 * @returns {[Types.LanguageStat]}
 */
export async function getLanguageStats() {
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