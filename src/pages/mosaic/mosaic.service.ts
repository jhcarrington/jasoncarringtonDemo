const baseUrl = `${process.env.REACT_APP_gcpImageBucket}/Mosaic/`;
export enum MosaicMediaUrls {
    ChangeTheme = 'ChangeTheme.mp4',
    Collections = 'Collections.mp4',
    CreatePost = 'CreatePost.mp4',
    Login = 'Login.mp4',
    PostActions = 'PostActions.mp4',
    Search = 'Search.mp4',
    MosaicIcon = 'MosaicIcon.png',
}

export function getMediaUrl(media: MosaicMediaUrls): string {
    return `${baseUrl}${media}`;
}
