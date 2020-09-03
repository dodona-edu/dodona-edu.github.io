const puppeteer = require('puppeteer');
const Jimp = require('jimp');
const process = require('process');
const fs = require('fs');
const readline = require('readline');

const BASE_URL = 'http://dodona.localhost:3000/';
const IMAGE_FOLDER_PATH = '../images/';
const SEEDED_COURSE_URL = language => `${BASE_URL}${language}/courses/5/`;
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
  constructor(baseUrl, imageFolder) {
    this.page = null;
    this.browser = null;
    this.elementsToBlock = [];
    this.baseUrl = baseUrl;
    this.imageFolder = imageFolder;
    this.language = '';
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
    const languageFolder = this.language ? `${this.language}/` : '';
    const imagePath = `${this.imageFolder}${languageFolder}${savePath}`;
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


(async () => {
  console.log(`Make sure Dodona is running locally on ${BASE_URL} with a clean database
  and the production stylesheet and that the user is logged in by default (as admin).\n`); 
  
  let submissions = await read_submissions();
  console.log(`Number of submissions: ${submissions}`);

  const wizard = await new Wizard(BASE_URL, IMAGE_FOLDER_PATH).launch();
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
    await wizard.screenshot('landingpage.png');
    await wizard.screenshot('login.png', {
      pointToSelectors: [`a[href$="/${language}/sign_in/"]`]
    });

    await wizard.click('a[data-toggle="dropdown"]');
    await wait(500);
    await wizard.screenshot(`choose_language.png`, {
      pointToSelectors: ['ul.dropdown-menu']
    });

    for (const page of ['sign_in', 'data', 'privacy', 'contact', 'about']) {
      await wizard.navigate(`${language}/${page}`);
      await wizard.screenshot(`${page}.png`);
    }
  }

  // =========================================================
  // STAFF
  // =========================================================

  console.log('staff repositories');
  await wizard.navigate('users/2/token/staff');
  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(`${language}/repositories/new`);
    await wizard.screenshot('staff.repository_create.png');
    await wizard.typeIn('#repository_name', `Example exercises ${Math.floor(Math.random() * 100).toString()}`);
    await wizard.typeIn('#repository_remote', 'git@github.com:dodona-edu/example-exercises.git');
    await wizard.click('button[form="new_repository"]');
    await wizard.screenshot('staff.repository_created.png');
  }

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
    await wizard.navigate(`${language}/courses?page=1`);
    await wizard.screenshot(`staff.courses_new_link.png`, {
      pointToSelectors: [`a[href$="/${language}/courses/new/"]`],
    });

    await wizard.typeIn('#filter-query-tokenfield', 'course');
    await wizard.screenshot('staff.courses_filtered.png');

    await wizard.navigate(`${language}/courses/new/`);
    await wizard.screenshot('staff.course_new_options.png');
    await wizard.click('#new-course');
    await wizard.screenshot('staff.course_new_empty.png');
    await wizard.typeIn('input#course_name', TRANSLATIONS[language]['HIDDEN_COURSE_NAME_INPUT']);
    await wizard.typeIn('input#course_teacher', TRANSLATIONS[language]['COURSE_TEACHER']);
    await wizard.typeIn('textarea#course_description', TRANSLATIONS[language]['HIDDEN_COURSE_DESCRIPTION_INPUT']);
    await wizard.click('#course_visibility_hidden');

    await wizard.click(`button[form="new_course"]`);
    await wait(1000);
    await wizard.removeBlockedElements();
    await wait(3000);
    await wizard.screenshot(`staff.course_hidden_message.png`);

    course_urls.HIDDEN[language] = wizard.page.target().url();
    await wizard.navigate(course_urls.HIDDEN[language] + '/edit', false);
    course_urls.HIDDEN_REGISTRATION[language] = await wizard.page.evaluate(() => document.querySelector('#hidden_show_link').value);
    await wizard.click('button[data-clipboard-target="#hidden_show_link"]'); // scroll it into view by clicking it
    await wizard.screenshot(`staff.course_hidden_registration_link.png`, {
       pointToSelectors: ['button[data-clipboard-target="#hidden_show_link"]'],
    });
    await wizard.screenshot(`staff.course_hidden_registration_link_renew.png`, {
      pointToSelectors: [`a[href$="/reset_token/"]`],
    });

    await wizard.navigate(`${language}/courses/new/`);
    await wizard.click('#copy-course');
    await wait(1000);
    await wizard.screenshot('staff.course_new_copy_course_options.png', {
      pointToSelectors: ['tr.copy-course-row'],
      pointMulti: false,
    })
    await wizard.click('tr.copy-course-row');
    await wizard.screenshot('staff.course_new_copy.png');
    await wizard.typeIn('input#course_name', TRANSLATIONS[language]['MODERATED_COURSE_NAME_INPUT']);
    await wizard.typeIn('input#course_teacher', TRANSLATIONS[language]['COURSE_TEACHER']);
    await wizard.typeIn('textarea#course_description', TRANSLATIONS[language]['MODERATED_COURSE_DESCRIPTION_INPUT']);
    await wizard.click('#course_visibility_visible_for_all');
    await wizard.click('#course_moderated_true');

    await wizard.click(`button[form="new_course"]`);
    await wait(2000);
    await wizard.removeBlockedElements();
    await wizard.screenshot(`staff.course_moderated.png`);
    course_urls.MODERATED[language] = wizard.page.target().url();


    await wizard.navigate(`${language}/courses/new/`);
    await wizard.screenshot('staff.course_new_cancel.png', {
       pointToSelectors: [`a[href$="?locale=${language}"]`],
    });
    
    await wizard.navigate(`${language}/courses/new`);
    await wizard.click('#new-course');
    await wizard.typeIn('input#course_name', TRANSLATIONS[language]['OPEN_COURSE_NAME_INPUT']);
    await wizard.typeIn('input#course_teacher', TRANSLATIONS[language]['COURSE_TEACHER']);
    await wizard.typeIn('textarea#course_description', TRANSLATIONS[language]['OPEN_COURSE_DESCRIPTION_INPUT']);

    await wizard.screenshot(`staff.course_new_submit.png`, {
       pointToSelectors: [`button[form="new_course"]`]
    });

    await wizard.click(`button[form="new_course"]`);
    await wait(1000);
    await wizard.removeBlockedElements();
    await wait(1000);
    course_urls.OPEN[language] = wizard.page.target().url();
    await wizard.screenshot(`staff.course_created.png`);

    await wizard.navigate(course_urls.HIDDEN[language], useBase = false);
    await wizard.screenshot(`staff.course_edit_button.png`, {
       pointToSelectors: ['a[href$="/edit/"]'],
    });
    await wizard.screenshot('staff.course_submissions_link.png', {
      // duplicate invisible element so had to be really specifici
      pointToSelectors: ['div.center > div > ul > li > a > i.submissions'],
    })
    await wizard.navigate(course_urls.OPEN[language] + 'edit/', useBase = false);
    await wizard.screenshot(`staff.course_edit.png`);
    await wizard.screenshot(`staff.course_edit_cancel.png`, {
       pointToSelectors: [`a[href$="${course_urls.OPEN[language].replace(language + '/', '').replace(wizard.baseUrl, '')}"]`],
    });
    await wizard.scrollToBottom();
    await wizard.click(`button[form*="edit_course"]`);
    await wizard.removeBlockedElements();
    await wizard.screenshot(`staff.course_after_edit.png`);

    // course members page
    await wizard.navigate(SEEDED_COURSE_URL(language) + '/members', useBase = false);
    await wizard.screenshot(`staff.course_users_admin.png`, {
       pointToSelectors: ['i.mdi-school'],
       pointMulti: false,
    });
    await wizard.page.$$(`a.ellipsis-overflow[href^="/${language}/courses"]`).then(elements => elements[2].click());
    await wait(10000); // Wait for graphs
    await wizard.screenshot('staff.user_course_overview.png');

    // course submissions page
    await wizard.navigate(SEEDED_COURSE_URL(language) + 'submissions', useBase = false);
    await wizard.screenshot('staff.course_submissions.png');
    await wizard.screenshot('staff.course_submissions_filter.png', {
      pointToSelectors: ['i.mdi-filter-outline'],
      pointMulti: false,
    })
    await wizard.click('i.mdi-filter-outline');
    await wait(500);
    await wizard.screenshot('staff.course_submissions_filtered.png');


    await wizard.navigate(`${language}/courses/`);
    await wizard.screenshot(`staff.course_hidden.png`, {
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


  await wizard.screenshot('staff_registration_icons/make_course_admin.png', {
     cropSelector: 'i.mdi-school:not(.mdi-icons-strikethrough)'
  });

  await wizard.screenshot('staff_registration_icons/make_student.png', {
     cropSelector: 'i.mdi-school.mdi-icons-strikethrough'
  });

  await wizard.screenshot('staff_registration_icons/register.png', {
     cropSelector: 'i.mdi-account-plus'
  });

  await wizard.screenshot('staff_registration_icons/unregister.png', {
     cropSelector: 'i.mdi-delete'
  });

  await wizard.screenshot('staff_registration_icons/approve.png', {
     cropSelector: 'i.mdi-check'
  });

  await wizard.screenshot('staff_registration_icons/decline.png', {
     cropSelector: 'i.mdi-delete'
  });

  console.log(`staff user management`);
  const SEEDED_MODERATED_COURSE_URL = "/courses/3/"
  const STAFF_USERNAME = "Stijn Taff"
  // await wizard.navigate('users/2/token/staff');

   for (const language of LANGUAGES) {
     wizard.setLanguage(language);
     await wizard.navigate(`${language}/`);
     await wait(1000);
     await wizard.screenshot('staff.admin_menu_location.png',
     {
       pointToSelectors: ['button[aria-controls="drawer"]'],
       mirror: true
     });
     await wait(1000);
     await wizard.click('button[aria-controls="drawer"]');
     await wait(1000);
     await wizard.screenshot('staff.admin_menu.png');

     await wizard.navigate(language + SEEDED_MODERATED_COURSE_URL);
     await wizard.screenshot('staff.course_users.png',
     {
       pointToSelectors: ['i.mdi.mdi-24.mdi-account-multiple']
     })

     await wizard.navigate(language + SEEDED_MODERATED_COURSE_URL + 'members/');
     await wizard.screenshot('staff.users.png');
     await wizard.screenshot('staff.users_edit_permissions.png', {
      pointMulti: false,
      pointToSelectors: ['i.mdi-school.mdi-icons-strikethrough'],
     })
     await wizard.typeIn(`input#filter-query-tokenfield`, 'Stijn');

     await wait(2000);
     await wizard.screenshot(`staff.users_filtered.png`);
     await wizard.screenshot(`staff.users_filtered_link.png`, 
     {
       pointToSelectors: [`a[title="${STAFF_USERNAME}"]`]
     });

  }

  console.log('staff series');
  const series_urls = {
    nl: {},
    en: {}
  };

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    for (const series of SERIES[language]) {
       await wizard.navigate(course_urls.OPEN[language] + 'series/new/', useBase = false);
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
    await wizard.screenshot(`staff.course_manage_series_button.png`, {
      pointToSelectors: [`a[href$="/manage_series/"]`],
    });
    // open manage series menu
    await wizard.getNested(['div.card-subtitle-actions', 'a']).then(elem => elem.click());
    await wait(1000);
    await wizard.screenshot('staff.series_actions_menu.png');
    // start evaluation
    await wizard.click(`a[href^="/${language}/evaluations/new"]`);
    await wait(1000);
    await wizard.removeBlockedElements();
    await wait(1000);
    await wizard.screenshot('staff.series_evaluate.png');
    await wizard.screenshot('staff.series_evaluate_start.png', {
      pointToSelectors: ['button[form="new_evaluation"]']
    });
    await wizard.click('button[form="new_evaluation"]');
    await wait(2000);
    await wizard.removeBlockedElements();
    // select users and go to real evaluation
    await wizard.screenshot('staff.series_evaluate_select_users.png', {
      pointToSelectors: ['a[href$="type=submitted"] > div.button.btn-text'],
    });
    await wizard.click('a[href$="type=submitted"]');
    await wait(1000);
    await wizard.removeBlockedElements();
    await wizard.screenshot('staff.series_evaluate_start.png', {
      pointToSelectors: ['a.btn-primary']
    });
    await wizard.click('a.btn-primary');
    await wait(1500);
    await wizard.removeBlockedElements();
    const evaluation_url = wizard.page.target().url();
    //release feedback button performs a patch
    await wizard.screenshot('staff.series_evaluate_release_feedback.png', {
      pointToSelectors: ['a[data-method="patch"]']
    })

    await wizard.scrollTo('i.mdi-comment-outline');
    await wizard.screenshot('staff.series_evaluate_detail_overview.png');
    // give feedback to a user
    await wizard.screenshot('staff.series_evaluate_goto_give_feedback.png', {
      pointToSelectors: ['i.mdi-comment-outline'],
      pointMulti: false,
    });
    await wizard.click('a', el => !!el.querySelector('i.mdi-comment-outline'));
    await wait(2000);
    await wizard.removeBlockedElements();
    await wizard.screenshot('staff.series_evaluate_give_feedback.png');
    await wizard.screenshot('staff.series_evaluate_next.png', {
      pointToSelectors: ['#next-feedback-button'],
    })
    await wizard.screenshot('staff.series_evaluate_feedback_row.png', {
      pointToSelectors: ['div.user-feedback-row'],
      pointPredicate: elem => !!elem.querySelector('i[class^="mdi mdi-comment"]'),
    });
    await wizard.screenshot('staff.series_evaluate_return.png', {
      pointToSelectors: [`a[href$="${evaluation_url.replace(wizard.baseUrl, '')}"]`]
    });

    await wizard.navigate(SEEDED_COURSE_URL(language), useBase = false);
    // open manage series menu
    await wizard.getNested(['div.card-subtitle-actions', 'a']).then(elem => elem.click());
    await wait(500);
    // menu action should have changed
    await wizard.screenshot('staff.series_actions_check_evaluation.png', {
      pointMulti: false,
      pointToSelectors: ['i.mdi-message-draw'],
    });
    await wait(3000);

    await wizard.navigate(evaluation_url, useBase = false);
    await wait(2000);
    await wizard.click('a', elem => !!elem.querySelector('i.mdi-dots-vertical'));
    await wizard.screenshot('staff.series_evaluate_delete.png', {
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
    await wizard.screenshot(`staff.course_series_info_message.png`, {
       pointToSelectors: [`div.alert.alert-info.hidden-print`]
    });

    await wizard.navigate(course_urls.OPEN[language] + 'manage_series/', useBase = false);
    await wizard.screenshot('staff.course_manage_series_page.png');
    await wizard.screenshot('staff.course_new_series_button.png', {
      pointToSelectors: ['a[href$="/series/new/"]'],
    })
    await wizard.screenshot('staff.series_delete.png', {
      pointToSelectors: ['i.mdi-delete'],
      pointMulti: false,
    });
    await wizard.screenshot('staff.series_edit.png', {
      pointToSelectors: ['a[href*="series"] > i.mdi-pencil'],
      pointMulti: false,
    })

    await wizard.navigate(series_urls[language]['hidden'] + 'edit/', useBase = false);
    await wizard.scrollTo(`#access_token`);

    await wizard.screenshot(`staff.series_hidden_link.png`, {
       pointToSelectors: ['#access_token'],
    });
    await wizard.screenshot(`staff.series_hidden_link_copy.png`, {
      pointToSelectors: ['button[data-clipboard-target="#access_token"]'],
     });
    await wizard.screenshot(`staff.series_hidden_link_reset.png`, {
      pointToSelectors: ['a[href$="/reset_token/?type=access_token"]'],
    });

    await wizard.navigate(series_urls[language]['open'] + 'edit/', useBase = false);
    await wizard.scrollTo('input#filter-query-tokenfield');
    await wait(1000);
    await wizard.typeIn('input#filter-query-tokenfield', 'Echo Java');
    await wait(500);
    await wizard.screenshot(`staff.series_search_exercises.png`);
    await wizard.screenshot(`staff.series_add_exercise.png`, {
      pointToSelectors: [`a.add-activity`],
      pointMulti: false,
    });
    await wait(300);
    await wizard.screenshot(`staff.series_remove_exercise.png`, {
    pointToSelectors: [`a.remove-activity`],
      pointMulti: false,
    });
   await wizard.screenshot(`staff.series_move_exercise.png`, {
      pointToSelectors: ['div.drag-handle'],
      mirror: true,
      pointMulti: false,
    });

    await wizard.navigate(course_urls.OPEN[language] + 'series/new/', useBase = false);

    await wizard.screenshot(`staff.series_new.png`);
    await wizard.screenshot(`staff.series_new_cancel.png`, {
        pointToSelectors: [`a[href$="${course_urls.OPEN[language].replace(wizard.baseUrl, '')}"]`],
        mirror: true,
    });

    await wizard.screenshot(`staff.series_new_submit.png`, {
        pointToSelectors: [`button[form="new_series"]`],
    });

    await wizard.click('button.btn-default[data-toggle]');
    await wait(200);
    await wizard.screenshot(`staff.series_calendar_open.png`, {
      pointToSelectors: ['button.btn-default[data-toggle]'],
    });

    await wizard.click('span.flatpickr-day.today');
    await wait(200);

    await wizard.screenshot(`staff.series_calendar_clear.png`, {
        pointToSelectors: [`i.mdi-close`],
    });

    await wizard.navigate(`${series_urls[language]['open']}/edit`, useBase = false);

    await wizard.screenshot(`staff.series_edit_submit.png`, {
        pointToSelectors: [`button[form^="edit_series_"]`]
    });

    await wizard.screenshot('staff.series_edit.png');
    await wizard.screenshot('staff.series_edit_cancel.png', {
        pointToSelectors: ['div.crumb a[href*="/#series"]'],
    });
    // series export
    await wizard.navigate(SEEDED_COURSE_URL(language), useBase = false);
    await wizard.getNested(['div.card-subtitle-actions', 'a']).then(elem => elem.click());
    await wait(1000);
    await wizard.screenshot('staff.series_export_action.png', {
      pointToSelectors: [`a[href^="/${language}/exports/series"]`],
    });
    await wizard.click(`a[href^="/${language}/exports/series"]`);
    await wait(1000);
    await wizard.removeBlockedElements();
    await wizard.screenshot('staff.series_export_exercise_choice.png');
    await wizard.click('#check-all');
    await wizard.screenshot('staff.series_export_exercises_chosen.png', {
      pointToSelectors: ['#next_step'],
    });
    await wizard.click('#next_step');
    await wizard.scrollToBottom();
    await wizard.screenshot('staff.series_export_options.png');
    await wizard.screenshot('staff.series_export_start.png', {
      pointToSelectors: ['button[form="download_submissions"]'],
    });
    await wizard.click('button[form="download_submissions"]');
    await wait(1500);
    await wizard.removeBlockedElements();
    await wizard.screenshot('staff.series_export_started.png');
  }
  console.log(series_urls);

  // =========================================================
  // STUDENT
  // =========================================================

  await wizard.navigate('/nl/users/3/token/student');
  console.log('homepage');

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(`http://dodona.localhost:3000/?locale=${language}`, false);

    await wizard.screenshot(`student.explore_courses.png`, {
      pointToSelectors: [`a[href$="/${language}/courses/"]`],
    });

    await wizard.click('li.dropdown', elem => !!elem.querySelector('a[href*="/sign_out/"]'));

    await wizard.screenshot(`student.user_menu_my_profile.png`, {
      pointToSelectors: [`li.dropdown ul.dropdown-menu a[href$="/${language}/users/3/"]`],
    });

    await wizard.screenshot(`student.sign_out.png`, {
      pointToSelectors: ['a[href*="/sign_out/"]'],
    });
  }

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(`${language}/users/3/`);
    await wizard.screenshot(`student.edit_profile.png`, {
      pointToSelectors: [`a[href$="/${language}/users/3/edit/"]`],
    });

    await wizard.navigate(`${language}/users/3/edit/`);
    await wizard.screenshot(`student.edit_timezone.png`, {
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
    await wizard.screenshot(`student.wrong_timezone.png`);
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
    await wizard.navigate(`${language}/courses/`);
    await wizard.screenshot(`student.courses.png`);

    await wizard.navigate(`${course_urls.OPEN[language]}`, false);
    await wizard.screenshot(`student.course.png`);

    await wizard.screenshot(`student.breadcrumb_course.png`, {
      pointToSelectors: ['div.crumb a[href="#"]'],
    });

    await wizard.screenshot(`register.png`, {
      cropSelector: ['div.col-sm-6.col-xs-12'],
      cropPredicate: (elem) => !!elem.querySelector('div.callout'),
    });

    await wizard.navigate(course_urls.HIDDEN[language], false);
    await wizard.screenshot(`student.hidden_course_unregistered_denied_message.png`);

    await wizard.navigate(course_urls.HIDDEN_REGISTRATION[language], false);
    await wizard.screenshot(`student.hidden_course_unregistered_link_message.png`);

    await wizard.navigate(series_urls[language]['hidden'], false);
    await wizard.screenshot(`student.hidden_series_denied_message.png`)
  }

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(`${course_urls.OPEN[language]}subscribe`, false);

    await wizard.navigate(course_urls.OPEN[language], false);
    await wizard.screenshot(`student.unregister.png`, {
      pointToSelectors: ['form[action$="/unsubscribe/"] input[type="submit"]'],
    });

    await wizard.navigate(course_urls.MODERATED[language], false);
    await wizard.screenshot(`moderated_register.png`, {
      cropSelector: ['div.col-sm-6.col-xs-12'],
      cropPredicate: elem => !!elem.querySelector('div.callout'),
    });
  }

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(`${course_urls.MODERATED[language]}subscribe/`, false);

    await wizard.navigate(course_urls.MODERATED[language], false);
    await wizard.screenshot(`moderated_waiting.png`, {
      cropSelector: ['div.col-sm-6.col-xs-12'],
      cropPredicate: elem => !!elem.querySelector('div.callout'),
    });

    await wizard.navigate(`${language}/courses/5/`);
    await wizard.screenshot(`closed_registration.png`, {
      cropSelector: ['div.col-sm-6.col-xs-12'],
      cropPredicate: elem => !!elem.querySelector('div.callout'),
    });

    await wizard.navigate(`?locale=${language}`);
    await wizard.screenshot(`student.homepage_after_registration.png`);
  }

  console.log('exercises');
  const exerciseNamesToIDs = {
    nl: {},
    en: {},
  };

  for (const language of LANGUAGES) {
    await wizard.navigate(course_urls.OPEN[language], false);
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
    }, course_urls.OPEN[language].replace('http://dodona.localhost:3000', ''));
  }

  // Number of submissions on a freshly seeded database.
  let first_submission = submissions + 1;
  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(course_urls.OPEN[language]);
    await wizard.scrollTo(`a[href*="/activities/${exerciseNamesToIDs[language]['Echo']}/"]`)
    await wizard.screenshot(`student.course_exercise_selection.png`, {
      pointToSelectors: [`a[href*="/activities/${exerciseNamesToIDs[language]['Echo']}/"]`],
    });

    await wizard.click(`a[href*="/activities/${exerciseNamesToIDs[language]['Echo']}/"]`);
    await wait(500); // MathJax takes a while to initialize
    await wizard.removeBlockedElements()
    await wizard.screenshot(`student.exercise_start.png`);

    await wizard.screenshot(`student.exercise_crumbs.png`, {
      pointToSelectors: ['.crumb a']
    });

    await wizard.scrollToBottom();
    await enterPythonFile(wizard, `./solutions/Echo.correct.py`);

    await wizard.screenshot(`student.exercise_before_submit.png`, {
      pointToSelectors: ['#editor-process-btn'],
    });

    await wizard.click('#editor-process-btn');
    await wait(20000);
    submissions++;

    await wizard.screenshot(`student.exercise_feedback_correct_tab.png`);

    await wizard.click('a#activity-submission-link');
    await wait(1000);

    await wizard.screenshot(`student.exercise_submissions_tab.png`, {
      pointToSelectors: ['a#activity-submission-link'],
    });

    await wizard.navigate(`http://dodona.localhost:3000/${language}/submissions/${submissions}/`, false);
    await wizard.screenshot(`student.exercise_feedback_correct_page.png`);

    // TODO: Add curling exercise to repo for fancy feedback screenshot. 
    // await wizard.navigate(`${course_urls.OPEN[language]}/exercises/${exerciseNamesToIDs[language]['Curling']}/`);
    // await enterPythonFile(wizard, `./solutions/Curling.incorrect.${language}.py`);
    await wizard.navigate(`${course_urls.OPEN[language]}/exercises/${exerciseNamesToIDs[language]['Echo']}/`);
    await enterPythonFile(wizard, `./solutions/Echo.incorrect.py`);

    await wizard.click('#editor-process-btn');
    await wait(20000);
    submissions++;

    await wizard.screenshot(`student.exercise_feedback_incorrect_tab.png`);

    // await wizard.click('a[href="#score-1"]');
    // await wait(500);
    // await wizard.screenshot(`student.exercise_feedback_visual.png`);

    await wizard.navigate(`?locale=${language}`);
    await wizard.screenshot(`student.course_submissions.png`, {
      pointToSelectors: [`div.course a.card-title-link[href*="/submissions/"]`],
    });

    await wizard.screenshot(`student.exercise_all_submissions_page.png`, {
      pointToSelectors: [`a[href$="/activities/${exerciseNamesToIDs[language]['Echo']}/submissions/"]`],
    });

    await wizard.click('li.dropdown', elem => !!elem.querySelector('a[href*="/sign_out/"]'));
    await wizard.screenshot(`student.all_submissions_link.png`, {
      pointToSelectors: [`a[href^="/${language}/submissions/"]`],
    });

    await wizard.navigate(`/${language}/submissions/`);
    await wizard.screenshot(`student.all_submissions.png`);

    await wizard.screenshot(`student.submissions_to_exercise_feedback.png`, {
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
    await wizard.screenshot(`student.exercise_lint_error.png`);

    await wizard.navigate(course_urls.OPEN[language], false);
    await wizard.screenshot(`student.deadline_series_warning.png`);
  }

  wizard.setLanguage('');
  await wizard.navigate('/nl/submissions');
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

  await wizard.screenshot('submission_icons/correct.png', {
    cropSelector: '.mdi-check'
  });
  await wizard.screenshot('submission_icons/wrong.png', {
    cropSelector: '.mdi-close'
  });
  await wizard.screenshot('submission_icons/time_limit_exceeded.png', {
    cropSelector: '.mdi-alarm'
  });
  await wizard.screenshot('submission_icons/running.png', {
    cropSelector: '.mdi-timer-sand-empty'
  });
  await wizard.screenshot('submission_icons/queued.png', {
    cropSelector: '.mdi-timer-sand-empty'
  });
  await wizard.screenshot('submission_icons/runtime_error.png', {
    cropSelector: '.mdi-flash'
  });
  await wizard.screenshot('submission_icons/compilation_error.png', {
    cropSelector: '.mdi-flash-circle'
  });
  await wizard.screenshot('submission_icons/memory_limit_exceeded.png', {
    cropSelector: '.mdi-memory'
  });
  await wizard.screenshot('submission_icons/output_limit_exceeded.png', {
    cropSelector: '.mdi-script-text'
  });
  await wizard.screenshot('submission_icons/internal_error.png', {
    cropSelector: '.mdi-alert'
  });

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

  await wizard.screenshot('course_exercise_status_icons/wrong.png', {
    cropSelector: '.mdi-close'
  });

  await wizard.screenshot('course_exercise_status_icons/after_deadline.png', {
    cropSelector: '.mdi-alarm-off'
  });

  await wizard.screenshot('course_exercise_status_icons/before_deadline.png', {
    cropSelector: '.mdi-alarm-check'
  });

  await wizard.screenshot('course_exercise_status_icons/correct.png', {
    cropSelector: '.mdi-check'
  });

  await wizard.navigate('users/2/token/staff')
  
  const titles = {
    en: "Wrong",
    nl: "Fout"
  }

  for (const language of LANGUAGES) {
    wizard.setLanguage(language);
    await wizard.navigate(`${series_urls[language]['open']}scoresheet/`, false);

    await wizard.screenshot(`staff.scoresheet.png`);

    await wizard.screenshot(`staff.scoresheet_user_link.png`, {
      pointToSelectors: ['a[href$="/members/3/"]'],
    });

    await wizard.screenshot(`staff.scoresheet_status_icon.png`, {
      pointToSelectors: [`a[href^="/${language}/submission"] i.mdi-close`],
    });

    // This does the same as clicking on the icon representing the
    // submission status in the scoresheet of a series.
    let elem = await wizard.page.$(`a[title="${titles[language]}"]`);
    let href = (await (await elem.getProperty("href")).jsonValue());
    await wizard.navigate(href, false);
    await wait(1000);

    await wizard.screenshot(`staff.feedback_evaluate.png`, {
      pointToSelectors: [`a[href$="/evaluate/"]`],
    });

    await wizard.navigate(`${course_urls.OPEN[language]}activities/${exerciseNamesToIDs[language]['Echo']}/submissions/`, false);
    await wait(1000);
    await wizard.typeIn(`input#filter-query`, 'j');
    await wizard.screenshot(`staff.exercise_submissions_search.png`);
    await wizard.screenshot(`staff.exercise_submissions_user_link.png`, {
      pointToSelectors: [`a[href$="/members/3/"]`],
      pointMulti: false
    });
  }
  

  await wizard.close();

  // We manually exit because the navigation after cloning leaves behind an unresolved promise.
  process.exit(0);
})();
