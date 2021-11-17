import React from "react";
import styled from "styled-components";

interface FileInputProps {
  value: any[];
  onChange: React.Dispatch<any>;
}
const Label = styled.label`
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  outline: 0 !important;
  white-space: nowrap;
  -webkit-transition: color 0.2s linear, background-color 0.3s linear;
  transition: color 0.2s linear, background-color 0.3s linear;
  border: none;
  border: var(--rs-btn-default-border, none);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: none;
  color: #575757;
  color: var(--rs-btn-default-text);
  background-color: #f7f7fa;
  background-color: var(--rs-btn-default-bg);
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  padding: 8 px 12 px;
  overflow: hidden;
  position: relative;
`;

const FileInput = ({ value, onChange }: FileInputProps) => (
  <div>
    {Boolean(value.length) && (
      <div>
        Selected files:{" "}
        {value.map((f,index) => {
          return <span key={index}>{f.name}
          <br/>
          </span>;
        })}
      </div>
    )}
    <Label>
      Click to select some files...
      <input
        style={{ display: "none" }}
        type="file"
        onChange={(e: any) => {
          console.log(e.target.files);
          onChange([...value, ...e.target.files]);
        }}
      />
    </Label>
  </div>
);

export default FileInput;
