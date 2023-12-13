import React from "react";
import Card from "./components/Card/Card";
import useAirtable from "./hooks/useAirtable";
import logsData from "./data/logs.json";

import {
  aggregateLogs,
  formatDateRange,
  processConversionsPerDay,
  sortUsers,
} from "./utils/utils";
import "./App.css";
import Loader from "./utils/Loader";

function App() {
  const airtableEndpoint = process.env.REACT_APP_AIRTABLE_ENDPOINT;
  const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

  const { data: users, loading, error } = useAirtable(airtableEndpoint, apiKey);

  const [sortOption, setSortOption] = React.useState("name");
  const [sortOrder, setSortOrder] = React.useState("ascending");

  const userLogsStats = aggregateLogs(logsData);

  if (loading) return <Loader />;
  if (error) {
    return <div>Error: {error}</div>;
  }
  const sortedUsers = sortUsers(
    [...users],
    userLogsStats,
    sortOption,
    sortOrder
  );

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  return (
    <>
      <div className="dropDown">
        <div className="spaceAdd">
          Sort by :&nbsp;
          <select onChange={handleSortChange} value={sortOption}>
            <option value="name">Name</option>
            <option value="impressions">Impressions</option>
            <option value="conversions">Conversions</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>
        <div className="spaceAdd">
          Order :&nbsp;
          <select onChange={handleSortOrderChange} value={sortOrder}>
            <option value="ascending">Asc</option>
            <option value="descending">Desc</option>
          </select>
        </div>
      </div>
      <div className="App">
        {sortedUsers.map((user) => {
          const userStats = userLogsStats[user.fields.Id] || {
            impressions: 0,
            conversions: 0,
            revenue: 0,
          };
          const userLogs = logsData.filter(
            (log) => log.user_id === user.fields.Id
          );
          const logEntry = logsData.find(
            (log) => log.user_id === user.fields.Id
          );
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
    </>
  );
}

export default App;
