import styled from "styled-components";

export const LoadingText = styled.text`
  font-size: 50px;
  align-self: center;
  margin-top: 200px;
`;

export const UploadLabel = styled.label`
  display: flex;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  border-style: dashed;
  &:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`;

export const UploadText = styled.text`
  font-size: 20px;
  font-weight: bold;
`;

export const TableTitleText = styled.text`
  flex: 0 1 auto;
  font-size: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
`;
