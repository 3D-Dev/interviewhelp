// logsUtils
export function aggregateLogs(logs) {
  return logs.reduce((acc, log) => {
    const { user_id, type, revenue } = log;
    if (!acc[user_id]) {
      acc[user_id] = { impressions: 0, conversions: 0, revenue: 0 };
    }
    if (type === "impression") {
      acc[user_id].impressions += 1;
    } else if (type === "conversion") {
      acc[user_id].conversions += 1;
    }
    acc[user_id].revenue += revenue;
    return acc;
  }, {});
}
// dateUtils
export function formatDateRange(time) {
  const startDate = new Date(time);
  const endDate = new Date(time);
  endDate.setDate(startDate.getDate() + 18);
  const startMonth = startDate.getMonth() + 1;
  const startDateFormatted = `${startMonth}/${startDate.getDate()}`;
  const endMonth = endDate.getMonth() + 1;
  const endDateFormatted = `${endMonth}/${endDate.getDate()}`;
  return `${startDateFormatted} - ${endDateFormatted}`;
}
//random colors
export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// conversion per day
export function processConversionsPerDay(logsData) {
  const conversionLogs = logsData.filter((log) => log.type === "conversion");

  const conversionsByDate = conversionLogs.reduce((acc, log) => {
    const date = log.time.split(" ")[0];
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  return Object.entries(conversionsByDate).map(([date, count]) => ({
    name: date,
    conversions: count,
  }));
}

//sorted users

export function sortUsers(users, userLogsStats, sortOption, sortOrder) {
  return users.sort((a, b) => {
    let comparison = 0;

    const statsA = userLogsStats[a.fields.Id] || {
      impressions: 0,
      conversions: 0,
      revenue: 0,
    };
    const statsB = userLogsStats[b.fields.Id] || {
      impressions: 0,
      conversions: 0,
      revenue: 0,
    };

    switch (sortOption) {
      case "name":
        comparison = a.fields.Name.localeCompare(b.fields.Name);
        break;
      case "impressions":
        comparison = statsA.impressions - statsB.impressions;
        break;
      case "conversions":
        comparison = statsA.conversions - statsB.conversions;
        break;
      case "revenue":
        comparison = statsA.revenue - statsB.revenue;
        break;
      default:
        // Handle default case
        break;
    }

    if (sortOrder === "descending") {
      comparison *= -1;
    }

    return comparison;
  });
}
