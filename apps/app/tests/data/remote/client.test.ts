import { RESTClient } from "@/data/remote/client";

describe("RESTClient", () => {
    const BASE_URL = "https://api.example.com";
    let client: RESTClient;

    beforeEach(() => {
        client = new RESTClient(BASE_URL);
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("HTTP Methods", () => {
        it.each(
            [
                { method: "DELETE", fn: "delete" },
                { method: "GET", fn: "get" },
                { method: "PATCH", fn: "patch" },
                { method: "POST", fn: "post" }
            ] as const
        )("should make a $method request with correct URL", async ({ method, fn }) => {
            const mockResponse = { data: "test" };
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                json: () => Promise.resolve(mockResponse)
            });

            const result = await client[fn]("/test");

            expect(fetch).toHaveBeenCalledWith(
                new URL(`${BASE_URL}/test`),
                expect.objectContaining({
                    method: method
                })
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe("Authentication", () => {
        it("should add authorization header when auth is required", async () => {
            const token = "test-token";
            client.setToken(token);

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                json: () => Promise.resolve({})
            });

            await client.get("/protected", { auth: true });
            const [, { headers }] = (fetch as jest.Mock).mock.calls[0];

            expect(fetch).toHaveBeenCalledWith(
                expect.any(URL),
                expect.objectContaining({
                    headers: expect.any(Headers)
                })
            );
            expect(headers.get("Authorization")).toBe(`Bearer ${token}`);
        });

        it("should throw error when auth is required but no token is set", async () => {
            await expect(client.get("/protected", { auth: true }))
                .rejects
                .toThrow("The user is not authenticated.");
        });
    });

    describe("Request Body", () => {
        it("should stringify and set content-type for JSON body", async () => {
            const body = { key: "value" };
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                json: () => Promise.resolve({})
            });

            await client.post("/test", { body });
            const [, { headers }] = (fetch as jest.Mock).mock.calls[0];

            expect(fetch).toHaveBeenCalledWith(
                expect.any(URL),
                expect.objectContaining({
                    body: JSON.stringify(body),
                    headers: expect.any(Headers)
                })
            );
            expect(headers.get("Content-Type")).toBe("application/json");
        });

        it("should handle string body without modification", async () => {
            const body = "raw-string-data";
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                headers: new Headers({
                    "Content-Type": "text/plain"
                }),
                json: () => Promise.resolve({})
            });

            await client.post("/test", { body });

            expect(fetch).toHaveBeenCalledWith(
                expect.any(URL),
                expect.objectContaining({
                    body: body
                })
            );
        });
    });

    describe("Query Parameters", () => {
        it("should append query parameters to URL", async () => {
            const params = {
                key1: "value1",
                key2: 2,
                key3: true
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                json: () => Promise.resolve({})
            });

            await client.get("/test", { params });
            const [url] = (fetch as jest.Mock).mock.calls[0];

            expect(url.toString()).toBe(
                `${BASE_URL}/test?key1=value1&key2=2&key3=true`
            );
        });

        it("should skip undefined query parameters", async () => {
            const params = {
                key1: "value1",
                key2: undefined,
                key3: null
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                json: () => Promise.resolve({})
            });

            await client.get("/test", { params });
            const [url] = (fetch as jest.Mock).mock.calls[0];

            expect(url.toString()).toBe(
                `${BASE_URL}/test?key1=value1&key3=null`
            );
        });
    });

    describe("Response Handling", () => {
        it("should parse JSON response", async () => {
            const mockResponse = { data: "test" };
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                json: () => Promise.resolve(mockResponse)
            });

            const result = await client.get("/test");
            expect(result).toEqual(mockResponse);
        });

        it("should handle application/problem+json errors", async () => {
            const errorResponse = {
                detail: "Custom error message"
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                headers: new Headers({
                    "Content-Type": "application/problem+json"
                }),
                json: () => Promise.resolve(errorResponse)
            });

            await expect(client.get("/test"))
                .rejects
                .toThrow(errorResponse.detail);
        });

        it("should handle non-JSON responses", async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                headers: new Headers({
                    "Content-Type": "text/plain"
                })
            });

            const result = await client.get("/test");
            expect(result).toBeNull();
        });

        it("should handle failed requests without JSON response", async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
                headers: new Headers({
                    "Content-Type": "text/plain"
                })
            });

            await expect(client.get("/test"))
                .rejects
                .toThrow("Request failed with status 404");
        });
    });
});
