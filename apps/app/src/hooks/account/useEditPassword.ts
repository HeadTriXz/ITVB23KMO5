import type { APIPostChangePasswordBody } from "@/types/api";

import { useData } from "@/hooks/useData";
import { useMutation } from "@tanstack/react-query";

export function useEditPassword() {
    const { api } = useData();

    const mutation = useMutation({
        mutationFn: async (options: APIPostChangePasswordBody) => {
            if (!api) {
                throw new Error("The app is not ready yet.");
            }

            await api.account.changePassword(options);
        }
    });

    return {
        editPassword: mutation.mutate,
        editPasswordAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    };
}
