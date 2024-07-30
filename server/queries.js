
const getAllQuestions = 'SELECT * FROM question_master';
const getAllQuestionOptions = 'SELECT * FROM question_options';
const getAllQuestionSets = 'SELECT * FROM question_set'
const questionSet1 = 'SELECT qsq.question_id, qm.question from testli.question_set_questions qsq, question_set qs , question_master qm where qs.id = 1 and qsq.question_set_id = qs.id  and qm.id = qsq.question_id';
const questionSet2  = 'SELECT qsq.question_id, qm.question from testli.question_set_questions qsq, question_set qs , question_master qm where qs.id = 2 and qsq.question_set_id = qs.id  and qm.id = qsq.question_id';
module.exports = {
  getAllQuestions,
  getAllQuestionOptions,
  getAllQuestionSets,
  questionSet1,
  questionSet2

};
