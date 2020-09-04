"use strict";
/*const puppeteer = require('puppeteer');
const Jimp = require('jimp');
const fs = require('fs');
const process = require('process');
const readline = require('readline');
const path = require('path');
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const jimp_1 = __importDefault(require("jimp"));
const fs_1 = __importDefault(require("fs"));
const process_1 = __importDefault(require("process"));
const readline_1 = __importDefault(require("readline"));
const path_1 = __importDefault(require("path"));
const BASE_URL = 'http://dodona.localhost:3000/';
const IMAGE_FOLDER_PATH = '../';
// Student paths
const STUDENT_GUIDES_PATH = 'guides/for-students/';
const LOGIN_AND_SETTINGS_PATH = path_1.default.join(STUDENT_GUIDES_PATH, 'login-and-settings/');
const COURSES_PATH = path_1.default.join(STUDENT_GUIDES_PATH, 'courses/');
const EXERCISES_PATH = path_1.default.join(STUDENT_GUIDES_PATH, 'exercises/');
// Teacher/Staff paths
const COURSE_MANAGEMENT_PATH = 'guides/course-management/';
const CREATING_A_COURSE_PATH = `guides/creating-a-course/`;
const EXERCISE_SERIES_MANAGEMENT_PATH = `guides/exercise-series-management/`;
const USER_MANAGEMENT_PATH = 'guides/user-management/';
const IMAGE_FILE_EXTENSION = 'png';
const SEEDED_COURSE_URL = (language) => path_1.default.join(BASE_URL, language, '/courses/5/');
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
        this.path = path;
        this.toDrawOn = null;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            this.toDrawOn = yield jimp_1.default.read(this.path);
            return this;
        });
    }
    drawArrow(x, y, mirror = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let arrow = yield jimp_1.default.read('./arrow.png');
            let dx = -90;
            if (mirror) {
                arrow = arrow.flip(true, false);
                dx = 45;
            }
            if (this.toDrawOn) {
                yield this.toDrawOn.composite(arrow, x + dx, y);
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.toDrawOn) {
                yield this.toDrawOn.write(this.path);
            }
        });
    }
}
const DEFAULT_PREDICATE = () => true;
const DEFAULT_OPTIONS = {
    pointToSelectors: [],
    pointPredicate: DEFAULT_PREDICATE,
    pointMulti: true,
    pointPredicateArg: null,
    cropSelector: '',
    cropPredicate: DEFAULT_PREDICATE,
    cropPredicateArg: null,
    mirror: false,
};
class Wizard {
    constructor(baseUrl, imageFolder, fileExtension) {
        this.browser = null;
        this.page = null;
        this.elementsToBlock = [];
        this.baseUrl = baseUrl;
        this.imageFolder = imageFolder;
        this.language = '';
        this.fileExtension = fileExtension;
    }
    setLanguage(language) {
        this.language = language;
        return this;
    }
    launch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer_1.default.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            this.page = yield this.browser.newPage();
            yield this.page.setViewport({
                width: 1280,
                height: 720
            });
            return this;
        });
    }
    blockElement(selector, predicate = DEFAULT_PREDICATE) {
        this.elementsToBlock.push({
            selector,
            predicate: predicate,
        });
        return this;
    }
    click(selector, predicate = DEFAULT_PREDICATE, predicateArg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                const elements = yield this.page.$$(selector);
                let found = false;
                for (const element of elements) {
                    if (yield this.page.evaluate(predicate, element, predicateArg)) {
                        yield element.click();
                        yield wait(1000);
                        return;
                    }
                }
                console.warn(`The given click selector did not match anything on the page: ${selector}`);
            }
        });
    }
    clickAndNavigate(selector, predicate, predicateArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.click(selector, predicate, predicateArg);
            yield wait(1000);
            yield this.removeBlockedElements();
        });
    }
    removeBlockedElements() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                for (const toBlock of this.elementsToBlock) {
                    for (const element of yield this.page.$$(toBlock.selector)) {
                        if (yield this.page.evaluate(toBlock.predicate, element)) {
                            yield this.page.evaluate((elem) => {
                                elem.remove();
                            }, element);
                        }
                    }
                }
            }
        });
    }
    navigate(url, useBase = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                useBase = useBase && !url.startsWith('http'); // in case you forget the useBase flag while giving a valid url
                const finalUrl = useBase ? this.baseUrl + url : url;
                yield this.page.goto(finalUrl);
                yield wait(1500);
                yield this.removeBlockedElements();
                yield wait(1000);
            }
        });
    }
    scrollTo(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                const element = yield this.page.$(selector);
                if (element === null) {
                    console.warn(`The selector for the element to scroll to did not match any elements: ${selector}`);
                }
                else {
                    yield this.page.evaluate((elem) => elem.scrollIntoViewIfNeeded(), element);
                }
            }
        });
    }
    scrollToBottom() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                yield this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            }
        });
    }
    screenshot(savePath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                const screenshotOptions = Object.assign(DEFAULT_OPTIONS, options);
                const locations = [];
                for (const selector of screenshotOptions.pointToSelectors) {
                    let used = false;
                    for (const element of yield this.page.$$(selector)) {
                        if (yield this.page.evaluate(screenshotOptions.pointPredicate, element, screenshotOptions.pointPredicateArg)) {
                            const boxModel = yield element.boxModel();
                            // Make sure element is visible
                            if (boxModel !== null) {
                                locations.push(boxModel.content);
                                used = true;
                                if (!screenshotOptions.pointMulti) {
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
                let found = 0;
                if (screenshotOptions.cropSelector) {
                    for (const element of yield this.page.$$(screenshotOptions.cropSelector)) {
                        if (yield this.page.evaluate(screenshotOptions.cropPredicate, element, screenshotOptions.cropPredicateArg)) {
                            const box = yield element.boxModel();
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
                        console.warn(`UNUSED CROP SELECTOR: ${screenshotOptions.cropSelector}`);
                    }
                    else if (found > 1) {
                        console.warn(`CROP SELECTOR OCCURED ${found} TIMES: ${screenshotOptions.cropSelector}`);
                    }
                }
                // If no language is given save for both languages
                const languageFolder = this.language ? `${this.language}/` : '';
                const fileEnd = savePath.endsWith(this.fileExtension) ? '' : `.${this.fileExtension}`;
                const imagePath = path_1.default.join(this.imageFolder, languageFolder, savePath) + fileEnd;
                yield this.page.screenshot({
                    path: imagePath,
                    clip
                });
                yield wait(1000);
                const image = yield new Image(imagePath).load();
                for (const location of locations) {
                    yield image.drawArrow(location[3].x, location[3].y, screenshotOptions.mirror);
                }
                yield image.close();
            }
        });
    }
    getNested(selectors) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                let foundElement;
                for (let element of yield this.page.$$(selectors[0])) {
                    foundElement = element;
                    let i = 1;
                    while (foundElement !== null && i < selectors.length) {
                        foundElement = yield foundElement.$(selectors[i]);
                        i++;
                    }
                    if (foundElement) {
                        return foundElement;
                    }
                }
                console.warn(`Following selectors did not yield a valid element: ${selectors.join(', ')}`);
            }
            return null;
        });
    }
    press(selector, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                const element = yield this.page.$(selector);
                if (element) {
                    yield element.press(key);
                }
                else {
                    console.warn(`Selector for pressing did not match any element: ${selector}`);
                }
            }
        });
    }
    select(selector, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                yield this.page.select(selector, value);
            }
        });
    }
    typeIn(selector, text) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                yield this.page.type(selector, text);
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.browser) {
                yield this.browser.close();
                this.browser = null;
                this.page = null;
            }
        });
    }
    waitForNavigation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.page) {
                yield this.page.waitForNavigation({ timeout: 240000 });
                yield this.removeBlockedElements();
            }
        });
    }
    enterPythonFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = fs_1.default.readFileSync(filename, 'utf8');
            let prevIndent = 0;
            for (const line of content.split('\n')) {
                const indent = line.split('    ').length - 1;
                for (let i = 0; i < Math.max(indent, prevIndent); i++) {
                    yield this.press('textarea.ace_text-input', 'Backspace');
                }
                prevIndent = indent;
                yield this.typeIn('textarea.ace_text-input', `${line}\n`);
            }
        });
    }
}
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(r => setTimeout(r, ms));
    });
}
function read_submissions() {
    return __awaiter(this, void 0, void 0, function* () {
        const rl = readline_1.default.createInterface({
            input: process_1.default.stdin,
            output: process_1.default.stdout,
            prompt: 'To continue type the total number of submissions in the database: '
        });
        rl.prompt();
        return new Promise((resolve, _reject) => {
            rl.on('line', (line) => {
                const submissions = parseInt(line.trim());
                rl.close();
                return resolve(submissions);
            });
        });
    });
}
;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Make sure Dodona is running locally on ${BASE_URL} with a clean database
  and the production stylesheet and that the user is logged in by default (as admin).\n`);
        let submissions = yield read_submissions();
        console.log(`Number of submissions: ${submissions}`);
        const wizard = yield new Wizard(BASE_URL, IMAGE_FOLDER_PATH, IMAGE_FILE_EXTENSION).launch();
        if (wizard.page !== null) {
            yield wizard.navigate('?pp=disable'); // disable Rack::MiniProfiler as not relevant for screenshots
            wizard.blockElement('footer.footer'); // footer is always the same and not relevant either
            wizard.blockElement('div.profiler-results'); // to remove the profiler from the exercise descriptions
            // =========================================================
            // SIGNED OUT
            // =========================================================
            console.log('signed out pages');
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                yield wizard.navigate(language);
                yield wizard.screenshot(path_1.default.join(LOGIN_AND_SETTINGS_PATH, 'login'), {
                    pointToSelectors: [`a[href$="/${language}/sign_in/"]`]
                });
                yield wizard.click('a[data-toggle="dropdown"]');
                yield wait(500);
                yield wizard.screenshot(path_1.default.join(LOGIN_AND_SETTINGS_PATH, 'choose_language'), {
                    pointToSelectors: ['ul.dropdown-menu']
                });
                yield wizard.navigate(path_1.default.join(language, 'sign_in'));
                yield wizard.screenshot(path_1.default.join(LOGIN_AND_SETTINGS_PATH, 'sign_in'));
                yield wizard.navigate(path_1.default.join(language, 'contact'));
                yield wizard.screenshot(path_1.default.join(STUDENT_GUIDES_PATH, 'contact'));
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
            yield wizard.navigate('users/2/token/staff');
            const course_urls = {
                OPEN: {},
                HIDDEN: {},
                HIDDEN_REGISTRATION: {},
                MODERATED: {}
            };
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                yield wizard.navigate(path_1.default.join(language, '/courses?page=1'));
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'staff.courses_new_link'), {
                    pointToSelectors: [`a[href$="/${language}/courses/new/"]`],
                });
                yield wizard.navigate(path_1.default.join(language, 'courses/new/'));
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'staff.course_new_options'));
                yield wizard.click('#new-course');
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'staff.course_new_empty'));
                yield wizard.typeIn('input#course_name', TRANSLATIONS[language]['HIDDEN_COURSE_NAME_INPUT']);
                yield wizard.typeIn('input#course_teacher', TRANSLATIONS[language]['COURSE_TEACHER']);
                yield wizard.typeIn('textarea#course_description', TRANSLATIONS[language]['HIDDEN_COURSE_DESCRIPTION_INPUT']);
                yield wizard.click('#course_visibility_hidden');
                yield wizard.clickAndNavigate(`button[form="new_course"]`);
                yield wait(3000);
                course_urls.HIDDEN[language] = wizard.page.target().url();
                yield wizard.navigate(path_1.default.join(course_urls.HIDDEN[language], '/edit'), false);
                course_urls.HIDDEN_REGISTRATION[language] = (yield wizard.page.evaluate(() => document.querySelector('#hidden_show_link').getAttribute('value'))) || '';
                yield wizard.click('button[data-clipboard-target="#hidden_show_link"]'); // scroll it into view by clicking it
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'staff.course_hidden_registration_link'), {
                    pointToSelectors: ['button[data-clipboard-target="#hidden_show_link"]'],
                });
                yield wizard.screenshot(path_1.default.join(COURSE_MANAGEMENT_PATH, 'staff.course_hidden_registration_link_renew'), {
                    pointToSelectors: [`a[href$="/reset_token/"]`],
                });
                yield wizard.navigate(path_1.default.join(language, '/courses/new/'));
                yield wizard.click('#copy-course');
                yield wait(1000);
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'staff.course_new_copy_course_options'), {
                    pointToSelectors: ['tr.copy-course-row'],
                    pointMulti: false,
                });
                yield wizard.click('tr.copy-course-row');
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'staff.course_new_copy'));
                yield wizard.typeIn('input#course_name', TRANSLATIONS[language]['MODERATED_COURSE_NAME_INPUT']);
                yield wizard.typeIn('input#course_teacher', TRANSLATIONS[language]['COURSE_TEACHER']);
                yield wizard.typeIn('textarea#course_description', TRANSLATIONS[language]['MODERATED_COURSE_DESCRIPTION_INPUT']);
                yield wizard.click('#course_visibility_visible_for_all');
                yield wizard.click('#course_moderated_true');
                yield wizard.clickAndNavigate(`button[form="new_course"]`);
                course_urls.MODERATED[language] = wizard.page.target().url();
                yield wizard.navigate(path_1.default.join(language, '/courses/new'));
                yield wizard.click('#new-course');
                yield wizard.typeIn('input#course_name', TRANSLATIONS[language]['OPEN_COURSE_NAME_INPUT']);
                yield wizard.typeIn('input#course_teacher', TRANSLATIONS[language]['COURSE_TEACHER']);
                yield wizard.typeIn('textarea#course_description', TRANSLATIONS[language]['OPEN_COURSE_DESCRIPTION_INPUT']);
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'staff.course_new_submit'), {
                    pointToSelectors: [`button[form="new_course"]`]
                });
                yield wizard.clickAndNavigate(`button[form="new_course"]`);
                course_urls.OPEN[language] = wizard.page.target().url();
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'staff.course_created'));
                yield wizard.navigate(course_urls.HIDDEN[language], false);
                yield wizard.screenshot(path_1.default.join(COURSE_MANAGEMENT_PATH, 'staff.course_edit_button'), {
                    pointToSelectors: ['a[href$="/edit/"]'],
                });
                yield wizard.screenshot(path_1.default.join(COURSE_MANAGEMENT_PATH, 'staff.course_submissions_link'), {
                    // duplicate invisible element so had to be really specifici
                    pointToSelectors: ['div.center > div > ul > li > a > i.submissions'],
                });
                yield wizard.navigate(path_1.default.join(course_urls.OPEN[language], 'edit/'), false);
                yield wizard.screenshot(path_1.default.join(COURSE_MANAGEMENT_PATH, 'staff.course_edit_cancel'), {
                    pointToSelectors: [`a[href$="${course_urls.OPEN[language].replace(language + '/', '').replace(wizard.baseUrl, '')}"]`],
                });
                yield wizard.scrollToBottom();
                yield wizard.clickAndNavigate(`button[form*="edit_course"]`);
                yield wizard.screenshot(path_1.default.join(COURSE_MANAGEMENT_PATH, 'staff.course_after_edit'));
                // course members page
                yield wizard.navigate(path_1.default.join(SEEDED_COURSE_URL(language), 'members'), false);
                yield wizard.screenshot(path_1.default.join(USER_MANAGEMENT_PATH, 'staff.course_users_admin'), {
                    pointToSelectors: ['i.mdi-school'],
                    pointMulti: false,
                });
                yield wizard.page.$$(`a.ellipsis-overflow[href^="/${language}/courses"]`).then(elements => elements[2].click());
                yield wait(10000); // Wait for graphs
                yield wizard.screenshot(path_1.default.join(USER_MANAGEMENT_PATH, 'staff.user_course_overview'));
                // course submissions page
                yield wizard.navigate(path_1.default.join(SEEDED_COURSE_URL(language), 'submissions'), false);
                yield wizard.screenshot(path_1.default.join(COURSE_MANAGEMENT_PATH, 'staff.course_submissions_filter'), {
                    pointToSelectors: ['i.mdi-filter-outline'],
                    pointMulti: false,
                });
                yield wizard.click('i.mdi-filter-outline');
                yield wait(500);
                yield wizard.screenshot(path_1.default.join(COURSE_MANAGEMENT_PATH, 'staff.course_submissions_filtered'));
                yield wizard.navigate(path_1.default.join(language, 'courses'));
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'staff.course_hidden'), {
                    pointToSelectors: ['i.mdi-eye-off-outline'],
                    pointMulti: false,
                });
            }
            console.log(course_urls);
            wizard.setLanguage(''); // icons are language independent
            yield wizard.page.evaluate(() => {
                document.querySelector('body').innerHTML =
                    ['mdi-school mdi-icons-strikethrough', 'mdi-school', 'mdi-account-plus', 'mdi-delete', 'mdi-check']
                        .map(icon => `<p><i class="mdi ${icon} mdi-18"></i></p>`)
                        .join('');
            });
            const REGISTRATION_ICONS = [
                ['make_course_admin', 'i.mdi-school:not(.mdi-icons-strikethrough)'], ['make_student', 'i.mdi-school.mdi-icons-strikethrough'],
                ['register', 'i.mdi-account-plus'], ['unregister', 'i.mdi-delete'], ['approve', 'i.mdi-check'], ['decline', 'i.mdi-delete']
            ];
            for (const [image_name, cropSelector] of REGISTRATION_ICONS) {
                yield wizard.screenshot(path_1.default.join('images', 'staff_registration_icons', image_name), {
                    cropSelector: cropSelector,
                });
            }
            console.log(`staff user management`);
            const SEEDED_MODERATED_COURSE_URL = "/courses/3/";
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                yield wizard.navigate(path_1.default.join(language, SEEDED_MODERATED_COURSE_URL));
                yield wizard.screenshot(path_1.default.join(USER_MANAGEMENT_PATH, 'staff.course_users'), {
                    pointToSelectors: ['i.mdi.mdi-24.mdi-account-multiple']
                });
                yield wizard.navigate(path_1.default.join(language, SEEDED_MODERATED_COURSE_URL, 'members'));
                yield wizard.screenshot(path_1.default.join(USER_MANAGEMENT_PATH, 'staff.users'));
                yield wizard.screenshot(path_1.default.join(USER_MANAGEMENT_PATH, 'staff.users_edit_permissions'), {
                    pointMulti: false,
                    pointToSelectors: ['i.mdi-school.mdi-icons-strikethrough'],
                });
                yield wizard.typeIn(`input#filter-query-tokenfield`, 'Stijn');
                yield wait(2000);
                yield wizard.screenshot(path_1.default.join(USER_MANAGEMENT_PATH, 'staff.users_filtered'));
            }
            console.log('staff series');
            const series_urls = {
                nl: {},
                en: {}
            };
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                for (const series of SERIES[language]) {
                    yield wizard.navigate(path_1.default.join(course_urls.OPEN[language], 'series', 'new'), false);
                    yield wizard.typeIn(`input#series_name`, series.title);
                    yield wizard.select(`select#series_visibility`, series.visibility);
                    yield wizard.page.evaluate((deadline) => {
                        document.querySelector('input#series_deadline').setAttribute('value', deadline);
                    }, series.deadline);
                    yield wizard.click('button[form="new_series"]');
                    yield wait(2000);
                    series_urls[language][series.visibility] = yield wizard.page.target().url().replace('edit/', '');
                    yield wait(1000);
                    for (const exercise of series.exercises) {
                        yield wizard.page.evaluate(() => document.querySelector('#filter-query-tokenfield').setAttribute('value', ''));
                        yield wizard.typeIn('#filter-query-tokenfield', exercise);
                        yield wait(2000);
                        yield wizard.click('a.add-activity');
                    }
                    yield wizard.click('button[form^="edit_series_"]');
                    yield wait(2000);
                }
                wizard.setLanguage(language);
                // manage series
                yield wizard.navigate(SEEDED_COURSE_URL(language), false);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.course_manage_series_button'), {
                    pointToSelectors: [`a[href$="/manage_series/"]`],
                });
                // open manage series menu
                yield wizard.getNested(['div.card-subtitle-actions', 'a']).then(elem => elem.click());
                yield wait(1000);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_actions_menu'));
                // start evaluation
                yield wizard.clickAndNavigate(`a[href^="/${language}/evaluations/new"]`);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate'));
                yield wizard.clickAndNavigate('button[form="new_evaluation"]');
                // select users and go to real evaluation
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_select_users'), {
                    pointToSelectors: ['a[href$="type=submitted"] > div.button.btn-text'],
                });
                yield wizard.clickAndNavigate('a[href$="type=submitted"]');
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_start'), {
                    pointToSelectors: ['a.btn-primary']
                });
                yield wizard.clickAndNavigate('a.btn-primary');
                const evaluation_url = wizard.page.target().url();
                //release feedback button performs a patch
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_release_feedback'), {
                    pointToSelectors: ['a[data-method="patch"]']
                });
                yield wizard.scrollTo('i.mdi-comment-outline');
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_detail_overview'));
                // give feedback to a user
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_goto_give_feedback'), {
                    pointToSelectors: ['i.mdi-comment-outline'],
                    pointMulti: false,
                });
                yield wizard.clickAndNavigate('a', el => !!el.querySelector('i.mdi-comment-outline'));
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_give_feedback'));
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_feedback_row'), {
                    pointToSelectors: ['div.user-feedback-row'],
                    pointPredicate: (elem) => !!elem.querySelector('i[class^="mdi mdi-comment"]'),
                });
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_return'), {
                    pointToSelectors: [`a[href$="${evaluation_url.replace(wizard.baseUrl, '')}"]`]
                });
                yield wizard.navigate(SEEDED_COURSE_URL(language), false);
                // open manage series menu
                yield wizard.getNested(['div.card-subtitle-actions', 'a']).then(elem => elem.click());
                yield wait(500);
                // menu action should have changed
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_actions_check_evaluation'), {
                    pointMulti: false,
                    pointToSelectors: ['i.mdi-message-draw'],
                });
                yield wait(3000);
                yield wizard.navigate(evaluation_url, false);
                yield wait(2000);
                yield wizard.click('a', elem => !!elem.querySelector('i.mdi-dots-vertical'));
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_evaluate_delete'), {
                    pointToSelectors: [`a[data-method="delete"][href^="/${language}/evaluations/"]`],
                });
                const deleteButtonSelector = `a[data-method="delete"][href^="/${language}/evaluations/"]`;
                // prevent page confirmation prompt to block deletion
                yield wizard.page.evaluate((element) => element.setAttribute('data-confirm', ''), yield wizard.page.$(deleteButtonSelector));
                yield wizard.click(deleteButtonSelector);
                // give time to perform deletion and navigation
                yield wait(3000);
                yield wizard.navigate(course_urls.OPEN[language], false);
                yield wizard.scrollToBottom();
                yield wait(1000);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.course_series_info_message'), {
                    pointToSelectors: [`div.alert.alert-info.hidden-print`]
                });
                yield wizard.navigate(path_1.default.join(course_urls.OPEN[language], 'manage_series'), false);
                yield wizard.screenshot('staff.course_manage_series_page.png');
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.course_new_series_button'), {
                    pointToSelectors: ['a[href$="/series/new/"]'],
                });
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_delete'), {
                    pointToSelectors: ['i.mdi-delete'],
                    pointMulti: false,
                });
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_edit'), {
                    pointToSelectors: ['a[href*="series"] > i.mdi-pencil'],
                    pointMulti: false,
                });
                yield wizard.navigate(path_1.default.join(series_urls[language]['hidden'], 'edit'), false);
                yield wizard.scrollTo(`#access_token`);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_hidden_link'), {
                    pointToSelectors: ['#access_token'],
                });
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_hidden_link_reset'), {
                    pointToSelectors: ['a[href$="/reset_token/?type=access_token"]'],
                });
                yield wizard.navigate(path_1.default.join(series_urls[language]['open'], 'edit'), false);
                yield wizard.scrollTo('input#filter-query-tokenfield');
                yield wait(1000);
                yield wizard.typeIn('input#filter-query-tokenfield', 'Echo Java');
                yield wait(500);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_add_exercise'), {
                    pointToSelectors: [`a.add-activity`],
                    pointMulti: false,
                });
                yield wait(300);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_remove_exercise'), {
                    pointToSelectors: [`a.remove-activity`],
                    pointMulti: false,
                });
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_move_exercise'), {
                    pointToSelectors: ['div.drag-handle'],
                    mirror: true,
                    pointMulti: false,
                });
                yield wizard.navigate(path_1.default.join(course_urls.OPEN[language], 'series', 'new'), false);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_new'));
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_new_submit'), {
                    pointToSelectors: [`button[form="new_series"]`],
                });
                yield wizard.click('button.btn-default[data-toggle]');
                yield wait(200);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_calendar_open'), {
                    pointToSelectors: ['button.btn-default[data-toggle]'],
                });
                yield wizard.click('span.flatpickr-day.today');
                yield wait(200);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_calendar_clear'), {
                    pointToSelectors: [`i.mdi-close`],
                });
                yield wizard.navigate(path_1.default.join(series_urls[language]['open'], 'edit'), false);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_edit_submit'), {
                    pointToSelectors: [`button[form^="edit_series_"]`]
                });
                // series export
                yield wizard.navigate(SEEDED_COURSE_URL(language), false);
                yield wizard.getNested(['div.card-subtitle-actions', 'a']).then(elem => elem.click());
                yield wait(1000);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_export_action'), {
                    pointToSelectors: [`a[href^="/${language}/exports/series"]`],
                });
                yield wizard.clickAndNavigate(`a[href^="/${language}/exports/series"]`);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_export_exercise_choice'));
                yield wizard.click('#check-all');
                yield wizard.click('#next_step');
                yield wizard.scrollToBottom();
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_export_options'));
                yield wizard.clickAndNavigate('button[form="download_submissions"]');
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.series_export_started'));
            }
            console.log(series_urls);
            // =========================================================
            // STUDENT
            // =========================================================
            yield wizard.navigate('users/3/token/student');
            console.log('homepage');
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                yield wizard.navigate(`?locale=${language}`);
                yield wizard.screenshot(path_1.default.join(COURSES_PATH, 'student.explore_courses'), {
                    pointToSelectors: [`a[href$="/${language}/courses/"]`],
                });
                yield wizard.click('li.dropdown', elem => !!elem.querySelector('a[href*="/sign_out/"]'));
                yield wizard.screenshot(path_1.default.join(LOGIN_AND_SETTINGS_PATH, 'student.user_menu_my_profile'), {
                    pointToSelectors: [`li.dropdown ul.dropdown-menu a[href$="/${language}/users/3/"]`],
                });
                yield wizard.navigate(`${language}/users/3/`);
                yield wizard.screenshot(path_1.default.join(LOGIN_AND_SETTINGS_PATH, 'student.edit_profile'), {
                    pointToSelectors: [`a[href$="/${language}/users/3/edit/"]`],
                });
                yield wizard.navigate(`${language}/users/3/edit/`);
                yield wizard.screenshot(path_1.default.join(LOGIN_AND_SETTINGS_PATH, 'student.edit_timezone'), {
                    pointToSelectors: ['select#user_time_zone']
                });
            }
            // Set the wrong timezone
            yield wizard.navigate(`nl/users/3/edit/`);
            yield wizard.page.evaluate(() => document.querySelector('select#user_time_zone').setAttribute('value', 'Seoul'));
            yield wizard.click('button.btn-primary[form*="edit_user_"]');
            yield wait(200);
            yield wizard.navigate('?locale=nl');
            // Screenshot the wrong timezone warning
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                yield wizard.navigate(`?locale=${language}`);
                yield wizard.screenshot(path_1.default.join(LOGIN_AND_SETTINGS_PATH, 'student.wrong_timezone'));
            }
            // Set the right timezone to get rid of the warning without accidentally hiding other warnings.
            yield wizard.navigate(`nl/users/3/edit/`);
            yield wizard.page.evaluate(() => document.querySelector('select#user_time_zone').setAttribute('value', 'Brussels'));
            yield wizard.click('button.btn-primary[form*="edit_user_"]');
            yield wait(200);
            yield wizard.navigate('?locale=nl');
            console.log('courses');
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                yield wizard.navigate(path_1.default.join(language, 'courses'));
                yield wizard.screenshot(path_1.default.join(STUDENT_GUIDES_PATH, 'student.courses'));
                yield wizard.navigate(course_urls.OPEN[language], false);
                yield wizard.screenshot(path_1.default.join(COURSES_PATH, 'student.breadcrumb_course'), {
                    pointToSelectors: ['div.crumb a[href="#"]'],
                });
                yield wizard.screenshot(path_1.default.join(COURSES_PATH, 'register'), {
                    cropSelector: 'div.col-sm-6.col-xs-12',
                    cropPredicate: (elem) => !!elem.querySelector('div.callout'),
                });
                yield wizard.navigate(course_urls.HIDDEN[language], false);
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'student.hidden_course_unregistered_denied_message'));
                yield wizard.navigate(course_urls.HIDDEN_REGISTRATION[language], false);
                yield wizard.screenshot(path_1.default.join(CREATING_A_COURSE_PATH, 'student.hidden_course_unregistered_link_message'));
                yield wizard.navigate(`${course_urls.OPEN[language]}subscribe`, false);
                yield wizard.navigate(course_urls.OPEN[language], false);
                yield wizard.screenshot(path_1.default.join(COURSES_PATH, 'student.unregister'), {
                    pointToSelectors: ['form[action$="/unsubscribe/"] input[type="submit"]'],
                });
                yield wizard.navigate(course_urls.MODERATED[language], false);
                yield wizard.screenshot(path_1.default.join(COURSES_PATH, 'moderated_register'), {
                    cropSelector: 'div.col-sm-6.col-xs-12',
                    cropPredicate: (elem) => !!elem.querySelector('div.callout'),
                });
                // register for moderated course
                yield wizard.navigate(path_1.default.join(course_urls.MODERATED[language], 'subscribe'), false);
                yield wizard.navigate(course_urls.MODERATED[language], false);
                yield wizard.screenshot(path_1.default.join(COURSES_PATH, 'moderated_waiting'), {
                    cropSelector: 'div.col-sm-6.col-xs-12',
                    cropPredicate: (elem) => !!elem.querySelector('div.callout'),
                });
                yield wizard.navigate(path_1.default.join(language, 'courses/5/'));
                yield wizard.screenshot(path_1.default.join(COURSES_PATH, 'closed_registration'), {
                    cropSelector: 'div.col-sm-6.col-xs-12',
                    cropPredicate: (elem) => !!elem.querySelector('div.callout'),
                });
            }
            console.log('exercises');
            const exerciseNamesToIDs = {
                nl: {},
                en: {},
            };
            for (const language of LANGUAGES) {
                yield wizard.navigate(course_urls.OPEN[language], false);
                exerciseNamesToIDs[language] = yield wizard.page.evaluate((url) => {
                    const result = {};
                    const table = document.querySelector('div#series-listing');
                    if (table) {
                        const exercise_links = table.querySelectorAll('a[href*="/activities/"]');
                        exercise_links.forEach((link) => {
                            const href = link.getAttribute('href');
                            if (href.includes(`${url}series/`)) {
                                const parts = href.split('/').filter(s => s.length > 0);
                                result[link.textContent] = parts[parts.length - 1];
                            }
                        });
                    }
                    return result;
                }, course_urls.OPEN[language].replace(wizard.baseUrl, ''));
            }
            // Number of submissions on a freshly seeded database.
            let first_submission = submissions + 1;
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                yield wizard.navigate(course_urls.OPEN[language]);
                yield wizard.scrollTo(`a[href*="/activities/${exerciseNamesToIDs[language]['Echo']}/"]`);
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.course_exercise_selection'), {
                    pointToSelectors: [`a[href*="/activities/${exerciseNamesToIDs[language]['Echo']}/"]`],
                });
                yield wizard.clickAndNavigate(`a[href*="/activities/${exerciseNamesToIDs[language]['Echo']}/"]`);
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.exercise_start'));
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.exercise_crumbs'), {
                    pointToSelectors: ['.crumb a']
                });
                yield wizard.scrollToBottom();
                yield wizard.enterPythonFile(`./solutions/Echo.correct.py`);
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.exercise_before_submit'), {
                    pointToSelectors: ['#editor-process-btn'],
                });
                yield wizard.click('#editor-process-btn');
                yield wait(20000);
                submissions++;
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.exercise_feedback_correct_tab'));
                yield wizard.click('a#activity-submission-link');
                yield wait(1000);
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.exercise_submissions_tab'), {
                    pointToSelectors: ['a#activity-submission-link'],
                });
                yield wizard.navigate(path_1.default.join(language, 'submissions', submissions.toString()));
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.exercise_feedback_correct_page'));
                // TODO: Add curling exercise to repo for fancy feedback screenshot. 
                // await wizard.navigate(`${course_urls.OPEN[language]}/exercises/${exerciseNamesToIDs[language]['Curling']}/`);
                // await wizard.enterPythonFile(`./solutions/Curling.incorrect.${language}.py`);
                yield wizard.navigate(path_1.default.join(course_urls.OPEN[language], 'exercises', exerciseNamesToIDs[language]['Echo']));
                yield wizard.enterPythonFile(`./solutions/Echo.incorrect.py`);
                yield wizard.click('#editor-process-btn');
                yield wait(20000);
                submissions++;
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.exercise_feedback_incorrect_tab'));
                // await wizard.click('a[href="#score-1"]');
                // await wait(500);
                // await wizard.screenshot(`student.exercise_feedback_visual.png`);
                yield wizard.navigate(`?locale=${language}`);
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.course_submissions'), {
                    pointToSelectors: [`div.course a.card-title-link[href*="/submissions/"]`],
                });
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.exercise_all_submissions_page'), {
                    pointToSelectors: [`a[href$="/activities/${exerciseNamesToIDs[language]['Echo']}/submissions/"]`],
                });
                yield wizard.click('li.dropdown', elem => !!elem.querySelector('a[href*="/sign_out/"]'));
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.all_submissions_link'), {
                    pointToSelectors: [`a[href^="/${language}/submissions/"]`],
                });
                yield wizard.navigate(path_1.default.join(language, 'submissions'));
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.all_submissions'));
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.submissions_to_exercise_feedback'), {
                    pointToSelectors: [`a[href$="/submissions/${first_submission}/"]`],
                });
            }
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                yield wizard.navigate(`${course_urls.OPEN[language]}/exercises/${exerciseNamesToIDs[language]['Echo']}/`, false);
                yield wizard.scrollToBottom();
                yield wizard.enterPythonFile(`./solutions/Echo.lintingError.py`);
                yield wizard.click('#editor-process-btn');
                yield wait(20000);
                submissions++;
                yield wizard.click('a[href="#code-1"]');
                yield wait(500);
                yield wizard.scrollToBottom();
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.exercise_lint_error'));
                yield wizard.navigate(course_urls.OPEN[language], false);
                yield wizard.screenshot(path_1.default.join(EXERCISES_PATH, 'student.deadline_series_warning'));
            }
            // icons are language independent
            wizard.setLanguage('');
            yield wizard.page.evaluate(() => {
                document.querySelector('body').innerHTML =
                    [
                        'mdi mdi-check colored-correct',
                        'mdi mdi-close colored-wrong',
                        'mdi mdi-alarm colored-wrong',
                        'mdi mdi-timer-sand-empty colored-default',
                        'mdi mdi-flash colored-wrong',
                        'mdi mdi-flash-circle colored-wrong',
                        'mdi mdi-memory colored-wrong',
                        'mdi mdi-script-text colored-wrong',
                        'mdi mdi-alert colored-warning',
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
                yield wizard.screenshot(path_1.default.join('images', 'submission_icons', image_name), {
                    cropSelector: cropSelector,
                });
            }
            yield wizard.page.evaluate(() => {
                document.querySelector('body').innerHTML =
                    [
                        'mdi mdi-close colored-wrong',
                        'mdi mdi-alarm',
                        'mdi mdi-alarm-off colored-wrong',
                        'mdi mdi-alarm-check colored-correct',
                        'mdi mdi-check colored-correct' // correct
                    ]
                        .map(icon => `<p><i class="mdi ${icon} mdi-18"></i></p>`)
                        .join('');
            });
            const COURSE_EXERCISE_STATUS_ICONS = [
                ['wrong', '.mdi-close'], ['after_deadline', '.mdi-alarm-off'], ['before_deadline', '.mdi-alarm-check'], ['correct', '.mdi-check']
            ];
            for (const [image_name, cropSelector] of COURSE_EXERCISE_STATUS_ICONS) {
                yield wizard.screenshot(path_1.default.join('images', 'course_exercise_status_icons', image_name), {
                    cropSelector: cropSelector,
                });
            }
            const titles = {
                en: "Wrong",
                nl: "Fout"
            };
            yield wizard.navigate('users/2/token/staff');
            for (const language of LANGUAGES) {
                wizard.setLanguage(language);
                yield wizard.navigate(path_1.default.join(series_urls[language]['open'], 'scoresheet'), false);
                yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.scoresheet'));
                // This does the same as clicking on the icon representing the
                // submission status in the scoresheet of a series.
                const elem = yield wizard.page.$(`a[title="${titles[language]}"]`);
                if (elem) {
                    const href = (yield elem.getProperty("href").then(hrefProperty => hrefProperty.jsonValue()));
                    yield wizard.navigate(href.toString(), false);
                    yield wait(1000);
                    yield wizard.screenshot(path_1.default.join(EXERCISE_SERIES_MANAGEMENT_PATH, 'staff.feedback_evaluate'), {
                        pointToSelectors: [`a[href$="/evaluate/"]`],
                    });
                }
            }
            yield wizard.close();
        }
        // We manually exit because the navigation after cloning leaves behind an unresolved promise.
        process_1.default.exit(0);
    });
}
main()
    .then(() => console.log('Screenshot bot script finished.'))
    .catch(err => {
    console.error('Something went wrong during the execution of the screenshot bot.');
    console.error(err);
});
