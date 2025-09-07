import Joi from "joi"

const objectId = Joi.string().hex().length(24)

export const validateProject = (project) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "string.min": "Title must have at least 3 characters",
      "string.max": "Title must have at most 200 characters",
      "any.required": "A project must have a title",
    }),
    description: Joi.string().trim().max(1000).allow("").messages({
      "string.max": "Description must be at most 1000 characters",
    }),
    sources: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim().required(),
          type: Joi.string().valid("pdf", "docx").required(),
          size: Joi.number().integer().min(0).required(),
        })
      )
      .max(4),
    owner: objectId.forbidden(),
    summary: Joi.string().forbidden(),
    status: Joi.string()
      .valid("pending", "processing", "completed", "failed")
      .forbidden(),
  })
    .required()
    .unknown(false)

  return schema.validate(project)
}
