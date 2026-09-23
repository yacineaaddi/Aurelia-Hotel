import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

export default function useDeleteGuest() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteGuestFn } = useMutation({
    mutationFn: deleteGuest,
    onSuccess: () => {
      toast.success("Guest successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (error) => {
      if (error.code === "23503") {
        toast.error(
          "This guest cannot be deleted because they have existing booking",
        );
      } else {
        toast.error("Something went wrong while deleting the guest");
      }
    },
  });
  return { isDeleting, deleteGuestFn };
}
