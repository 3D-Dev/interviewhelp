import {
  aggregateLogs,
  formatDateRange,
  getRandomColor,
  processConversionsPerDay,
  sortUsers,
} from "./utils";

const logsData = [
  { user_id: 1, type: "impression", revenue: 10 },
  { user_id: 1, type: "conversion", revenue: 20, time: "2023-01-01 12:00:00" },
  { user_id: 2, type: "conversion", revenue: 15, time: "2023-01-01 15:00:00" },
];
const mockUsers = [
  { id: "a", fields: { Id: 1, Name: "Alice", Avatar: "", occupation: "" } },
  { id: "b", fields: { Id: 2, Name: "Bob", Avatar: "", occupation: "" } },
  { id: "c", fields: { Id: 3, Name: "Charlie", Avatar: "", occupation: "" } },
];
const mockUserLogsStats = {
  1: { impressions: 100, conversions: 4, revenue: 200.0 },
  2: { impressions: 150, conversions: 2, revenue: 150.0 },
  3: { impressions: 120, conversions: 3, revenue: 180.0 },
};

describe("Utility Functions", () => {
  describe("aggregateLogs", () => {
    test("correctly aggregates logs", () => {
      const result = aggregateLogs(logsData);
      expect(result).toEqual({
        1: { impressions: 1, conversions: 1, revenue: 30 },
        2: { impressions: 0, conversions: 1, revenue: 15 },
      });
    });
  });

  describe("formatDateRange", () => {
    test("correctly formats date range", () => {
      const result = formatDateRange("2023-01-01");
      expect(result).toEqual("1/1 - 1/19");
    });
  });

  describe("getRandomColor", () => {
    test("returns a valid color", () => {
      const result = getRandomColor();
      expect(result).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });
  // convserion test
  describe("processConversionsPerDay", () => {
    test("correctly processes conversions per day", () => {
      const result = processConversionsPerDay(logsData);
      expect(result).toEqual([{ name: "2023-01-01", conversions: 2 }]);
    });
  });
});
// sorted test
describe("sortUsers Function", () => {
  test("sorts by name ascending", () => {
    const sortedByNameAsc = sortUsers(
      [...mockUsers],
      mockUserLogsStats,
      "name",
      "ascending"
    );
    const namesAsc = sortedByNameAsc.map((user) => user.fields.Name);
    expect(namesAsc).toEqual(["Alice", "Bob", "Charlie"]);
  });

  test("sorts by name descending", () => {
    const sortedByNameDesc = sortUsers(
      [...mockUsers],
      mockUserLogsStats,
      "name",
      "descending"
    );
    const namesDesc = sortedByNameDesc.map((user) => user.fields.Name);
    expect(namesDesc).toEqual(["Charlie", "Bob", "Alice"]);
  });

  test("sorts by impressions ascending", () => {
    const sortedByImpressionsAsc = sortUsers(
      [...mockUsers],
      mockUserLogsStats,
      "impressions",
      "ascending"
    );
    const impressionsAsc = sortedByImpressionsAsc.map(
      (user) => mockUserLogsStats[user.fields.Id].impressions
    );
    expect(impressionsAsc).toEqual([100, 120, 150]);
  });

  test("sorts by impressions descending", () => {
    const sortedByImpressionsDesc = sortUsers(
      [...mockUsers],
      mockUserLogsStats,
      "impressions",
      "descending"
    );
    const impressionsDesc = sortedByImpressionsDesc.map(
      (user) => mockUserLogsStats[user.fields.Id].impressions
    );
    expect(impressionsDesc).toEqual([150, 120, 100]);
  });
  test("sorts by revenue ascending", () => {
    const sortedByRevenueAsc = sortUsers(
      [...mockUsers],
      mockUserLogsStats,
      "revenue",
      "ascending"
    );
    const revenuesAsc = sortedByRevenueAsc.map(
      (user) => mockUserLogsStats[user.fields.Id].revenue
    );
    expect(revenuesAsc).toEqual([150.0, 180.0, 200.0]);
  });

  test("sorts by revenue descending", () => {
    const sortedByRevenueDesc = sortUsers(
      [...mockUsers],
      mockUserLogsStats,
      "revenue",
      "descending"
    );
    const revenuesDesc = sortedByRevenueDesc.map(
      (user) => mockUserLogsStats[user.fields.Id].revenue
    );
    expect(revenuesDesc).toEqual([200.0, 180.0, 150.0]);
  });
});
