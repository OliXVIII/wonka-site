import crypto from 'crypto';
import url from 'url';

/**
 * Convert from 'web safe' base64 to true base64.
 *
 * @param  {string} safeEncodedString The code you want to translate
 *                                    from a web safe form.
 * @return {string}
 */
function removeWebSafe(safeEncodedString: string): string {
    return safeEncodedString.replace(/-/g, '+').replace(/_/g, '/');
}

/**
 * Convert from true base64 to 'web safe' base64
 *
 * @param  {string} encodedString The code you want to translate to a
 *                                web safe form.
 * @return {string}
 */
function makeWebSafe(encodedString: string): string {
    return encodedString.replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Takes a base64 code and decodes it.
 *
 * @param  {string} code The encoded data.
 * @return {string}
 */
function decodeBase64Hash(code: string): Buffer {
    // "Buffer.from" is used instead of "new Buffer" as it is deprecated.
    return Buffer.from(code, 'base64');
}

/**
 * Takes a key and signs the data with it.
 *
 * @param  {string} key  Your unique secret key.
 * @param  {string} data The url to sign.
 * @return {string}
 */
function encodeBase64Hash(key: string, data: string): string {
    return crypto.createHmac('sha1', key).update(data).digest('base64');
}

/**
 * Sign a URL using a secret key.
 *
 * @param  {string} path   The url you want to sign.
 * @param  {string} secret Your unique secret key.
 * @return {string}
 */
function sign(path: string, secret: string): string {
    const uri = url.parse(path);
    const safeSecret = decodeBase64Hash(removeWebSafe(secret)) ?? ''; // Provide a default value for safeSecret using nullish coalescing operator
    const hashedSignature = makeWebSafe(encodeBase64Hash(safeSecret.toString(), uri.path)); // Convert safeSecret to string
    return url.format(uri) + '&signature=' + hashedSignature;
}
