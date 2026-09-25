import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  text-align:center
  align-items: center;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  async function handleConfirm() {
    try {
      await onConfirm();
    } finally {
      onCloseModal();
    }
  }

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={handleConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
