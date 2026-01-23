import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("merges class names correctly", () => {
    const result = cn("class1", "class2");
    expect(result).toContain("class1");
    expect(result).toContain("class2");
  });

  it("handles conditional classes", () => {
    const result = cn("base", true && "conditional");
    expect(result).toContain("base");
    expect(result).toContain("conditional");
  });

  it("handles undefined and null", () => {
    const result = cn("base", undefined, null);
    expect(result).toBe("base");
  });

  it("merges Tailwind classes correctly", () => {
    const result = cn("px-2 py-1", "px-4");
    // tailwind-merge should keep px-4 and remove px-2
    expect(result).toContain("px-4");
  });
});
