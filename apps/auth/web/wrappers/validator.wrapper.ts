import { zValidator } from "@hono/zod-validator";
import { type ValidationTargets } from "hono";
import { ZodObject } from "zod";
import BaseWrapper from "../base/wrapper.base.js";

export default class ValidatorWrapper extends BaseWrapper {

  constructor(...baseArgs: BaseWrapper.Args) {
    super(...baseArgs)
  }

  validate<
  T extends ZodObject, 
  Target extends keyof ValidationTargets
>(
  target: Target, 
  schema: T
) {
    return zValidator(target, schema, (result, c) => {
      if (!result.success) {
        console.log(result.error); 
        return c.json({
          success: false
        }, 400);
      }
    });
  };
}