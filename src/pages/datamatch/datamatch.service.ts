const baseUrl = `${process.env.REACT_APP_gcpImageBucket}/Datamatch/`;
export enum DatamatchMediaUrls {
    DatamatchDemo = 'DatamatchDemo.mp4',
    DatamatchLogo = 'DatamatchLogo.png',
}

export function getMediaUrl(media: DatamatchMediaUrls) {
    return `${baseUrl}${media}`;
}