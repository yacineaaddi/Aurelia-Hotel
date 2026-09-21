import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencil,
} from "react-icons/hi2";
import { formatDistanceFromNow } from "../../utils/helpers";
import useCheckout from "../check-in-out/useCheckout";
import { formatCurrency } from "../../utils/helpers";
import CreateBookingForm from "./CreateBookingForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import { HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();

  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    cabinPrice,
    hasBreakfast,
    isPaid,
    numGuests,
    observations,
    extrasPrice,
    status,
    nationalID: { fullName, email, nationality, nationalID },
    cabinName: { name: cabinName },
  } = booking;

  const newBookingData = {
    id,
    startDate: new Date(startDate).toISOString().slice(0, 10),
    endDate: new Date(endDate).toISOString().slice(0, 10),
    numNights,
    totalPrice,
    numGuests,
    cabinPrice,
    hasBreakfast,
    isPaid,
    observations,
    extrasPrice,
    status,
    nationalID,
    cabinName,
    fullName,
    email,
    nationality,
  };

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
        <span>national ID : {nationalID}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${id}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${id}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(id)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(id);
            }}
          />
        </Modal.Window>
        <Modal.Window name="edit">
          <CreateBookingForm bookingToEdit={newBookingData} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
