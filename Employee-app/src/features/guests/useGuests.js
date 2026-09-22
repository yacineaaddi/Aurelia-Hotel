import { getGuests } from "../../services/apiGuests";
import { useQuery } from "@tanstack/react-query";

export default function useGuests() {
  const {
    isLoading: isLoadingGuests,
    data: guests,
    error,
  } = useQuery({ queryKey: ["guests"], queryFn: getGuests });
  console.log(guests);
  return { isLoadingGuests, guests, error };
}
