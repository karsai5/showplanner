export const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { useUserId } from "core/permissions";
import Link from "next/link";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export const Calendar: React.FC = () => {
  const userId = useUserId();
  const calendarUrl = `${API_URL}/public/calendar/${userId}`;
  return (
    <SessionAuth>
      <div className="prose">
        <h1>Calendar Subscription</h1>
        <p>
          Subscribing to the calendar means that you have the most up to date
          information about events. The calendar URL is specific to you, so you
          will only see shows that you are a part of. As you get added to more
          shows events will automatically appear in your calendar.
        </p>
        <p>It&apos;s easiest to setup the subscription on a computer.</p>

        <h2>How to subscribe via Google Calendar</h2>
        <ol className="list-decimal">
          <li>
            On your computer, open{" "}
            <Link href="https://calendar.google.com/calendar">
              {" "}
              Google Calendar.
            </Link>
          </li>
          <li>
            On the left, next to &quot;Other calendars,&quot; click{" "}
            <code>+</code> then <code>From URL</code>.
          </li>
          <li>
            Enter this address: <code>{calendarUrl}</code>
          </li>
          <li>
            Click Add calendar. The calendar appears on the left, under
            &quot;Other calendars.&quot;
          </li>
          Tip: It might take up to 24 hours for changes to show in your Google
          Calendar.
        </ol>

        <h2>How to subscribe via Apple Calendar</h2>
        <ol className="list-decimal">
          <li>On your macbook, open the Calendar app</li>
          <li>
            In Calendar, choose <code>File</code> &gt;{" "}
            <code>New Calendar Subscription</code>
          </li>
          <li>
            Enter this address: <code>{calendarUrl}</code>, then click
            Subscribe.
          </li>
          <li>
            Enter a name for the calendar and choose a color to help you
            identify it on your calendar.
          </li>
          <li>Choose iCloud from the Location menu, then click OK.</li>
        </ol>
      </div>
    </SessionAuth>
  );
};

export default Calendar;
