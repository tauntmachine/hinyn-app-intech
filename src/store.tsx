import {useState, useMemo, createContext, useContext} from 'react';
import axios from 'axios';
import { getClients, getFilteredClients } from '../components/forms/formService';
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
    const res = await getClients().then(async (response) => {
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
            "freelancer": freelancerResult,
            "project" : projectsResult
        },
    }
}

const useFreelancerController = (freelancer : Freelancer[]) =>{
    const [filter,setFilter] = useState(undefined);
  
    console.log('this is called',filter)
      
    const checkCategories = (val) => {
      if((typeof filter) === 'object') return val?.data.some(category => category?.attributes?.key.toLowerCase().includes(filter?.category?.toLowerCase() ?? ''))
      return val?.data.some(category => category?.attributes?.key.toLowerCase().includes(filter?.toLowerCase() ?? ''));
    }

    const checkSkill = (val) => {
      // if((typeof filter) === 'object') return val?.data.some(res => res?.attributes?.slug.toLowerCase().includes(filter?.skill?.toLowerCase() ?? ''));
      return 1;
    }

    const checkLocation = (val) => {
      if((typeof filter) === 'object') return val.replace(' ','').toLowerCase().includes(filter?.location)
      return 1;
    }

      const filteredFreelancer = useMemo(
        () =>
          { 
              return freelancer && freelancer.map( (f) => {
                return Object.values(f).filter((val)=> (val.accountType === 1) && checkCategories(val?.categories) && checkSkill(val?.skills) && checkLocation(val?.city) )[0];
              }).filter(data => data !== undefined)
             
          },
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
  status:number,
  description: string,
  attributes: {}
}

const useProjectController = (project : Project[]) =>{
  const [projectFilter,setProjectFilter] = useState("");

    const checkCategory = (val) => {
      return val?.categories.some(category=> category.toLowerCase().includes(projectFilter.toLowerCase()))
    }
    
    const filteredProject = useMemo(
      () =>
      project && project.map( (p) => { 
        return {"id":p.id, ...p.attributes}
      }).filter((val : Project)=>{
        return val?.status < 99 && (val?.title?.toLowerCase().includes(projectFilter.toLowerCase()) || val?.description?.toLowerCase().includes(projectFilter.toLowerCase()))
        }),
      [projectFilter, project]
  );
  return {
    projectFilter,
    setProjectFilter,
    project : filteredProject
}
}

const ProjectContext = createContext<ReturnType<typeof useProjectController>>({
  projectFilter: "",
  setProjectFilter:()=>{},
  project:[],
});

export const ProjectProvider = ({project, children}) => (
  <ProjectContext.Provider value={useProjectController(project)}>
      {children}
  </ProjectContext.Provider>
);

export const useProject = () => useContext(ProjectContext);
