import styled from "styled-components";

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rem 0rem;
`;

const ErrorContent = styled.div`
  text-align: center;
  flex-direction: column;
  display: flex;
  gap: 2rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
`;

function Error({ data }) {
  return (
    <ErrorContainer>
      <ErrorContent>
        <h1>⚠️ Something went wrong</h1>
        <ErrorMessage>{`Unable to load ${data}. Please try again.`}</ErrorMessage>
      </ErrorContent>
    </ErrorContainer>
  );
}

export default Error;
