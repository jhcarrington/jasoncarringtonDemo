export type LanguageStat = {
    name:string, 
    color:string, 
    time:[TimeObject],
    dataLabel:string, 
    knowledge:number, 
    Created_date: Date
}
export type TimeObject = {
    time: number,
    Created_date: Date,
    _id: string
}

export type GpaStat = {
    outof: number, 
    title: string, 
    score: number
}