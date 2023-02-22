import styled from "styled-components"

export const FieldSet = styled.fieldset<{
  errorStatus?: boolean
}>`
  display: flex;
  flex-direction: column;
  gap: 8px;


  position: relative;
  width: 100%;
  border: none;
  color: ${({ errorStatus, theme }) => errorStatus ? theme.color.red : "inherit"};

  input[type=text], input[type=number], input[type=date], select {
    background-color: inherit;
    outline: none;
    border: none;
    color: ${({ theme }) => theme.main.contrastV1};
    width: 100%;

    &::placeholder {
      color: ${({ errorStatus, theme }) => errorStatus ? theme.color.red + "90" : theme.main.contrastV1 + "90"};
      font-size: 14px;
    }
  }

  input[type=date]::-webkit-calendar-picker-indicator {
    filter: ${({ theme }) => theme.variant === "Dark" ? "invert(100%)" : "none"};
  }

  ul {
    list-style: none;
  }
`

export const FileInputLabel = styled.label`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.main.primaryV2};
  width: 80%;
  padding: 16px;
  border: 1px dashed ${({ theme }) => theme.main.contrastV2};
  border-radius: 4px;

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  &:hover {
    background-color: ${({ theme }) => theme.main.primaryV1};
  }

  &.dragged {
    transition: 0.1s ease-in-out;
    border: 2px dashed ${({ theme }) => theme.main.contrastV2};
    background-color: ${({ theme }) => theme.main.primaryV1};
  }

  > span.clickCircle {
    width: 400px;
    height: 400px;
    background-color: white;
    opacity: 0.2;
    position: absolute;
    border-radius: 50%;

    animation: expandClickInputFile 0.5s ease forwards;
    transform: translate(-50%, -50%);

    @keyframes expandClickInputFile {
      0% {
        transform: translate(-50%, -50%) scale(0.01);
      } 
      50% {
        transform:  translate(-50%, -50%) scale(2.0);
        opacity: 0.2;
      }
      100% {
        transform: translate(-50%, -50%) scale(2.0);
        opacity: 0;
      }
    }
  }
`

export const FileInputData = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
`