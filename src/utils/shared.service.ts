/* eslint-disable no-unused-vars */
const baseUrl = `${process.env.REACT_APP_ImageBucket}/`;
export enum MediaUrls {
  JasonHighlight = 'Jason_Highlight.jpg',
  JasonProfile = 'Jason_Profile.jpg',
  WisconsinLogo = 'wisconsinLogo.jpg',
  UlineLogo = 'Uline/uline.jpg',
  MPXLogo = 'TCB/MPX_DevLogo.png',
  TascLogo = 'TCB/TascLogo.png',
  SmilemailLogo = 'Smilemail/SmilemailLogo.png',
  SmilemailDemo = 'Smilemail/SmilemailDemo.mp4',
  DatamatchDemo = 'Datamatch/DatamatchDemo.mp4',
  DatamatchLogo = 'Datamatch/DatamatchLogo.png',
  BirdwellLogo = 'Birdwell/birdwellIcon.png',
  JohnsonHealthTechLogo = 'JohnsonHealthTech/JHTLogo.jpg',
}

export enum MosaicUrls {
  ChangeTheme = 'Mosaic/ChangeTheme.mp4',
  Collections = 'Mosaic/Collections.mp4',
  CreatePost = 'Mosaic/CreatePost.mp4',
  Login = 'Mosaic/Login.mp4',
  PostActions = 'Mosaic/PostActions.mp4',
  Search = 'Mosaic/Search.mp4',
  MosaicIcon = 'Mosaic/MosaicIcon.png',
}
export enum CaptainServiceUrls {
  CustomerSignupWithProviderLink = 'CaptainService/CustomerSignupWithProviderLink.mov',
  CustomerCreateTicket_DriverSeesLocation = 'CaptainService/CustomerCreateTicket_DriverSeesLocation.mov',
  Customer_SetAddress_FullPayment = 'CaptainService/Customer_SetAddress_FullPayment.mov',
  DriverIsApprovedAndHasRadiusAndLocationSet = 'CaptainService/DriverIsApprovedAndHasRadiusAndLocationSet.mov',
  ProviderSetupAccount = 'CaptainService/ProviderSetupAccount.mov',
  ProviderCopyTechnicianSignupLink = 'CaptainService/ProviderCopyTechnicianSignupLink.mov',
  ProviderCopyCustomerLink = 'CaptainService/ProviderCopyCustomerLink.mov',
  ProviderApprovesDriver = 'CaptainService/ProviderApprovesDriver.mov',
  DriverSignupAndAccountSetup = 'CaptainService/DriverSignupAndAccountSetup.mov',
  DriverSetsIndustryFromProviderList = 'CaptainService/DriverSetsIndustryFromProviderList.mov',
  ProviderSignupAndStripeAccount = 'CaptainService/ProviderSignupAndStripeAccount.mov',
  CustomerCreateTicket_NoCard_CurrentLocation_DriverSeesAddress = 'CaptainService/CustomerCreateTicket_NoCard_CurrentLocation_DriverSeesAddress.mov',
  CaptainServiceIcon = 'CaptainService/CSIcon.png',
}

export function getMediaUrl(
  media: MediaUrls | MosaicUrls | CaptainServiceUrls,
): string {
  return `${baseUrl}${media}`;
}
