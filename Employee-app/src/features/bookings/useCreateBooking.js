import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createBooking } = useMutation({
    mutationFn: createEditBooking,
    onSuccess: () => {
      toast.success("New booking successfully created");
      queryClient.invalidateQueries({ queryKey: ["new-booking"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  return { isCreating, createBooking };
}
