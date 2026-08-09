import { useQuery } from "@tanstack/react-query";

import { getStaysTodayActivity } from "../../services/apiBookings";

export default function useTodayActivity() {
  const { isLoading: isLoadingTodayActivity, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoadingTodayActivity };
}
