import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest } from "../../services/apiGuests";

export default function useDeleteGuest() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteGuestFn } = useMutation({
    mutationFn: deleteGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  return { isDeleting, deleteGuestFn };
}
