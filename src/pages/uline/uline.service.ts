const baseUrl = `${process.env.REACT_APP_gcpImageBucket}/Uline/`;
export enum UlineMediaUrls {
    UlineLogo = 'uline.jpg',
}

export function getMediaUrl(media: UlineMediaUrls) {
    return `${baseUrl}${media}`;
}