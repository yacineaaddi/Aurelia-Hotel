import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
