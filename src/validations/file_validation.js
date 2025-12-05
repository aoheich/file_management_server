import { body } from 'express-validator'

export const uploadValidation = [
    body('category')
      .optional()
      .isString()
      .withMessage('Category must be a string')
      .notEmpty()
      .withMessage('Category must not be empty'),
    body().custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error('File is required')
      }
      return true
    })
  ]

export const renameValidation = [
    body('newFileName')
        .exists().withMessage('New file name is required')
        .isString().withMessage('New file name must be a string')
        .notEmpty().withMessage('New file name cannot be empty'),
]

export const moveValidation = [
    body('newCategory')
        .exists().withMessage('New category is required')
        .isString().withMessage('New category must be a string')
        .notEmpty().withMessage('New category cannot be empty'),
]
