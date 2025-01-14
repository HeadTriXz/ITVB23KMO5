import type { Car, Rental } from "@/data/local/schema";
import type { APIGetRentalResult } from "@/types/api";

/**
 * Transforms a car from the API format to the local schema format.
 *
 * @returns The transformed car data.
 */
export function transformCar(car: NonNullable<APIGetRentalResult["car"]>): Car {
    return {
        id: car.id,
        brand: car.brand!,
        fuel: car.fuel!,
        latitude: car.latitude!,
        licensePlate: car.licensePlate!,
        longitude: car.longitude!,
        model: car.model!,
        modelYear: car.modelYear!,
        nrOfSeats: car.nrOfSeats!,
        picture: car.picture!,
        price: car.price!
    };
}

/**
 * Transforms a rental from the API format to the local schema format.
 *
 * @returns The transformed rental data.
 */
export function transformRental(apiRental: APIGetRentalResult): Rental {
    return {
        id: apiRental.id,
        car: transformCar(apiRental.car!),
        carId: apiRental.car!.id,
        fromDate: apiRental.fromDate,
        latitude: apiRental.latitude,
        longitude: apiRental.longitude,
        state: apiRental.state,
        toDate: apiRental.toDate
    };
}
