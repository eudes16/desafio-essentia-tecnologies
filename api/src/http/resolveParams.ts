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
    const query = request.query || {};
    const params = request.params || {};
    const body = request.body || {};

    const resolvedParams: Record<string, any> = {};

    Object.assign(resolvedParams, body, query, params);

    return resolvedParams;
}