export const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { useUserId } from "core/permissions";
import { useSession } from "domains/shows/lib/helpers";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export const Calendar: React.FC = () => {
  const userId = useUserId();
  return <SessionAuth>
    <div className="prose">
      <h1>Calendar</h1>
      <code>{API_URL}/public/calendar/{userId}</code>
    </div>
  </SessionAuth>
}

export default Calendar;
