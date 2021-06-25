import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CreateGameState {
  triviaId: number | null,
  isAddQuestionModalOpen: boolean,
  modalType: string | null,
  roundNum: number | null,
  currentType: string | null,
  questionNum: number | null,
  questionId: number | null,
  currentQuestion: string | null,
  currentAnswer: string | null,
  newQuestion: {
    id: number,
    type: string, 
    content: string, 
    correctAnswer: string
  } | null,
  editedQuestion: {
    id: number,
    type: string, 
    content: string, 
    correctAnswer: string
  } | null,
}

const initialState: CreateGameState = {
  triviaId: null,
  isAddQuestionModalOpen: false,
  modalType: null,
  roundNum: null,
  currentType: null,
  questionNum: null,
  questionId: null,
  currentQuestion: null,
  currentAnswer: null,
  newQuestion: null,
  editedQuestion: null,
}

interface OpenQuestionModalPayload {
  roundNum: number, 
  questionNum: number,
  questionId: number,
  currentQuestion: string,
  currentAnswer: string,
  currentType?: string,
}

interface NewQuestion {
  content: string,
  correctAnswer: string,
  questionId?: number,
  questionNum: number,
  roundNum: number,
  triviaId?: number,
  type?: string
}

interface NewOrEditedQuestion {
  question: {
    triviaId?: number,
    id: number,
    type: string, 
    content: string, 
    correctAnswer: string
  }
  newOrEdited: 'edited' | 'new'
}

const createNewTriviaGame = async () => {
  try {
    const newTriviaGame = await fetch(
      '/api/create/triviaGame',
      {
        method: 'POST',
      }
    );
    return await newTriviaGame.json();
  } catch (err) {
    if (err) console.log(err)
  }
}

const createNewQuestion = async (newQuestion) => {
  try {
    const postNewQuestion = await fetch(
      '/api/create/questions',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion),
      }
    );
    const newQuestionData = {} as NewOrEditedQuestion;
    newQuestionData.question = await postNewQuestion.json()
    newQuestionData.newOrEdited = 'new'
    return newQuestionData;
  } catch (err) {
    if (err) console.log(err)
  }
}

const editQuestion = async (question) => {
  try {
    const editedQuestion = await fetch(
      '/api/update/questions',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(question),
      }
    );
    const editedQuestionData = {} as NewOrEditedQuestion;
    editedQuestionData.question = await editedQuestion.json()
    editedQuestionData.newOrEdited = 'edited'
    return editedQuestionData;
  } catch (err) {
    if (err) console.log(err)
  }
}

export const createTriviaQuestion = createAsyncThunk('createGame/createTriviaQuestion', async (question: NewQuestion) => {
  try {
    const isBrandNewTriviaGame = !question.triviaId
    const isNewQuestion = !question.questionId
    const isEditingQuestion = question.questionId ? true : false
    if (isBrandNewTriviaGame) {
      const newTriviaGame = await createNewTriviaGame()
      const newTriviaId = newTriviaGame.id
      const newQuestionAndTriviaId = { triviaId: newTriviaId, ...question }
      return createNewQuestion(newQuestionAndTriviaId)
    } else if (isNewQuestion) {
      return createNewQuestion(question)
    } else if (isEditingQuestion) {
      return editQuestion(question);
    }
  } catch (err) {
    if (err) console.log(err)
  }
})

export const createGameSlice = createSlice({
  name: 'createGame',
  initialState, 
  reducers: {
    setTriviaId: (state, action: PayloadAction<number>) => {
      state.triviaId = action.payload;
    },
    openQuestionModal: (state, action: PayloadAction<OpenQuestionModalPayload>) => {
      const {
        roundNum, 
        questionNum,
        questionId,
        currentQuestion,
        currentAnswer,
        currentType,
      } = action.payload;
      state.isAddQuestionModalOpen = true
      state.roundNum = roundNum
      state.questionNum = questionNum
      state.questionId = questionId
      state.currentQuestion = currentQuestion
      state.currentAnswer = currentAnswer
      state.currentType = currentType
    },
    closeQuestionModal: (state) => {
      state.isAddQuestionModalOpen = false
    },
    clearTriviaQuestionsFromState: (state) => {
      state.editedQuestion = null;
      state.newQuestion = null;
    }
  },
  extraReducers: builder => {
      builder.addCase(createTriviaQuestion.fulfilled, (state, action: PayloadAction<NewOrEditedQuestion>) => {
        const {
          question,
          newOrEdited,
        } = action.payload;
        if (newOrEdited === 'new') {
          state.triviaId = question.triviaId
          state.newQuestion = question;
        } else {
          state.editedQuestion = question;
        }
        state.isAddQuestionModalOpen = false;
      })
  }
})

export const {setTriviaId, openQuestionModal, closeQuestionModal, clearTriviaQuestionsFromState} = createGameSlice.actions;
