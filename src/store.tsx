import {useState, useMemo, createContext, useContext} from 'react';
import axios from 'axios';
import { getClients } from '../components/forms/formService';
import { origin } from '../src/config';
axios.defaults.withCredentials = true;


interface Freelancer {
    id: string,
    attributes: {}
}

let freelancerResult;
let projectsResult;


export async function getServerSideProps(){
    // const res = await axios.get(origin + '/clients')
    const res = await axios.get(origin + '/clients',{}).then(async (response) => {
      if (response.data) {
        return freelancerResult = response.data?.data;
      }}).catch(function (error) {
          return { status: false, data: error }}
    );

    const proj = await axios.get(origin + '/bids?populate=*',{}).then(async (response) => {
      if (response.data) {
        return projectsResult = response.data?.data;
      }}).catch(function (error) {
          return { status: false, data: error }}
    );
    
    
    return {
        props: {
            "freelancer": freelancerResult
            ,
            "project" : projectsResult
        },
    }
}

const useFreelancerController = (freelancer : Freelancer[]) =>{
    const [filter,setFilter] = useState("");
      const filteredFreelancer = useMemo(
        () =>
            freelancer && freelancer.map( (f) => {
              return Object.values(f).filter((val)=> val.accountType === 1 && (val.firstName.toLowerCase()).includes(filter.toLowerCase()))[0];
            }).filter(data => data !== undefined),
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
  description: string,
  attributes: {}
}

const useProjectController = (project : Project[]) =>{
  const [filter,setFilter] = useState("");

    const checkCategory = (val) => {
      return val?.categories.some(category=> category.toLowerCase().includes(filter.toLowerCase()))
    }
    
    const filteredProject = useMemo(
      () =>
      project && project.map( (p) => { 
        let temp = {"id":p.id, ...p.attributes}
        return temp
      }).filter((val)=>{
        return val?.title?.toLowerCase().includes(filter.toLowerCase()) || val?.description?.toLowerCase().includes(filter.toLowerCase())
        }),
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
