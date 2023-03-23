import {Container} from "@mui/material";
import CategoryList from "../shared/categories/CategoryList";
import CardsSection from "./CardsSection";
import { useFreelancer } from "../../src/store";
import { useState, useEffect } from "react";
import { getCategories } from "../forms/formService";

function Main() {
  const {freelancer, filter, setFilter} = useFreelancer();
  const [categories, setCategories] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(()=>{
    getCategories().then((result)=>{
      if(result?.data?.data && !isFetched){
        setCategories(()=>[])
        result?.data?.data.map((item)=>{
          let temp = {"id":item.id}
          setCategories((prev => prev.concat({...item.attributes,...temp})));
        })
        setIsFetched(true);
      }
    });
},[isFetched])

  const handleButtonClick = () =>{
  }

  return (
    <Container  maxWidth="xl" sx={{padding:"30px 10px", marginBottom:"50px"}}>
        <CategoryList categories={categories}/>
        <CardsSection cards={freelancer} handleButtonClick={handleButtonClick}/>
    </Container>
  )
}

export default Main