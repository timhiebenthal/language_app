(function (root) {
  const KEY = 'expat-german-course-progress';
  function gradeAnswer({ selected, correct, explanations }) {
    return { correct: selected === correct, feedback: explanations[selected] };
  }
  function loadProgress(storage) {
    try { return JSON.parse(storage.getItem(KEY) || '{}'); } catch { return {}; }
  }
  function saveProgress(storage, progress) {
    try { storage.setItem(KEY, JSON.stringify(progress)); return true; } catch { return false; }
  }
  const api = { gradeAnswer, loadProgress, saveProgress };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.LearningApp = api;
})(typeof window === 'undefined' ? globalThis : window);

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => {
  const lessons = window.LESSONS;
  const list = document.querySelector('#lesson-list');
  const view = document.querySelector('#lesson-view');
  const progress = LearningApp.loadProgress(localStorage);
  let activeId = lessons[0].id;
  let questionIndex = 0;
  let score = 0;
  let answered = false;

  function renderList() {
    list.innerHTML = lessons.map((lesson, index) => {
      const result = progress[lesson.id];
      return `<button class="lesson-card${lesson.id === activeId ? ' active' : ''}" data-lesson="${lesson.id}" aria-current="${lesson.id === activeId ? 'page' : 'false'}"><span class="lesson-number">0${index + 1} · ${lesson.level}</span><strong>${lesson.title}</strong><span>${lesson.situation}</span><small>${lesson.minutes} min · ${result?.completed ? `Complete · ${result.score}/${lesson.questions.length}` : `${lesson.questions.length} questions`}</small></button>`;
    }).join('');
  }

  function selectLesson(id) {
    activeId = id;
    questionIndex = 0;
    score = 0;
    answered = false;
    renderList();
    renderLesson();
  }

  function renderLesson() {
    const lesson = lessons.find(item => item.id === activeId);
    const previous = progress[lesson.id];
    view.innerHTML = `<article class="lesson-content"><p class="eyebrow">${lesson.level} · ${lesson.minutes} MINUTES</p><h2>${lesson.title}</h2><p class="lesson-situation">${lesson.situation}</p><section class="phrase"><p class="eyebrow">A USEFUL PHRASE</p><p class="german">${lesson.phrase}</p><p class="translation">${lesson.translation}</p><p class="tip">${lesson.note}</p></section><section class="phrase-bank"><h3>Useful phrases</h3><ul>${lesson.phrases.map(phrase => `<li>${phrase}</li>`).join('')}</ul></section><section class="quiz"><div class="section-head"><span class="eyebrow">YOUR TURN</span><span class="duration">${lesson.questions.length} QUESTIONS</span></div><div id="quiz"></div></section>${previous?.completed ? `<p class="saved">Previously completed · ${previous.score}/${lesson.questions.length} correct</p>` : ''}</article>`;
    if (previous?.completed) {
      view.querySelector('.quiz').insertAdjacentHTML('beforeend', '<div id="quiz"></div><button id="restart">Practise this lesson again</button>');
      view.querySelector('#restart').onclick = () => { questionIndex = 0; score = 0; renderQuestion(lesson); };
    } else {
      renderQuestion(lesson);
    }
  }

  function renderQuestion(lesson) {
    const quiz = view.querySelector('#quiz');
    const question = lesson.questions[questionIndex];
    answered = false;
    quiz.innerHTML = `<h3>Question ${questionIndex + 1} of ${lesson.questions.length}</h3><p>${question[0]}</p><fieldset><legend>Choose an answer</legend>${question[1].map((option, index) => `<label><input type="radio" name="answer" value="${index}"> ${option}</label>`).join('')}</fieldset><button id="check">Check answer</button><p id="feedback" aria-live="polite"></p>`;
    quiz.querySelector('#check').onclick = () => {
      if (answered) {
        questionIndex++;
        questionIndex === lesson.questions.length ? finishLesson(lesson) : renderQuestion(lesson);
        return;
      }
      const selected = quiz.querySelector('input:checked');
      const feedback = quiz.querySelector('#feedback');
      if (!selected) { feedback.textContent = 'Choose an answer first.'; return; }
      const result = LearningApp.gradeAnswer({ selected: Number(selected.value), correct: question[2], explanations: question[3] });
      if (result.correct) score++;
      answered = true;
      feedback.textContent = result.feedback;
      quiz.querySelectorAll('input').forEach(input => { input.disabled = true; });
      quiz.querySelector('#check').textContent = questionIndex + 1 === lesson.questions.length ? 'Finish lesson' : 'Next question';
    };
  }

  function finishLesson(lesson) {
    progress[lesson.id] = { completed: true, score };
    const persisted = LearningApp.saveProgress(localStorage, progress);
    renderList();
    const nextLesson = lessons[lessons.findIndex(item => item.id === lesson.id) + 1];
    view.querySelector('.quiz').innerHTML = `<h3>Lesson complete</h3><p>You got ${score} of ${lesson.questions.length} correct.</p><p>${persisted ? 'Your progress is saved in this browser.' : 'Progress could not be saved in this browser.'}</p>${nextLesson ? `<button id="next-lesson">Continue to ${nextLesson.title}</button>` : '<p>You have completed the full one-hour course. Well done!</p>'}<button class="secondary" id="retry">Practise this lesson again</button>`;
    view.querySelector('#retry').onclick = () => { questionIndex = 0; score = 0; view.querySelector('.quiz').innerHTML = '<div id="quiz"></div>'; renderQuestion(lesson); };
    view.querySelector('#next-lesson')?.addEventListener('click', () => selectLesson(nextLesson.id));
  }

  list.addEventListener('click', event => {
    const button = event.target.closest('[data-lesson]');
    if (button) selectLesson(button.dataset.lesson);
  });
  selectLesson(activeId);
});
