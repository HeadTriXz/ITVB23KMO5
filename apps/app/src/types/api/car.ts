/**
 * The response of a GET request for a car.
 */
export interface APIGetCarResult {
    /**
     * The unique identifier of the car.
     */
    id: number;

    /**
     * The brand of the car.
     */
    brand: string;

    /**
     * The model of the car.
     */
    model: string;

    /**
     * A base64 encoded string representing the picture of the car.
     */
    picture: string;

    /**
     * The content type of the picture of the car.
     */
    pictureContentType: string;

    /**
     * The type of fuel used by the car.
     */
    fuel: string;

    /**
     * The options available for the car.
     */
    options: string;

    /**
     * The license plate of the car.
     */
    licensePlate: string;

    /**
     * The size of the engine of the car.
     */
    engineSize: number;

    /**
     * The year the car model was released.
     */
    modelYear: number;

    /**
     * The date since the car is available.
     */
    since: string;

    /**
     * The price of the car per day.
     */
    price: number;

    /**
     * The number of seats in the car.
     */
    nrOfSeats: number;

    /**
     * The body type of the car.
     */
    body: string;

    /**
     * The longitude coordinate of the car's location.
     */
    longitude: number;

    /**
     * The latitude coordinate of the car's location.
     */
    latitude: number;
}

/**
 * The payload of a GET request for cars.
 */
export interface APIGetCarsBody {
    /**
     * The page number to retrieve (zero-based).
     */
    page?: number;

    /**
     * The size of the page.
     */
    size?: number;
}
