import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";

import AsyncStorage from "expo-sqlite/kv-store";

interface UseAccountOptions {
    skipStorageLoad?: boolean;
}

const ACCOUNT_STORAGE_KEY = "account";

export function useAccount(options: UseAccountOptions = {}) {
    const queryClient = useQueryClient();
    const { api } = useData();

    const [isLoadingStorage, setIsLoadingStorage] = useState(true);

    useEffect(() => {
        if (options.skipStorageLoad) {
            return;
        }

        AsyncStorage.getItem(ACCOUNT_STORAGE_KEY)
            .then((account) => {
                if (account) {
                    queryClient.setQueryData(QueryKeys.ACCOUNT, JSON.parse(account));
                }
            })
            .catch(console.error)
            .finally(() => setIsLoadingStorage(false));
    }, [options.skipStorageLoad, queryClient]);

    const { data: account, isLoading, error } = useQuery({
        enabled: !isLoadingStorage || options.skipStorageLoad,
        queryKey: QueryKeys.ACCOUNT,
        queryFn: async () => {
            if (!api) {
                throw new Error("The app is not ready yet.");
            }

            return api.account.getAccount();
        }
    });

    return {
        account,
        isLoading,
        error
    };
}
