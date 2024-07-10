import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  explanation?: string; // Optional explanation field
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  correctAnswers: number;
  incorrectAnswers: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  status: 'idle',
  error: null,
};

export const fetchQuestions = createAsyncThunk('quiz/fetchQuestions', async () => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=10');
    const questions = response.data.results.map((questionData: any) => ({
      question: questionData.question,
      correct_answer: questionData.correct_answer,
      incorrect_answers: questionData.incorrect_answers,
      explanation: "Explanation for the correct answer", // Placeholder for explanation
    }));
    return questions;
  } catch (error) {
    throw Error('Failed to fetch questions');
  }
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerQuestion: (state, action: PayloadAction<{ answer: string }>) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (currentQuestion.correct_answer === action.payload.answer) {
        state.correctAnswers += 1;
      } else {
        state.incorrectAnswers += 1;
      }
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.correctAnswers = 0;
      state.incorrectAnswers = 0;
      state.status = 'idle';
      state.error = null;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch questions';
      });
  },
});

export const { answerQuestion, resetQuiz, nextQuestion } = quizSlice.actions;

export default quizSlice.reducer;
