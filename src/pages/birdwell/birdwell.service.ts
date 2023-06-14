const baseUrl = `${process.env.REACT_APP_gcpImageBucket}/Birdwell/`;
export enum BirdwellMediaUrls {
    BirdwellLogo = 'birdwellIcon.png',
}

export function getMediaUrl(media: BirdwellMediaUrls): string {
    return `${baseUrl}${media}`;
}
