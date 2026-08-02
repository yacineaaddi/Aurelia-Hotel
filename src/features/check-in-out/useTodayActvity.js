import { getStaysTodayActivity } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export default function useTodayActivity() {
  const { isLoading: isLoadingTodayActivity, data: activities } = useQuery({
    queryFn: () => getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoadingTodayActivity };
}
