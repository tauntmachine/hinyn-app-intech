import { Box, Typography,Grid, Container} from "@mui/material";
import { useState } from "react";
import styled from "@emotion/styled";
import { MdKeyboardBackspace } from "react-icons/md";
import Text, { SmallText } from "../shared/Typography";

const HeaderContainer = styled.div`
  background: #4AA398;
  color: #ffffff;
  box-shadow: inset 0px 3px 20px #00000029;
  padding: 54px 0;
  display: flex;
  flex-direction: column;
  min-height:19rem;
`

const BackIcon = styled(MdKeyboardBackspace)`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`

const BackText = styled.div`
  font-size: 12px;
  font-weight: 600;
`

const VerticalDivider = styled.div`
  height: 1rem;
`
const ContentBoxWrapper = styled(Box)`
  position:absolute;
  left: 0;
  right:0;
  margin: auto;
  top:7rem;
`

const ContentBox = styled.div`
  background: #ffffff;
  border-radius: 15px;

  &.title-wrapper{
    border-radius: 15px 15px 0 0;
    border-bottom: 1px solid #4AA398;
  }

`

const TitleWrapper = styled.div`
  padding: 2.5rem 5rem 0 2.5rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Row = styled(Box)`
  display: flex;
`

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    text-align: center;
    gap:20px;
    position: relative;
`

const TabItem = styled.div`
    cursor: pointer;
    padding: 0 1rem 1rem;


    &.active{
        border-bottom: 2px solid #4AA398;
        color: #4AA398;
    }
`


const Title = styled(Text)`
  font-size: 32px;
`


const ProjectDetailsSection = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = ['Details', 'Proposals'];

 const projectDetails = {
  id: "1235670808857",
  title: "Kate and Joe's Wedding",
  bid: {
    min: 500,
    max: 600,
    currency: 'USD',
    endDate: '10/01/2023'
  },
 }
  return (
    <Box sx={{background:'#EBEBEB', height:'auto', minHeight:'90vh', position:'relative'}}>
      <HeaderContainer>
        <Container sx={{display:'flex'}}>
          <BackIcon />
           <BackText>Back to Projects</BackText>
        </Container>
      </HeaderContainer>
      <ContentBoxWrapper>
        <Container>
            <Grid container columnSpacing={1}>
                <Grid item xs={8}>
                  <ContentBox className="title-wrapper">
                    <TitleWrapper>
                      <Box>
                          <Row sx={{justifyContent:'space-between'}}>
                              <Title color="red">{projectDetails?.title}</Title>
                              <Column>
                                  <Text color="green">{projectDetails?.bid?.min} - {projectDetails?.bid?.max} {projectDetails?.bid?.currency}</Text>
                                  <Text>{projectDetails?.bid.endDate}</Text>
                              </Column>
                          </Row>
                          <VerticalDivider />
                          <Row>
                            <SmallText>Project ID {projectDetails?.id}</SmallText>
                          </Row>
                      </Box>
                      <Row>
                        <Tabs>
                          {tabs?.map((item,idx)=>{
                            return <TabItem key={'tab-'+idx} className={idx===currentTab ? "active" : ""} onClick={()=>setCurrentTab(idx)}>{item}</TabItem>
                          })
                          }
                        </Tabs>
                      </Row>
                    </TitleWrapper>
                  </ContentBox>
                </Grid> 
                <Grid item xs={4}>
                  <ContentBox>
                    right box
                  </ContentBox>
                </Grid>
            </Grid>
        </Container>
      </ContentBoxWrapper>
    </Box>
  )
}

export default ProjectDetailsSection