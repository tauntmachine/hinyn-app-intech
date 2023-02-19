import Header from '../components/section/Header';
import Footer from '../components/section/Footer';
import styled from "@emotion/styled";
import { Grid, Container, Box} from '@mui/material';
import Text from '../components/shared/Typography';
import { ImageIcon, RightArrowIcon } from '../components/shared/Icon';
import Image from 'next/image';
import Button from '../components/shared/Button';


const Row = styled(Box)`
  display: flex;
`

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`

const Title = styled(Text)`
    font-size: 56px;
    font-weight: 600;

    .red{
      color: #EB4C60;
    }

    .green{
      color: #4AA398;
    }
`

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
  filter: drop-shadow(0px 3px 30px #9393931A);
  flex-basis: 35%;

  &.projects-card{
    padding: 0;

    &:hover{
      box-shadow: 0px 3px 20px #0000004B;
    }
  }
`

const CustomImageIcon = styled(ImageIcon)`
  color: ${props => props?.variant === 'green' ? '#4AA398' : '#EB4C60'};
  font-size: ${props => props?.sz === 'large' ? '3rem' : '2rem'};
`

const ImageContainer = styled.div`
  width: 35rem;
  height: 38rem;
  position: relative;
  border-radius: 18px;
  box-shadow: 0px 3px 20px #0000004B;
  overflow: hidden;

  &.projects-img-box{
    width: 100%;
    height:12rem;
    border-radius: 16px 16px 0 0;
    box-shadow: none;
  }
`;

const BGBox = styled(Box)`
  background:${props => props.color === 'white' ? "#ffffff" : "#f7f7f7"};
  padding: 5rem 0 7rem 0;
  width: 100%;
  height: 100%;
`
const RoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
   background: #ECF6F5;
   border-radius: 50%;
   padding: 3.25rem;
   width: 19rem;
   height: 19rem;
`

const cardData = [
  {
    title: "Browse portfolios",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Quality work",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Fast bids",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Track Progress",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
];

const hiringData = [
  {
    title: "Browse portfolios",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Quality work",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Fast bids",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

const projectsData = [
  {
    title: "Browse portfolios",
    desc: "John Doe",
    img: 'why-card-img1.jpeg'
  },
  {
    title: "Quality work",
    desc: "John Doe",
    img: 'why-card-img2.jpeg'
  },
  {
    title: "Fast bids",
    desc: "John Doe",
    img: 'why-card-img3.jpeg'
  },
  {
    title: "Fast bids",
    desc: "John Doe",
    img: 'why-card-img4.jpeg'
  }
];

const professionalData = [
  {
    title: "Browse portfolios",
    desc: "Find professionals you can trust by browsing their samples of previous work and reading their profile reviews."
  },
  {
    title: "Quality work",
    desc: "Find professionals you can trust by browsing their samples of previous work and reading their profile reviews."
  },
  {
    title: "Fast bids",
    desc: "Find professionals you can trust by browsing their samples of previous work and reading their profile reviews."
  }
];



function whyHinyn() {
  let imgpath = '/assets/img/';
  return (
    <>
    <Header />
    <BGBox>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={7}>
            <Column>
              <Text color="red"><b>FOR CLIENTS</b></Text>
              <Title>Find <span class="red">talent</span> your way</Title>
              <Box maxWidth="sm">
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>Pellentesque tempus arcu et ipsum cursus dignissim.</Text>
              </Box>
              <Row sx={{flexWrap:'wrap',gap:'1.25rem',marginTop:'2.5rem'}}>
                { cardData && cardData.map((item,idx)=>{
                  return <Card key={'why-card-'+idx}>
                    <CustomImageIcon />
                    <Text color="green"> {item?.title} </Text>
                    <Text align="center"> {item?.desc} </Text>
                  </Card>
                })}
              </Row>
            </Column>
          </Grid>
          <Grid item xs={4}>
            <Row>
                <ImageContainer className="icon-img-box">
                    <Image
                      src={imgpath + 'why-img1.png'}
                      layout="fill"
                      className="icon-img"
                      alt="icon-img"
                    />
                </ImageContainer>
            </Row>
          </Grid>
        </Grid>
      </Container>
    </BGBox>
    <BGBox color="white">
      <Container maxWidth="xl">
          <Row sx={{justifyContent: 'center'}}>
            <Title>Hiring made easy</Title>
          </Row>
          <Row sx={{justifyContent: 'center'}}>
            <Box maxWidth="sm">
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>Pellentesque tempus arcu et ipsum cursus dignissim.</Text>
            </Box>
            </Row>
          <Row sx={{justifyContent: 'space-around', marginTop:'5rem' }}>
            {hiringData && hiringData.map((item,idx)=>{
              return  <RoundContainer key={'hiring-desc-'+idx}>
                        <Text color="green"><b>{item?.title}</b></Text>
                        <Text align="center">{item?.desc}</Text>
                      </RoundContainer>
            })}
           
          </Row>
          <Row sx={{justifyContent:'center',marginTop:'5rem'}}>
            <Button>Join Now</Button>
          </Row>
      </Container>
    </BGBox>
    <BGBox>
      <Container maxWidth="xl">
      <Row sx={{justifyContent:'space-between',alignItems:'center'}}>
         <Title>Get inspired with projects made with us</Title>
         <Text color="red">
            Browse more
            <RightArrowIcon color="red"/>
         </Text>
      </Row>
      <Row sx={{gap:'2rem',marginTop:'2rem'}}>
        {
          projectsData && projectsData.map((item,idx)=>{
            return <Card key={'project-card-'+idx} className="projects-card">
                 <ImageContainer className="projects-img-box">
                    <Image
                        src={imgpath + item?.img}
                        layout="fill"
                        alt="project-img"
                      />
                  </ImageContainer>
                  <Column sx={{width:'100%',padding:'1.25rem'}}>
                    <Text>{item?.title}</Text>
                    <Text>by {item?.desc}</Text>
                  </Column>
            </Card>
          })
        }
      </Row>
      </Container>
    </BGBox>
    <BGBox color="white">
      <Container maxWidth="xl">
        <Grid container>
        <Grid item xs={6}>
            <Row>
                <ImageContainer className="icon-img-box">
                    <Image
                      src={imgpath + 'why-img1.png'}
                      layout="fill"
                      className="icon-img"
                      alt="icon-img"
                    />
                </ImageContainer>
            </Row>
          </Grid>
          <Grid item xs={6}>
            <Column>
              <Text color="green"><b>FOR PROFESSIONALS</b></Text>
              <Title>Find <span class="green">great</span> work</Title>
              <Box maxWidth="sm">
                <Text>Meet clients you&apos;re excited to work with and take your career or busoiness to new heights.</Text>
              </Box>
              <Column sx={{marginTop:'2.5rem',gap:'3rem'}}>
                { professionalData && professionalData.map((item,idx)=>{
                  return <Row key={'project-desc-'+idx} sx={{gap:'2rem',alignItems:'center'}} maxWidth="sm">
                    <CustomImageIcon variant="green" sz="large"/>
                    <Text> {item?.desc} </Text>
                  </Row>
                })}
              </Column>
              <Row sx={{marginTop:'4rem'}}>
                <Button>Join Now</Button>
              </Row>
            </Column>
          </Grid>
        </Grid>
      </Container>
    </BGBox>
    <Footer/>
  </>
  )
}

export default whyHinyn