import { useEffect, useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Autocomplete,
  InputAdornment,
  IconButton,
  TextareaAutosize,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button, { GreenButton } from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField, {
  NoOutlineTextField,
  OutlinedTextField,
  StyledTextField2,
} from '../shared/Textfield';
import Image from 'next/image';
import {
  OutlineSearchIcon,
  CloseIcon,
  ChevronDownIcon,
  UploadIcon,
} from '../shared/Icon';
import { StaticPill } from '../shared/Pill';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { Button as CustomButton } from '@mui/material';
import { useFreelancer } from '../../src/store';
import { addBidData, getCategories, getSkills } from './formService';
import DropdownO from '../shared/DropdownO';
import {
  budget,
  locations,
  ageGroupOptions,
  Budget,
  skills,
} from '../models/filters.models';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 13px;
  background: #ffffff;
  box-shadow: 0px 3px 20px #00000029;
  padding: 3.125rem;
  margin-top: 3.75rem;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;
const CategoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 1rem;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  border: 1px solid #949494;
  border-radius: 10px;
  padding: 1.25rem;

  &.active {
    background: #eb4c60;
    border: 1px solid #eb4c60;
    span {
      color: #ffffff;
    }
    .icon-img-box img {
      filter: invert(0) sepia(0%) saturate(0%) hue-rotate(338deg)
        brightness(101%) contrast(7);
    }
  }

  &:hover {
    border: 1px solid #eb4c60;
    color: #eb4c60;

    // span {
    //   color: #eb4c60;
    // }

  //   .icon-img-box img {
  //     filter: invert(0) sepia(100%) saturate(100%) hue-rotate(330deg)
  //       brightness(100%) contrast(100%);
  //   }
  // }
`;

const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #d8d8d8;
  border-radius: 12px;
  min-height: 8.5rem;
  padding: 1.75rem 1.75rem 0;
`;

const ImageContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
`;

const PillsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledStaticPill = styled(StaticPill)`
  background-color: #d8d8d8;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

const GrayText = styled(Text)`
  color: #949494;
  font-size: 10px;
`;

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  min-height: 9rem;
  max-height: 9rem;
  overflow: auto;
  border-radius: 12px;
  padding: 1rem;
  font-family: inherit;
  background-color: transparent;
  opacity: 1;
  border: 1px solid #d8d8d8;
  color: #525252;
  font-size: 12px;

  &:focus {
    outline: none;
  }
`;

const UploadButton = styled(CustomButton)`
  border: 1px solid #d8d8d8;
  color: #949494;
  border-radius: 5px;
  background: #fcfcfc;
  width: 100%;
  font-size: 12px;
  padding: 30px 16px;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;

  &:hover {
    background: #fcfcfc;
    color: #949494;
    border: 1px solid #d8d8d8;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  color: #eb4c60;
  &.Mui-checked {
    color: #4aa398;
  }
`;

const CustomDropdown = styled(DropdownO)`
  .MuiInputBase-root {
    border-radius: 18px;
    background: red;
  }
`;

const CustomTab = styled.div`
  border: 1px solid #d8d8d8;
  padding: 14px;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  &.active {
    background-color: #fdeaef;
    border: 1px solid #eb4c60;
    color: #eb4c60;
  }

  &.left {
    border-radius: 23px 0 0 23px;
    &.active {
      background-color: #ecf6f5;
      border: 1px solid #4aa398;
      color: #4aa398;
    }
  }

  &.right {
    border-radius: 0 23px 23px 0;

    &.active {
      background-color: #fff0ea;
      border: 1px solid #e96e3f;
      color: #e96e3f;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;
const WithoutTextField = styled(TextField)`
  margin-bottom: 2px;
`;
const MyOutlinedTextField = styled(TextField)`
  width: 54rem;
  border-radius: 20px;
`;
const languages = ['English', 'Arabic'];

const upgradesData = [
  {
    key: 'featured',
    title: 'Featured',
    desc: 'Attract more freelancers with a prominent placement in our jobs list page.',
    price: '1.00 AED',
  },
  {
    key: 'urgent',
    title: 'Urgent',
    desc: 'Make your project stand out and let freelancers know that your job is time sensitive.',
    price: '1.00 AED',
  },
];

function PostProjectForm1({ handleNextClick }) {
  const imgsrc = '/assets/img/categories/';
  const [open, setOpen] = useState(false);
  const [dobValue, setDobValue] = useState(null);
  const [enteredBroadDescription, setBroadDescription] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const { freelancer, filter, setFilter } = useFreelancer();
  const [categories, setCategories] = useState([]);

  const [selectedGender, setSelectedGender] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  // const [categorySkills, setCategorySkills] = useState([]);
  const [skills, setSkills] = useState([]);
  // const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [location, setLocation] = useState(null);
  const [projectBudget, setProjectBudget] = useState(null);
  const [projectDate, setProjectDate] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filename, setFilename] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [activeStates, setActiveStates] = useState(categories.map(() => false));
  const [upgrades, setUpgrades] = useState({
    featured: true,
    urgent: false,
  });
  const [progress, setProgress] = useState(1);
  const [color, setColor] = useState(false);
  const [projectData, setProjectData] = useState({
    title: null,
    category: null,
    gender: null,
    ageGroup: null,
    skills: null,
    languages: null,
    location: null,
    projectBudget: null,
    projectDate: null,
    projectDescription: null,
    uploadedFiles: null,
    deliverables: null,
    deliveryDays: null,
    upgrades: {
      featured: true,
      urgent: false,
    },
  });
  const [isValid, setValid] = useState({
    title: false,
    category: false,
    gender: false,
    ageGroup: false,
    skills: false,
    location: false,
    projectBudget: false,
    projectDate: false,
    projectDescription: false,
    uploadedFiles: false,
    deliverables: false,
    deliveryDays: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    title: null,
    category: null,
    gender: null,
    ageGroup: null,
    skills: null,
    location: null,
    projectBudget: null,
    projectDate: null,
    projectDescription: null,
    uploadedFiles: null,
    deliverables: null,
    deliveryDays: null,
  });
  const titleInputRef = useRef();
  const deliverablesInputRef = useRef();
  const deliveryDaysInputRef = useRef();
  const { featured, urgent } = upgrades;

  // const onSkillClick = (clickedSkillId, clickedSkill) => {
  //   let temp = [];
  //   if (selectedSkills.find((skill) => skill?.id === clickedSkillId)) {
  //     temp = selectedSkills.filter((skill) => skill?.id !== clickedSkillId);
  //   } else {
  //     temp = selectedSkills.concat(clickedSkill);
  //   }
  //   setSelectedSkills(() => temp);
  //   setProjectData((prevState) => ({
  //     ...prevState,
  //     ['skills']: temp,
  //   }));
  // };

  const checkDOB = (dobdate) => {
    const dateFormat = 'YYYY-MM-DD';
    const dob = moment(dobdate, dateFormat, true).isValid();
    const today = moment().format('YYYY-MM-DD');

    if (dob && moment(today).format('YYYY') > moment(dobdate).format('YYYY')) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['dob']: null,
      }));
      setValid((prevState) => ({
        ...prevState,
        ['dob']: true,
      }));
      setDobValue(moment(dobdate).format('YYYY-MM-DD'));
    } else {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['dob']: 'Invalid date of birth.',
      }));
    }
  };

  const onLanguageClick = (clickedLanguage) => {
    let temp = [];
    if (selectedLanguages.find((language) => language === clickedLanguage)) {
      temp = selectedLanguages.filter(
        (language) => language !== clickedLanguage
      );
      setSelectedLanguages(() => temp);
    } else {
      temp = selectedLanguages.concat(clickedLanguage);
      setSelectedLanguages(() => temp);
    }
    setProjectData((prevState) => ({
      ...prevState,
      ['languages']: temp,
    }));
  };

  // useEffect(() => {
  //   getCategories().then((result) => {
  //     if (result?.data?.data && !isFetched) {
  //       setCategories(() => []);
  //       result?.data?.data.map((item) => {
  //         let temp = { id: item.id };
  //         setCategories((prev) => prev.concat({ ...item.attributes, ...temp }));
  //       });
  //       setIsFetched(true);
  //     }
  //   });
  // }, [isFetched]);

  // function getCategorySkills2(category) {
  //   setSelectedCategory(() => category);
  //   setCategorySkills(() => []);
  //   setSelectedSkills(() => []);
  //   getSkills(category?.id).then((result) => {
  //     const temp = result?.data?.data?.attributes?.skills?.data ?? [];
  //     temp.map((item) => {
  //       let skillId = { id: item.id };
  //       setCategorySkills((prev) =>
  //         prev.concat({ ...item.attributes, ...skillId })
  //       );
  //       setSelectedSkills((prev) =>
  //         prev.concat({ ...item.attributes, ...skillId })
  //       );
  //     });
  //   });
  //   setSelectedLanguages(() => languages);

  //   setErrorMessage((prevState) => ({
  //     ...prevState,
  //     ['category']: null,
  //   }));
  //   setValid((prevState) => ({
  //     ...prevState,
  //     ['category']: true,
  //   }));
  //   setProjectData((prevState) => ({
  //     ...prevState,
  //     ['category']: category.slug,
  //   }));
  //   setProjectData((prevState) => ({
  //     ...prevState,
  //     ['skills']: selectedSkills.map((skill) => skill?.id),
  //   }));
  //   setProjectData((prevState) => ({
  //     ...prevState,
  //     ['languages']: languages,
  //   }));
  // }

  // const onSkillsSearchChange = (e) => {
  //   const clickedSkill = categorySkills.find(
  //     (skill) => skill.title === e.target.textContent
  //   );
  //   onSkillClick(clickedSkill?.id, clickedSkill);
  // };

  useEffect(() => {
    let catList = [];

    getCategories().then((result) => {
      if (result?.data) {
        result?.data?.data.map((item) => {
          let temp = { id: item.id, ...item.attributes };
          // setCategories((prev) => prev.concat({ ...item.attributes, ...temp }));
          catList = [...catList, { ...temp }];
        });
        setCategories(catList);
        // console.log(categories);
      }
    });
  }, []);
  const onLanguagesSearchChange = (e) => {
    onLanguageClick(e.target.textContent);
  };

  const onLocationSearchChange = (e) => {
    setLocation(() => e.target.textContent);
    setErrorMessage((prevState) => ({
      ...prevState,
      ['location']: null,
    }));
    setValid((prevState) => ({
      ...prevState,
      ['location']: true,
    }));
    setProjectData((prevState) => ({
      ...prevState,
      ['location']: e.target.textContent,
    }));
  };

  const onBudgetSearchChange = (e) => {
    setProjectBudget(() => e.target.textContent);
    let budgetArr = e.target.textContent.split('-');
    setErrorMessage((prevState) => ({
      ...prevState,
      ['projectBudget']: null,
    }));
    setValid((prevState) => ({
      ...prevState,
      ['projectBudget']: true,
    }));
    setProjectData((prevState) => ({
      ...prevState,
      ['projectBudget']: budgetArr,
    }));
  };

  const checkProjectDate = (date) => {
    const dateFormat = 'YYYY-MM-DD';
    const projectDateValid = moment(date, dateFormat, true).isValid();
    const today = moment().format('YYYY-MM-DD');
    if (
      projectDateValid &&
      moment(today).format('YYYY-MM-DD') < moment(date).format('YYYY-MM-DD')
    ) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['projectDate']: null,
      }));
      setValid((prevState) => ({
        ...prevState,
        ['projectDate']: true,
      }));
      setProjectDate(() => moment(date).format('DD-MMM-YYYY'));
      setProjectData((prevState) => ({
        ...prevState,
        ['projectDate']: moment(date).format('DD-MMM-YYYY'),
      }));
    } else {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['projectDate']: 'Please select a later date.',
      }));
    }
  };

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files;
    let filenames = Object.entries(files).map((file) => file[1]?.name);
    setUploadedFiles(() => {
      filenames;
    });
    setFilename(() => filenames);
  };

  const handleUpgradeChange = (event) => {
    setUpgrades({
      ...upgrades,
      [event.target.name]: event.target.checked,
    });
    setProjectData((prevState) => ({
      ...prevState,
      ['upgrades']: upgrades,
    }));
  };

  const onChangeAgeGroup = (ageGroup) => {
    setAgeGroup(ageGroup);
    setValid((prevState) => ({
      ...prevState,
      ['ageGroup']: true,
    }));
  };

  const onGenderClick = (val) => {
    setSelectedGender(() => val);
    setValid((prevState) => ({
      ...prevState,
      ['gender']: true,
    }));
  };

  const handleFormClick = () => {
    if (progress <= 1) {
      let enteredTitle = titleInputRef.current.value;
      if (enteredTitle && enteredTitle !== '') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['title']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['title']: true,
        }));
        setProjectData((prevState) => ({
          ...prevState,
          ['title']: enteredTitle,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['title']: 'Please provide project title',
        }));
      }

      if (selectedCategory?.slug === null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['category']: 'Please select a category',
        }));
      }

      if (selectedGender === null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['gender']: 'Please select freelancer gender',
        }));
      }

      if (ageGroup === null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['ageGroup']: 'Please select freelancer age',
        }));
      }

      if (
        isValid.title &&
        isValid.category &&
        isValid.ageGroup &&
        isValid.gender
      ) {
        setProgress((prev) => prev + 1);
      }
    }
    if (progress === 2) {
      if (location !== null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['location']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['location']: true,
        }));
        setProjectData((prevState) => ({
          ...prevState,
          ['location']: location,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['location']: 'Please select a location',
        }));
      }

      if (projectDate !== null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDate']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['projectDate']: true,
        }));
        setProjectData((prevState) => ({
          ...prevState,
          ['projectDate']: projectDate,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDate']: 'Please provide project date',
        }));
      }

      if (projectBudget !== null) {
        let budgetArr = projectBudget.split('-');
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectBudget']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['projectBudget']: true,
        }));
        setProjectData((prevState) => ({
          ...prevState,
          ['projectBudget']: budgetArr,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectBudget']: 'Please provide project budget',
        }));
      }
      if (isValid.location && isValid.projectDate && isValid.projectBudget) {
        setProgress((prev) => prev + 1);
      }
    }

    if (progress === 3) {
      if (projectDescription !== null) {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDescription']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['projectDescription']: true,
        }));
        setProjectData((prevState) => ({
          ...prevState,
          ['projectDescription']: projectDescription,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDescription']: 'Please provide project description',
        }));
      }

      if (isValid.projectDescription) {
        setProgress((prev) => prev + 1);
      }
    }

    if (progress === 4) {
      let enteredDeliverables = deliverablesInputRef.current.value;
      let enteredDeliveryDays = deliveryDaysInputRef.current.value;

      if (enteredDeliverables && enteredDeliverables !== '') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliverables']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['deliverables']: true,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliverables']: 'Please provide number of deliverables',
        }));
      }

      if (enteredDeliveryDays && enteredDeliveryDays !== '') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliveryDays']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['deliveryDays']: true,
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliveryDays']: 'Please provide delivery days',
        }));
      }
    }

    setProjectData((prevState) => ({
      ...prevState,
      ['upgrades']: { featured: featured, urgent: urgent },
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      isValid.title
      // isValid.category &&
      // isValid.location &&
      // isValid.projectDate &&
      // isValid.projectBudget &&
      // isValid.projectDescription &&
      // isValid.deliverables &&
      // isValid.deliveryDays
    ) {
      const clientId = localStorage.getItem('hinyn-cid');
      const bidData = {
        title: projectData.title,
        description: projectData.projectDescription,
        minBudget: projectData.projectBudget[0],
        status: 1,
        city: projectData.location,
        country: 'United Arab Emirates',
        deliveryDate: projectData.projectDate,
        maxBudget:
          projectData.projectBudget.length > 1
            ? projectData.projectBudget[1]
            : '',
        deliveryDays: projectData.deliveryDays,
        numDeliverables: projectData.deliverables,
        isFeatured: projectData.upgrades.featured,
        isUrgent: projectData.upgrades.urgent,
        categories: [selectedCategory?.id],
        skills: projectData.skills,
        client: clientId,
      };
      if (clientId) {
        addBidData(bidData).then((res) => {
          if (res.data) {
            console.log('res -- ', res.data);
            setFilter(selectedCategory?.key);
            handleNextClick(true);
          }
        });
      }
    } else {
      setOpen(true);
    }
  };

  const handleSkillsChange = (val) => {
    // console.log(val);
    setSelectedSkill(() => val);
  };
  const handleCategoryChange = (index) => {
    // setSelectedCategory(categories[index]);

    let listSkill = [];
    categories[index]?.skills.data.map((item) => {
      let temp = { id: item.id, ...item.attributes };
      listSkill = [...listSkill, { ...temp }];
    });
    setSkills(listSkill);
    // getCategorySkills(categoryId);
    setSelectedSkill(() => []);
  };
  const progress1 = () => {
    // Create an array of states to track the active state for each category

    // Function to toggle the active state of a category
    const toggleCategoryActiveState = (index) => {
      const updatedActiveStates = [...activeStates];
      updatedActiveStates[index] = !updatedActiveStates[index];
      setActiveStates(updatedActiveStates);
      handleCategoryChange(index);
    };
    return (
      <>
        <Text fontSize="18px">
          <b>Choose a name for your project</b>
        </Text>
        <Grid item xs={12}>
          <StyledTextField
            required
            fullWidth
            id="title"
            name="title"
            placeholder="example: Portrait photographer for a photoshoot"
            inputRef={titleInputRef}
            onKeyUp={(e) => {
              setErrorMessage((prevState) => ({
                ...prevState,
                ['title']: null,
              }));
              setValid((prevState) => ({
                ...prevState,
                ['title']: true,
              }));
              setProjectData((prevState) => ({
                ...prevState,
                ['title']: e.target.value,
              }));
            }}
          />
          {errorMessage.title && <Error>{errorMessage.title}</Error>}
        </Grid>
        <VerticalDivider />
        <Text fontSize="18px">
          <b>Tell us the type of professional you&apos;ll need</b>
        </Text>
        <Grid item xs={12}>
          <CategoriesList>
            {categories.map((category, id) => {
              return category?.slug !== 'all' ? (
                <CategoryItem
                  key={'category-item-' + id}
                  // className={color === true ? 'active' : ''}
                  // onClick={() => setColor(!color)}
                  className={activeStates[id] ? 'active' : ''}
                  onClick={() => toggleCategoryActiveState(id)}
                >
                  <ImageContainer className="icon-img-box">
                    <Image
                      src={imgsrc + category.icon}
                      layout="fill"
                      className="icon-img"
                      alt="icon-img"
                    />
                  </ImageContainer>
                  <GrayText component="span">{category.title}</GrayText>
                </CategoryItem>
              ) : null;
            })}
          </CategoriesList>
          {errorMessage.category && <Error>{errorMessage.category}</Error>}
        </Grid>
        {/* start of gender */}
        <VerticalDivider />
        <Text fontSize="18px">
          <b>Select the gender of the professional you&apos;ll need</b>
        </Text>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex' }}>
            <CustomTab
              className={selectedGender === 'male' ? 'left active' : 'left'}
              onClick={() => onGenderClick('male')}
            >
              Male
            </CustomTab>
            <CustomTab
              className={selectedGender === 'female' ? 'active' : ''}
              onClick={() => onGenderClick('female')}
            >
              Female
            </CustomTab>
            <CustomTab
              className={selectedGender === 'any' ? 'right active' : 'right'}
              onClick={() => onGenderClick('any')}
            >
              Any
            </CustomTab>
          </Box>
          {errorMessage.category && <Error>{errorMessage.category}</Error>}
        </Grid>
        {/* start of age */}
        <VerticalDivider />
        <Text fontSize="18px">
          <b>Select the age of the professional you&apos;ll need</b>
        </Text>
        <Grid item xs={12}>
          <CustomDropdown
            hasLabel={false}
            items={ageGroupOptions}
            width="100%"
            type="outlined"
            selected={ageGroup}
            setHandleOnChange={onChangeAgeGroup}
            color={'red'}
          />
          {errorMessage.ageGroup && <Error>{errorMessage.ageGroup}</Error>}
        </Grid>
        <VerticalDivider />
        <Text fontSize="18px">
          <b>What skills are required?</b>
        </Text>
        <Text marginY="10px">
          We&apos;ve detected the following skills to suit your project. Feel
          free to modify these choices to best suit your needs.
        </Text>
        <Grid item xs={12}>
          <DropdownO
            hasLabel={false}
            items={skills}
            width="100%"
            type="outlined"
            selected={selectedSkill}
            setHandleOnChange={handleSkillsChange}
            color={'red'}
          />
          {/* {errorMessage.ageGroup && <Error>{errorMessage.ageGroup}</Error>} */}
        </Grid>

        <VerticalDivider />
        <Grid item xs={12}>
          <Text fontSize="18px">
            <b>Language</b>
          </Text>
          <Typography component="p" align="left" marginY="10px">
            Select the language you&apos;ll be needing for this project
          </Typography>
          <SearchContainer>
            <PillsContainer>
              {selectedLanguages.map((language, id) => {
                return (
                  <StyledStaticPill key={'language-' + id}>
                    {language}
                    <StyledCloseIcon
                      variant="red"
                      onClick={() => onLanguageClick(language)}
                    />
                  </StyledStaticPill>
                );
              })}
            </PillsContainer>
            <Autocomplete
              freeSolo
              id="search-language-input"
              disableClearable
              options={languages.map((language) => language)}
              onChange={onLanguagesSearchChange}
              renderInput={(params) => (
                <WithoutTextField
                  {...params}
                  label=""
                  placeholder="Search languages here"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <OutlineSearchIcon className="icon" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </SearchContainer>
        </Grid>
      </>
    );
  };

  const progress2 = () => {
    return (
      <>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text fontSize="19px" marginY="6px">
            <b>Tell us where is the location of your project</b>
          </Text>
          <Autocomplete
            freeSolo
            id="search-location-input"
            disableClearable
            options={locations.map((location) => location?.title)}
            onChange={onLocationSearchChange}
            renderInput={(params) => (
              <OutlinedTextField
                {...params}
                label=""
                placeholder="Search location here"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <OutlineSearchIcon className="icon" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {errorMessage.location && <Error>{errorMessage.location}</Error>}
        </Grid>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text fontSize="19px" marginY="6px">
            <b>Select the day required for your project</b>
          </Text>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label=""
              value={projectDate}
              onChange={checkProjectDate}
              renderInput={(params) => (
                <OutlinedTextField sx={{ width: '100%' }} {...params} />
              )}
            />
          </LocalizationProvider>
          {errorMessage.projectDate && (
            <Error>{errorMessage.projectDate}</Error>
          )}
        </Grid>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text fontSize="19px" marginY="6px">
            <b>What is your budget?</b>
          </Text>
          <Autocomplete
            freeSolo
            disableClearable
            id="search-budget-input"
            options={budget.map((b) => b.title)}
            onChange={onBudgetSearchChange}
            renderInput={(params) => (
              <OutlinedTextField
                {...params}
                label=""
                placeholder="Select budget range"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <ChevronDownIcon className="icon" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {errorMessage.projectBudget && (
            <Error>{errorMessage.projectBudget}</Error>
          )}
        </Grid>
      </>
    );
  };

  const progress3 = () => {
    return (
      <>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text fontSize="19px" marginY="6px">
            <b>Tell us the story behind your project</b>
          </Text>
          <StyledTextArea
            placeholder="Describe your project"
            id="projectDescription"
            name="projectDescription"
            maxLength={3000}
            onChange={(event) => {
              const { value } = event.target;
              setProjectDescription(() => value);
              if (value) {
                setErrorMessage((prevState) => ({
                  ...prevState,
                  ['projectDescription']: null,
                }));
                setValid((prevState) => ({
                  ...prevState,
                  ['projectDescription']: true,
                }));
                setProjectData((prevState) => ({
                  ...prevState,
                  ['projectDescription']: value,
                }));
              }
            }}
          />
          {errorMessage.projectDescription && (
            <Error>{errorMessage.projectDescription}</Error>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <GrayText>
              <i>Max: 3000 characters</i>
            </GrayText>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Text fontSize="19px">
            <b>Upload files</b>
          </Text>
          <Text marginY="6px">
            Drag & drop any images or documents that might be helpful in
            explaining your brief here.
          </Text>
          <UploadButton
            component="label"
            variant="outlined"
            sx={{ marginRight: '1rem' }}
            startIcon={<UploadIcon />}
          >
            <br />
            (Max File Size: 25mb)
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileUpload}
              multiple
            />
          </UploadButton>
          {uploadedFiles?.length > 0
            ? uploadedFiles.map((file, idx) => {
                <Text key={'file-upload-' + idx} color="red">
                  Uploaded Files:{file}
                </Text>;
              })
            : null}
          {errorMessage.uploadedFiles && (
            <Error>{errorMessage.uploadedFiles}</Error>
          )}
        </Grid>
      </>
    );
  };

  const progress4 = () => {
    return (
      <>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text fontSize="19px">
            <b>Deliverables</b>
          </Text>
          <Text fontSize="13.7px" fontWeight="bold" marginY="7px">
            How many pictures will be delivered in total?
          </Text>
          <MyOutlinedTextField placeholder="Enter number of required images" />
          {errorMessage.deliverables && (
            <Error>{errorMessage.deliverables}</Error>
          )}
        </Grid>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text fontSize="13.7px" fontWeight="bold" marginY="7px">
            How many days for delivery of pictures?
          </Text>
          <MyOutlinedTextField placeholder="Enter number of days" />
          {errorMessage.deliveryDays && (
            <Error>{errorMessage.deliveryDays}</Error>
          )}
        </Grid>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text fontSize="19px">
            <b>Choose upgrades for your project</b>
          </Text>
          <FormControl
            sx={{ width: '100%' }}
            component="fieldset"
            variant="standard"
          >
            <FormGroup>
              {upgradesData.map((upgrade, idx) => {
                return (
                  <Box
                    key={'upgrades-' + idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '1rem 0',
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <FormControlLabel
                        control={
                          <StyledCheckbox
                            checked={
                              upgrade?.key === 'featured' ? featured : urgent
                            }
                            onChange={(e) => {
                              handleUpgradeChange(e);
                            }}
                            name={upgrade?.key}
                          />
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Text color="red">
                          <b>{upgrade?.title}</b>
                        </Text>
                        <Text>{upgrade?.desc}</Text>
                      </Box>
                    </Box>
                    <Text>
                      <b>{upgrade?.price}</b>
                    </Text>
                  </Box>
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          marginBottom: '2rem',
          marginTop: '5rem',
          background: 'transparent',
        }}
      >
        <CssBaseline />

        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ color: '#ffffff' }}
        >
          <b>Hey, Tell us what you need!</b>
        </Typography>
        <VerticalDivider />
        <Container maxWidth="sm">
          <Typography component="p" align="center" sx={{ color: '#ffffff' }}>
            Contact skilled freelancers within minutes. View profiles, ratings,
            portfolios and chat with them. Pay the freelancer only when you are
            100% staisfied with their work.
          </Typography>
        </Container>

        <FormContainer>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container rowSpacing={1} sx={{ marginBottom: '2rem' }}>
              {progress1()}

              {progress2()}
              {progress3()}
              {progress4()}
            </Grid>
          </Box>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem',
            }}
          >
            {progress ? (
              <Button
                width="30%"
                onClick={(e) => {
                  handleFormClick();
                  submitHandler(e);
                }}
              >
                SUBMIT
              </Button>
            ) : (
              <GreenButton onClick={handleFormClick}>NEXT</GreenButton>
            )}
          </Container>
          {progress ? (
            <Text>
              By clicking submit, you agree to the{' '}
              <Text color="red" component="span">
                Terms and Conditions
              </Text>{' '}
              and{' '}
              <Text color="red" component="span">
                Privacy Policy
              </Text>{' '}
              of HINYN.
            </Text>
          ) : null}
        </FormContainer>
      </Container>

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        Oops! All fields are required.
      </Modal>
    </>
  );
}

export default PostProjectForm1;
