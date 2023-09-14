import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { UserIcon } from './Icon';

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Header = styled.div`
  background: ${(props) =>
    props.headerColor === 'gray'
      ? '#DEDEDE'
      : props.headerColor === 'red'
      ? '#FF5A5F'
      : '#4AA398'};
  background: ${(props) => props.headerColor === 'darkGray' && '#949494'};
  color: ${(props) => (props.headerColor === 'gray' ? '#555555' : '#ffffff')};
  font-weight: 600;
  border-radius: 13px 13px 0 0;
  padding: 18px 32px;
  display: flex;
  column-gap: 16px;
`;

const Main = styled.div`
  background: #ffffff;
  border-radius: ${(props) => (props.hasHeader ? '0 0 13px 13px' : '13px')};
  padding: 32px;
  max-height: ${(props) => (props?.isScrollable ? '30rem' : 'auto')};
  overflow: ${(props) => (props?.isScrollable ? 'auto' : 'hidden')};

  &.no-padding {
    padding: 0;
  }
`;

const UserIconContainer = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #949494 0%, #4a4a4a 100%);

  .icon {
    font-size: 16px;
    color: #ffffff;
  }
`;

const ContentBox = ({
  hasHeader,
  headerColor,
  headerTitle,
  headerIcon,
  hasBodyIcon,
  isScrollable,
  noPadding,
  children,
}) => {
  return (
    <Container>
      {hasHeader && (
        <Header headerColor={headerColor}>
          {headerIcon ?? headerIcon}
          {headerTitle}
        </Header>
      )}
      <Main
        hasHeader={hasHeader}
        className={noPadding === true ? 'no-padding' : ''}
        isScrollable={isScrollable}
      >
        <Grid container>
          {hasBodyIcon ? (
            <>
              <Grid item xs={1}>
                <UserIconContainer>
                  <UserIcon className="icon" />
                </UserIconContainer>
              </Grid>
              <Grid item xs={11}>
                {children}
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              {children}
            </Grid>
          )}
        </Grid>
      </Main>
    </Container>
  );
};

export default ContentBox;
