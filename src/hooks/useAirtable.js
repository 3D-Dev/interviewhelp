import { useState, useEffect } from "react";
import axios from "axios";

const useAirtable = (endpoint, apiKey) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        setData(response.data.records);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, apiKey]);

  return { data, loading, error };
};

export default useAirtable;
