import type { Request } from "express";

/**
 * Resolves parameters from an Express request object.
 * It extracts query parameters, body parameters, and route parameters
 * and returns them as a single object.
 *
 * @param {Request} request - The Express request object.
 * @returns {Record<string, any>} - An object containing all resolved parameters.
 */
export default function resolveParams(request: Request): Record<string, any> {
    const query = parseValues(request.query) || {};
    const params = parseValues(request.params) || {};
    const body = request.body || {};

    const resolvedParams: Record<string, any> = {};

    Object.assign(resolvedParams, body, query, params);

    return resolvedParams;
}

export function parseValues(params: Record<string, any>) : Record<string, any> {
    const resolvedParams: Record<string, any> = {};

    Object.keys(params).forEach((key) => {
        const value = params[key];

        if (typeof value === "string") {
            // Try to parse as JSON
            try {
                resolvedParams[key] = JSON.parse(value);
            } catch {
                // If parsing fails, keep it as a string
                resolvedParams[key] = value;
            }
        } else if (Array.isArray(value)) {
            // If it's an array, parse each item
            resolvedParams[key] = value.map((item) => {
                try {
                    return JSON.parse(item);
                } catch {
                    return item; // Keep as is if parsing fails
                }
            });
        } else if (value && typeof value === "number") {
            // If it's a number, keep it as is
            resolvedParams[key] = Number(value);
        } else {
            resolvedParams[key] = value; // Keep other types as is
        }

    });

    return resolvedParams;
}