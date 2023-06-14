const baseUrl = `${process.env.REACT_APP_gcpImageBucket}/Smilemail/`;
export enum SmilemailMediaUrls {
    SmilemailLogo = 'SmilemailLogo.png',
    SmilemailDemo = 'SmilemailDemo.mp4',
}

export function getMediaUrl(media: SmilemailMediaUrls): string {
    return `${baseUrl}${media}`;
}
