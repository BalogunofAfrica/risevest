import { useState } from "react";

const emptyArray = [] as const;

export function useLazyResult<T>(
  _result: T[] | undefined,
  _fetchNextPage: () => void,
  pageSize = 10,
) {
  const [endIndex, setEndIndex] = useState(pageSize);

  const result = _result ?? emptyArray;

  const fetchNextPage = () => {
    if (result.length < endIndex) _fetchNextPage();
    setEndIndex((previous) => previous + pageSize);
  };

  return {
    fetchNextPage,
    lazyResult: result.slice(0, endIndex),
  };
}
