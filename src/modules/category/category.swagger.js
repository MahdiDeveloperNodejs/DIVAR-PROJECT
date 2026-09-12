/**
 * @swagger
 * tags:
 *  name:  Category
 *  description: Category Mdules and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent:
 *                      type: string
 */
/**
 * @swagger
 * /category:
 *   post:
 *      summary: create new categorys
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *      responses:
 *        201:
 *          description: successfully
 */
/**
 * @swagger
 * /category:
 *  get:
 *      summary: get all categorys
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *              description:  successfully
 *
 */
