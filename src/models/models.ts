export interface LanguageStat {
    name: string,
    color: string,
    time: [TimeObject],
    dataLabel: string,
    knowledge: number,
    Created_date: Date,
}
export interface TimeObject {
    time: number,
    Created_date: Date,
    _id: string,
}

export interface GpaStat {
    outof: number,
    title: string,
    score: number,
}

export enum Routes {
    HOME = '/',
    DATAMATCH = '/datamatch',
    ULINE = '/uline',
    SMILEMAIL = '/smilemail',
    MOSAIC = '/mosaic',
    BIRDWELL = '/birdwell',
    ABOUT = '/about',
    TASC_MPX_DEV = '/tasc-mpx-dev',
    GRAPHICS = '/graphics-town',
    CAPTAIN_SERVICE = '/captain-service'
}
