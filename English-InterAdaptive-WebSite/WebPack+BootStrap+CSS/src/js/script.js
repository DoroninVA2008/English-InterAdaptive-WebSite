import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../css/style.css'

document.addEventListener('DOMContentLoaded', () => {

    // ===== Quiz =====
    document.querySelectorAll('#quizOptions .quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.dataset.correct === 'true';
            document.querySelectorAll('#quizOptions .quiz-option').forEach(o => o.disabled = true);
            const fb = document.getElementById('quizFeedback');
            fb.style.display = 'block';
            if (isCorrect) {
                btn.classList.add('correct');
                fb.innerHTML = '<span class="text-success">&#10003; Correct! Present Simple uses "goes" for she/he/it.</span>';
            } else {
                btn.classList.add('wrong');
                document.querySelectorAll('#quizOptions .quiz-option').forEach(o => {
                    if (o.dataset.correct === 'true') o.classList.add('correct');
                });
                fb.innerHTML = '<span class="text-danger">&#10007; Wrong. The correct answer is "goes" (3rd person singular).</span>';
            }
        });
    });

    // ===== Modal Quiz =====
    document.querySelectorAll('#modalOptions .modal-quiz-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.dataset.correct === 'true';
            document.querySelectorAll('#modalOptions .modal-quiz-btn').forEach(o => o.disabled = true);
            const fb = document.getElementById('modalFeedback');
            fb.style.display = 'block';
            if (isCorrect) {
                btn.classList.replace('btn-outline-secondary', 'btn-success');
                fb.innerHTML = '<span class="text-success">&#10003; Correct! "How are you?" is the standard greeting.</span>';
            } else {
                btn.classList.replace('btn-outline-secondary', 'btn-danger');
                document.querySelectorAll('#modalOptions .modal-quiz-btn').forEach(o => {
                    if (o.dataset.correct === 'true') o.classList.replace('btn-outline-secondary', 'btn-success');
                });
                fb.innerHTML = '<span class="text-danger">&#10007; Wrong. The correct answer is "are".</span>';
            }
        });
    });

    // ===== Modal — Next Question =====
    document.getElementById('modalNextBtn').addEventListener('click', () => {
        document.querySelectorAll('#modalOptions .modal-quiz-btn').forEach(o => {
            o.disabled = false;
            o.className = 'btn btn-outline-secondary text-start modal-quiz-btn';
        });
        document.getElementById('modalFeedback').style.display = 'none';
    });

    // ===== Scroll to Top =====
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 300);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});
