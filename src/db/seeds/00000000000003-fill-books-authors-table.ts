/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-len */

import { QueryInterface } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    const booksAuthorsMap = {
      'Мастер и Маргарита': ['Михаил Булгаков'],
      'Мёртвые души': ['Николай Гоголь'],
      'Двенадцать стульев': ['Илья Ильф', 'Евгений Петров'],
      'Собачье сердце': ['Михаил Булгаков'],
      'Преступление и наказание': ['Федор Достоевский'],
      'Война и мир': ['Лев Толстой'],
    };

    const books = (await queryInterface.sequelize
      .query('SELECT book_id, title FROM books')
      .then((result) => result[0])) as Array<{
      book_id: number;
      title: string;
    }>;

    const authors = (await queryInterface.sequelize
      .query('SELECT author_id, name, second_name FROM authors')
      .then((result) => result[0])) as Array<{
      author_id: number;
      name: string;
      second_name: string;
    }>;

    const booksAuthors = books.reduce<Array<{ book_id: number; author_id: number }>>((acc, book) => {
      if (book.title) {
        const bookAuthorArray: string[] = booksAuthorsMap[book.title];

        if (bookAuthorArray) {
          bookAuthorArray.forEach((authorInfo: string) => {
            const [authorName, authorSecondName] = authorInfo.split(' ');
            const authorOfBook = authors.find(
              (author) => author.name === authorName
                && author.second_name === authorSecondName,
            );

            if (authorOfBook) {
              acc.push({
                book_id: book.book_id,
                author_id: authorOfBook.author_id,
              });
            }
          });
        }
      }

      return acc;
    }, []);

    await queryInterface.bulkInsert('books_authors', booksAuthors);
  },
  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('books_authors', {}),
};
