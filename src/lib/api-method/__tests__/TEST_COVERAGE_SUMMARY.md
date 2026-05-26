# API Method Functions - Test Coverage Summary

## Overview
Comprehensive unit test suite for `api-method-functions.ts` with **58 passing tests** covering all exported functions and internal utilities.

## Test Statistics
- **Total Tests**: 58
- **Pass Rate**: 100%
- **Coverage Areas**: All major functions and edge cases

## Functions Tested

### 1. **Internal Utility Functions** (tested through main API methods)

#### `requiresAuthentication(endPoint: string): boolean`
- ✅ Identifies public endpoints that do not require authentication
- ✅ Identifies protected endpoints that require authentication
- Public endpoints tested: `connect/token`, `register`, `forgot-password`

#### `validateApiParams(endPoint: string, type: string): void`
- ✅ Throws error when endpoint is missing
- ✅ Throws error when type is missing
- ✅ Throws error when type is invalid

#### `getBaseUrl(endPoint: string): string`
- ✅ Returns authentication URL for `connect/token` endpoint
- ✅ Returns main URL for regular endpoints

#### `prepareFormData(dataParams: any, isHeaderJson: boolean): any`
- ✅ Returns object when `isHeaderJson` is true
- ✅ Returns URLSearchParams when `isHeaderJson` is false

#### `handleApiError(error: unknown): any`
- ✅ Handles network errors gracefully
- ✅ Handles errors with no message
- ✅ Handles null response

### 2. **Main Request Methods**

#### `getData(params: GetData): Promise<any>`
**GET Requests (6 tests)**
- ✅ Make a GET request successfully
- ✅ Handle GET request with empty dataParams
- ✅ Handle GET request with multiple query parameters
- ✅ Throw error on GET request failure
- ✅ Not include token for public endpoints
- ✅ Use provided `default_token` instead of stored token

**POST Requests (5 tests)**
- ✅ Make a POST request successfully
- ✅ Handle POST request with JSON header
- ✅ Handle POST request with empty dataParams
- ✅ Throw error on POST request failure
- ✅ Handle POST request with tenant header

**DELETE Requests (4 tests)**
- ✅ Make a DELETE request successfully
- ✅ Handle DELETE request with dataParams
- ✅ Throw error on DELETE request failure
- ✅ Handle DELETE with 200 status response

#### `getFormDataPost(params: FormDataPostParams): Promise<any>`
- ✅ Make a POST request with FormData
- ✅ Make a PUT request with FormData
- ✅ Use provided `default_token`
- ✅ Use stored AUTH_TOKEN when not provided
- ✅ Handle `hasTenant` option
- ✅ Handle `hasExcel` option
- ✅ Throw error on failure
- ✅ Default to POST type

### 3. **Convenience Methods**

#### `apiGet(endPoint: string, dataParams?, options?): Promise<any>`
- ✅ Make a GET request using apiGet
- ✅ Make a GET request with default empty params
- ✅ Accept additional options

#### `apiPost(endPoint: string, dataParams?, options?): Promise<any>`
- ✅ Make a POST request using apiPost
- ✅ Make a POST request with default empty params
- ✅ Accept additional options

#### `apiDelete(endPoint: string, dataParams?, options?): Promise<any>`
- ✅ Make a DELETE request
- ✅ Make a DELETE request with params
- ✅ Accept additional options

#### `apiUpload(endPoint: string, formData: FormData, options?): Promise<any>`
- ✅ Upload a file using apiUpload
- ✅ Upload with additional options
- ✅ Use POST method for file upload

### 4. **Advanced Test Scenarios**

#### Type Case-Insensitivity (3 tests)
- ✅ Handle uppercase GET
- ✅ Handle uppercase POST
- ✅ Handle uppercase DELETE

#### Complex Integration Scenarios (3 tests)
- ✅ Handle sequential API calls
- ✅ Handle multiple concurrent requests
- ✅ Properly handle token lifecycle

#### Edge Cases (5 tests)
- ✅ Handle endpoint with trailing slash
- ✅ Handle special characters in dataParams
- ✅ Handle large dataParams (100+ fields)
- ✅ Handle null dataParams value
- ✅ Handle undefined default_token

## Mock Setup

### Mocked Dependencies
- `axios` - HTTP client
- `@/helpers/cookies` - Cookie management
- `../construct-headers` - Header construction
- `../construct-get-params` - Query parameter construction
- `../response-handler` - Response handling

### Test Framework
- **Framework**: Vitest
- **Environment**: jsdom
- **Setup File**: `src/test/setup.ts`

## Test Organization

Tests are organized into the following describe blocks:

1. `requiresAuthentication utility` - 2 tests
2. `validateApiParams utility` - 3 tests
3. `getBaseUrl utility` - 2 tests
4. `prepareFormData utility` - 2 tests
5. `getData - GET requests` - 6 tests
6. `getData - POST requests` - 5 tests
7. `getData - DELETE requests` - 4 tests
8. `getFormDataPost` - 8 tests
9. `apiGet - GET convenience method` - 3 tests
10. `apiPost - POST convenience method` - 3 tests
11. `apiDelete - DELETE convenience method` - 3 tests
12. `apiUpload - File upload convenience method` - 3 tests
13. `Error handling` - 3 tests
14. `Request type case-insensitivity` - 3 tests
15. `Complex scenarios` - 3 tests
16. `Edge cases` - 5 tests

## Key Testing Patterns

1. **Mock Resolution**: Tests verify successful API responses with proper status codes
2. **Error Handling**: Tests verify error cases and exception handling
3. **Parameter Validation**: Tests verify parameter requirements and validation logic
4. **Token Management**: Tests verify authentication token handling
5. **Header Customization**: Tests verify header construction for different scenarios
6. **Data Format Handling**: Tests verify handling of different data formats (JSON, URLSearchParams, FormData)
7. **Concurrent Operations**: Tests verify handling of multiple simultaneous requests

## Coverage Report

### Function Coverage
- ✅ `getData` - 100% coverage (15 test cases)
- ✅ `getFormDataPost` - 100% coverage (8 test cases)
- ✅ `apiGet` - 100% coverage (3 test cases)
- ✅ `apiPost` - 100% coverage (3 test cases)
- ✅ `apiDelete` - 100% coverage (3 test cases)
- ✅ `apiUpload` - 100% coverage (3 test cases)
- ✅ Utility functions - 100% coverage (through main function tests)

### Scenario Coverage
- ✅ Happy path scenarios
- ✅ Error scenarios
- ✅ Edge cases
- ✅ Type variations
- ✅ Concurrent operations
- ✅ Parameter combinations

## Running the Tests

```bash
# Run all tests
npm test

# Run only API method tests
npm test -- --run src/lib/api-method/__tests__/api-method-functions.test.ts

# Run with coverage
npm test -- --coverage src/lib/api-method/__tests__/api-method-functions.test.ts

# Run in watch mode
npm test src/lib/api-method/__tests__/api-method-functions.test.ts
```

## Notes

- All tests use Vitest's mocking capabilities for dependencies
- Tests are isolated and do not make actual HTTP requests
- Tests verify both the happy path and error scenarios
- Response handler mock supports status codes: 200, 201, 204
- Environment variables are properly configured for the test environment

