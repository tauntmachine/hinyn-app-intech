import {Container} from "@mui/material";
import CategoryList from "../shared/categories/CategoryList";
import CardsSection from "./CardsSection";
import { useFreelancer } from "../../src/store";
import { useEffect } from "react";

const categories = {
    data : [
        {
            key:"all",
            icon:"icn-all.svg",
            title:"All Categories"
        },
        {
            key : "photographer",
            icon : "icn-photographer.svg",
            title: "Photographer"
        },
        {
            key : "videographer",
            icon : "icn-videographer.svg",
            title: "Videographer"
        },
        {
            key : "editor",
            icon : "icn-editor.svg",
            title: "Editor"
        },
        {
            key : "stylist",
            icon : "icn-stylist.svg",
            title: "Stylist"
        },
        {
            key : "makeup-artist",
            icon : "icn-makeupArtist.svg",
            title: "Makeup Artists"
        },
        {
            key : "hair-stylist",
            icon : "icn-makeupArtist-1.svg",
            title: "Hair Stylists"
        },
        {
            key : "model",
            icon : "icn-hairStylist.svg",
            title: "Models"
        },
        {
            key : "studio-location",
            icon : "icn-models.svg",
            title: "Studio/Location"
        },
    ]
}

function Main() {
  const {freelancer, filter, setFilter} = useFreelancer();
  return (
    <Container  maxWidth="xl" sx={{padding:"30px 10px", marginBottom:"50px"}}>
        <CategoryList categories={categories}/>
        <CardsSection cards={freelancer[0]}/>
    </Container>
  )
}

export default Main