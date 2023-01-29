import {useState, useMemo, createContext, useContext} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


interface Freelancer {
    id: string,
    name: string,
    job: string,
    jobcategory: string
}

export async function getServerSideProps(){
    const res = await fetch("https://react-getting-started-94c45-default-rtdb.firebaseio.com/get-freelancers.json");
    console.log('res',res)
    return {
        props: {
            "freelancer": [
              {
                "-MpYAC-RXmd7ks9Mxlkw": {
                  "id":1,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "taylor",
                  "isVerified": true,
                  "job": "Photographer",
                  "jobcategory": "photographer",
                  "lastName": "swift",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 4,
                  "img":"img-avatar1.png"
                },
                "-MpYAPEt06Rj0735EiW9": {
                  "id":2,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "adam",
                  "isVerified": true,
                  "job": "Videographer",
                  "jobcategory": "videographer",
                  "lastName": "levine",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 4,
                  "img":"img-avatar2.png"
                },
                "-MtZVvCYJt1AMwbpJ6P4": {
                  "id":3,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "taylor",
                  "isVerified": true,
                  "job": "Makeup Artist",
                  "jobcategory": "makeup-artist",
                  "lastName": "lautner",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 2,
                  "img":"img-avatar3.png"
                },
                "-MtZWD1k0gdS9CG77iPg": {
                  "id":4,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "Edward",
                  "isVerified": true,
                  "job": "Stylist",
                  "jobcategory": "stylist",
                  "lastName": "Cullen",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 2,
                  "img":"img-avatar4.png"
                },
                "-MtZWRTccIn3ziu610xx": {
                  "id":5,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "Paul",
                  "isVerified": true,
                  "job": "Videographer",
                  "jobcategory": "videographer",
                  "lastName": "Klein",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 5,
                  "img":"img-avatar5.png"
                },
                "-MtZWRTccIn3ziu611xg": {
                  "id":6,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "Ariana",
                  "isVerified": true,
                  "job": "Photographer",
                  "jobcategory": "photographer",
                  "lastName": "Grander",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 3,
                  "img":"img-avatar6.png"
                },
                "-MtZWRTccIn3ziu611xz": {
                  "id":7,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "Selena",
                  "isVerified": true,
                  "job": "Photographer",
                  "jobcategory": "photographer",
                  "lastName": "Gomez",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 5,
                  "img":"img-avatar7.png"
                },
                "-MtZWRTccIn3ziu612xx": {
                  "id":8,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "Arthur",
                  "isVerified": true,
                  "job": "Photographer",
                  "jobcategory": "photographer",
                  "lastName": "Neri",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 5,
                  "img":"img-avatar8.png"
                },
                "-MtZWRTccIn3ziu613xx": {
                  "id":9,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "Tom",
                  "isVerified": true,
                  "job": "Stylist",
                  "jobcategory": "stylist",
                  "lastName": "Holland",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 4,
                  "img":"img-avatar9.png"
                },
                "-MtZWRTccIn3ziu614xx": {
                  "id":10,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "Jared",
                  "isVerified": true,
                  "job": "Videographer",
                  "jobcategory": "videographer",
                  "lastName": "Leto",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 4,
                  "img":"img-avatar10.png"
                },
                "-MtZWRTccIn3ziu615xx": {
                  "id":11,
                  "dateOfBirth": "1991-12-11",
                  "emailAddress": "user2@user.com",
                  "firstName": "Steve",
                  "isVerified": true,
                  "job": "Studio",
                  "jobcategory": "studio-location",
                  "lastName": "Harvey",
                  "location": "Dubai, United Arab Emirates",
                  "mobileNumber": "509256433",
                  "password": "user1234",
                  "rating": 3,
                  "img":"img-avatar1.png"
                }
              }
            ],
            "project" : [
              {
                      id:"1235670808850",
                      title: 'Ipsum Dolor sit Amet 1',
                      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                      timestamp:'1 minute ago',
                      bids:21,
                      bidPrice:{
                          average: 92,
                          max: 100,
                          currency: 'USD'
                      },
                      categories:[
                          'Photography',
                          'Make-up Artist',
                      ],
                      rating: 4
                  },
                 {
                      id:"1235670808851",
                      title: 'Lorem Ipsum Dolor sit Amet 2',
                      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                      timestamp:'1 minute ago',
                      bids:21,
                      bidPrice:{
                          average: 92,
                          max: 100,
                          currency: 'USD'
                      },
                      categories:[
                          'Photography',
                          'Make-up Artist',
                      ],
                      rating: 5
                  },
                 {
                      id:"1235670808852",
                      title: 'Lorem Ipsum Dolor sit Amet 3',
                      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                      timestamp:'1 minute ago',
                      bids:21,
                      bidPrice:{
                          average: 92,
                          max: 100,
                          currency: 'USD'
                      },
                      categories:[
                          'Photography',
                          'Make-up Artist',
                          'Videography',
                      ],
                      rating: 3
                  },
                 {
                      id:"1235670808853",
                      title: 'Lorem Ipsum Dolor sit Amet 4',
                      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                      timestamp:'1 minute ago',
                      bids:21,
                      bidPrice:{
                          average: 92,
                          max: 100,
                          currency: 'USD'
                      },
                      categories:[
                          'Photography',
                          'Videography',
                      ],
                      rating: 2
                  },
                 {
                      id:"1235670808854",
                      title: 'Lorem Ipsum Dolor sit Amet 5',
                      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                      timestamp:'1 minute ago',
                      bids:21,
                      bidPrice:{
                          average: 92,
                          max: 100,
                          currency: 'USD'
                      },
                      categories:[
                          'Photography',
                      ],
                      rating: 5
                  },
            ]
        },
    }
}

const useFreelancerController = (freelancer : Freelancer[]) =>{
    const [filter,setFilter] = useState("");

      const filteredFreelancer = useMemo(
        () =>
            freelancer && freelancer.map( (f) => {
                    return Object.values(f).filter(val=> (val.jobcategory.toLowerCase()).includes(filter.toLowerCase()))
            }
                ),
        [filter, freelancer]
    );
    return {
      filter,
      setFilter,
      freelancer : filteredFreelancer
  }
}

const FreelancerContext = createContext<ReturnType<typeof useFreelancerController>>({
    filter: "",
    setFilter:()=>{},
    freelancer:[],
});

export const FreelancerProvider = ({freelancer, children}) => (
    <FreelancerContext.Provider value={useFreelancerController(freelancer)}>
        {children}
    </FreelancerContext.Provider>
);

export const useFreelancer = () => useContext(FreelancerContext);

interface Project {
  id: string,
  title: string,
  desc: string,
  categories: []
}

const useProjectController = (project : Project[]) =>{
  const [filter,setFilter] = useState("");

    const checkCategory = (val) => {
      return val?.categories.some(category=> category.toLowerCase().includes(filter.toLowerCase()))
    }
    
    const filteredProject = useMemo(
      () =>
      project && project.filter( val => { 
        return (val.title.toLowerCase()).includes(filter.toLowerCase()) || (val.desc.toLowerCase()).includes(filter.toLowerCase()) || checkCategory(val)
        }
      ),
      [filter, project]
  );
  return {
    filter,
    setFilter,
    project : filteredProject
}
}

const ProjectContext = createContext<ReturnType<typeof useProjectController>>({
  filter: "",
  setFilter:()=>{},
  project:[],
});

export const ProjectProvider = ({project, children}) => (
  <ProjectContext.Provider value={useProjectController(project)}>
      {children}
  </ProjectContext.Provider>
);

export const useProject = () => useContext(ProjectContext);
