import {useRef, useState} from 'react';
import { CssBaseline, Grid, Box, InputAdornment, IconButton, TextField, Container} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button, { GreenButton } from '../shared/Button';
import Dropdown from "../shared/Dropdown";
import { SearchIcon } from '../shared/Icon';



const StyledButton = styled(Button)`
`

const CustomTextField = styled(TextField)`
  background: transparent;
  border-radius: 4px;
  padding: 8px;

  input{
    padding: 12px;
    color: #4AA398;
  }

  &:focus, &:focus-visible{
    outline: none;
  }

  &:hover{
    background: ${props => props.type === 'standard' ? "#ffffff" : 'transparent'};
  }

`

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
  border-radius: 20px;
  padding: 16px 32px;
`;

const Error = styled.p`
  color:red;
  font-size:0.75rem;
  font-family: "Roboto", sans-serif;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items:center;
    justify-content: flex-end;
    margin-top: 2rem;
`



function ProjectFilterForm(){
  const categories = {
    title: 'Category',
    options : [       
        {
            key : "photographer",
            icon : "icn-photographer.svg",
            title: "Photographer",
            value: "photographer"
        },
        {
            key : "videographer",
            icon : "icn-videographer.svg",
            title: "Videographer",
            value: "videographer"
        },
        {
            key : "editor",
            icon : "icn-editor.svg",
            title: "Editor",
            value: "editor",
        },
        {
            key : "stylist",
            icon : "icn-stylist.svg",
            title: "Stylist",
            value: "stylist"
        },
        {
            key : "makeup-artist",
            icon : "icn-makeupArtist.svg",
            title: "Makeup Artists",
            value: "makeup-artists"
        },
        {
            key : "hair-stylist",
            icon : "icn-makeupArtist-1.svg",
            title: "Hair Stylists",
            value: "hair-stylists",
        },
        {
            key : "model",
            icon : "icn-hairStylist.svg",
            title: "Models",
            value: "models",
        },
        {
            key : "studio-location",
            icon : "icn-models.svg",
            title: "Studio/Location",
            value: "studio-location"
        },
    ]
}
const category_skills = {
  title: 'Skills',
  options: [
  {
      key : "photographer",
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
          'Other'
      ]
  },
  {
      key : "videographer",
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
          'Other'
      ]
  },
  {
      key : "editor",
      skills : [
          'General',
          'Special effects',
          'Animation / 3D',
          'Other'
      ]
  },
  {
      key : "stylist",
      skills : [
          'Fashion',
          'Beauty',
          'Lifestyle',
          'Sports',
          'E-commerce',
          'Watches / Jewelry',
          'Wedding',
          'Event',
          'Kids / Baby',
          'Other'
      ]
  },
  {
      key : "makeup-artist",
      skills: [
          'Cinema',
          'Fashion',
          'Beauty',
          'Lifestyle',
          'E-commerce',
          'Wedding',
          'Event',
          'Kids / Baby',
          'Other'
      ]
  },
  {
      key : "hair-stylist",
      skills : [
          'Cinema',
          'Fashion',
          'Beauty',
          'Lifestyle',
          'E-Commerce',
          'Wedding',
          'Event',
          'Kids / Baby',
          'Other'
      ]
  },
  {
      key : "model",
      skills : [
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
          'Other'
      ]
  },
  {
      key : "studio-location",
      skills : [
          'Studio',
          'House',
          'Restaurant',
          'Other'
      ]
  }
  ]
}
    const location = {
      title:"Location",
      options:[
        {
          title: 'loc1',
          value: 'loc1'
        },
        {
          title: 'loc2',
          value: 'loc2'
        },
        {
          title: 'loc3',
          value: 'loc3'
        },
        {
          title: 'loc4',
          value: 'loc4'
        }
      ]
    }
    const budget = {
      title:"Budget",
      options:[
        {
          title: '0-free collaboration',
          value: '0'
        },
        {
          title: '1-100',
          value: '1'
        },
        {
          title: '101-200',
          value: '101'
        },
        {
          title: '201-500',
          value: '201'
        },
        {
          title: '500+',
          value: '500'
        }
      ]
    }
    const rating = {
      title: 'Rating',
      value: null
    }

    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentCategorySkills, setCurrentCategorySkills] = useState(null);
    const [isValid, setValid] = useState({
      "firstname":false,
      "lastname":false,
      "form":false,
    });
    const [errorMessage, setErrorMessage] = useState({
        "firstname":null,
        "lastname":null,
    });
    const firstnameInputRef = useRef();
    const lastnameInputRef = useRef();

    const handleSearchSkills = (e) => {
        e.preventDefault();
        console.log('the skills',e.target.value)
    }


    const submitHandler = (event) => {
        event.preventDefault();
        const enteredFirstname = firstnameInputRef.current.value;
        const enteredLastname = lastnameInputRef.current.value;
        
        if(enteredFirstname && enteredLastname && (enteredFirstname !== '' && enteredLastname !== '')){
            isValid.form = true; 
        }

        if(isValid.form){
          const clientData = {
            firstname: enteredFirstname,
            lastname: enteredLastname,
            };
            console.log('clientdat',clientData)
        }
    }
     const getOnChangeVal = (curr) =>{
      console.log('ahsdfkjasdfasd', curr)
      setCurrentCategory(curr);
      const skills = category_skills.options.find((val)=> val.key === curr)
      setCurrentCategorySkills(skills);
     }

    return (
      <>
        <Box>
          <CssBaseline />
          <FormContainer>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3, width:"100%"}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                      <Text>{budget?.title}</Text>  
                      <Text color='green'>Clear</Text>  
                    </Box>
                    <Dropdown hasLabel={false} items={budget?.options} width="100%" type="outlined"/>
                </Grid>       
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                        <Text>{categories?.title}</Text>  
                        <Text color='green'>Clear</Text>  
                    </Box>
                    <Dropdown hasLabel={false} items={categories?.options} width="100%" type="outlined" setHandleOnChange={getOnChangeVal}/>
                </Grid>       
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  { 
                    currentCategory &&
                    <>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                      <Text>{category_skills?.title}</Text>  
                      <Text color='green'>Clear</Text>  
                    </Box>
                    <Box>
                      <CustomTextField
                        required
                        fullWidth
                        id="searchInput"
                        label=""
                        name="searchInput"
                        placeholder="Search skills"
                        onChange={handleSearchSkills}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                              <IconButton
                                edge="end"
                              >
                                  <SearchIcon className="icon"/>
                              </IconButton>
                            </InputAdornment>,
                          }}
                      />
                    </Box>
                    </>
                  }
                   
                </Grid>       
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  { 
                    location &&
                    <>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                      <Text>{location?.title}</Text>  
                      <Text color='green'>Clear</Text>  
                    </Box> 
                    <Dropdown hasLabel={false} items={location.options} width="100%" type="outlined"/>       
                    </>
                  }
                   
                </Grid>       
              </Grid>
              <ButtonContainer>
                <GreenButton size="small">
                    Filter
                </GreenButton>
               </ButtonContainer>
            </Box>
          </FormContainer>
        </Box>
    </>
    );

}

export default ProjectFilterForm;