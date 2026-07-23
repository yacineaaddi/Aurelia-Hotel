import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err.message);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
