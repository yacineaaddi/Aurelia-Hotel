import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.getQueriesData(["user"], user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err.message);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
