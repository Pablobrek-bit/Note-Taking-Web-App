const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class NotesController {
  // Create a POST route
  async create(request, response) {
    // Desestruture the title, description, tags and links from the request body and the user_id from the request params
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    // Insert notes and return the id note
    const [note_id] = await knex('notes').insert({
      title,
      description,
      user_id,
    });

    // Insert links and tags
    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    await knex('links').insert(linksInsert);

    const tagsInsert = tags.map((tag) => {
      return {
        name: tag,
        user_id,
        note_id,
      };
    });

    await knex('tags').insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const notes = await knex('notes').where({ id }).orderBy('title').first();
    const links = await knex('links').where({ note_id: id });
    const tags = await knex('tags').where({ note_id: id });

    console.log(notes, tags, links);

    return response.json({
      ...notes,
      tags,
      links,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('notes').where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    let notes;

    if (tags) {
      const filtredTags = tags.split(',').map((tag) => tag.trim());

      notes = await knex('tags')
        .select([
          'notes.id',
          'notes.title',
          'notes.description',
          'notes.user_id',
        ])
        .where('notes.user_id', user_id)
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', filtredTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .groupBy('notes.id')
        .orderBy('notes.title');
    } else {
      notes = await knex('notes').where({ user_id });
      //.whereLike('title', `%${title}%`)
      //.orderBy('title');
    }

    // Isso vai devolver todas as tags do usuário, não apenas as que estão relacionadas com as notas
    const userTags = await knex('tags').where({ user_id });

    // Agora fazer o mapping para poder acessar todas as posições do array
    const notesWithTags = notes.map((note) => {
      // Filtrar as tags do usuario que tem o mesmo id da nota
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;
