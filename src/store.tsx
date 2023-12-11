import { useState, useMemo, createContext, useContext } from 'react';
import axios from 'axios';
import { getClients } from '../components/forms/formService';
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
        return (freelancerResult = response.data ? response.data?.data : null); //response.data?.data.map((item)=> ({"clientId": item.id, ...item.attributes}));
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

export async function getSkill() {
  const res = await getClients()
    .then(async (response) => {
      if (response.data) {
        return (freelancerResult = response.data?.data);
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
}
const useFreelancerController = (freelancer: Freelancer[]) => {
  const [filter, setFilter] = useState<{
    category?: string | null;
    skill?: string | null;
  }>({});

  const hasCategoriesAndSkills = (
    val: any
  ): val is {
    attributes: {
      categories: { data: { attributes: { key: string } }[] };
      skills: { data: { attributes: { slug: string } }[] };
    };
  } => {
    return (
      val &&
      val.attributes &&
      val.attributes.categories &&
      val.attributes.categories.data &&
      val.attributes.skills &&
      val.attributes.skills.data
    );
  };

  const checkCategoriesAndSkills = (val: any) => {
    if (filter && hasCategoriesAndSkills(val)) {
      const categoryMatch = val.attributes.categories.data.some((category) =>
        category.attributes.key
          .toLowerCase()
          .includes(filter?.category?.toLowerCase() ?? '')
      );

      // const skillMatch = val.attributes.skills.data.some((skill) =>
      //   skill.attributes.slug
      //     .toLowerCase()
      //     .includes(filter?.skill?.toLowerCase() ?? '')
      // );

      return categoryMatch;
    }
    return false;
  };

  const filteredFreelancer = useMemo(() => {
    if (!freelancer || filter.category === null) {
      return freelancer || []; // Return an empty array if freelancer is undefined
    }

    return freelancer.filter((f) => {
      return hasCategoriesAndSkills(f) && checkCategoriesAndSkills(f);
    });
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
  filter: {},
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
    () => {
      return project;
    },
    // project &&
    // project
    //   .map((p) => {
    //     return { id: p.id, ...p.attributes };
    //   })
    //   .filter((val: Project) => {
    //     return (
    //       val?.status < 99 &&
    //       checkCategories(val) &&
    //       checkBudget(val) &&
    //       checkLocation(val)
    //     ); //&& (val?.title?.toLowerCase().includes(projectFilter.toLowerCase()) || val?.description?.toLowerCase().includes(projectFilter.toLowerCase()))
    //   }),
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
