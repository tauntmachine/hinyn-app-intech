import { useEffect, useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Container,
  InputAdornment,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField from '../shared/Textfield';
import { SearchIcon } from '../shared/Icon';
import ScrollableTable from '../shared/ScrollableTable';
import {
  addProfessionalCategoriesData,
  getCategories,
  getSkills,
  updateClientData,
} from './formService';
import { categoriesForm, categorySkill } from '../models/filters.models';
import ScrollableTable2 from '../shared/ScrollableTable2';

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
  margin: 0 0 20px 105rem;
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
const Mainc = styled.div`
  margin-bottom: 20px;
`;

function CategorySkills({ handleNextClick }) {
  // const [open, setOpen] = useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [skills, setSkills] = useState([]);
  // const [selectedSkills, setSelectedSkills] = useState([
  //   { title: 'Skillset1' },
  //   { title: 'Skillset2' },
  //   { title: 'Skillset3' },
  //   { title: 'Skillset4' },
  //   { title: 'Skillset5' },
  // ]);

  // useEffect(() => {
  //   setCategories(() => []);
  //   getCategories().then((result) => {
  //     if (result?.data) {
  //       result?.data?.data.map((item) => {
  //         let temp = { id: item.id };
  //         setCategories((prev) => prev.concat({ ...item.attributes, ...temp }));
  //       });
  //     }
  //   });
  //   setSkills(() => []);
  //   getSkills().then((result) => {
  //     if (result?.data) {
  //       result?.data?.data.map((item) => {
  //         let temp = { id: item.id };
  //         setSkills((prev) => prev.concat({ ...item.attributes, ...temp }));
  //       });
  //     }
  //   });
  // }, []);

  // const onCategoryClick = (categoryId) => {
  //   setSelectedCategory(() => categoryId);
  //   getCategorySkills(categoryId);
  //   setSelectedSkills(() => []);
  // };

  // const onSkillClick = (selectedSkill) => {
  //   if (selectedSkills.find((skill) => skill?.id === selectedSkill?.id))
  //     setSelectedSkills((prevData) =>
  //       prevData.filter((skill) => skill?.id !== selectedSkill?.id)
  //     );
  //   else setSelectedSkills((prevData) => prevData.concat(selectedSkill));
  // };

  // const [isValid, setValid] = useState({
  //   category: false,
  //   //   "lastname":false,
  //   form: true,
  // });
  // const [errorMessage, setErrorMessage] = useState({
  //   category: null,
  //   // "lastname":null,
  // });
  // const categoryInputRef = useRef();
  // const lastnameInputRef = useRef();

  // function submitHandler(event) {
  //   event.preventDefault();
  //   handleNextClick(true);
  //   const enteredCategory = categoryInputRef.current.value;
  //   // const enteredLastname = lastnameInputRef.current.value;

  //   if (enteredCategory && enteredCategory !== '') {
  //     isValid.form = true;
  //   }

  //   if (isValid.form) {
  //     const clientId = localStorage.getItem('hinyn-cid');
  //     const data = {
  //       categories: [selectedCategory],
  //       skills: selectedSkills.map((skill) => skill.id),
  //     };

  //     updateClientData(data, clientId).then((result) => {
  //       if (result?.data) handleNextClick(true);
  //     });
  //   } else {
  //     setOpen(true);
  //   }
  // }

  // const getCategorySkills = (categoryId) => {
  //   setCategorySkills(() => []);
  //   getSkills(categoryId).then((result) => {
  //     const temp = result?.data?.data?.attributes?.skills?.data ?? [];
  //     temp.map((item) => {
  //       let skillId = { id: item.id };
  //       setCategorySkills((prev) =>
  //         prev.concat({ ...item.attributes, ...skillId })
  //       );
  //     });
  //   });
  // };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [skills, setCategorySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    let catList = [];
    console.log('useEffect');
    getCategories().then((result) => {
      if (result?.data) {
        result?.data?.data.map((item) => {
          let temp = { id: item.id, ...item.attributes };
          // setCategories((prev) => prev.concat({ ...item.attributes, ...temp }));
          catList = [...catList, { ...temp }];
        });
        setCategories(catList);
      }
    });
  }, []);

  const onCategoryClick = (index) => {
    setSelectedCategory(categories[index].id);
    let listSkill = [];
    categories[index]?.skills.data.map((item) => {
      let temp = { id: item.id, ...item.attributes };
      listSkill = [...listSkill, { ...temp }];
    });
    setCategorySkills(listSkill);
    // getCategorySkills(categoryId);
    // setSelectedSkills(() => []);
  };

  const onSkillClick = (selectedSkill) => {
    if (selectedSkills.find((skill) => skill?.id === selectedSkill?.id))
      setSelectedSkills((prevData) =>
        prevData.filter((skill) => skill?.id !== selectedSkill?.id)
      );
    else setSelectedSkills((prevData) => prevData.concat(selectedSkill));
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
    if (selectedCategory != '' && selectedSkills?.length) {
      const data = {
        categories: [selectedCategory],
        skills: selectedSkills.map((skill) => skill.id),
      };
      handleNextClick(data);
    }
    // event.preventDefault();
    // const enteredCategory = categoryInputRef.current.value;
    // // const enteredLastname = lastnameInputRef.current.value;

    // if (enteredCategory && enteredCategory !== '') {
    //   isValid.form = true;
    // }

    // if (isValid.form) {
    //   const clientId = localStorage.getItem('hinyn-cid');
    // const data = {
    //   categories: [selectedCategory],
    //   skills: selectedSkills.map((skill) => skill.id),
    // };

    //   updateClientData(data, clientId).then((result) => {
    //     if (result?.data) handleNextClick(true);
    //   });
    // } else {
    //   setOpen(true);
    // }
  }

  const getCategorySkills = (categoryId) => {
    setCategorySkills(() => []);
    getSkills(categoryId).then((result) => {
      const temp = result?.data?.data?.attributes?.skills?.data ?? [];
      temp.map((item) => {
        let skillId = { id: item.id };
        setCategorySkills((prev) =>
          prev.concat({ ...item.attributes, ...skillId })
        );
      });
    });
  };

  return (
    <>
      <Container maxWidth="md" sx={{ marginBottom: '1rem', marginTop: '4rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text fontSize="34px">
            <b>Tell us what you do</b>
          </Text>
          <Text>
            Tell us your top skills. This helps us recommend jobs for you.
          </Text>

          <Box
            component="form"
            noValidate
            // onSubmit={submitHandler}
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
              data={categories}
              title="Select a Category"
              startAdornment={'icon'}
              endAdornment={'right-arrow'}
              type="categories"
              onCategoryClick={onCategoryClick}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ScrollableTable
              data={skills}
              title="Select Skills for Category"
              type="category_skills"
              category={selectedCategory}
              endAdornment={'add-icon'}
              onSkillClick={onSkillClick}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ScrollableTable2
              data={selectedSkills}
              title={selectedSkills.length}
              endAdornment={'cross-icon'}
            />
          </Grid>
        </Grid>
      </Container>

      <ButtonContainer>
        <StyledButton onClick={submitHandler}>NEXT</StyledButton>
      </ButtonContainer>

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

export default CategorySkills;
