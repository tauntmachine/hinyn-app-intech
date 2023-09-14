import { useState, useMemo, createContext, useContext } from 'react';
import axios from 'axios';
import {
  getClients,
  getFilteredClients,
} from '../components/forms/formService';
import { origin } from '../src/config';
axios.defaults.withCredentials = true;

interface Freelancer {
  id: string;
  attributes: {};
}

let freelancerResult = [];
let projectsResult = [];

export async function getServerSideProps() {
  // const res = await axios.get(origin + '/clients')
  const res = await getClients()
    .then(async (response) => {
      if (response.data) {
        return (freelancerResult = response.data?.data); //response.data?.data.map((item)=> ({"clientId": item.id, ...item.attributes}));
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });

  const proj = await axios
    .get(origin + '/bids?populate=*', {})
    .then(async (response) => {
      if (response.data) {
        return (projectsResult = response.data?.data);
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });

  return {
    props: {
      freelancer: freelancerResult,
      project: projectsResult,
    },
  };
}

// export async function getServerSideProps() {
//   try {
//     const freelancerPromise = getClients();
//     const projectsPromise = axios.get(origin + '/bids?populate=*', {});

//     const [freelancerResponse, projectsResponse] = await Promise.all([
//       freelancerPromise,
//       projectsPromise,
//     ]);

//     const freelancerData = freelancerResponse.data?.data ?? [];
//     const projectsData = projectsResponse.data?.data ?? [];

//     return {
//       props: {
//         freelancer: freelancerData,
//         project: projectsData,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         freelancer: [],
//         project: [],
//       },
//     };
//   }
// }

const useFreelancerController = (freelancer: Freelancer[]) => {
  const [filter, setFilter] = useState(undefined);

  const checkCategories = (val) => {
    if (typeof filter === 'object')
      return val?.data.some((category) =>
        category?.attributes?.key
          .toLowerCase()
          .includes(filter?.category?.toLowerCase() ?? '')
      );
    return val?.data.some((category) =>
      category?.attributes?.key
        .toLowerCase()
        .includes(filter?.toLowerCase() ?? '')
    );
  };

  const checkSkill = (val) => {
    // if((typeof filter) === 'object') return val?.data.some(res => res?.attributes?.slug.toLowerCase().includes(filter?.skill?.toLowerCase() ?? ''));
    return 1;
  };

  const checkLocation = (val) => {
    if (typeof filter === 'object')
      return val.replace(' ', '').toLowerCase().includes(filter?.location);
    return 1;
  };

  const filteredFreelancer = useMemo(() => {
    return (
      freelancer &&
      freelancer
        .map((f) => {
          // console.log(f)
          // return 1
          return Object.values(f).filter(
            (val) =>
              val.accountType === 1 &&
              checkCategories(val?.categories) &&
              checkSkill(val?.skills) &&
              checkLocation(val?.city)
          )[0];
        })
        .filter((data) => data !== undefined)
    );
  }, [filter, freelancer]);

  return {
    filter,
    setFilter,
    freelancer: filteredFreelancer,
  };
};

const FreelancerContext = createContext<
  ReturnType<typeof useFreelancerController>
>({
  filter: '',
  setFilter: () => {},
  freelancer: [],
});

export const FreelancerProvider = ({ freelancer, children }) => (
  <FreelancerContext.Provider value={useFreelancerController(freelancer)}>
    {children}
  </FreelancerContext.Provider>
);

export const useFreelancer = () => useContext(FreelancerContext);

interface Project {
  id: string;
  title: string;
  status: number;
  description: string;
  attributes: {};
}

const useProjectController = (project: Project[]) => {
  const [projectFilter, setProjectFilter] = useState(undefined);

  const checkBudget = (val) => {
    if (typeof projectFilter === 'object' && projectFilter?.budget)
      return val?.minBudget === parseInt(projectFilter?.budget); //return val?.data.some(category => category?.attributes?.key.toLowerCase().includes(filter?.category?.toLowerCase() ?? ''))
    return 1;
  };

  const checkLocation = (val) => {
    // console.log()
    if (typeof projectFilter === 'object' && projectFilter?.location)
      return val?.city
        ?.replace(/\s+/g, '')
        .toLowerCase()
        .includes(projectFilter?.location); //return val?.data.some(category => category?.attributes?.key.toLowerCase().includes(filter?.category?.toLowerCase() ?? ''))
    return 1;
  };

  const checkCategories = (val) => {
    if (projectFilter === '') return val;
    if (typeof projectFilter === 'object' && projectFilter?.category === 'all')
      return val;
    if (typeof projectFilter === 'object')
      return (
        val?.categories?.data[0]?.attributes?.key === projectFilter?.category
      ); //return val?.data.some(category => category?.attributes?.key.toLowerCase().includes(filter?.category?.toLowerCase() ?? ''))
    return (
      (projectFilter &&
        val?.title?.toLowerCase().includes(projectFilter?.toLowerCase())) ??
      val
    );
  };

  const filteredProject = useMemo(
    () =>
      project &&
      project
        .map((p) => {
          return { id: p.id, ...p.attributes };
        })
        .filter((val: Project) => {
          return (
            val?.status < 99 &&
            checkCategories(val) &&
            checkBudget(val) &&
            checkLocation(val)
          ); //&& (val?.title?.toLowerCase().includes(projectFilter.toLowerCase()) || val?.description?.toLowerCase().includes(projectFilter.toLowerCase()))
        }),
    [projectFilter, project]
  );
  return {
    projectFilter,
    setProjectFilter,
    project: filteredProject,
  };
};

const ProjectContext = createContext<ReturnType<typeof useProjectController>>({
  projectFilter: '',
  setProjectFilter: () => {},
  project: [],
});

export const ProjectProvider = ({ project, children }) => (
  <ProjectContext.Provider value={useProjectController(project)}>
    {children}
  </ProjectContext.Provider>
);

export const useProject = () => useContext(ProjectContext);
