import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Booking, BookingInput, BookingUpdate, ErrorResponse, HealthStatus } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateBookingUrl: (id: number) => string;
/**
 * @summary Update booking status
 */
export declare const updateBooking: (id: number, bookingUpdate: BookingUpdate, options?: RequestInit) => Promise<Booking>;
export declare const getUpdateBookingMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
        id: number;
        data: BodyType<BookingUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
    id: number;
    data: BodyType<BookingUpdate>;
}, TContext>;
export type UpdateBookingMutationResult = NonNullable<Awaited<ReturnType<typeof updateBooking>>>;
export type UpdateBookingMutationBody = BodyType<BookingUpdate>;
export type UpdateBookingMutationError = ErrorType<ErrorResponse>;
/**
* @summary Update booking status
*/
export declare const useUpdateBooking: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
        id: number;
        data: BodyType<BookingUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateBooking>>, TError, {
    id: number;
    data: BodyType<BookingUpdate>;
}, TContext>;
export declare const getCreateBookingUrl: () => string;
/**
 * @summary Create a booking
 */
export declare const createBooking: (bookingInput: BookingInput, options?: RequestInit) => Promise<Booking>;
export declare const getCreateBookingMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
    data: BodyType<BookingInput>;
}, TContext>;
export type CreateBookingMutationResult = NonNullable<Awaited<ReturnType<typeof createBooking>>>;
export type CreateBookingMutationBody = BodyType<BookingInput>;
export type CreateBookingMutationError = ErrorType<ErrorResponse>;
/**
* @summary Create a booking
*/
export declare const useCreateBooking: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createBooking>>, TError, {
    data: BodyType<BookingInput>;
}, TContext>;
export declare const getListBookingsUrl: () => string;
/**
 * @summary List all bookings
 */
export declare const listBookings: (options?: RequestInit) => Promise<Booking[]>;
export declare const getListBookingsQueryKey: () => readonly ["/api/bookings"];
export declare const getListBookingsQueryOptions: <TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBookingsQueryResult = NonNullable<Awaited<ReturnType<typeof listBookings>>>;
export type ListBookingsQueryError = ErrorType<unknown>;
/**
 * @summary List all bookings
 */
export declare function useListBookings<TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map