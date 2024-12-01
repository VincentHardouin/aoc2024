export default function (plop) {
  plop.setGenerator('day', {
    description: 'Add a day',
    prompts: [
      {
        type: 'input',
        name: 'day',
        message: 'day of advent code',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './day{{day}}.ts',
        templateFile: 'templates/day.ts.hbs',
      },
      {
        type: 'add',
        path: './day{{day}}.test.ts',
        templateFile: 'templates/day.test.ts.hbs',
      },
      {
        type: 'add',
        path: './day{{day}}.txt',
        templateFile: 'templates/day.txt.hbs',
      },
    ],
  });
};
