import Header from '../components/section/Header';
import Footer from '../components/section/Footer';
import styled from '@emotion/styled';
import { Grid, Container, Box } from '@mui/material';
import Text, { GrayText } from '../components/shared/Typography';
import {
  EmailIcon,
  ImageIcon,
  LocationIcon,
  TelephoneIcon,
} from '../components/shared/Icon';
import ContactUsForm from '../components/forms/ContactUsForm';

const Row = styled(Box)`
  display: flex;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Title = styled(Text)`
  font-size: 56px;
  font-weight: 600;
  line-height: 1.25;

  .red {
    color: #eb4c60;
  }

  .green {
    color: #4aa398;
  }
`;

const Subtitle = styled(Text)`
  font-size: 16px;
  margin-top: 1.5rem;
  letter-spacing: 0.75px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 1.5rem;
  width: 16rem;
  height: auto;
  background: #ffffff;
  border-radius: 13px;
  filter: drop-shadow(0px 3px 30px #9393931a);
  flex-basis: 35%;

  &.projects-card {
    padding: 0;

    &:hover {
      box-shadow: 0px 3px 20px #0000004b;
    }
  }
`;

const CustomImageIcon = styled(ImageIcon)`
  color: ${(props) => (props?.variant === 'green' ? '#4AA398' : '#EB4C60')};
  font-size: ${(props) => (props?.sz === 'large' ? '3rem' : '2rem')};
`;
const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 45rem;
  height: 48rem;
  position: relative;
  overflow: hidden;
`;

const BGBox = styled(Box)`
  background: ${(props) => (props.color === 'white' ? '#ffffff' : '#f7f7f7')};
  padding: 5rem 0 7rem 0;
  width: 100%;
  height: 100%;
`;

const contactDetails = [
  {
    desc: 'info@hinyn.com',
  },
  {
    desc: '123 Main Street, Business Bay, Dubai, United Arab Emirates.',
  },
  {
    desc: '+971 50 123 4567',
  },
];

function contactUs() {
  let imgpath = '/assets/img/';
  return (
    <>
      <Header />
      <BGBox>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={6}>
              <Column>
                <Text color="red">
                  <b>CONTACT US</b>
                </Text>
                <Title>
                  We&apos;re <span class="red">excited</span> to <br />
                  hear from you!
                </Title>
                <Box maxWidth="sm">
                  <Subtitle>
                    Hey there! We&apos;d love to hear from you - go ahead and
                    fill out our form, and we promise to get back to you within
                    24 hours
                  </Subtitle>
                </Box>
                <Row
                  sx={{ flexWrap: 'wrap', gap: '1.25rem', marginTop: '2.5rem' }}
                >
                  <Column sx={{ marginTop: '2.5rem', gap: '3rem' }}>
                    {contactDetails &&
                      contactDetails.map((item, idx) => {
                        return (
                          <Row
                            key={'project-desc-' + idx}
                            sx={{ gap: '1rem', alignItems: 'center' }}
                            maxWidth="sm"
                          >
                            <Text sx={{ fontSize: '25px !important' }}>
                              {idx === 0 ? (
                                <EmailIcon variant="red" />
                              ) : idx === 1 ? (
                                <LocationIcon variant="red" />
                              ) : (
                                <TelephoneIcon variant="red" />
                              )}
                            </Text>
                            <Text> {item?.desc} </Text>
                          </Row>
                        );
                      })}
                  </Column>
                </Row>
              </Column>
            </Grid>
            <Grid item xs={5}>
              <Row
                sx={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #D8D8D8',
                }}
              >
                <ContactUsForm />
              </Row>
            </Grid>
          </Grid>
        </Container>
      </BGBox>
      <Footer />
    </>
  );
}

export default contactUs;
