import React from 'react'
import { Input } from 'rsuite';
import styled from 'styled-components';

interface TableSearchInputProps{
  searchedText:string;
  setSearchedText:React.Dispatch<React.SetStateAction<string>>
}

const Wrap = styled.div`
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
padding:1rem;

`;

const TableSearchInput = ({searchedText,setSearchedText}:TableSearchInputProps) => {
  return (
    <Wrap>
      <Input
        placeholder="Filtruj według nazwy"
        value={searchedText}
        onChange={(value) => {
          setSearchedText(value);
        }}
      />
      </Wrap>
  )
}

export default TableSearchInput
