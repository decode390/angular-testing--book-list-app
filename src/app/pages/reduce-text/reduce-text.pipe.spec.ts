import { ReduceTextPipe } from "./reduce-text.pipe";

describe('Reduce text pipe', () => {

    let pipe: ReduceTextPipe

    beforeEach(() => {
        pipe = new ReduceTextPipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('transform works correctly', () => {
        const text = 'Text with so much large';
        const transformedText = 'Text with so mu';
        expect(pipe.transform(text, 15)).toBe(transformedText);
    });

});