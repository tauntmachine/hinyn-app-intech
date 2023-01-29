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
  Checkbox
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button, { GreenButton } from '../shared/Button';
import Modal from '../shared/Modal';
import StyledTextField, {
  NoOutlineTextField,
  OutlinedTextField,
} from '../shared/Textfield';
import Image from 'next/image';
import { OutlineSearchIcon, CloseIcon, ChevronDownIcon, UploadIcon } from '../shared/Icon';
import { StaticPill } from '../shared/Pill';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import {Button as CustomButton} from '@mui/material';
import { useFreelancer } from '../../src/store';


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
    background: #eb4c60;
    border: 1px solid #eb4c60;

    span {
      color: #ffffff;
    }
  }

  &:hover .icon-img-box img {
    filter: invert(0) sepia(0%) saturate(0%) hue-rotate(338deg) brightness(101%)
      contrast(7);
  }
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
  border: 1px solid #D8D8D8;
  color: #949494;
  border-radius: 5px;
  background: #FCFCFC;
  width: 100%;
  font-size: 12px;
  padding: 30px 16px;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;

  &:hover{
    background: #FCFCFC; 
    color: #949494;
    border: 1px solid #D8D8D8;
  }
`

const StyledCheckbox = styled(Checkbox)`
  color: #EB4C60;
  &.Mui-checked{
      color: #4AA398;
  }
`

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

const languages = ['English', 'Arabic'];

const locations = [
  {
    key: 'dubai',
    label: 'Dubai',
  },
  {
    key: 'abudhabi',
    label: 'Abu Dhabi',
  },
  {
    key: 'sharjah',
    label: 'Sharjah',
  },
  {
    key: 'ajman',
    label: 'Ajman',
  },
  {
    key: 'umm-al-quwain',
    label: 'Umm Al Quwain',
  },
  {
    key: 'fujairah',
    label: 'Fujairah',
  },
  {
    key: 'ras-al-khaimah',
    label: 'Ras Al Khaimah',
  },
];

const budget = [
  {
    title: '0-free collaboration',
    value: '0',
  },
  {
    title: '1-100',
    value: '1',
  },
  {
    title: '101-200',
    value: '101',
  },
  {
    title: '201-500',
    value: '201',
  },
  {
    title: '500+',
    value: '500',
  },
];

const upgradesData = [
  {
    key: 'featured',
    title: 'Featured',
    desc: 'Attract more freelancers with a prominent placement in our jobs list page.',
    price: '1.00 AED' 
  },
  {
    key: 'urgent',
    title: 'Urgent',
    desc: 'Make your project stand out and let freelancers know that your job is time sensitive.',
    price: '1.00 AED' 
  }
]

function PostProjectForm1({ handleNextClick }) {
  const imgsrc = '/assets/img/categories/';
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const {freelancer, filter, setFilter} = useFreelancer();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySkills, setCategorySkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [location, setLocation] = useState(null);
  const [projectBudget, setProjectBudget] = useState(null);
  const [projectDate, setProjectDate] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filename, setFilename] = useState(null);
  const [upgrades, setUpgrades] = useState({
    featured: true,
    urgent: false,
  });
  const [progress, setProgress] = useState(1);
  const [projectData, setProjectData] = useState({
    title: null,
    category: null,
    skills: null,
    languages: null,
    location: null,
    projectBudget: null,
    projectDate: null,
    projectDescription: null,
    uploadedFiles:null,
    deliverables:null,
    deliveryDays: null,
    upgrades: null
  });
  const [isValid, setValid] = useState({
    title: false,
    category: false,
    skills: false,
    location: false,
    projectBudget: false,
    projectDate: false,
    projectDescription: false,
    uploadedFiles:false,
    deliverables:false,
    deliveryDays: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    title: null,
    category: null,
    skills: null,
    location: null,
    projectBudget: null,
    projectDate: null,
    projectDescription: null,
    uploadedFiles:null,
    deliverables:null,
    deliveryDays: null,
  });
  const titleInputRef = useRef();
  const deliverablesInputRef = useRef();
  const deliveryDaysInputRef = useRef();
  const { featured, urgent } = upgrades;

  const onSkillClick = (clickedSkill) => {
    let temp = [];
    if (selectedSkills.find((skill) => skill === clickedSkill)) {
      temp = selectedSkills.filter((skill) => skill !== clickedSkill)
      setSelectedSkills(() => temp);
    } else {
      temp = selectedSkills.concat(clickedSkill);
    }
    setProjectData((prevState) => ({
      ...prevState,
      ['skills']:  temp
    }));
  };

  const onLanguageClick = (clickedLanguage) => {
    let temp = [];
    if (selectedLanguages.find((language) => language === clickedLanguage)) {
      temp = selectedLanguages.filter((language) => language !== clickedLanguage);
      setSelectedLanguages(() => temp);
    } else {
      temp = selectedLanguages.concat(clickedLanguage);
      setSelectedLanguages(() => temp);
    }
    setProjectData((prevState) => ({
      ...prevState,
      ['languages']:  temp
    }));

  };

  const getCategorySkills = (category) => {
    setSelectedCategory(() => category.key);
    setFilter(category);
    setCategorySkills(
      () =>
        category_skills.data.filter((res) => res.key === category.key)[0]
          ?.skills ?? []
    );
    setSelectedSkills(
      () =>
        category_skills.data.filter((res) => res.key === category.key)[0]
          ?.skills ?? []
    );
    setSelectedLanguages(() => languages);
    setErrorMessage((prevState) => ({
      ...prevState,
      ['category']: null,
    }));
    setValid((prevState) => ({
      ...prevState,
      ['category']: true,
    }));
    setProjectData((prevState) => ({
      ...prevState,
      ['category']: category.key,
    }));
    setProjectData((prevState) => ({
      ...prevState,
      ['skills']:  category_skills.data.filter((res) => res.key === category.key)[0]
      ?.skills,
    }));
    setProjectData((prevState) => ({
      ...prevState,
      ['languages']: languages,
    }));
  };

  const onSkillsSearchChange = (e) => {
    onSkillClick(e.target.textContent);
  };

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
      ['projectBudget']: e.target.textContent,
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
      setProjectDate(() => moment(date).format('YYYY-MM-DD'));
      setProjectData((prevState) => ({
        ...prevState,
        ['projectDate']: moment(date).format('YYYY-MM-DD'),
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
    let filenames = Object.entries(files).map((file)=>file[1]?.name);
    setUploadedFiles(()=> {filenames});
    setFilename(()=>filenames)
    console.log('name of file', filenames)
  };

  const handleUpgradeChange = (event) => {
    setUpgrades({
      ...upgrades,
      [event.target.name]: event.target.checked,
    });
    setProjectData((prevState) => ({
      ...prevState,
      ['upgrades']:  upgrades
    }));
  };

  const handleFormClick = () => {
    if(progress <= 1){
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
      }else{
        setErrorMessage((prevState) => ({
          ...prevState,
          ['title']: 'Please provide project title',
        }));
      }

      if(selectedCategory === null){
        setErrorMessage((prevState) => ({
          ...prevState,
          ['category']: 'Please select a category',
        }));
      }
      
      if(isValid.title && isValid.category){ 
        setProgress((prev) => prev+1);
      }
    }
    if(progress === 2){
      if(location !== null){
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
      }
      else{
        setErrorMessage((prevState) => ({
          ...prevState,
          ['location']: 'Please select a location',
        }));
      }

      if(projectDate !== null){
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
      }
      else{
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDate']: 'Please provide project date',
        }));
      }

      if(projectBudget !== null){
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
          ['projectBudget']: projectBudget,
        }));
      }
      else{
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectBudget']: 'Please provide project budget',
        }));
      }
      if(isValid.location && isValid.projectDate && isValid.projectBudget){ 
        setProgress((prev) => prev + 1);
      }
    }

    if(progress === 3){
      if(projectDescription !== null){
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
      }
      else{
        setErrorMessage((prevState) => ({
          ...prevState,
          ['projectDescription']: 'Please provide project description',
        }));
      }

      if(isValid.projectDescription){ 
        setProgress((prev) => prev + 1);
      }
    }

    if(progress === 4){
      let enteredDeliverables = deliverablesInputRef.current.value;
      let enteredDeliveryDays = deliveryDaysInputRef.current.value;

      if( enteredDeliverables && enteredDeliverables !== ''){
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliverables']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['deliverables']: true,
        }));
      }
      else{
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliverables']: 'Please provide number of deliverables',
        }));
      }

      if( enteredDeliveryDays && enteredDeliveryDays !== ''){
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliveryDays']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['deliveryDays']: true,
        }));
      }
      else{
        setErrorMessage((prevState) => ({
          ...prevState,
          ['deliveryDays']: 'Please provide delivery days',
        }));
      }
    }

     setProjectData((prevState) => ({
          ...prevState,
          ['upgrades']: {"featured":featured, "urgent":urgent},
      }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if(isValid.title && isValid.category && isValid.location && isValid.projectDate && isValid.projectBudget && isValid.projectDescription && isValid.deliverables && isValid.deliveryDays){
      console.log('push to api')
      handleNextClick(true);
    }else {
      setOpen(true);
    }
  };

  const progress1 = () => {
    return (
      <>
        <Text size="large">
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
            onKeyUp = {
              (e)=>{
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
              }
            }
          />
          {errorMessage.title && <Error>{errorMessage.title}</Error>}
        </Grid>
        <VerticalDivider />
        <Text size="large">
          <b>Tell us the type of professional you&apos;ll need</b>
        </Text>
        <Grid item xs={12}>
          <CategoriesList>
            {categories.data.map((category, id) => {
              return (
                <CategoryItem
                  key={'category-item-' + id}
                  className={selectedCategory === category.key ? 'active' : ''}
                  onClick={() => getCategorySkills(category)}
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
              );
            })}
          </CategoriesList>
          {errorMessage.category && <Error>{errorMessage.category}</Error>}
        </Grid>
        <VerticalDivider />
        <Text size="large">
          <b>What skills are required?</b>
        </Text>
        <Typography component="p" align="center">
          We&apos;ve detected the following skills to suit your project. Feel
          free to modify these choices to best suit your needs.
        </Typography>
        <Grid item xs={12}>
          <SearchContainer>
            <PillsContainer>
              {selectedSkills.map((skill, id) => {
                return (
                  <StyledStaticPill key={'category-skill-' + id}>
                    {skill}
                    <StyledCloseIcon
                      variant="red"
                      onClick={() => onSkillClick(skill)}
                    />
                  </StyledStaticPill>
                );
              })}
            </PillsContainer>
            <Autocomplete
              freeSolo
              id="search-skills-input"
              disableClearable
              options={categorySkills.map((skill) => skill)}
              onChange={onSkillsSearchChange}
              renderInput={(params) => (
                <NoOutlineTextField
                  {...params}
                  label=""
                  placeholder="Search skills here"
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
        <VerticalDivider />
        <Grid item xs={12}>
          <Text size="large">
            <b>Language</b>
          </Text>
          <Typography component="p" align="left">
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
                <NoOutlineTextField
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
          <Text size="large">
            <b>Tell us where is the location of your project</b>
          </Text>
          <Autocomplete
            freeSolo
            id="search-location-input"
            disableClearable
            options={locations.map((location) => location)}
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
          <Text size="large">
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
          <Text size="large">
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
          <Text size="large">
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
          <Text size="large">
            <b>Upload files</b>
          </Text>
          <Typography component="p" align="left">
            Drag & drop any images or documents that might be helpful in
            explaining your brief here.
          </Typography>
          <UploadButton
            component="label"
            variant="outlined"
            sx={{ marginRight: '1rem' }}
            startIcon={<UploadIcon /> }
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
          ? uploadedFiles.map((file,idx)=>{
              <Text key={'file-upload-'+idx} color="red">Uploaded Files:{file}</Text> 
            })
            : null }
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
          <Text size="large">
            <b>Deliverables</b>
          </Text>
          <Typography component="p" align="left">
            How many pictures will be delivered in total?
          </Typography>
          <OutlinedTextField
            required
            fullWidth
            id="deliverables"
            name="deliverables"
            type="number"
            placeholder="Enter number of required images"
            inputRef={deliverablesInputRef}
            onKeyUp={(e)=>{
              setErrorMessage((prevState) => ({
                ...prevState,
                ['deliverables']: null,
              }));
              setValid((prevState) => ({
                ...prevState,
                ['deliverables']: true,
              }));
              setProjectData((prevState) => ({
                ...prevState,
                ['deliverables']: e.target.value
              }));
            }}
            
          />
          {errorMessage.deliverables && <Error>{errorMessage.deliverables}</Error>}
        </Grid>
        <VerticalDivider />
        <Grid item xs={12}>
          <Typography component="p" align="left">
           How many days for delivery of pictures?
          </Typography>
          <OutlinedTextField
            required
            fullWidth
            id="deliveryDays"
            name="deliveryDays"
            type="number"
            placeholder="Enter number of days"
            inputRef={deliveryDaysInputRef}
            onKeyUp={(e)=>{
              setErrorMessage((prevState) => ({
                ...prevState,
                ['deliveryDays']: null,
              }));
              setValid((prevState) => ({
                ...prevState,
                ['deliveryDays']: true,
              }));
              setProjectData((prevState) => ({
                ...prevState,
                ['deliveryDays']: e.target.value
              }));
            }}
           
          />
          {errorMessage.deliveryDays && <Error>{errorMessage.deliveryDays}</Error>}
        </Grid>
        <VerticalDivider />
        <Grid item xs={12}>
          <Text size="large">
            <b>Choose upgrades for your project</b>
          </Text>
          <FormControl sx={{ width:'100%' }} component="fieldset" variant="standard">
            <FormGroup>
              {upgradesData.map((upgrade,idx)=>{
                return  <Box  key={"upgrades-"+idx} sx={{display:'flex',justifyContent:'space-between',margin:'1rem 0'}}>
                  <Box sx={{display:'flex'}}>
                      <FormControlLabel
                       
                        control={
                          <StyledCheckbox checked={upgrade?.key === "featured" ? featured : urgent} 
                          onChange={(e)=>{
                            handleUpgradeChange(e);
                          }} name={upgrade?.key} />
                        }
                      />
                      <Box sx={{display:'flex', flexDirection:'column'}}>
                          <Text color="red"><b>{upgrade?.title}</b></Text>
                          <Text>{upgrade?.desc}</Text>
                      </Box>
                  </Box>
                  <Text><b>{upgrade?.price}</b></Text>
                </Box>
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
              {progress >= 2 ? progress2() : null}
              {progress >= 3 ? progress3() : null}
              {progress >= 4 ? progress4() : null}
            </Grid>
          </Box>
          <Container sx={{ display: 'flex',justifyContent: 'center',marginBottom:'2rem'}}>
            {
              progress >= 4 ? <Button width="30%" onClick={(e)=>{
                handleFormClick();
                submitHandler(e);
              }}>SUBMIT</Button> : <GreenButton onClick={handleFormClick}>NEXT</GreenButton>
            }
          </Container>
          {
              progress >= 4 ? <Text>By clicking submit, you agree to the <Text color="red" component="span">Terms and Conditions</Text> and <Text color="red" component="span">Privacy Policy</Text> of HINYN.</Text> : null
          }
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
