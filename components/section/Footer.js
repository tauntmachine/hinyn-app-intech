import styled from '@emotion/styled';
import Link from 'next/link';

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  color: #555555;
  box-shadow: 0px 3px 30px #00000029;
  height: 4rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fdfdfd;
`;
const List = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const Item = styled.li`
  list-style-type: none;

  &:hover {
    color: #eb4c60;
    cursor: pointer;
  }
`;

const footerData = [
  {
    name: '@2022 Hey I Need You Now',
    link: '/',
  },
  {
    name: 'Privacy',
    link: '/Privacy',
  },
  {
    name: 'Terms and Conditions',
    link: '/TermsAndConditions',
  },
  {
    name: 'User Agreement',
    link: '/UserAgreement',
  },
  {
    name: 'Why HINYN',
    link: '/whyHinyn',
  },
  {
    name: 'Contact Us',
    link: '/contactUs',
  },
];

function Footer() {
  return (
    <FooterContainer>
      <List>
        {footerData.map((item, idx) =>
          idx > 0 ? (
            <Link href={item.link} key={idx} passHref legacyBehavior>
              <a>
                <Item>{item.name}</Item>
              </a>
            </Link>
          ) : (
            <span key={idx}>{item.name}</span>
          )
        )}
      </List>
    </FooterContainer>
  );
}

export default Footer;
