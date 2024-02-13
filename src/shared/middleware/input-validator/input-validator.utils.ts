import { Request } from 'express';
import validator from 'validator';
import { Rule } from '@app/shared/utils/helper/types';

/**
 * @description get value from request depending to from and key fields which are defined in rule object
 * @param {Request} req
 * @param {Rule} rule
 * @returns {any}
 */
export const extractValue = (req: Request, rule: Rule) => {
  if (!rule.from) {
    throw new Error('from is Required field');
  }
  if (!rule.key) {
    throw new Error('key is Required field');
  }

  const { key, from } = rule;
  switch (from.toLowerCase()) {
    case 'params':
      return req.params[key];
    case 'query':
      if (!req.query) {
        return undefined;
      }
      return req.query[key];
    case 'body':
      if (!req.body) {
        return undefined;
      }
      return req.body[key];
    default:
      throw new Error('from value is not recognized');
  }
};

/**
 * @description A simple check of a value inside an enum values
 * @param {string[]} enums
 * @param {string} value
 * @returns {boolean}
 */
export const enumCheck = (enums: string[], value: string) => {
  if (!enums.length) {
    throw new Error('enum values must be defined in rules');
  }
  return enums.includes(value);
};

/**
 * @description Check type of a value using for some fields input-validator
 * ** If you want to support other fields type add your type'case in switch method**
 * @param {string} type
 * @param {any} value
 * @returns {boolean | any}
 */
export const typeCheck = (type: string, value): boolean | any => {
  switch (type) {
    case 'number':
    case 'int':
    case 'integer':
    case 'num':
      return !Number.isNaN(Number(value));
    case 'str':
    case 'string':
      return typeof value === 'string';
    case 'alpha':
      return validator.isAlpha(value);
    case 'alphanumeric':
      return validator.isAlphanumeric(value);
    case 'float':
      return validator.isFloat(value);
    case 'object':
    case 'obj':
      return typeof value === 'object';
    case 'email':
      return validator.isEmail(value);
    case 'array':
      return true;
    case 'mobilePhone':
      return validator.isMobilePhone(value);
    case 'boolean':
      return typeof value === 'boolean';
    default:
      break;
  }
  return undefined;
};

/**
 * Methods to generate specific errors
 * @param {Rule} rule
 */
export const attributeValueErr = (rule: Rule) =>
  `Invalid attribute: '${rule.key}' required a ${rule.type} value in ${rule.from}`;
export const missingAttributeErr = (rule: Rule) =>
  `Missing required attribute: '${rule.key}' required a ${rule.type} value in ${rule.from}`;
export const enumAttributeErr = (rule: Rule) =>
  `Invalid attribute: '${rule.key}' value does not match the enum values`;
