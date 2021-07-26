import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CreateGameState {
  triviaId: number | null,
  joinCode: string | null,
  isAddQuestionModalOpen: boolean,
  modalType: string | null,
  roundId: number | null,
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
  joinCode: null,
  isAddQuestionModalOpen: false,
  modalType: null,
  roundId: null,
  currentType: null,
  questionNum: null,
  questionId: null,
  currentQuestion: null,
  currentAnswer: null,
  newQuestion: null,
  editedQuestion: null,
}

interface OpenQuestionModalPayload {
  roundId: number, 
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
interface NewTriviaGame {

}
interface Round {
  roundNum: number
}

interface NewTriviaGame {
  userId: number,
  rounds: Round[]
}

interface NewTriviaGamePayload {
  createdAt: string, 
  hostId: number, 
  id: number, 
  joinCode: string,
  playedAt: string | null,
}


const createTriviaGame = async (triviaGame) => {
  try {
    const newTriviaGame = await fetch(
      '/api/create/triviaGame',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(triviaGame),
      }
    );
    return newTriviaGame.json();
  } catch (err) {
    if (err) console.log(err)
  }
}

export const createNewTriviaGame = createAsyncThunk('createGame/createTriviaGame', async (newTriviaGame: NewTriviaGame) => {
  try {
    return await createTriviaGame(newTriviaGame);
  } catch (err) {
    if (err) {
      console.log(err)
    }
  }
})

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
    const isEditingQuestion = question.questionId ? true : false
    if (isEditingQuestion) {
      return editQuestion(question)
    } else {
      return createNewQuestion(question)
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
    setJoinCode: (state, action: PayloadAction<string>) => {
      state.joinCode = action.payload;
    },
    openQuestionModal: (state, action: PayloadAction<OpenQuestionModalPayload>) => {
      const {
        roundId, 
        questionNum,
        questionId,
        currentQuestion,
        currentAnswer,
        currentType,
      } = action.payload;
      state.isAddQuestionModalOpen = true
      state.roundId = roundId
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
      }), 
      builder.addCase(createNewTriviaGame.fulfilled, (state, action: PayloadAction<NewTriviaGamePayload>) => {

        const {joinCode} = action.payload;
        state.joinCode = joinCode
      })
  }
})

export const {setTriviaId, setJoinCode, openQuestionModal, closeQuestionModal, clearTriviaQuestionsFromState} = createGameSlice.actions;
