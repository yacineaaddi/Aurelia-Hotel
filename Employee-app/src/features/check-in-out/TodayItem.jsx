import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import CheckoutButton from "./CheckoutButton";

import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";

const StyledTodayItem = styled.li`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2.5rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-300);
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}
