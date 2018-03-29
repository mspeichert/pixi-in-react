import { DEFAULT_PROPS } from "../src/props";

describe("props", () => {
  describe("DEFAULT_PROPS", () => {
    it("should be an object defining default values for DisplayObject props", () => {
      expect(DEFAULT_PROPS).toEqual({
        alpha: 1,
        anchor: 0,
        buttonMode: false,
        cacheAsBitmap: false,
        cursor: "auto",
        filterArea: null,
        filters: null,
        hitArea: null,
        interactive: false,
        mask: null,
        pivot: 0,
        position: 0,
        renderable: true,
        rotation: 0,
        scale: 1,
        skew: 0,
        tint: 0xffffff,
        transform: null,
        visible: true,
        x: 0,
        y: 0,
      });
    });
  });
});
