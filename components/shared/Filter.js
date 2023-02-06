import styled from '@emotion/styled';
import { useState } from 'react';
import Modal from "./Modal";
import Dropdown from './Dropdown';
import { Container } from '@mui/material';
import ClickableStarRating from './ClickableStarRating';

const data = [
  {
    title:"Categories",
    options:[
      {
        title: 'job1',
        value: 'job1'
      },
      {
        title: 'job2',
        value: 'job2'
      },
      {
        title: 'job3',
        value: 'job3'
      },
      {
        title: 'job4',
        value: 'job4'
      }
    ]
  },
  {
    title:"Skills",
    options:[
      {
        title: 'skills1',
        value: 'skills1'
      },
      {
        title: 'skills2',
        value: 'skills2'
      },
      {
        title: 'skills3',
        value: 'skills3'
      },
      {
        title: 'skills4',
        value: 'skills4'
      }
    ]
  },
  {
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
  },
  {
    title:"Budget",
    options:[
      {
        title: 'job1',
        value: 'job1'
      },
      {
        title: 'job2',
        value: 'job2'
      },
      {
        title: 'job3',
        value: 'job3'
      },
      {
        title: 'job4',
        value: 'job4'
      }
    ]
  },
  {
    title: 'Rating',
    value: null
  }
]

const FilterButton = styled.span`
    background: transparent;
    color: #949494;
    padding: 0.5rem 1rem;
    border-radius: 19px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;

    &:hover{
        border: 1px solid #0F7669;
        background: #0F76691A;
        color: #0F7669;
    }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
`
const ItemLabel = styled.span`
  font-size: 14px;
  color: #525252;
`
function Filter() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    handleClose();
  }

  return (
    <>
      <FilterButton onClick={()=>setOpen(true)}>Filters</FilterButton>
      <Modal handleClose={handleClose} handleSubmit={handleSubmit} isOpen={open} title="Filters" description="desc" hasHeader={true} hasFooter={true}>
          <Container>
            {data && data.map((item,idx) => (
              <Item key={"filter-item-"+idx}>
                <ItemLabel>{item.title}</ItemLabel>
                {idx < data.length-1 
                  ? <Dropdown hasLabel={false} items={item.options} width="100%" type="standard"/>
                  : <ClickableStarRating/>
                }
              </Item>
            ))}
          </Container>
      </Modal>
    </>
  )
}

export default Filter