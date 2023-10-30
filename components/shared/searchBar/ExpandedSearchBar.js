import styled from '@emotion/styled';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import DetailsSection from './DetailsSection';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { getCategories } from '../../forms/formService';
import { useFreelancer } from '../../../src/store';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ebebeb;
  border-radius: 50px;
  margin: auto;
  width: max-content;
  margin-top: 1rem;
  transition: all 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
  }

  &:has(.active) {
    background: #eee;
  }
`;
const SearchOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 19px 25px;
  min-width: 12.6rem;
  transition: all 0.5s ease-in-out;
  border-radius: 50px;
  font-size: 15px;
  fontweight: 50px;

  &:hover {
    // background: #f8f8f8;
    // border: 1px solid #eb4c60;
    // paddingvertical: 20px;
    // box-shadow: 0px 3px 6px #eb4c603c;
  }

  &.active {
    background: #f8f8f8;
    border: 1px solid #eb4c60;
    box-shadow: 0px 3px 6px #eb4c603c;
  }

  .pretitle {
    font-size: 12px;
  }

  .value {
    color: #c4c4c4;

    &.active {
      color: #eb4c60;
    }
  }
`;
const VerticalDivider = styled.div`
  height: 36px;
  width: 1px;
  background: #dbd9d9;
`;
const TextEx = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #5d5d5d;
`;
const CustomSearchIcon = styled(FiSearch)`
  color: #ffffff;
`;
const SearchIconContainer = styled.div`
  background: linear-gradient(135deg, #ff5a5f 0%, #a52226 100%);
  box-shadow: 0px 3px 6px #eb4c6072;
  border-radius: 50%;
  padding: 4px 4px 0;
  margin: 0 30px;
  transform: scale(2);
`;

const items = [
  {
    key: 'categories',
    pretitle: 'Category',
    value: 'I am looking for',
  },
  {
    key: 'skills',
    pretitle: 'Skills',
    value: 'Expertise',
  },
  {
    key: 'location',
    pretitle: 'Where',
    value: 'United Arab Emirates',
  },
  {
    key: 'budget',
    pretitle: 'Budget',
    value: 'Hourly Rate',
  },
];

function ExpandedSearchBar({ handleCloseExpandedSearchBar }) {
  const [currentExpanded, setCurrentExpanded] = useState(null);
  const [showDetailsSection, setShowDetailsSection] = useState(false);
  const [userSelectedDetails, setUserSelectedDetails] = useState(true);
  const { freelancer, filter, setFilter } = useFreelancer();

  const toggleDetailsSection = (key) => {
    setCurrentExpanded(key);
    if (!showDetailsSection) setShowDetailsSection(() => true);
    if (currentExpanded === key && showDetailsSection)
      setShowDetailsSection(() => false);
  };

  const handleUserSelectedDetails = (details) => {
    setUserSelectedDetails((prev) => {
      return {
        data: { ...prev.data, ...details },
      };
    });
  };

  const handleSubmit = () => {
    setFilter({
      category: userSelectedDetails?.data?.categories
        ? userSelectedDetails?.data?.categories.key
        : '',
      skill: '',
      location: userSelectedDetails?.data?.location
        ? userSelectedDetails?.data?.location.key
        : '',
      budget: '',
    });
    setShowDetailsSection(() => false);
    // handleCloseExpandedSearchBar(false)
  };

  const showValue = (key, orig) => {
    if (key === 'categories' && userSelectedDetails)
      return <span className="value active"> {userSelectedDetails} </span>;
    if (key === 'location' && userSelectedDetails)
      return <span className="value active">{userSelectedDetails} </span>;
    if (key === 'budget' && userSelectedDetails)
      return <span className="value active">{userSelectedDetails} </span>;
    return orig;
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <SearchContainer>
        {items &&
          items.map((item, idx) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }} key={item.key}>
              <SearchOptionContainer
                onClick={() => toggleDetailsSection(item.key)}
                className={item.key === currentExpanded ? 'active' : ''}
              >
                <TextEx>{item.pretitle}</TextEx>
                {/* {userSelectedDetails ? (
                  showValue(item.key, item.value)
                ) : ( */}
                <span className="value">{item.value}</span>
                {/* )} */}
              </SearchOptionContainer>
              {idx < items.length - 1 ? <VerticalDivider /> : null}
            </Box>
          ))}
        <SearchIconContainer>
          <CustomSearchIcon onClick={() => handleSubmit()} />
        </SearchIconContainer>
      </SearchContainer>
      {showDetailsSection ? (
        <DetailsSection
          type={currentExpanded}
          onHandleUserSelectedDetails={handleUserSelectedDetails}
        />
      ) : null}
    </Box>
  );
}

export default ExpandedSearchBar;
