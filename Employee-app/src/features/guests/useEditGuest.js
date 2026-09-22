import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

export default function useEditGuest() {
  const queryClient = useQueryClient();

  const { mutate: editGuestFn, isPending: isEditing } = useMutation({
    mutationFn: editGuest,
    onSuccess: () => {
      toast.success("Guest successfully edited");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editGuestFn, isEditing };
}
