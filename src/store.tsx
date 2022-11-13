import {useState, useMemo, createContext, useContext} from 'react';

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
            freelancer: [{
                "-MpYAC-RXmd7ks9Mxlkw": {
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
              }]
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