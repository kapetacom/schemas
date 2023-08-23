import { describe, it, expect } from "@jest/globals";
import { Plan, PlanKind } from "../../src";
import { validateSchema } from "../../src";

describe("validateSchema", () => {
  it("can validate a plan", async () => {
    const demoPlan: Plan = {
      kind: PlanKind.CorePlan,
      metadata: {
        name: "awesome/plan",
      },
      spec: {
        blocks: [],
        connections: [],
      },
    };
    const errors = validateSchema("core/plan", demoPlan);
    expect(errors).toHaveLength(0);
  });

  it("can validate an entity", async () => {
    const errors = validateSchema("core/entity", {
      name: "awesome/entity",
      type: "dto",
      values: [],
      properties: {},
    });
    expect(errors).toHaveLength(0);
  });

  it("can validate w/ custom schema (w/ refs)", async () => {
    const errors = validateSchema(
      {
        type: "object",
        properties: {
          foo: { type: "string" },
        },
        required: ["foo"],
      },
      {
        foo: "a",
      }
    );
    expect(errors).toHaveLength(0);

    expect(
      validateSchema(
        {
          type: "object",
          properties: {
            foo: { type: "string" },
          },
          required: ["foo"],
        },
        {}
      )
    ).toContainEqual(
      expect.objectContaining({ params: { missingProperty: "foo" } })
    );
  });

  it("throws if used w/ unknown schema", async () => {
    expect(() => validateSchema("derp", {})).toThrow(/unknown schema/i);
  });
});
