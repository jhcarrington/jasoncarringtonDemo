
// import fetch from "isomorphic-unfetch";
// import global from "../global"

/**@typedef {{outof:Number, title:String, score:Number}} gpaStat */
 /**@typedef {{name:String, color:String, time:Number, dataLabel:String, knowledge:Number}} languageStat */

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
 * @returns {[languageStat]}
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