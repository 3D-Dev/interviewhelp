import {
  aggregateLogs,
  formatDateRange,
  getRandomColor,
  processConversionsPerDay,
} from "./utils";

const logsData = [
  { user_id: 1, type: "impression", revenue: 10 },
  { user_id: 1, type: "conversion", revenue: 20, time: "2023-01-01 12:00:00" },
  { user_id: 2, type: "conversion", revenue: 15, time: "2023-01-01 15:00:00" },
];

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

  describe("processConversionsPerDay", () => {
    test("correctly processes conversions per day", () => {
      const result = processConversionsPerDay(logsData);
      expect(result).toEqual([{ name: "2023-01-01", conversions: 2 }]);
    });
  });
});
