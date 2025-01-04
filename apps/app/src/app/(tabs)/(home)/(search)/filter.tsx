import type { SearchFilters, SearchParams } from "@/types/search";

import { BODY_TYPES, CAR_BRANDS_AND_MODELS, FUEL_TYPES } from "@/constants/cars";
import { ScrollView, StyleSheet, View } from "react-native";
import { createParamsFromFilters, parseFiltersFromParams } from "@/utils/filterParams";
import { useCallback, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { CollapsibleFilterSection } from "@/components/CollapsibleFilterSection";
import { Header } from "@/components/header/Header";
import { MultiSelectFilter } from "@/components/filters/MultiSelectFilter";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { RangeFilter } from "@/components/filters/RangeFilter";
import { SearchWithFilter } from "@/components/SearchWithFilter";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";

type ArrayKeys<T> = {
    [K in keyof Required<T>]: Exclude<T[K], undefined> extends string[] ? K : never;
}[keyof T];

export default function FilterScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<SearchParams>();
    const initialFilters = parseFiltersFromParams(params);

    const [filters, setFilters] = useState<SearchFilters>(initialFilters);

    // Handlers
    const onSearchFocus = useCallback(() => {
        router.replace({ pathname: "/search", params: params });
    }, [params]);

    const onFilter = useCallback(() => {
        router.back();
    }, []);

    const onSubmit = useCallback(() => {
        const newParams = createParamsFromFilters(filters);
        if (params.query) {
            newParams.query = params.query;
        }

        router.replace({ pathname: "/results", params: newParams });
    }, [filters, params.query]);

    const clearFilters = useCallback(() => {
        setFilters({});
    }, []);

    // Filter updates
    const updateBrands = useCallback((brand: string) => {
        setFilters((prev: SearchFilters) => {
            const newBrands = prev.brands?.includes(brand)
                ? prev.brands.filter((b) => b !== brand)
                : [...(prev.brands || []), brand];

            if (newBrands.length === 0) {
                return { ...prev, brands: undefined, models: undefined };
            }

            const availableModels = newBrands.flatMap((brand) => {
                return CAR_BRANDS_AND_MODELS.find((b) => b.brand === brand)?.models || [];
            });
            const validModels = prev.models?.filter((model) => availableModels.includes(model));

            return {
                ...prev,
                brands: newBrands,
                models: validModels?.length ? validModels : undefined
            };
        });
    }, []);

    const updateMultiSelect = useCallback((key: ArrayKeys<SearchFilters>, value: string) => {
        setFilters((prev: SearchFilters) => ({
            ...prev,
            [key]: prev[key]?.includes(value)
                ? prev[key].filter((v) => v !== value)
                : [...(prev[key] || []), value]
        }));
    }, []);

    const updateNumeric = useCallback((key: keyof SearchFilters, value?: string) => {
        setFilters((prev: SearchFilters) => ({
            ...prev,
            [key]: value ? Number(value) : undefined
        }));
    }, []);

    // Derived data
    const availableModels = filters.brands?.flatMap((brand) => {
        return CAR_BRANDS_AND_MODELS.find((b) => b.brand === brand)?.models || [];
    }) ?? [];

    return (
        <ThemedView style={styles.container}>
            <Header title="Search" withBackButton withNotificationsButton />
            <SearchWithFilter onFilter={onFilter} onFocus={onSearchFocus} value={params.query} />
            <ScrollView style={styles.filterContainer}>
                <CollapsibleFilterSection title="Brand">
                    <MultiSelectFilter
                        options={CAR_BRANDS_AND_MODELS.map(({ brand }) => brand)}
                        selectedOptions={filters.brands || []}
                        onSelect={updateBrands}
                    />
                </CollapsibleFilterSection>
                <CollapsibleFilterSection title="Model">
                    {!filters.brands?.length && (
                        <ThemedText>
                            Select a brand to see available models
                        </ThemedText>
                    )}
                    <MultiSelectFilter
                        options={availableModels}
                        selectedOptions={filters.models || []}
                        onSelect={(model) => updateMultiSelect("models", model)}
                    />
                </CollapsibleFilterSection>
                <CollapsibleFilterSection title="Fuel">
                    <MultiSelectFilter
                        options={FUEL_TYPES.map((fuel) => fuel.value)}
                        selectedOptions={filters.fuel || []}
                        onSelect={(fuel) => updateMultiSelect("fuel", fuel)}
                        lookupArray={FUEL_TYPES}
                    />
                </CollapsibleFilterSection>
                <CollapsibleFilterSection title="Bodystyle">
                    <MultiSelectFilter
                        options={BODY_TYPES.map((body) => body.value)}
                        selectedOptions={filters.body || []}
                        onSelect={(body) => updateMultiSelect("body", body)}
                        lookupArray={BODY_TYPES}
                    />
                </CollapsibleFilterSection>
                <CollapsibleFilterSection title="Year">
                    <RangeFilter
                        minValue={filters.minYear?.toString() || ""}
                        maxValue={filters.maxYear?.toString() || ""}
                        onMinChange={(value) => updateNumeric("minYear", value)}
                        onMaxChange={(value) => updateNumeric("maxYear", value)}
                        placeholder={{ min: "From year", max: "To year" }}
                    />
                </CollapsibleFilterSection>
                <CollapsibleFilterSection title="Number of seats">
                    <RangeFilter
                        minValue={filters.minSeats?.toString() || ""}
                        maxValue={filters.maxSeats?.toString() || ""}
                        onMinChange={(value) => updateNumeric("minSeats", value)}
                        onMaxChange={(value) => updateNumeric("maxSeats", value)}
                        placeholder={{ min: "Minimum seats", max: "Maximum seats" }}
                    />
                </CollapsibleFilterSection>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={onSubmit} style={styles.applyButton}>
                    Apply Filters
                </PrimaryButton>
                <SecondaryButton onPress={clearFilters} style={styles.clearButton}>
                    Clear
                </SecondaryButton>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 100
    },
    filterContainer: {
        flex: 1,
        marginBottom: -10
    },
    buttonContainer: {
        flexDirection: "row"
    },
    applyButton: {
        flexGrow: 1,
        width: undefined
    },
    clearButton: {
        marginLeft: 10,
        width: undefined
    }
});
