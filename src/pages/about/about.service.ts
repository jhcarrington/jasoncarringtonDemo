const baseUrl = `${process.env.REACT_APP_gcpImageBucket}/About/`;
export enum AboutMediaUrls {
    WisconsinLogo = 'wisconsinLogo.jpg',
}

export function getMediaUrl(media: AboutMediaUrls) {
    return `${baseUrl}${media}`;
}