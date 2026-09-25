import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export default function useCabins() {
  const {
    isLoading: isLoadingCabins,
    data: cabins,
    error,
  } = useQuery({ queryKey: ["cabins"], queryFn: getCabins });

  return { isLoadingCabins, cabins, error };
}
