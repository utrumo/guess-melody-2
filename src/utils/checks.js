const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswers) => userAnswers.every((it, i) => {
  const correctAnswer = (question.answers[i].genre === question.genre);
  return it === correctAnswer;
});

export {
  isArtistAnswerCorrect,
  isGenreAnswerCorrect
};
