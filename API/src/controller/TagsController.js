const knex = require('../database/knex');

class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    // Get all tags from user
    // groupBy is used to remove duplicate tags
    const tags = await knex('tags').where({ user_id }).groupBy('name');

    return response.json(tags);
  }
}

module.exports = TagsController;
