import * as Types from '../models/models';

/**
 * Gets all gpa stats from api
 */
export async function getGPAstats(): Promise<Types.GpaStat[]> {
    return await fetch(process.env.REACT_APP_domain + '/about/gpastats', {
        method: 'GET'
    }).then(async (response) => {
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error(`Unexpected Server Response: ${response.status}`);
        }
    });
}

/**
 * Gets all language stats from api
 */
export async function getLanguageStats(): Promise<Types.LanguageStat[]> {
    return await fetch(process.env.REACT_APP_domain + '/about/languagestats', {
        method: 'GET'

    }).then(async (response) => {
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error(`Unexpected Server Response: ${response.status}`);
        }
    });
}
