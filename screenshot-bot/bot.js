const puppeteer = require('puppeteer');
const Jimp = require('jimp');
const process = require('process');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const BASE_URL = 'http://dodona.localhost:3000/';

const IMAGE_FOLDER_PATH = '../';

// Student paths
const STUDENT_GUIDES_PATH = 'guides/for-students/';
const LOGIN_AND_SETTINGS_PATH = path.join(STUDENT_GUIDES_PATH, 'login-and-settings/');
const COURSES_PATH = path.join(STUDENT_GUIDES_PATH, 'courses/');
const EXERCISES_PATH = path.join(STUDENT_GUIDES_PATH, 'exercises/');

// Teacher/Staff paths
const COURSE_MANAGEMENT_PATH = 'guides/course-management/';
const CREATING_A_COURSE_PATH = `guides/creating-a-course/`;
const EXERCISE_SERIES_MANAGEMENT_PATH = `guides/exercise-series-management/`;
const USER_MANAGEMENT_PATH = 'guides/user-management/'

const IMAGE_FILE_EXTENSION = 'png';
const SEEDED_COURSE_URL = language => path.join(BASE_URL, language, '/courses/5/');
const LANGUAGES = ['nl', 'en'];
const TRANSLATIONS = {
  nl: {
    ADMIN: 'Admin',
    COURSES: 'Mijn Cursussen',
    COURSE_TEACHER: 'Laura Esgever',
    COURSE_SERIES_CLOSED_INFO: 'Deze reeks is niet toegankelijk voor studenten!',
    COURSE_SERIES_HIDDEN_INFO: 'Deze reeks is enkel zichtbaar voor studenten via de geheime link!',
    HIDDEN_COURSE_DESCRIPTION_INPUT: 'Welkom op de Dodona-cursus van het opleidingsonderdeel **Geavanceerde Javascript**.',
    HIDDEN_COURSE_NAME_INPUT: 'Geavanceerde Javascript',
    MODERATED_COURSE_DESCRIPTION_INPUT: 'Welkom op de Dodona-cursus van het opleidingsonderdeel **Algoritmen en Datastructuren**.',
    MODERATED_COURSE_NAME_INPUT: 'Algoritmen en Datastructuren',
    MY_COURSES: 'Cursussen',
    OPEN_COURSE_DESCRIPTION_INPUT: 'Welkom op de Dodona-cursus van het opleidingsonderdeel **Programmeren**. Deze cursus ' +
      'bevat een groot aantal Python programmeeroefeningen die voorzien zijn van automatische feedback. De oefeningen ' +
      'zijn per programmeertechniek ingedeeld in tien reeksen.',
    OPEN_COURSE_NAME_INPUT: 'Programmeren',
    SERIES: 'Reeks',
  },
  en: {
    ADMIN: 'Admin',
    COURSES: 'My courses',
    COURSE_TEACHER: 'Timothy Eacher',
    COURSE_SERIES_CLOSED_INFO: 'This series is not accessible for students!',
    COURSE_SERIES_HIDDEN_INFO: 'This series is only visible for students using the secret link!',
    HIDDEN_COURSE_DESCRIPTION_INPUT: 'Welcome to the Dodona page of the **Advanced Javascript** course.',
    HIDDEN_COURSE_NAME_INPUT: 'Advanced Javascript',
    MODERATED_COURSE_DESCRIPTION_INPUT: 'Welcome to the Dodona page of the **Algorithms and Data Structures** course.',
    MODERATED_COURSE_NAME_INPUT: 'Algorithms and Data Structures',
    MY_COURSES: 'My courses',
    OPEN_COURSE_DESCRIPTION_INPUT: 'Welcome to the Dodona page of the **Programming** course. This page contains a number ' +
      'of Python programming assignments with automatic feedback. The assignments are divided by programming technique ' +
      'into ten series.',
    OPEN_COURSE_NAME_INPUT: 'Programming',
    SERIES: 'Series'
  },
};

const SERIES = {
  nl: [
    {
      title: 'Examen',
      visibility: 'closed',
      deadline: null,
      exercises: [
        'Echo',
        'ISBN',
      ]
    },
    {
      title: 'Lussen',
      visibility: 'hidden',
      deadline: '2018-10-10 12:00',
      exercises: [
        'Echo JS',
        'Echo bash',
      ]
    },
    {
      title: 'Controlestructuren',
      visibility: 'open',
      deadline: '2018-08-01 12:00',
      exercises: [
        'Echo Prolog',
        'Echo R',
      ],
    },
    {
      title: 'Expressies',
      visibility: 'open',
      deadline: '2021-10-10 12:00',
      exercises: [
        'Echo Java',
        'Echo Haskell',
        'Echo',
      ],
    },
  ],
  en: [
    {
      title: 'Examination',
      visibility: 'closed',
      deadline: null,
      exercises: [
        'Echo',
        'ISBN',
      ]
    },
    {
      title: 'Loops',
      visibility: 'hidden',
      deadline: '2018-10-10 12:00',
      exercises: [
        'Echo JS',
        'Echo bash',
      ]
    },
    {
      title: 'Controlestructuren',
      visibility: 'open',
      deadline: '2018-08-01 12:00',
      exercises: [
        'Echo Prolog',
        'Echo R',
      ],
    },
    {
      title: 'Expressions',
      visibility: 'open',
      deadline: '2021-10-10 12:00',
      exercises: [
        'Echo Java',
        'Echo Haskell',
        'Echo',
      ],
    },
  ]
};

class Image {
  constructor(path) {
    this.toDrawOn = null;
    this.path = path;
  }

  async load() {
    this.toDrawOn = await Jimp.read(this.path);
    return this;
  }

  async drawArrow(x, y, mirror = false) {
    let arrow = await Jimp.read('./arrow.png');
    let dx = -90;
    if (mirror) {
      arrow = arrow.flip(true, false);
      dx = 45;
    }
    await this.toDrawOn.composite(arrow, x + dx, y);
  }

  async close() {
    await this.toDrawOn.write(this.path);
  }
}

class Wizard {
  constructor(baseUrl, imageFolder, fileExtension) {
    this.page = null;
    this.browser = null;
    this.elementsToBlock = [];
    this.baseUrl = baseUrl;
    this.imageFolder = imageFolder;
    this.language = '';
    this.fileExtension = fileExtension;
  }

  setLanguage(language){
    this.language = language;
  }

  async launch() {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({
      width: 1280,
      height: 720
    });
    return this;
  }

  blockElement(selector, predicate) {
    this.elementsToBlock.push({
      selector,
      pointPredicate: predicate || (() => true)
    });
  }

  async click(selector, predicate, predicateArg) {
    predicate = predicate || (() => true);
    const elements = await this.page.$$(selector);
    for (const element of elements) {
      if (await this.page.evaluate(predicate, element, predicateArg)) {
        await element.click();
        await wait(1000);
        return;
      }
    }
    console.warn(`UNUSED CLICK SELECTOR: ${selector}`);
  }

  async clickAndNavigate(selector, predicate, predicateArg){
    await this.click(selector, predicate, predicateArg);
    await wait(1000);
    await this.removeBlockedElements();
  }

  async removeBlockedElements() {
    for (const toBlock of this.elementsToBlock) {
      for (const element of await this.page.$$(toBlock.selector)) {
        if (await this.page.evaluate(toBlock.pointPredicate, element)) {
          await this.page.evaluate(elem => {
            elem.remove();
          }, element);
        }
      }
    }
  }

  async navigate(url, useBase = true) {
    useBase = useBase && !url.startsWith('http'); // in case you forget the useBase flag while giving a valid url
    const finalUrl = useBase ? this.baseUrl + url : url;
    await this.page.goto(finalUrl);
    await wait(1500);
    await this.removeBlockedElements();
    await wait(1000);
  }

  async scrollTo(selector) {
    const element = await this.page.$(selector);
    if (element === null) {
      console.warn(`COULDN'T FIND SELECTOR ${selector}`);
    } else {
      await this.page.evaluate(elem => elem.scrollIntoViewIfNeeded(), element);
    }
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async screenshot(savePath, options) {
    options = Object.assign({
      pointToSelectors: [], // pointTo => arrow pointing to element specified by selector
      pointPredicate: () => true,
      pointMulti: true,
      pointPredicateArg: null,
      cropSelector: null, // crops image for the specific element only
      cropPredicate: () => true,
      cropPredicateArg: null,
      mirror: false,
    }, options);

    const locations = [];
    for (const selector of options.pointToSelectors) {
      let used = false;
      for (const element of await this.page.$$(selector)) {
        if (await this.page.evaluate(options.pointPredicate, element, options.pointPredicateArg)) {
          const boxModel = await element.boxModel();
          // Make sure element is visible
          if (boxModel !== null) {
            locations.push(boxModel.content);
            used = true;
            if (!options.pointMulti) {
              break;
            }
          }
        }
      }
      if (!used) {
        console.warn(`UNUSED SELECTOR: ${selector}`);
        return;
      }
    }

    let clip = undefined;
    if (options.cropSelector) {
      let found = 0;
      for (const element of await this.page.$$(options.cropSelector)) {
        if (await this.page.evaluate(options.cropPredicate, element, options.cropPredicateArg)) {
          const box = await element.boxModel();
          if (box !== null) {
            clip = {
              x: box.content[0].x,
              y: box.content[0].y,
              width: box.content[1].x - box.content[0].x,
              height: box.content[3].y - box.content[0].y,
            };
            found++;
          }
        }
      }
      if (found === 0) {
        console.warn(`UNUSED CROP SELECTOR: ${options.cropSelector}`);
      } else if (found > 1) {
        console.warn(`CROP SELECTOR OCCURED ${found} TIMES: ${options.cropSelector}`);
      }
    }

    // If no language is given save for both languages
    const languageFolders = this.language ? [`${this.language}/`] : LANGUAGES;
    const fileEnd = savePath.endsWith(this.fileExtension) ? '' : `.${this.fileExtension}`
    for (languageFolder of languageFolders) {
      const imagePath = `${this.imageFolder}${languageFolder}${savePath}${fileEnd}`;
      await this.page.screenshot({
        path: imagePath,
        clip
      });
      await wait(1000);
      const image = await new Image(imagePath).load();
      for (const location of locations) {
        await image.drawArrow(location[3].x, location[3].y, options.mirror);
      }
      await image.close();
    }
  }

  async getNested(selectors){
    for (let element of await this.page.$$(selectors[0])) {
      let i = 1;
      while(element !== null && i < selectors.length){
        element = await element.$(selectors[i]);
        i++;
      }
      if(element){
        return element;
      }
    }
    console.warn(`Following selectors did not yield a valid element: ${selectors.join(', ')}`);
    return null;
  }

  async press(selector, key) {
    const element = await this.page.$(selector);
    await element.press(key);
  }

  async select(selector, value) {
    await this.page.select(selector, value);
  }

  async typeIn(selector, text) {
    await this.page.type(selector, text);
  }

  async close() {
    await this.browser.close();
  }

  async waitForNavigation() {
    await this.page.waitForNavigation({timeout: 240000});
    await this.removeBlockedElements();
  }
}

async function waitForInput() {
  await new Promise(((resolve) => {
    process.stdin.resume();
    process.stdin.once('data', function (data) {
      resolve(data);
      process.stdin.pause();
    });
  }));
}

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function enterPythonFile(wizard, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  let prevIndent = 0;
  for (const line of content.split('\n')) {
    const indent = line.split('    ').length - 1;
    for (let i = 0; i < Math.max(indent, prevIndent); i++) {
      await wizard.press('textarea.ace_text-input', 'Backspace');
    }
    prevIndent = indent;
    await wizard.typeIn('textarea.ace_text-input', `${line}\n`);
  }
}

async function read_submissions(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'To continue type the total number of submissions in the database: '
  });
  rl.prompt();
  return new Promise((resolve , _reject) => {
    rl.on('line', (line) => {
      const submissions = parseInt(line.trim());
      rl.close();
      return resolve(submissions);
    });
  });
};

async function main(){
  console.log(`Make sure Dodona is running locally on ${BASE_URL} with a clean database
  and the production stylesheet and that the user is logged in by default (as admin).\n`); 
  
  let submissions = await read_submissions();
  console.log(`Number of submissions: ${submissions}`);

  const wizard = await new Wizard(BASE_URL, IMAGE_FOLDER_PATH, IMAGE_FILE_EXTENSION).launch();
  await wizard.navigate('?pp=disable'); // disable Rack::MiniProfiler as not relevant for screenshots
  wizard.blockElement('footer.footer'); // footer is always the same and not relevant either
  wizard.blockElement('div.profiler-results'); // to remove the profiler from the exercise descriptions
  
  // =========================================================
  // SIGNED OUT
  // =========================================================
  console.log('signed out pages');

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(language);
    await wizard.screenshot(path.join(LOGIN_AND_SETTINGS_PATH, 'login'), {
      pointToSelectors: [`a[href$="/${language}/sign_in/"]`]
    });

    await wizard.click('a[data-toggle="dropdown"]');
    await wait(500);
    await wizard.screenshot(path.join(LOGIN_AND_SETTINGS_PATH, 'choose_language'), {
      pointToSelectors: ['ul.dropdown-menu']
    });
    
    await wizard.navigate(path.join(language, 'sign_in'));
    await wizard.screenshot(path.join(LOGIN_AND_SETTINGS_PATH, 'sign_in'));
    
    await wizard.navigate(path.join(language, 'contact'));
    await wizard.screenshot(path.join(STUDENT_GUIDES_PATH, 'contact'));
  }

  // =========================================================
  // STAFF
  // =========================================================

  /* currently unused, but maybe we want these pictures in the creating-exercise repo guide?
  console.log('staff repositories');
  await wizard.navigate('users/2/token/staff');
  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(path.join(language, 'repositories/new'));
    await wizard.screenshot('staff.repository_create');
    // unique constraint on name of repository, so randomize a bit
    await wizard.typeIn('#repository_name', `Example exercises ${Math.floor(Math.random() * 100).toString()}`);
    await wizard.typeIn('#repository_remote', 'git@github.com:dodona-edu/example-exercises.git');
    await wizard.click('button[form="new_repository"]');
    await wizard.screenshot('staff.repository_created');
  }
  */

  console.log('staff course management');

  await wizard.navigate('users/2/token/staff')

  const course_urls = {
    OPEN: {},
    HIDDEN: {},
    HIDDEN_REGISTRATION: {},
    MODERATED: {}
  };

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(path.join(language, '/courses?page=1'));
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'staff.courses_new_link'), {
      pointToSelectors: [`a[href$="/${language}/courses/new/"]`],
    });

    await wizard.navigate(path.join(language, 'courses/new/'));
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'staff.course_new_options'));
    await wizard.click('#new-course');
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'staff.course_new_empty'));
    await wizard.typeIn('input#course_name', TRANSLATIONS[language]['HIDDEN_COURSE_NAME_INPUT']);
    await wizard.typeIn('input#course_teacher', TRANSLATIONS[language]['COURSE_TEACHER']);
    await wizard.typeIn('textarea#course_description', TRANSLATIONS[language]['HIDDEN_COURSE_DESCRIPTION_INPUT']);
    await wizard.click('#course_visibility_hidden');

    await wizard.clickAndNavigate(`button[form="new_course"]`);
    await wait(3000);

    course_urls.HIDDEN[language] = wizard.page.target().url();
    await wizard.navigate(path.join(course_urls.HIDDEN[language], '/edit'), false);
    course_urls.HIDDEN_REGISTRATION[language] = await wizard.page.evaluate(() => document.querySelector('#hidden_show_link').value);
    await wizard.click('button[data-clipboard-target="#hidden_show_link"]'); // scroll it into view by clicking it
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH ,'staff.course_hidden_registration_link'), {
       pointToSelectors: ['button[data-clipboard-target="#hidden_show_link"]'],
    });
    await wizard.screenshot(path.join(COURSE_MANAGEMENT_PATH, 'staff.course_hidden_registration_link_renew'), {
      pointToSelectors: [`a[href$="/reset_token/"]`],
    });

    await wizard.navigate(path.join(language, '/courses/new/'));
    await wizard.click('#copy-course');
    await wait(1000);
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'staff.course_new_copy_course_options'), {
      pointToSelectors: ['tr.copy-course-row'],
      pointMulti: false,
    })
    await wizard.click('tr.copy-course-row');
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'staff.course_new_copy'));
    await wizard.typeIn('input#course_name', TRANSLATIONS[language]['MODERATED_COURSE_NAME_INPUT']);
    await wizard.typeIn('input#course_teacher', TRANSLATIONS[language]['COURSE_TEACHER']);
    await wizard.typeIn('textarea#course_description', TRANSLATIONS[language]['MODERATED_COURSE_DESCRIPTION_INPUT']);
    await wizard.click('#course_visibility_visible_for_all');
    await wizard.click('#course_moderated_true');

    await wizard.clickAndNavigate(`button[form="new_course"]`);
    course_urls.MODERATED[language] = wizard.page.target().url();
  
    await wizard.navigate(path.join(language ,'/courses/new'));
    await wizard.click('#new-course');
    await wizard.typeIn('input#course_name', TRANSLATIONS[language]['OPEN_COURSE_NAME_INPUT']);
    await wizard.typeIn('input#course_teacher', TRANSLATIONS[language]['COURSE_TEACHER']);
    await wizard.typeIn('textarea#course_description', TRANSLATIONS[language]['OPEN_COURSE_DESCRIPTION_INPUT']);

    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'staff.course_new_submit'), {
       pointToSelectors: [`button[form="new_course"]`]
    });

    await wizard.clickAndNavigate(`button[form="new_course"]`);
    course_urls.OPEN[language] = wizard.page.target().url();
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'staff.course_created'));

    await wizard.navigate(course_urls.HIDDEN[language], useBase = false);
    await wizard.screenshot(path.join(COURSE_MANAGEMENT_PATH, 'staff.course_edit_button'), {
       pointToSelectors: ['a[href$="/edit/"]'],
    });
    await wizard.screenshot(path.join(COURSE_MANAGEMENT_PATH, 'staff.course_submissions_link'), {
      // duplicate invisible element so had to be really specifici
      pointToSelectors: ['div.center > div > ul > li > a > i.submissions'],
    })
    await wizard.navigate(path.join(course_urls.OPEN[language], 'edit/'), useBase = false);
    await wizard.screenshot(path.join(COURSE_MANAGEMENT_PATH, 'staff.course_edit_cancel'), {
       pointToSelectors: [`a[href$="${course_urls.OPEN[language].replace(language + '/', '').replace(wizard.baseUrl, '')}"]`],
    });
    await wizard.scrollToBottom();
    await wizard.clickAndNavigate(`button[form*="edit_course"]`);
    await wizard.screenshot(path.join(COURSE_MANAGEMENT_PATH, 'staff.course_after_edit'));

    // course members page
    await wizard.navigate(path.join(SEEDED_COURSE_URL(language), 'members'), useBase = false);
    await wizard.screenshot(path.join(USER_MANAGEMENT_PATH, 'staff.course_users_admin'), {
       pointToSelectors: ['i.mdi-school'],
       pointMulti: false,
    });
    await wizard.page.$$(`a.ellipsis-overflow[href^="/${language}/courses"]`).then(elements => elements[2].click());
    await wait(10000); // Wait for graphs
    await wizard.screenshot(path.join(USER_MANAGEMENT_PATH, 'staff.user_course_overview'));

    // course submissions page
    await wizard.navigate(path.join(SEEDED_COURSE_URL(language), 'submissions'), useBase = false);
    await wizard.screenshot(path.join(COURSE_MANAGEMENT_PATH, 'staff.course_submissions_filter'), {
      pointToSelectors: ['i.mdi-filter-outline'],
      pointMulti: false,
    })
    await wizard.click('i.mdi-filter-outline');
    await wait(500);
    await wizard.screenshot(path.join(COURSE_MANAGEMENT_PATH, 'staff.course_submissions_filtered'));


    await wizard.navigate(path.join(language ,'courses'));
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'staff.course_hidden'), {
      pointToSelectors: ['i.mdi-eye-off-outline'],
      pointMulti: false,
    });
  }
  console.log(course_urls);
  wizard.setLanguage(''); // icons are language independent
  await wizard.page.evaluate(() => {
     document.querySelector('body').innerHTML = 
     ['mdi-school mdi-icons-strikethrough', 'mdi-school', 'mdi-account-plus', 'mdi-delete', 'mdi-check']
        .map(icon => `<p><i class="mdi ${icon} mdi-18"></i></p>`)
        .join('');
  });

  const REGISTRATION_ICONS = [
    ['make_course_admin', 'i.mdi-school:not(.mdi-icons-strikethrough)'], ['make_student', 'i.mdi-school.mdi-icons-strikethrough'],
    ['register', 'i.mdi-account-plus'], ['unregister', 'i.mdi-delete'], ['approve', 'i.mdi-check'], ['decline', 'i.mdi-delete']
  ];
  for (const [image_name, cropSelector] of REGISTRATION_ICONS){
    await wizard.screenshot(path.join('images', 'staff_registration_icons', image_name), {
      cropSelector: cropSelector,
    })
  }

  console.log(`staff user management`);
  const SEEDED_MODERATED_COURSE_URL = "/courses/3/";
  for (const language of LANGUAGES) {
     wizard.setLanguage(language);
     await wizard.navigate(path.join(language, SEEDED_MODERATED_COURSE_URL));
     await wizard.screenshot(path.join(USER_MANAGEMENT_PATH, 'staff.course_users'),
     {
       pointToSelectors: ['i.mdi.mdi-24.mdi-account-multiple']
     })

     await wizard.navigate(path.join(language, SEEDED_MODERATED_COURSE_URL,'members'));
     await wizard.screenshot(path.join(USER_MANAGEMENT_PATH, 'staff.users'));
     await wizard.screenshot(path.join(USER_MANAGEMENT_PATH, 'staff.users_edit_permissions'), {
      pointMulti: false,
      pointToSelectors: ['i.mdi-school.mdi-icons-strikethrough'],
     })
     await wizard.typeIn(`input#filter-query-tokenfield`, 'Stijn');

     await wait(2000);
     await wizard.screenshot(path.join(USER_MANAGEMENT_PATH, 'staff.users_filtered'));
  }

  console.log('staff series');
  const series_urls = {
    nl: {},
    en: {}
  };

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    for (const series of SERIES[language]) {
       await wizard.navigate(path.join(course_urls.OPEN[language], 'series', 'new'), useBase = false);
       await wizard.typeIn(`input#series_name`, series.title);
       await wizard.select(`select#series_visibility`, series.visibility);
       await wizard.page.evaluate((deadline) => {
         document.querySelector('input#series_deadline').value = deadline;
       }, series.deadline);


       await wizard.click('button[form="new_series"]');
       await wait(2000);

       series_urls[language][series.visibility] = await wizard.page.target().url().replace('edit/', '');
       await wait(1000);
       for (const exercise of series.exercises) {
         await wizard.page.evaluate(() => document.querySelector('#filter-query-tokenfield').value = '');
         await wizard.typeIn('#filter-query-tokenfield', exercise);
         await wait(2000);
         await wizard.click('a.add-activity');
       }

       await wizard.click('button[form^="edit_series_"]');
       await wait(2000);
    }

    wizard.setLanguage(language);
    // manage series
    await wizard.navigate(SEEDED_COURSE_URL(language), useBase = false);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.course_manage_series_button'), {
      pointToSelectors: [`a[href$="/manage_series/"]`],
    });
    // open manage series menu
    await wizard.getNested(['div.card-subtitle-actions', 'a']).then(elem => elem.click());
    await wait(1000);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_actions_menu'));
    // start evaluation
    await wizard.clickAndNavigate(`a[href^="/${language}/evaluations/new"]`);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate'));
    await wizard.clickAndNavigate('button[form="new_evaluation"]');
    // select users and go to real evaluation
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_select_users'), {
      pointToSelectors: ['a[href$="type=submitted"] > div.button.btn-text'],
    });
    await wizard.clickAndNavigate('a[href$="type=submitted"]');
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_start'), {
      pointToSelectors: ['a.btn-primary']
    });
    await wizard.clickAndNavigate('a.btn-primary');
    const evaluation_url = wizard.page.target().url();
    //release feedback button performs a patch
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_release_feedback'), {
      pointToSelectors: ['a[data-method="patch"]']
    })

    await wizard.scrollTo('i.mdi-comment-outline');
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_detail_overview'));
    // give feedback to a user
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_goto_give_feedback'), {
      pointToSelectors: ['i.mdi-comment-outline'],
      pointMulti: false,
    });
    await wizard.clickAndNavigate('a', el => !!el.querySelector('i.mdi-comment-outline'));
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_give_feedback'));
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_feedback_row'), {
      pointToSelectors: ['div.user-feedback-row'],
      pointPredicate: elem => !!elem.querySelector('i[class^="mdi mdi-comment"]'),
    });
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_return'), {
      pointToSelectors: [`a[href$="${evaluation_url.replace(wizard.baseUrl, '')}"]`]
    });

    await wizard.navigate(SEEDED_COURSE_URL(language), useBase = false);
    // open manage series menu
    await wizard.getNested(['div.card-subtitle-actions', 'a']).then(elem => elem.click());
    await wait(500);
    // menu action should have changed
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_actions_check_evaluation'), {
      pointMulti: false,
      pointToSelectors: ['i.mdi-message-draw'],
    });
    await wait(3000);

    await wizard.navigate(evaluation_url, useBase = false);
    await wait(2000);
    await wizard.click('a', elem => !!elem.querySelector('i.mdi-dots-vertical'));
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_delete'), {
      pointToSelectors: [`a[data-method="delete"][href^="/${language}/evaluations/"]`],
    });

    const deleteButtonSelector = `a[data-method="delete"][href^="/${language}/evaluations/"]`;
    // prevent page confirmation prompt to block deletion
    await wizard.page.evaluate(
      (element) => element.setAttribute('data-confirm', ''), 
      await wizard.page.$(deleteButtonSelector));
    await wizard.click(deleteButtonSelector);

    // give time to perform deletion and navigation
    await wait(3000);

    

    await wizard.navigate(course_urls.OPEN[language], useBase = false);
    await wizard.scrollToBottom();
    await wait(1000);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.course_series_info_message'), {
       pointToSelectors: [`div.alert.alert-info.hidden-print`]
    });

    await wizard.navigate(path.join(course_urls.OPEN[language], 'manage_series'), useBase = false);
    await wizard.screenshot('staff.course_manage_series_page.png');
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.course_new_series_button'), {
      pointToSelectors: ['a[href$="/series/new/"]'],
    })
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_delete'), {
      pointToSelectors: ['i.mdi-delete'],
      pointMulti: false,
    });
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_edit'), {
      pointToSelectors: ['a[href*="series"] > i.mdi-pencil'],
      pointMulti: false,
    })

    await wizard.navigate(path.join(series_urls[language]['hidden'],'edit'), useBase = false);
    await wizard.scrollTo(`#access_token`);

    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_hidden_link'), {
       pointToSelectors: ['#access_token'],
    });
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_hidden_link_reset'), {
      pointToSelectors: ['a[href$="/reset_token/?type=access_token"]'],
    });

    await wizard.navigate(path.join(series_urls[language]['open'], 'edit'), useBase = false);
    await wizard.scrollTo('input#filter-query-tokenfield');
    await wait(1000);
    await wizard.typeIn('input#filter-query-tokenfield', 'Echo Java');
    await wait(500);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_add_exercise'), {
      pointToSelectors: [`a.add-activity`],
      pointMulti: false,
    });
    await wait(300);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_remove_exercise'), {
    pointToSelectors: [`a.remove-activity`],
      pointMulti: false,
    });
   await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_move_exercise'), {
      pointToSelectors: ['div.drag-handle'],
      mirror: true,
      pointMulti: false,
    });

    await wizard.navigate(path.join(course_urls.OPEN[language], 'series', 'new'), useBase = false);

    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_new'));
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_new_submit'), {
        pointToSelectors: [`button[form="new_series"]`],
    });

    await wizard.click('button.btn-default[data-toggle]');
    await wait(200);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_calendar_open'), {
      pointToSelectors: ['button.btn-default[data-toggle]'],
    });

    await wizard.click('span.flatpickr-day.today');
    await wait(200);

    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_calendar_clear'), {
        pointToSelectors: [`i.mdi-close`],
    });

    await wizard.navigate(path.join(series_urls[language]['open'], 'edit'), useBase = false);

    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_edit_submit'), {
        pointToSelectors: [`button[form^="edit_series_"]`]
    });
    // series export
    await wizard.navigate(SEEDED_COURSE_URL(language), useBase = false);
    await wizard.getNested(['div.card-subtitle-actions', 'a']).then(elem => elem.click());
    await wait(1000);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_export_action'), {
      pointToSelectors: [`a[href^="/${language}/exports/series"]`],
    });
    await wizard.clickAndNavigate(`a[href^="/${language}/exports/series"]`);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_export_exercise_choice'));
    await wizard.click('#check-all');
    await wizard.click('#next_step');
    await wizard.scrollToBottom();
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_export_options'));
    await wizard.clickAndNavigate('button[form="download_submissions"]');
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_export_started'));
  }
  console.log(series_urls);

  // =========================================================
  // STUDENT
  // =========================================================

  await wizard.navigate('users/3/token/student');
  console.log('homepage');

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(`?locale=${language}`);
    await wizard.screenshot(path.join(COURSES_PATH, 'student.explore_courses'), {
      pointToSelectors: [`a[href$="/${language}/courses/"]`],
    });

    await wizard.click('li.dropdown', elem => !!elem.querySelector('a[href*="/sign_out/"]'));
    await wizard.screenshot(path.join(LOGIN_AND_SETTINGS_PATH, 'student.user_menu_my_profile'), {
      pointToSelectors: [`li.dropdown ul.dropdown-menu a[href$="/${language}/users/3/"]`],
    });

    await wizard.navigate(`${language}/users/3/`);
    await wizard.screenshot(path.join(LOGIN_AND_SETTINGS_PATH, 'student.edit_profile'), {
      pointToSelectors: [`a[href$="/${language}/users/3/edit/"]`],
    });

    await wizard.navigate(`${language}/users/3/edit/`);
    await wizard.screenshot(path.join(LOGIN_AND_SETTINGS_PATH, 'student.edit_timezone'), {
      pointToSelectors: ['select#user_time_zone']
    });
  }
  
  // Set the wrong timezone
  await wizard.navigate(`nl/users/3/edit/`);
  await wizard.page.evaluate(() => {
    document.querySelector('select#user_time_zone').value = 'Seoul';
  });
  await wizard.click('button.btn-primary[form*="edit_user_"]');
  await wait(200);
  await wizard.navigate('?locale=nl');
  // Screenshot the wrong timezone warning
  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(`?locale=${language}`);
    await wizard.screenshot(path.join(LOGIN_AND_SETTINGS_PATH, 'student.wrong_timezone'));
  }

  // Set the right timezone to get rid of the warning without accidentally hiding other warnings.
  await wizard.navigate(`nl/users/3/edit/`);
  await wizard.page.evaluate(() => {
    document.querySelector('select#user_time_zone').value = 'Brussels';
  });
  await wizard.click('button.btn-primary[form*="edit_user_"]');
  await wait(200);
  await wizard.navigate('?locale=nl');

  console.log('courses');

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(path.join(language, 'courses'));
    await wizard.screenshot(path.join(STUDENT_GUIDES_PATH, 'student.courses'));

    await wizard.navigate(course_urls.OPEN[language], false);

    await wizard.screenshot(path.join(COURSES_PATH, 'student.breadcrumb_course'), {
      pointToSelectors: ['div.crumb a[href="#"]'],
    });

    await wizard.screenshot(path.join(COURSES_PATH, 'register'), {
      cropSelector: ['div.col-sm-6.col-xs-12'],
      cropPredicate: (elem) => !!elem.querySelector('div.callout'),
    });

    await wizard.navigate(course_urls.HIDDEN[language], false);
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'student.hidden_course_unregistered_denied_message'));

    await wizard.navigate(course_urls.HIDDEN_REGISTRATION[language], false);
    await wizard.screenshot(path.join(CREATING_A_COURSE_PATH, 'student.hidden_course_unregistered_link_message'));

    await wizard.navigate(`${course_urls.OPEN[language]}subscribe`, false);

    await wizard.navigate(course_urls.OPEN[language], false);
    await wizard.screenshot(path.join(COURSES_PATH, 'student.unregister'), {
      pointToSelectors: ['form[action$="/unsubscribe/"] input[type="submit"]'],
    });

    await wizard.navigate(course_urls.MODERATED[language], false);
    await wizard.screenshot(path.join(COURSES_PATH, 'moderated_register'), {
      cropSelector: ['div.col-sm-6.col-xs-12'],
      cropPredicate: elem => !!elem.querySelector('div.callout'),
    });

    // register for moderated course
    await wizard.navigate(path.join(course_urls.MODERATED[language], 'subscribe'), useBase = false);

    await wizard.navigate(course_urls.MODERATED[language], false);
    await wizard.screenshot(path.join(COURSES_PATH, 'moderated_waiting'), {
      cropSelector: ['div.col-sm-6.col-xs-12'],
      cropPredicate: elem => !!elem.querySelector('div.callout'),
    });

    await wizard.navigate(path.join(language, 'courses/5/'));
    await wizard.screenshot(path.join(COURSES_PATH, 'closed_registration'), {
      cropSelector: ['div.col-sm-6.col-xs-12'],
      cropPredicate: elem => !!elem.querySelector('div.callout'),
    });
  }

  console.log('exercises');
  const exerciseNamesToIDs = {
    nl: {},
    en: {},
  };

  for (const language of LANGUAGES) {
    await wizard.navigate(course_urls.OPEN[language], useBase = false);
    exerciseNamesToIDs[language] = await wizard.page.evaluate((url) => {
      const table = document.querySelector('div#series-listing');
      const exercise_links = table.querySelectorAll('a[href*="/activities/"]');
      const result = {};
      for (const link of exercise_links) {
        if (link.href.includes(`${url}series/`)) {
          const parts = link.href.split('/').filter(s => s.length > 0);
          result[link.textContent] = parts[parts.length - 1];
        }
      }
      return result;
    }, course_urls.OPEN[language].replace(wizard.baseUrl, ''));
  }

  // Number of submissions on a freshly seeded database.
  let first_submission = submissions + 1;
  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(course_urls.OPEN[language]);
    await wizard.scrollTo(`a[href*="/activities/${exerciseNamesToIDs[language]['Echo']}/"]`)
    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.course_exercise_selection'), {
      pointToSelectors: [`a[href*="/activities/${exerciseNamesToIDs[language]['Echo']}/"]`],
    });

    await wizard.clickAndNavigate(`a[href*="/activities/${exerciseNamesToIDs[language]['Echo']}/"]`);
    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.exercise_start'));

    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.exercise_crumbs'), {
      pointToSelectors: ['.crumb a']
    });

    await wizard.scrollToBottom();
    await enterPythonFile(wizard, `./solutions/Echo.correct.py`);

    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.exercise_before_submit'), {
      pointToSelectors: ['#editor-process-btn'],
    });

    await wizard.click('#editor-process-btn');
    await wait(20000);
    submissions++;

    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.exercise_feedback_correct_tab'));

    await wizard.click('a#activity-submission-link');
    await wait(1000);

    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.exercise_submissions_tab'), {
      pointToSelectors: ['a#activity-submission-link'],
    });

    await wizard.navigate(path.join(language, 'submissions', submissions.toString()));
    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.exercise_feedback_correct_page'));

    // TODO: Add curling exercise to repo for fancy feedback screenshot. 
    // await wizard.navigate(`${course_urls.OPEN[language]}/exercises/${exerciseNamesToIDs[language]['Curling']}/`);
    // await enterPythonFile(wizard, `./solutions/Curling.incorrect.${language}.py`);
    await wizard.navigate(path.join(course_urls.OPEN[language], 'exercises', exerciseNamesToIDs[language]['Echo']));
    await enterPythonFile(wizard, `./solutions/Echo.incorrect.py`);

    await wizard.click('#editor-process-btn');
    await wait(20000);
    submissions++;

    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.exercise_feedback_incorrect_tab'));

    // await wizard.click('a[href="#score-1"]');
    // await wait(500);
    // await wizard.screenshot(`student.exercise_feedback_visual.png`);

    await wizard.navigate(`?locale=${language}`);
    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.course_submissions'), {
      pointToSelectors: [`div.course a.card-title-link[href*="/submissions/"]`],
    });

    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.exercise_all_submissions_page'), {
      pointToSelectors: [`a[href$="/activities/${exerciseNamesToIDs[language]['Echo']}/submissions/"]`],
    });

    await wizard.click('li.dropdown', elem => !!elem.querySelector('a[href*="/sign_out/"]'));
    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.all_submissions_link'), {
      pointToSelectors: [`a[href^="/${language}/submissions/"]`],
    });

    await wizard.navigate(path.join(language, 'submissions'));
    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.all_submissions'));

    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.submissions_to_exercise_feedback'), {
      pointToSelectors: [`a[href$="/submissions/${first_submission}/"]`],
    });
  }

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(`${course_urls.OPEN[language]}/exercises/${exerciseNamesToIDs[language]['Echo']}/`, false);

    await wizard.scrollToBottom();
    await enterPythonFile(wizard, `./solutions/Echo.lintingError.py`);

    await wizard.click('#editor-process-btn');
    await wait(20000);
    submissions++;

    await wizard.click('a[href="#code-1"]');
    await wait(500);
    await wizard.scrollToBottom();
    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.exercise_lint_error'));

    await wizard.navigate(course_urls.OPEN[language], false);
    await wizard.screenshot(path.join(EXERCISES_PATH, 'student.deadline_series_warning'));
  }

  // icons are language independent
  wizard.setLanguage('');
  await wizard.page.evaluate(() => {
    document.querySelector('body').innerHTML = 
        [
          'mdi mdi-check colored-correct',              // correct
          'mdi mdi-close colored-wrong',                // wrong
          'mdi mdi-alarm colored-wrong',                // time limit exceeded
          'mdi mdi-timer-sand-empty colored-default',   // running & queued
          'mdi mdi-flash colored-wrong',                // runtime error
          'mdi mdi-flash-circle colored-wrong',         // compilation error
          'mdi mdi-memory colored-wrong',               // memory limit exceeded
          'mdi mdi-script-text colored-wrong',          // output limit exceeded
          'mdi mdi-alert colored-warning',              // internal error
        ]
          .map(icon => `<p><i class="mdi ${icon} mdi-18"></i></p>`)
          .join('');
    });

  // Default has no icon in current implementation
  // await wizard.screenshot('submission_icons/default.png', { 
  //   cropSelector: '.glyphicon-minus'
  // });
  const SUBMISSION_ICONS = [
   ['correct', '.mdi-check'], ['wrong', '.mdi-close'], ['time_limit_exceeded', '.mdi-alarm'], ['running', '.mdi-timer-sand-empty'],
   ['queued', '.mdi-timer-sand-empty'], ['runtime_error', '.mdi-flash'], ['compilation_error', '.mdi-flash-circle'],
   ['memory_limit_exceeded', '.mdi-memory'], ['output_limit_exceeded', '.mdi-script-text'], ['internal_error', '.mdi-alert']
  ];
  for (const [image_name, cropSelector] of SUBMISSION_ICONS) {
    await wizard.screenshot(path.join('images', 'submission_icons', image_name), {
      cropSelector: cropSelector,
    });
  }

  await wizard.page.evaluate(() => {
    document.querySelector('body').innerHTML = 
        [
          'mdi mdi-close colored-wrong',         // wrong
          'mdi mdi-alarm',     // Deadline gemist
          'mdi mdi-alarm-off colored-wrong',     // Deadline gemist
          'mdi mdi-alarm-check colored-correct', // Deadline gehaald
          'mdi mdi-check colored-correct'        // correct
        ]
          .map(icon => `<p><i class="mdi ${icon} mdi-18"></i></p>`)
          .join('');
    });

  const COURSE_EXERCISE_STATUS_ICONS = [
    ['wrong', '.mdi-close'], ['after_deadline', '.mdi-alarm-off'], ['before_deadline', '.mdi-alarm-check'], ['correct', '.mdi-check']
  ];
  for (const [image_name, cropSelector] of COURSE_EXERCISE_STATUS_ICONS){
    await wizard.screenshot(path.join('images', 'course_exercise_status_icons', image_name), {
      cropSelector: cropSelector,
    })
  }

  
  const titles = {
    en: "Wrong",
    nl: "Fout"
  }

  await wizard.navigate('users/2/token/staff')
  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(path.join(series_urls[language]['open'], 'scoresheet'), false);
    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.scoresheet'));

    // This does the same as clicking on the icon representing the
    // submission status in the scoresheet of a series.
    const elem = await wizard.page.$(`a[title="${titles[language]}"]`);
    const href = await elem.getProperty("href").then(hrefProperty => hrefProperty.jsonValue());
    await wizard.navigate(href, false);
    await wait(1000);

    await wizard.screenshot(path.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.feedback_evaluate'), {
      pointToSelectors: [`a[href$="/evaluate/"]`],
    });
  }
  
  await wizard.close();

  // We manually exit because the navigation after cloning leaves behind an unresolved promise.
  process.exit(0);
}

main()
  .then(() => console.log('Screenshot bot script finished.'))
  .catch(err => {
    console.error('Something went wrong during the execution of the screenshot bot.');
    console.error(err);
  });
