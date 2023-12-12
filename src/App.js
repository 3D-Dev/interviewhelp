import Card from "./components/Card/Card";
import useAirtable from "./hooks/useAirtable";
import logsData from "./data/logs.json";

import {
  aggregateLogs,
  formatDateRange,
  processConversionsPerDay,
} from "./utils/utils";
import "./App.css";
import Loader from "./utils/Loader";

function App() {
  const airtableEndpoint = process.env.REACT_APP_AIRTABLE_SORTED_ENDPOINT;
  const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const { data: users, loading, error } = useAirtable(airtableEndpoint, apiKey);

  const userLogsStats = aggregateLogs(logsData);

  if (loading) return <Loader />;
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      {users.map((user) => {
        const userStats = userLogsStats[user.fields.Id] || {
          impressions: 0,
          conversions: 0,
          revenue: 0,
        };
        const userLogs = logsData.filter(
          (log) => log.user_id === user.fields.Id
        );
        const logEntry = logsData.find((log) => log.user_id === user.fields.Id);
        const time = logEntry ? formatDateRange(logEntry.time) : "";
        const userDataForGraph = processConversionsPerDay(userLogs);

        return (
          <Card
            key={user.id}
            name={user.fields.Name}
            avatar={user.fields.Avatar}
            occupation={user.fields.occupation}
            impressions={userStats.impressions}
            conversions={userStats.conversions}
            revenue={userStats.revenue.toFixed(2)}
            time={time}
            dataForGraph={userDataForGraph}
          />
        );
      })}
    </div>
  );
}

export default App;
