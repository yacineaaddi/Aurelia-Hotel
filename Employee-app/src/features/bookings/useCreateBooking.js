import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createBooking } = useMutation({
    mutationFn: createEditBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error("Error, please try again");
    },
  });

  return { isCreating, createBooking };
}
