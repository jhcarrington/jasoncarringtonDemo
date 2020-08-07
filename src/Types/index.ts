export type LanguageStat = {
    name:String, 
    color:String, 
    time:[TimeObject],
    dataLabel:String, 
    knowledge:Number, 
    Created_date: Date
}
export type TimeObject = {
    time: Number,
    Created_date: Date,
    _id: String
}