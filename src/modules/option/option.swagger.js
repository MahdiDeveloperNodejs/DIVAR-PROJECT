/**
 * @swagger
 * tags:
 *  name: option
 *  description: Option Mdules and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  guid:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   array
 *                          -   boolean
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 * /option:
 *   post:
 *      summary: create new optin
 *      tags:
 *          -   option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *      responses:
 *        201:
 *          description: successfully
 */

/**
 * @swagger
 * /by-category/{categoryId}:
 *  get:
 *      summary: get all categoryId
 *      tags:
 *          -   option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *          200:
 *              description:  successfully
 *
 */


/**
 * @swagger
 * /option/by-slug/{slug}:
 *  get:
 *      summary: get all options of slug
 *      tags:
 *          -   option
 *      parameters:
 *          -   in: path        
 *              name: slug
 *              type: string
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: get all id
 *      tags:
 *          -   option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description:  successfully
 *
 */
/**
 * @swagger
 * /option:
 *  get:
 *      summary: get all id categorys
 *      tags:
 *          -   option
 *      responses:
 *          200:
 *              description:  successfully
 *
 */
