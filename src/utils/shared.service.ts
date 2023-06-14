const baseUrl = `${process.env.REACT_APP_gcpImageBucket}/`;
export enum MediaUrls {
    JasonPicture = 'jasonPicture.JPG',
}

export function getMediaUrl(media: MediaUrls): string {
    return `${baseUrl}${media}`;
}
