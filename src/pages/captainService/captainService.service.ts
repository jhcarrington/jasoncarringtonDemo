const baseUrl = `${process.env.REACT_APP_gcpImageBucket}/CaptainService/`;
export enum CaptainServiceMediaUrls {
    CustomerSignupWithProviderLink = 'CustomerSignupWithProviderLink.mov',
    CustomerCreateTicket_DriverSeesLocation = 'CustomerCreateTicket_DriverSeesLocation.mov',
    Customer_SetAddress_FullPayment = 'Customer_SetAddress_FullPayment.mov',
    DriverIsApprovedAndHasRadiusAndLocationSet = 'DriverIsApprovedAndHasRadiusAndLocationSet.mov',
    ProviderSetupAccount = 'ProviderSetupAccount.mov',
    ProviderCopyTechnicianSignupLink = 'ProviderCopyTechnicianSignupLink.mov',
    ProviderCopyCustomerLink = 'ProviderCopyCustomerLink.mov',
    ProviderApprovesDriver = 'ProviderApprovesDriver.mov',
    DriverSignupAndAccountSetup = 'DriverSignupAndAccountSetup.mov',
    DriverSetsIndustryFromProviderList = 'DriverSetsIndustryFromProviderList.mov',
    ProviderSignupAndStripeAccount = 'ProviderSignupAndStripeAccount.mov',
    CustomerCreateTicket_NoCard_CurrentLocation_DriverSeesAddress = 'CustomerCreateTicket_NoCard_CurrentLocation_DriverSeesAddress.mov',
    CaptainServiceIcon = 'CSIcon.png',
}

export function getMediaUrl(media: CaptainServiceMediaUrls) {
    return `${baseUrl}${media}`;
}