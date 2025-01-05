import type { APIGetCarResult } from "@/types/api";
import type { SearchFilters } from "@/types/search";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAPI } from "@/hooks/useAPI";

interface UseCarSearchProps {
    filters: SearchFilters;
    query?: string;
    pageSize?: number;
}

interface UseCarSearchReturn {
    cars: APIGetCarResult[];
    isLoading: boolean;
    error: string;
    hasMore: boolean;
    loadMore: () => Promise<void>;
    refresh: () => Promise<void>;
}

export function useCarSearch({ filters, query, pageSize = 20 }: UseCarSearchProps): UseCarSearchReturn {
    const { api, isAuthenticated } = useAPI();

    const [allFetchedCars, setAllFetchedCars] = useState<APIGetCarResult[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [hasMoreServer, setHasMoreServer] = useState(true);

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

    const fetchInitialCars = useCallback(async () => {
        if (!isAuthenticated) {
            return;
        }

        setIsLoading(true);
        setError("");
        setCurrentPage(0);
        setAllFetchedCars([]);

        try {
            const result = await api.getCars({
                page: 0,
                size: pageSize
            });

            setAllFetchedCars(result);
            setHasMoreServer(result.length === pageSize);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [api, isAuthenticated, pageSize]);

    const loadMore = useCallback(async () => {
        if (!isAuthenticated || isLoading || !hasMoreServer) {
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const nextPage = currentPage + 1;
            const result = await api.getCars({
                page: nextPage,
                size: pageSize
            });

            setAllFetchedCars(prev => [...prev, ...result]);
            setCurrentPage(nextPage);
            setHasMoreServer(result.length === pageSize);
        } catch (err) {
            setError("Failed to fetch more cars");
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, hasMoreServer, isAuthenticated, isLoading, pageSize]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchInitialCars();
        }
    }, [isAuthenticated, fetchInitialCars]);

    const hasMore = useMemo(() => {
        if (hasMoreServer) {
            return true;
        }

        const filteredLength = filteredCars.length;
        const threshold = (currentPage + 0.5) * pageSize;

        return filteredLength < threshold && hasMoreServer;
    }, [filteredCars.length, currentPage, pageSize, hasMoreServer]);

    return {
        cars: filteredCars,
        isLoading: isLoading,
        error: error,
        hasMore: hasMore,
        loadMore: loadMore,
        refresh: fetchInitialCars
    };
}
