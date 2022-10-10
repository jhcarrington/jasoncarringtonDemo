const baseUrl = `${process.env.REACT_APP_gcpImageBucket}/TCB/`;
export enum TCBMediaUrls {
    MPXLogo = 'MPX_DevLogo.png',
    TascLogo = 'TascLogo.png',
}

export function getMediaUrl(media: TCBMediaUrls) {
    return `${baseUrl}${media}`;
}