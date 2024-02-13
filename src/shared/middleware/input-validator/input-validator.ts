import { NextFunction, Request, Response } from 'express';
import {
  attributeValueErr,
  enumAttributeErr,
  enumCheck,
  extractValue,
  missingAttributeErr,
  typeCheck,
} from '@app/shared/middleware/input-validator/input-validator.utils';
import { Rule } from '@app/shared/utils/helper/types';
import { HTTP400Error } from '@app/shared/middleware';

/**
 * @description Check each value regarding to the rule object
 * @param {Rule} rule
 * @param {any} value
 * @returns {string[] | any}
 */
const verifyRule = (rule: Rule, value): string[] | undefined => {
  const errorMessages: string[] = [];
  // handle optional field
  if (!rule.required && !value) {
    return undefined;
  }
  // handle missing required fields
  if (!value) {
    errorMessages.push(rule.message || missingAttributeErr(rule));
    return errorMessages;
  }
  // handle type check errors
  if (rule.type && !typeCheck(rule.type, value)) {
    errorMessages.push(rule.message || attributeValueErr(rule));
  }
  // handle enums value check
  if (rule.enum && !enumCheck(rule.enum, value)) {
    errorMessages.push(rule.message || enumAttributeErr(rule));
  }
  // handle validate function already defined in rule
  if (rule.validate && !rule.validate(value)) {
    errorMessages.push(rule.message || attributeValueErr(rule));
  }
  return errorMessages;
};

/**
 * @description verify rules for One subDoc
 * @param {Rule[]} rules
 * @param {any} inputData
 * @param {boolean} isUpdate
 * @returns {string[]}
 */
const verifyEmbeddedRules = (rules: Rule[], v, isUpdate: boolean = false) => {
  const errorMessages: string[] = [];
  rules.forEach((rule: Rule) => {
    const initialRequired = rule.required;
    if (isUpdate && v.id) {
      rule.required = false;
    }
    const value = v[rule.key];
    const res = verifyRule(rule, value);
    // store errors getting from checking
    if (res && res.length) {
      errorMessages.push(...res);
    }
    rule.required = initialRequired;
  });
  return errorMessages;
};

/**
 * @description Verify rules for subDocs
 * @param {Rule[]} rules
 * @param {any} inputData
 * @param {boolean} isUpdate
 * @returns {string[]}
 */
const verifySubDocRules = (rules: Rule[], inputData, isUpdate: boolean = false) => {
  let errorMessages: string[] = [];
  if (inputData && inputData.length) {
    inputData.forEach(v => {
      errorMessages = errorMessages.concat(verifyEmbeddedRules(rules, v, isUpdate));
    });
  } else {
    errorMessages = errorMessages.concat(verifyEmbeddedRules(rules, inputData, isUpdate));
  }
  return errorMessages;
};

/**
 * @description main method of the middleware, for each rule defined in rules we get the value from request and we verify it
 * ** we support only two levels in rules**
 * ** e.g [{from: 'body', key: 'name', type: 'string'}, {from: 'body', key: 'name', type: [other rules]}]**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {Rule[]} rules
 * @param {boolean} isUpdate
 */
export const inputValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
  rules: Rule[],
  isUpdate: boolean = false,
) => {
  const errorMessages: string[] = [];
  // verify rules length
  if (!rules || !rules.length) {
    throw new Error('no rules defined');
  }
  // loop on each rule
  rules.forEach((rule: Rule) => {
    // if it's put we do not check required fields existence
    if (isUpdate) {
      rule.required = false;
    }
    // get value from request
    const inputData = extractValue(req, rule);

    // we support two level of input check
    // if there is a subDoc inside the rules we verify also sub rules for this field
    if (rule.isSubDoc && inputData) {
      const subDocErrors = verifySubDocRules(rule.type, inputData, isUpdate);
      // store errors getting from checking
      if (subDocErrors && subDocErrors.length) {
        errorMessages.push(...subDocErrors);
      }
    } else {
      // normal case no subDoc defined in rule object
      const errors = verifyRule(rule, inputData);
      // store errors getting from checking
      if (errors && errors.length) {
        errorMessages.push(...errors);
      }
    }
  });
  // check if there is errors and throw error
  if (errorMessages.length > 0) {
    throw new HTTP400Error(errorMessages.toString());
  } else {
    // no errors detected
    next();
  }
};
