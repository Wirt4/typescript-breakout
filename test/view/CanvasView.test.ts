import {CanvasView} from "../../src/view/CanvasView";

describe('CanvasView constructor tests', () => {
    it('Object instantiates without error',()=>{
        new CanvasView('canvasID')
    })
})
describe('CanvasView.clear', () => {
    let canvasView: CanvasView;
    let mockCanvas: HTMLCanvasElement;
    let mockContext: jest.Mocked<CanvasRenderingContext2D>;

    beforeEach(() => {
        mockCanvas = document.createElement('canvas');
        mockCanvas.width = 800;
        mockCanvas.height = 600;

        mockContext = {
            clearRect: jest.fn(),
            drawImage: jest.fn(),
        } as unknown as jest.Mocked<CanvasRenderingContext2D>;

        jest.spyOn(mockCanvas, 'getContext').mockReturnValue(mockContext);
        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            if (selector === '#playField') return mockCanvas;
            return null;
        });

        canvasView = new CanvasView('#playField');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should call clearRect with canvas dimensions', () => {
        canvasView.clear();

        expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
        expect(mockContext.clearRect).toHaveBeenCalledTimes(1);
    });

    test('should call clearRect with canvas dimensions, different dimensions', () => {
        mockCanvas.width = 1600;
        mockCanvas.height = 1200;

        canvasView.clear();

        expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 1600, 1200);
        expect(mockContext.clearRect).toHaveBeenCalledTimes(1);
    });

    test('should not throw if context is null', () => {
        jest.spyOn(mockCanvas, 'getContext').mockReturnValue(null);

        const nullContextView = new CanvasView('#playField');
        expect(() => nullContextView.clear()).not.toThrow();
    });
});
