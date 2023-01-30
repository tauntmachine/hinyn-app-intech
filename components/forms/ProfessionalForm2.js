import { useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { BackIcon, SearchIcon, RightArrowIcon } from '../shared/Icon';
import ScrollableTable from '../shared/ScrollableTable';
import { updateClientData } from './formService';

const StyledButton = styled(Button)``;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ORLine = styled.div`
  color: #b7b7b7;
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  align-items: center;
  text-align: center;
`;

const HR = styled.div`
  border-bottom: 1px solid #b7b7b750;
`;

const categories = {
  data: [
    {
      key: 'photographer',
      icon: 'icn-photographer.svg',
      title: 'Photographer',
    },
    {
      key: 'videographer',
      icon: 'icn-videographer.svg',
      title: 'Videographer',
    },
    {
      key: 'editor',
      icon: 'icn-editor.svg',
      title: 'Editor',
    },
    {
      key: 'stylist',
      icon: 'icn-stylist.svg',
      title: 'Stylist',
    },
    {
      key: 'makeup-artist',
      icon: 'icn-makeupArtist.svg',
      title: 'Makeup Artists',
    },
    {
      key: 'hair-stylist',
      icon: 'icn-makeupArtist-1.svg',
      title: 'Hair Stylists',
    },
    {
      key: 'model',
      icon: 'icn-hairStylist.svg',
      title: 'Models',
    },
    {
      key: 'studio-location',
      icon: 'icn-models.svg',
      title: 'Studio/Location',
    },
  ],
};

const category_skills = {
  data: [
    {
      key: 'photographer',
      skills: [
        'Fashion',
        'Beauty',
        'Lifestyle',
        'Corporate',
        'E-commerce',
        'Watches / Jewelry',
        'Products',
        'Cars',
        'Sports',
        'Wedding',
        'Event',
        'Kids / Baby',
        'Animal',
        'Architecture / Real estate',
        'Food',
        'Other',
      ],
    },
    {
      key: 'videographer',
      skills: [
        'Drone operator',
        'Fashion',
        'Beauty',
        'Lifestyle',
        'Corporate',
        'E-commerce',
        'Watches / Jewelry',
        'Products',
        'Cars',
        'Sports',
        'Wedding',
        'Event',
        'Kids / Baby',
        'Animal',
        'Architecture / Real estate',
        'Food',
        'Other',
      ],
    },
    {
      key: 'editor',
      skills: ['General', 'Special effects', 'Animation / 3D', 'Other'],
    },
    {
      key: 'stylist',
      skills: [
        'Fashion',
        'Beauty',
        'Lifestyle',
        'Sports',
        'E-commerce',
        'Watches / Jewelry',
        'Wedding',
        'Event',
        'Kids / Baby',
        'Other',
      ],
    },
    {
      key: 'makeup-artist',
      skills: [
        'Cinema',
        'Fashion',
        'Beauty',
        'Lifestyle',
        'E-commerce',
        'Wedding',
        'Event',
        'Kids / Baby',
        'Other',
      ],
    },
    {
      key: 'hair-stylist',
      skills: [
        'Cinema',
        'Fashion',
        'Beauty',
        'Lifestyle',
        'E-Commerce',
        'Wedding',
        'Event',
        'Kids / Baby',
        'Other',
      ],
    },
    {
      key: 'model',
      skills: [
        'Fashion',
        'Beauty',
        'Lifestyle',
        'E-commerce',
        'Watches / Jewelry',
        'Cars',
        'Sports',
        'Wedding',
        'Event',
        'Kids / Baby',
        'Other',
      ],
    },
    {
      key: 'studio-location',
      skills: ['Studio', 'House', 'Restaurant', 'Other'],
    },
  ],
};

function ProfessionalForm2({ handleNextClick }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categorySkills, setCategorySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const onCategoryClick = (category) => {
    setSelectedCategory(() => category);
    getCategorySkills(category);
    setSelectedSkills(()=>[])
  };

  const onSkillClick = (category) => {
    if (selectedSkills.find((skill) => skill === category))
      setSelectedSkills((prevData) =>
        prevData.filter((skill) => skill !== category)
      );
    else setSelectedSkills((prevData) => prevData.concat(category));
  };

  const [isValid, setValid] = useState({
    category: false,
    //   "lastname":false,
    form: true,
  });
  const [errorMessage, setErrorMessage] = useState({
    category: null,
    // "lastname":null,
  });
  const categoryInputRef = useRef();
  // const lastnameInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredCategory = categoryInputRef.current.value;
    // const enteredLastname = lastnameInputRef.current.value;

    if (enteredCategory && enteredCategory !== '') {
      isValid.form = true;
    }

    if (isValid.form) {
      const clientData = {
        categories: selectedCategory
      };
      const clientId = localStorage.getItem('hinyn-cid');
      updateClientData(clientData,clientId).then((res)=>{
        console.log('res',res)
        // if(res) handleNextClick(true);
      });
    } else {
      setOpen(true);
    }
  }

  function getCategorySkills(category) {
    setCategorySkills(() =>
      category_skills.data.filter((res) => res.key === category.key)
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ marginBottom: '2rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Typography component="h1" variant="h4">
            <b>Tell us what you do</b>
          </Typography>
          <Typography component="p" align="center">
            Tell us your top skills. This helps us recommend jobs for you.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  fullWidth
                  id="category"
                  name="category"
                  placeholder='Try "photography"'
                  inputRef={categoryInputRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {errorMessage.firstname && (
                  <Error>{errorMessage.firstname}</Error>
                )}
              </Grid>
            </Grid>
            <ORLine>
              <HR />
              or
              <HR />
            </ORLine>
          </Box>
        </FormContainer>
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
          <Grid item xs={12} md={4}>
            <ScrollableTable
              data={categories.data}
              title="Select a Category"
              startAdornment={'icon'}
              endAdornment={'right-arrow'}
              type="categories"
              onCategoryClick={onCategoryClick}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ScrollableTable
              data={categorySkills[0]?.skills}
              title="Select Skills for Category"
              type="category_skills"
              category={selectedCategory}
              onSkillClick={onSkillClick}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ScrollableTable
              data={selectedSkills}
              title={selectedSkills.length + ' Skills Selected'}
            />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <ButtonContainer>
          <Text>
            <BackIcon isabsolute={false} />
            <span style={{ marginLeft: '1rem' }}>Go Back</span>
          </Text>
          <StyledButton onClick={submitHandler}>NEXT</StyledButton>
        </ButtonContainer>
      </Container>

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        <div>Oops! All fields are required.</div>
      </Modal>
    </>
  );
}

export default ProfessionalForm2;
