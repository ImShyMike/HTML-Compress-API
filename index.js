import { deflateRaw } from "pako";

export function compressToDataURI(input) {
    // Compress the input string and return a compressed data URI
    const compressed = compressToHTML(input);
    return `data:text/html,${encodeURI(compressed)}`;
}

export function compressToHTML(input) {
    // Compress the input string and return a self-extracting HTML file
    const code = compressData(input);
    const compressed = `<script>new Response(Uint8Array.from(atob("${code}"),c=>c.charCodeAt(0))).body.pipeThrough(new DecompressionStream("deflate-raw")).pipeTo(new WritableStream({write(e,t){document.open(),document.write(new TextDecoder().decode(e)),document.close()}}))<\/script>`;
    return compressed;
}

export function compressData(input) {
    // Compress the input string using the deflate algorithm
    const encoder = new TextEncoder();
    const compressed = deflateRaw(encoder.encode(input));
    return Buffer.from(compressed).toString("base64");
}

export function compress(input, type) {
    // Compress the input string using the specified method
    let compressed;
    if (type === "dataURI") {
        compressed = compressToDataURI(input);
    } else if (type === "html") {
        compressed = compressToHTML(input);
    } else if (type === "data") {
        compressed = compressData(input);
    } else {
        throw new Error("Invalid type");
    }

    return {
        compressed, // Compressed output
        saved_bytes: input.length - compressed.length, // Number of bytes saved
    };
}
