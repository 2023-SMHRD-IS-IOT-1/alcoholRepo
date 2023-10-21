import styled from 'styled-components';

export const StyledDiv = styled.div`
  margin: 10px 0;
`;

export const StyledH1 = styled.h1`
  color: #fff;
  background-color: var(--pink);
  padding: 20px;
  text-align: center;
  margin-bottom: 50px;
  border: none;
  border-radius: 5px;
  
`;

export const StyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const StyledH3 = styled.h3`
  color: #fff;
  background-color: var(--pink);
  padding: 10px;
  text-align: center;
  margin-bottom: 5px;
  border: none;
  border-radius: 5px;
  
`;

export const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
`;

export const StyledInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export const StyledButton = styled.button`
  width: 50%;
  padding: 10px;
  background-color: var(--pink);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: bolder;
  display: block;
  margin: 0 auto;
  &:hover {
    background-color: #2ecc71;
  }
`;

export const StyledSpan = styled.span`
  font-size: 12px;
`;

export const StyledP = styled.p`
  color: red;
  text-align: center;
`;

export const StyledA = styled.a`
  color: #27ae60;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
