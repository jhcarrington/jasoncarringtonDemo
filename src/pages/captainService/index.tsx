import { ReactElement } from 'react';
import DemoVideo from '../../components/DemoVideo/DemoVideo';
import { CaptainServiceUrls, getMediaUrl } from '../../utils';

export default function CaptainService(): ReactElement {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ textAlign: 'left' }}>
        <img
          src={getMediaUrl(CaptainServiceUrls.CaptainServiceIcon)}
          alt="Captain Service Icon"
          style={{ objectFit: 'contain', width: '2rem' }}
        ></img>

        <div style={{ textAlign: 'center', fontSize: 20, flex: 1 }}>
          Captain Service
        </div>
      </div>
      <hr></hr>
      <div>
        <i>Developed by Jason Carrington and Birdwell Solutions.</i>
        <p>
          An uber like application for service workers like mechanics,
          electricians and plumbers. Who can serve customer tickets using
          Captain Service&apos;s technician finder algorithm.
        </p>
        <p>The last 2 demo videos show the ticket process.</p>
        <p>
          <b>{'Programming language: '}</b>
          Javascript + TypeScript
          <div></div>
          <b>{'Programming environment: '}</b>
          React Native and ExpressJS
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <div
            style={{
              border: '1px solid grey',
              padding: 10,
            }}
          >
            <b>Skills gained</b>
            <p>
              <li>Animated User Interface</li>
              <li>Socket IO, backend and frontend</li>
              <li>Stripe (payments, express accounts, test environment)</li>
              <li>3 different user types within 1 application</li>
              <li>Maps & geolocation APIs</li>
            </p>
          </div>
        </div>
        <b>DEMOS</b>
        <div style={{ textAlign: 'center' }}>
          <DemoVideo
            demos={[
              {
                title: 'Provider signs up and sets up stripe express account',
                src: getMediaUrl(
                  CaptainServiceUrls.ProviderSignupAndStripeAccount,
                ),
              },
              {
                title: 'Provider configures their account',
                src: getMediaUrl(CaptainServiceUrls.ProviderSetupAccount),
              },
              {
                title: 'Provider gets the technician signup link',
                src: getMediaUrl(
                  CaptainServiceUrls.ProviderCopyTechnicianSignupLink,
                ),
              },
              {
                title: 'Technician signs up with link and sets up account',
                src: getMediaUrl(
                  CaptainServiceUrls.DriverSignupAndAccountSetup,
                ),
              },
              {
                title: 'Technician sets industries',
                src: getMediaUrl(
                  CaptainServiceUrls.DriverSetsIndustryFromProviderList,
                ),
              },
              {
                title:
                  'Provider approves driver and sets operating coordinates',
                src: getMediaUrl(CaptainServiceUrls.ProviderApprovesDriver),
              },
              {
                title: 'Technician is approved and sees their operating coords',
                src: getMediaUrl(
                  CaptainServiceUrls.DriverIsApprovedAndHasRadiusAndLocationSet,
                ),
              },
              {
                title: 'Provider gets the customer signup link',
                src: getMediaUrl(CaptainServiceUrls.ProviderCopyCustomerLink),
              },
              {
                title:
                  'Customer signs up with provider link and views their application id',
                src: getMediaUrl(
                  CaptainServiceUrls.CustomerSignupWithProviderLink,
                ),
              },
              {
                title: 'Customer creates a ticket without having a card',
                src: getMediaUrl(
                  CaptainServiceUrls.CustomerCreateTicket_NoCard_CurrentLocation_DriverSeesAddress,
                ),
              },
              {
                title:
                  'Customer creates a ticket with a set address and goes through the completion of a ticket',
                src: getMediaUrl(
                  CaptainServiceUrls.Customer_SetAddress_FullPayment,
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
