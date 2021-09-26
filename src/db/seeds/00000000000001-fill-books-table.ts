/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-len */

import { QueryInterface } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('books', [
    {
      title: 'Мастер и Маргарита',
      annotation:
          '"Мастер и Маргарита" - итоговое произведение выдающегося отечественного прозаика и драматурга Михаила Афанасьевича Булгакова. Обещание, содержащееся на страницах книги - "ваш роман вам принесет еще сюрпризы", - оправдалось вполне: написанный Мастером провидческий роман о дьяволе, пожалуй, явился одной из самых загадочных, удивительных и самых читаемых книг XX столетия! Многие слова и выражения из этого произведения вошли в современный лексикон, а персонажи своею реальностью затмили действительно существующих граждан.',
    },
    {
      title: 'Мёртвые души',
      annotation:
          '«…Говоря о „Мертвых душах“, можно вдоволь наговориться о России», – это суждение поэта и критика П. А. Вяземского объясняет особое место поэмы Гоголя в истории русской литературы: и огромный успех у читателей, и необычайную остроту полемики вокруг главной гоголевской книги, и многообразие высказанных мнений, каждое из которых так или иначе вовлекает в размышления о природе национального мышления и культурного сознания, о настоящем и будущем России.',
    },
    {
      title: 'Двенадцать стульев',
      annotation:
          'И. Ильф и Е. Петров завершили роман «Двенадцать стульев» в 1928 году, но еще до первой публикации цензоры изрядно сократили, «почистили» его. Правка продолжалась от издания к изданию еще десять лет. В итоге книга уменьшилась почти на треть. Публикуемый ныне вариант — первый полный — реконструирован по архивным материалам. Книга снабжена обширным историко-литературным и реальным комментарием.',
    },
    {
      title: 'Собачье сердце',
      annotation:
          '«Собачье сердце» – одно из самых любимых читателями произведений Михаила Булгакова. Вас ждёт полный рассказ о необыкновенном эксперименте гениального доктора.',
    },
    {
      title: 'Преступление и наказание',
      annotation:
          '«Преступление и наказание» (1866) — роман об одном преступлении. Двойное убийство, совершенное бедным студентом из-за денег. Трудно найти фабулу проще, но интеллектуальное и душевное потрясение, которое производит роман, — неизгладимо. В чем здесь загадка? Кроме простого и очевидного ответа — «в гениальности Достоевского» — возможно, существует как минимум еще один: «проклятые» вопросы не имеют простых и положительных ответов. Нищета, собственные страдания и страдания близких всегда ставили и будут ставить человека перед выбором: имею ли я право преступить любой нравственный закон, чтобы потом стать спасителем униженных и утешителем слабых; должен ли я сперва возлюбить себя, а только потом, став сильным, возлюбить ближнего своего? Это вечные вопросы.',
    },
    {
      title: 'Война и мир',
      annotation:
          'Роман-эпопея, описывающий события войн против Наполеона: 1805 года и отечественной 1812 года. Признан критикой всего мира величайшим эпическим произведением литературы нового времени.',
    },
  ]),
  down: async (queryInterface: QueryInterface) => {
    const {
      sequence_name: sequenceName,
    } = await queryInterface.sequelize.query(
      "SELECT pg_get_serial_sequence('books', 'book_id') AS sequence_name",
      { plain: true },
    );

    if (sequenceName) {
      await queryInterface.sequelize.query(
        `ALTER SEQUENCE ${sequenceName} RESTART WITH 1`,
      );
    }

    await queryInterface.bulkDelete('books', {});
  },
};