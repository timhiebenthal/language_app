(function (root) {
  const KEY = 'expat-german-a1-progress';
  function gradeAnswer({ selected, correct, explanations }) {
    return { correct: selected === correct, feedback: explanations[selected] };
  }
  function loadProgress(storage) {
    try { return JSON.parse(storage.getItem(KEY) || 'null'); } catch { return null; }
  }
  function saveProgress(storage, progress) {
    try { storage.setItem(KEY, JSON.stringify(progress)); return true; } catch { return false; }
  }
  const api = { gradeAnswer, loadProgress, saveProgress };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.LearningApp = api;
})(typeof window === 'undefined' ? globalThis : window);

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => {
  const lesson = window.LESSON;
  const root = document.querySelector('#lesson');
  const saved = LearningApp.loadProgress(localStorage);
  let index = 0, score = saved?.score || 0;
  if (saved?.completed) { root.innerHTML = `<p class="saved">Previously completed · ${score}/${lesson.questions.length} correct</p><button id="restart">Practise again</button>`; }
  else renderQuestion();
  function renderQuestion() {
    const q = lesson.questions[index];
    root.innerHTML = `<h2>Quiz ${index + 1} of ${lesson.questions.length}</h2><p>${q.prompt}</p><fieldset><legend>Choose an answer</legend>${q.options.map((o, i) => `<label><input type="radio" name="answer" value="${i}"> ${o}</label>`).join('')}</fieldset><button id="check">Check answer</button><p id="feedback" aria-live="polite"></p>`;
    root.querySelector('#check').onclick = () => {
      const selected = root.querySelector('input:checked');
      const feedback = root.querySelector('#feedback');
      if (!selected) { feedback.textContent = 'Choose an answer first.'; return; }
      const result = LearningApp.gradeAnswer({ selected: Number(selected.value), correct: q.correct, explanations: q.explanations });
      if (result.correct) score++;
      feedback.textContent = result.feedback;
      const button = root.querySelector('#check'); button.textContent = index + 1 === lesson.questions.length ? 'Finish lesson' : 'Next question';
      button.onclick = () => { index++; index === lesson.questions.length ? finish() : renderQuestion(); };
    };
  }
  function finish() {
    const progress = { completed: true, score };
    const persisted = LearningApp.saveProgress(localStorage, progress);
    root.innerHTML = `<h2>Lesson complete</h2><p>You got ${score} of ${lesson.questions.length} correct.</p><p>${persisted ? 'Your progress is saved in this browser.' : 'Progress could not be saved in this browser.'}</p><button id="restart">Practise again</button>`;
    root.querySelector('#restart').onclick = () => { index = 0; score = 0; renderQuestion(); };
  }
  root.addEventListener('click', event => { if (event.target.id === 'restart') { index = 0; score = 0; renderQuestion(); } });
});
