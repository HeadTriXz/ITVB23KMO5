export interface LabeledValue {
    label: string;
    value: string;
}

export const CAR_BRANDS_AND_MODELS = [
    { brand: "Toyota", models: ["Camry", "RAV4 Hybrid", "Highlander", "4Runner"] },
    { brand: "Honda", models: ["CR-V", "Civic", "Fit"] },
    { brand: "Ford", models: ["F-150", "Escape", "Explorer"] },
    { brand: "Chevrolet", models: ["Impala", "Traverse", "Malibu"] },
    { brand: "BMW", models: ["3 Series", "5 Series", "7 Series"] },
    { brand: "Mercedes-Benz", models: ["E-Class", "GLC-Class", "A-Class"] },
    { brand: "Audi", models: ["Q5", "A4", "Q3"] },
    { brand: "Jeep", models: ["Wrangler", "Cherokee"] },
    { brand: "Nissan", models: ["Altima", "Murano"] },
    { brand: "Subaru", models: ["Outback", "Forester"] },
    { brand: "Hyundai", models: ["Santa Fe", "Kona Electric"] },
];

export const FUEL_TYPES: LabeledValue[] = [
    { value: "GASOLINE", label: "Gasoline" },
    { value: "DIESEL", label: "Diesel" },
    { value: "ELECTRIC", label: "Electric" },
    { value: "HYBRID", label: "Hybrid" }
]

export const BODY_TYPES: LabeledValue[] = [
    { value: "STATIONWAGON", label: "Station wagon" },
    { value: "SEDAN", label: "Sedan" },
    { value: "HATCHBACK", label: "Hatchback" },
    { value: "MINIVAN", label: "Minivan" },
    { value: "MPV", label: "MPV" },
    { value: "SUV", label: "SUV" },
    { value: "COUPE", label: "Coupe" },
    { value: "TRUCK", label: "Truck" },
    { value: "CONVERTIBLE", label: "Convertible" }
]
