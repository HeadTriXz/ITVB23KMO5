import type { APIPostAccountBody } from "@/types/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";

export function useEditAccount() {
    const queryClient = useQueryClient();
    const { api } = useData();

    const mutation = useMutation({
        mutationKey: QueryKeys.ACCOUNT,
        mutationFn: async (options: APIPostAccountBody) => {
            if (!api) {
                throw new Error("The app is not ready yet.");
            }

            await api.account.editAccount(options);
            if (options.firstName || options.lastName) {
                const customer = await api.customers.getCustomer();
                await api.customers.editCustomer(customer.id, {
                    firstName: options.firstName,
                    lastName: options.lastName,
                });
            }
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({
                exact: true,
                queryKey: QueryKeys.ACCOUNT
            });
        }
    });

    return {
        editAccount: mutation.mutate,
        editAccountAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    };
}
