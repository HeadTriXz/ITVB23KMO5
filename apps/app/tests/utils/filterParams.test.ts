import { createParamsFromFilters, parseFiltersFromParams } from "@/utils/filterParams";
import type { SearchFilters } from "@/types/search";

describe("Search Parameter Utils", () => {
    describe("parseFiltersFromParams", () => {
        it("should parse numeric parameters correctly", () => {
            const params = {
                minPrice: "1000",
                maxPrice: "5000",
                minYear: "2020",
                maxYear: "2025",
                minSeats: "2",
                maxSeats: "5"
            };

            const result = parseFiltersFromParams(params);

            expect(result).toEqual({
                minPrice: 1000,
                maxPrice: 5000,
                minYear: 2020,
                maxYear: 2025,
                minSeats: 2,
                maxSeats: 5
            });
        });

        it("should parse array parameters correctly", () => {
            const params = {
                body: "SUV,SEDAN",
                fuel: "ELECTRIC,HYBRID",
                brands: "Toyota,BMW",
                models: "Camry,3 Series"
            };

            const result = parseFiltersFromParams(params);

            expect(result).toEqual({
                body: ["SUV", "SEDAN"],
                fuel: ["ELECTRIC", "HYBRID"],
                brands: ["Toyota", "BMW"],
                models: ["Camry", "3 Series"]
            });
        });

        it("should handle empty or undefined parameters", () => {
            const params = {
                minPrice: "",
                body: "",
                someOtherParam: "value"
            };

            const result = parseFiltersFromParams(params);

            expect(result).toEqual({
                minPrice: undefined,
                body: [""],
                fuel: undefined,
                brands: undefined,
                models: undefined
            });
        });

        it("should handle missing parameters", () => {
            const result = parseFiltersFromParams({});

            expect(result).toEqual({
                minPrice: undefined,
                maxPrice: undefined,
                minYear: undefined,
                maxYear: undefined,
                minSeats: undefined,
                maxSeats: undefined,
                body: undefined,
                fuel: undefined,
                brands: undefined,
                models: undefined
            });
        });
    });

    describe("createParamsFromFilters", () => {
        it("should create params from complete filters", () => {
            const filters: SearchFilters = {
                minPrice: 1000,
                maxPrice: 5000,
                minYear: 2020,
                maxYear: 2025,
                minSeats: 2,
                maxSeats: 5,
                body: ["SUV", "SEDAN"],
                fuel: ["ELECTRIC", "HYBRID"],
                brands: ["Toyota", "BMW"],
                models: ["Camry", "3 Series"]
            };

            const result = createParamsFromFilters(filters);

            expect(result).toEqual({
                minPrice: "1000",
                maxPrice: "5000",
                minYear: "2020",
                maxYear: "2025",
                minSeats: "2",
                maxSeats: "5",
                body: "SUV,SEDAN",
                fuel: "ELECTRIC,HYBRID",
                brands: "Toyota,BMW",
                models: "Camry,3 Series"
            });
        });

        it("should handle partial filters", () => {
            const filters: SearchFilters = {
                minPrice: 1000,
                body: ["SUV"],
                brands: ["Toyota"]
            };

            const result = createParamsFromFilters(filters);

            expect(result).toEqual({
                minPrice: "1000",
                body: "SUV",
                brands: "Toyota"
            });
        });

        it("should handle empty arrays", () => {
            const filters: SearchFilters = {
                body: [],
                fuel: [],
                brands: [],
                models: []
            };

            const result = createParamsFromFilters(filters);

            expect(result).toEqual({});
        });

        it("should handle undefined values", () => {
            const filters: SearchFilters = {
                minPrice: undefined,
                maxPrice: undefined,
                body: undefined,
                fuel: undefined
            };

            const result = createParamsFromFilters(filters);

            expect(result).toEqual({});
        });

        it("should handle zero values", () => {
            const filters: SearchFilters = {
                minPrice: 0,
                maxPrice: 0,
                minSeats: 0
            };

            const result = createParamsFromFilters(filters);

            expect(result).toEqual({
                minPrice: "0",
                maxPrice: "0",
                minSeats: "0"
            });
        });
    });

    describe("Integration Tests", () => {
        it("should maintain data integrity when converting back and forth", () => {
            const originalFilters: SearchFilters = {
                minPrice: 1000,
                maxPrice: 5000,
                minYear: 2020,
                maxYear: 2025,
                minSeats: 2,
                maxSeats: 5,
                body: ["SUV", "SEDAN"],
                fuel: ["ELECTRIC", "HYBRID"],
                brands: ["Toyota", "BMW"],
                models: ["Camry", "3 Series"]
            };

            const params = createParamsFromFilters(originalFilters);
            const resultFilters = parseFiltersFromParams(params);

            expect(resultFilters).toEqual(originalFilters);
        });

        it("should handle empty filters consistently", () => {
            const emptyFilters: SearchFilters = {};

            const params = createParamsFromFilters(emptyFilters);
            const resultFilters = parseFiltersFromParams(params);

            expect(resultFilters).toEqual({
                minPrice: undefined,
                maxPrice: undefined,
                minYear: undefined,
                maxYear: undefined,
                minSeats: undefined,
                maxSeats: undefined,
                body: undefined,
                fuel: undefined,
                brands: undefined,
                models: undefined
            });
        });
    });
});
