import type { SearchFilters } from "@/types/search";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";
import { useMemo } from "react";

interface UseCarSearchProps {
    filters?: SearchFilters;
    query?: string;
    pageSize?: number;
}

export function useCarSearch({ filters = {}, query, pageSize = 20 }: UseCarSearchProps) {
    const queryClient = useQueryClient();
    const { api, isAuthenticated } = useData();

    const {
        data,
        isFetchingNextPage,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        refetch
    } = useInfiniteQuery({
        enabled: isAuthenticated,
        queryKey: [QueryKeys.CARS, pageSize],
        queryFn: async ({ pageParam }) => {
            if (!api) {
                throw new Error("The app is not ready yet.");
            }

            const result = await api.cars.getCars({
                page: pageParam,
                size: pageSize
            });

            for (const car of result) {
                queryClient.setQueryData(QueryKeys.CAR(car.id), car);
            }

            return result;
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length > 0) {
                return pages.length;
            }
        },
        initialPageParam: 0
    });

    const allFetchedCars = useMemo(() => {
        return data?.pages.flatMap((page) => page) ?? []
    }, [data?.pages]);

    const filteredCars = useMemo(() => {
        let result = [...allFetchedCars];

        if (query) {
            const lQuery = query.toLowerCase();
            result = result.filter((car) =>
                car.brand.toLowerCase().includes(lQuery) ||
                car.model.toLowerCase().includes(lQuery)
            );
        }

        if (filters.minPrice) {
            result = result.filter((car) => car.price >= filters.minPrice!);
        }
        if (filters.maxPrice) {
            result = result.filter((car) => car.price <= filters.maxPrice!);
        }
        if (filters.minYear) {
            result = result.filter((car) => car.modelYear >= filters.minYear!);
        }
        if (filters.maxYear) {
            result = result.filter((car) => car.modelYear <= filters.maxYear!);
        }
        if (filters.minSeats) {
            result = result.filter((car) => car.nrOfSeats >= filters.minSeats!);
        }
        if (filters.maxSeats) {
            result = result.filter((car) => car.nrOfSeats <= filters.maxSeats!);
        }
        if (filters.body?.length) {
            result = result.filter((car) => filters.body!.includes(car.body));
        }
        if (filters.fuel?.length) {
            result = result.filter((car) => filters.fuel!.includes(car.fuel));
        }
        if (filters.brands?.length) {
            result = result.filter((car) => filters.brands!.includes(car.brand));
        }
        if (filters.models?.length) {
            result = result.filter((car) => filters.models!.includes(car.model));
        }

        return result;
    }, [allFetchedCars, filters, query]);

    const hasMore = useMemo(() => {
        if (hasNextPage) {
            return true;
        }

        const filteredLength = filteredCars.length;
        const currentPage = data?.pages.length ?? 0;
        const threshold = (currentPage + 0.5) * pageSize;

        return filteredLength < threshold && hasNextPage;
    }, [filteredCars.length, data?.pages.length, hasNextPage]);

    return {
        cars: filteredCars,
        isLoading: isLoading || isFetchingNextPage,
        isLoadingMore: isFetchingNextPage,
        error: error,
        hasMore: hasMore,
        loadMore: fetchNextPage,
        refresh: refetch
    };
}
