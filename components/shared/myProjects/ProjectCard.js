import styled from '@emotion/styled';
import { Box, Grid, Container } from '@mui/material';
import breakpoint from '../../utils/Breakpoints';
import Pill from '../Pill';
import Text, { GrayText } from '../Typography';
import { GreenButton } from '../Button';
import { useRouter } from 'next/router';
import moment from 'moment';

const StyledCard = styled.div`
  min-height: 26rem;
  box-shadow: 1px 1px 10px #aaaaaa20;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem;
  row-gap: 0.75rem;
  background-repeat: no-repeat;
  background-position: bottom right;
  user-select: none;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  opacity: ${(props) =>
    props.status === 'cancelled' || props.status === 'completed' ? '0.5' : '1'};

  @media ${breakpoint.device.lg} {
    margin: 0 1rem;
  }
  @media ${breakpoint.device.sm} {
    margin: 0;
  }
  &:hover,
  &:focus {
    box-shadow: 1px 1px 10px #0f766950;
    transition: all 0.3s ease-in-out;
  }
`;

const Row = styled(Box)`
  display: flex;
  width: 100%;
`;

const VerticalDivider = styled.div`
  height: 2rem;
`;

const StyledPill = styled.div`
  //status 1-active
  background: ${(props) =>
    props.status === 'upcoming'
      ? '#ECF6F5'
      : props.status === '1' || props.status === 'active'
      ? '#FDF0EB'
      : props.status === 'completed'
      ? '#FFEEEF'
      : '#F0F0F0'};
  color: ${(props) =>
    props.status === 'upcoming'
      ? '#4AA398'
      : props.status === '1' || props.status === 'active'
      ? '#E96E3F'
      : props.status === 'completed'
      ? '#FF5A5F'
      : '#7D7E7E'};
  border-radius: 13px;
  display: flex;
  padding: 0.5rem 1.25rem;
  font-size: 12px;
`;

const StatusText = styled.div`
  text-transform: capitalize;
`;

const ProjectCard = ({ projectDetail, budget }) => {
  const router = useRouter();

  const showProjectDetails = (projectId) => {
    router.push('/dashboard?screen=details&project=' + projectId);
  };

  const getStatus = (statusNum) => {
    return statusNum === 1
      ? 'active'
      : statusNum === 2
      ? 'upcoming'
      : statusNum === 3
      ? 'completed'
      : 'active';
  };

  const formatDate = (date) => {
    return date ? moment(date).format('DD MMMM YYYY') : '-';
  };

  return (
    <StyledCard status={getStatus(projectDetail.status)}>
      <Row sx={{ justifyContent: 'center' }}>
        <StyledPill status={getStatus(projectDetail.status)}>
          <StatusText> {getStatus(projectDetail.status)} </StatusText>
        </StyledPill>
      </Row>
      <Row>
        <Container maxWidth="md">
          <Text color="red" size="large" align="center">
            {/* <b>{projectDetail.title}</b> */}
            asjdadas
          </Text>
        </Container>
      </Row>
      <Row sx={{ justifyContent: 'center' }}>
        <GrayText size="small">Project ID {12313123123}</GrayText>
      </Row>
      <VerticalDivider />
      <Row sx={{ justifyContent: 'space-between' }}>
        <Text>Price</Text>
        <Text color="green">
          {projectDetail?.attributes.minBudget} - {projectDetail.price} AED
        </Text>
      </Row>
      <Row sx={{ justifyContent: 'space-between' }}>
        <Text>Location</Text>
        <Text color="green">{projectDetail.location}</Text>
      </Row>
      <Row sx={{ justifyContent: 'space-between' }}>
        <Text>Date</Text>
        <Text color="green">{formatDate(projectDetail.date)}</Text>
      </Row>
      <VerticalDivider />
      <Row sx={{ justifyContent: 'center' }}>
        <GreenButton
          variant="outlined"
          onClick={() => showProjectDetails(projectDetail.id)}
          className={projectDetail.id ? 'active' : 'disabled'}
        >
          {' '}
          View Project{' '}
        </GreenButton>
      </Row>
    </StyledCard>
  );
};

export default ProjectCard;
