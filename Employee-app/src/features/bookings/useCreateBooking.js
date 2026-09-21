import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBooking } from "../../services/apiBookings";

export default function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createBooking } = useMutation({
    mutationFn: createEditBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  return { isCreating, createBooking };
}
