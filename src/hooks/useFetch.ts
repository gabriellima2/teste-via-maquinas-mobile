import { DependencyList, useEffect, useState } from "react";

import type { CharacterData, CharacterDetailsData } from "../types";

interface Data {
	results: CharacterData[];
}

export interface UseFetchOptions {
	keepPreviousData?: boolean;
}

export function useFetch<T extends Data & CharacterDetailsData>(
	url: string,
	deps: DependencyList,
	options?: UseFetchOptions
) {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({} as T);
	const [error, setError] = useState(false);

	const handleResponseData = (responseData: T) => {
		const havePreviousData = Object.keys(data).length > 0;

		if (options?.keepPreviousData && havePreviousData) {
			return setData((prev) => ({
				...prev,
				results: [...prev.results, ...responseData.results],
			}));
		}

		setData(responseData);
	};

	useEffect(() => {
		if (!isLoading) return;

		(async () => {
			try {
				const response = await fetch(url);
				const apiData: T = await response.json();

				handleResponseData(apiData);
			} catch (err) {
				console.log(err);
				setError(true);
			} finally {
				setIsLoading(false);
			}
		})();
	}, deps);

	return {
		data,
		error,
		isLoading,
	};
}
