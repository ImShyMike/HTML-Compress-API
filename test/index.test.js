import { expect } from 'chai';
import { compressToDataURI, compressToHTML, compressData, compress } from '../index.js';

describe('Compression Functions', () => {
    const input = 'Hello, world!';

    it('should compress to data URI', () => {
        const result = compressToDataURI(input);
        expect(result).to.be.a('string');
        expect(result).to.include('data:text/html,');
    });

    it('should compress to HTML', () => {
        const result = compressToHTML(input);
        expect(result).to.be.a('string');
        expect(result).to.include('<script>');
    });

    it('should compress to data', () => {
        const result = compressData(input);
        expect(result).to.be.a('string');
        expect(result).to.match(/^[A-Za-z0-9+/=]+$/); // Base64 format
    });

    it('should compress using specified method', () => {
        const resultDataURI = compress(input, 'dataURI');
        expect(resultDataURI).to.be.an('object');
        expect(resultDataURI.compressed).to.include('data:text/html,');
        expect(resultDataURI.saved_bytes).to.be.a('number');

        const resultHTML = compress(input, 'html');
        expect(resultHTML).to.be.an('object');
        expect(resultHTML.compressed).to.include('<script>');
        expect(resultHTML.saved_bytes).to.be.a('number');

        const resultData = compress(input, 'data');
        expect(resultData).to.be.an('object');
        expect(resultData.compressed).to.match(/^[A-Za-z0-9+/=]+$/);
        expect(resultData.saved_bytes).to.be.a('number');
    });

    it('should throw an error for invalid type', () => {
        expect(() => compress(input, 'invalid')).to.throw('Invalid type');
    });
});
