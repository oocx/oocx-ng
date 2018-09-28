import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  describe('conversion tests', () => {
    let pipe: DurationPipe;

    beforeEach(() => {
      pipe = new DurationPipe();
    });

    it('converts null to null', () => {
      const result = pipe.transform(null);
      expect(result).toBe(null);
    });

    it('converts 0 to 0:00', () => {
      const result = pipe.transform(0);
      expect(result).toBe('0:00');
    });

    it('converts 1 to 1:00', () => {
      const result = pipe.transform(1);
      expect(result).toBe('1:00');
    });

    it('converts 0.5 to 0:30', () => {
      const result = pipe.transform(0.5);
      expect(result).toBe('0:30');
    });

    it('converts 25.1 to 25:06', () => {
      const result = pipe.transform(25.1);
      expect(result).toBe('25:06');
    });

    it('converts -1.5 to -1:30', () => {
      const result = pipe.transform(-1.5);
      expect(result).toBe('-1:30');
    });

  });
});
