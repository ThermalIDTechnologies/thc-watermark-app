import styled from "styled-components"
import { a } from "react-spring"

export const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
`

export const ImageUploadProcess = styled.ol`
  margin: 2rem 0;
`

export const UploadedImage = styled(a.img)`
  padding: 0;

  @media screen and (min-width: 770px) {
    padding: 0 2rem;
  }
`

export const LayoutContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 5rem 2rem 1rem;

  main {
    min-height: -moz-calc(100vh - 340px); /* Firefox */
    min-height: -webkit-calc(100vh - 340px); /* Chrome, Safari */
    min-height: calc(100vh - 340px);
  }
`

export const StyledForm = styled.form`
  input {
    margin-right: 5px;
  }
`