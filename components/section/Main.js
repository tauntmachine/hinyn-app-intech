import {Container} from "@mui/material";
import CategoryList from "../shared/categories/CategoryList";
import CardsSection from "./CardsSection";

const categories = {
    data : [
        {
            key : "photography",
            icon : "",
            title: "Photography"
        },
        {
            key : "videographer",
            icon : "",
            title: "Videographer"
        },
        {
            key : "editor",
            icon : "",
            title: "Editor"
        },
        {
            key : "stylist",
            icon : "",
            title: "Stylist"
        },
        {
            key : "makeup-artist",
            icon : "",
            title: "Makeup Artists"
        },
        {
            key : "hair-stylist",
            icon : "",
            title: "Hair Stylists"
        },
        {
            key : "models",
            icon : "",
            title: "Models"
        },
        {
            key : "studio",
            icon : "",
            title: "Studio/Location"
        },
    ]
}

const freelancers = {
    data:[
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
        {
            id:1,
            img:'../../assets/img/man.jpeg',
            name:'John Doe',
            job:'Photographer',
            location:'Dubai, UAE',
            rating: 4
        },
    ]
}

function Main() {
  return (
    <Container  maxWidth="xl" sx={{padding:"30px 10px"}}>
        <CategoryList categories={categories}/>
        <CardsSection cards={freelancers}/>
    </Container>
  )
}

export default Main