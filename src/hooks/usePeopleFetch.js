import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { filtersContext } from "filtersContext";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { filters, setFilters } = useContext(filtersContext);

  let url = "https://randomuser.me/api/?results=25&page=1";

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    setUsers([]); //when fetching, only show loading spinner
    applyFilters();
    const response = await axios.get(url);
    setIsLoading(false);
    setUsers(response.data.results);
  }

  const applyFilters = () => {
    //check if there any filters
    if (!Object.values(filters).includes(true)) return;

    url = url.concat("&nat="); //adding nationalities filter

    for (const filter in filters) {
      if (filters[filter] === true) {
        url = url.concat(filter, ",");
      }
    }

    url = url.slice(0, -1); //removing last char (,)]
    console.log(url);
  };

  return { users, isLoading, fetchUsers };
};
