import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: JSON.parse(localStorage?.getItem("searchDate")) === undefined || JSON.parse(localStorage?.getItem("searchDate")) === "undefined" ? [] : JSON.parse(localStorage?.getItem("searchDate")),
  options: {
    adultCount: undefined,
    childCount: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage?.setItem("searchDate", JSON.stringify(state.dates));
}, [state.dates]);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
