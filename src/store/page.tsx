import { create } from 'zustand';

export type ConfigType = {
  numberOfQuestions: number;
  category: { id: number; name: string };
  level: string;
  type: string;
  status: string;
  score: number;
};

const defaultConfig: ConfigType = {
  numberOfQuestions: 10,
  category: { id: 0, name: "" },
  level: "",
  type: "",
  status: "",
  score: 0,
};

type QuizState = {
  config: ConfigType;
  addLevel: (level: string) => void;
  addNumberOfQuestions: (count: number) => void;
  addCategory: (id: number, name: string) => void;
  addStatus: (status: string) => void;
  addScore: (score: number) => void;
  addType: (type: string) => void;
};

const useQuiz = create<QuizState>((set) => ({
  config: defaultConfig,

  addLevel: (level) => set((state) => ({
    config: { ...state.config, level },
  })),
  addNumberOfQuestions: (count) => set((state) => ({
    config: { ...state.config, numberOfQuestions: count },
  })),
  addCategory: (id, name) => set((state) => ({
    config: { ...state.config, category: { id, name } },
  })),
  addStatus: (status) => set((state) => ({
    config: { ...state.config, status },
  })),
  addScore: (score) => set((state) => ({
    config: { ...state.config, score:state.config.score+1 },
  })),
  addType: (type) => set((state) => ({
    config: { ...state.config, type },
  })),
}));

export default useQuiz;
