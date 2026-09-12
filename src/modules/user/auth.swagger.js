/**
 * @swagger
 * tags:
 *  name:   User
 *  description: User Mdules and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                  code:
 *                      type: string
 */

/**
 * @swagger
 *
 * /user/whoami:
 *  get:
 *      summary: get user profile
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: success
 */
