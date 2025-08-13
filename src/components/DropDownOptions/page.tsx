import useQuiz from "@/store/page";
import { useEffect, useState } from "react";
import { FaGamepad, FaUser, FaCog, FaChevronDown } from "react-icons/fa";

type CategoryType = {
  id: number;
  name: string;
};

export default function QuizConfig() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const { addCategory, addLevel, addType, addName, addNumberOfQuestions, config } = useQuiz((state) => ({
    addCategory: state.addCategory,
    addLevel: state.addLevel,
    addType: state.addType,
    addName: state.addName,
    addNumberOfQuestions: state.addNumberOfQuestions,
    config: state.config,
  }));

  const types = [
    { value: "multiple", label: "Multiple Choice", icon: "📝" },
    { value: "boolean", label: "True/False", icon: "✅" }
  ];
  
  const levels = [
    { value: "easy", label: "Easy", icon: "😊", color: "text-green-400" },
    { value: "medium", label: "Medium", icon: "🤔", color: "text-yellow-400" },
    { value: "hard", label: "Hard", icon: "😤", color: "text-red-400" }
  ];

  const questionCounts = [5, 10, 15, 20, 25];

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const { trivia_categories } = await response.json();
        setCategories(trivia_categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategoryData();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find(
      (category) => category.id === Number(e.target.value)
    );
    if (selectedCategory) {
      addCategory(selectedCategory.id, selectedCategory.name);
    }
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    addLevel(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    addType(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setPlayerName(name);
    addName(name);
  };

  const handleQuestionCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = Number(e.target.value);
    setNumberOfQuestions(count);
    addNumberOfQuestions(count);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaCog className="text-blue-400 text-4xl mr-3 animate-spin-slow" />
            <h1 className="text-5xl font-bold text-white">Quiz Configuration</h1>
          </div>
          <p className="text-xl text-gray-300">Customize your quiz experience</p>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Player Information Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center mb-6">
              <FaUser className="text-blue-400 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-white">Player Information</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="playerName" className="block text-white mb-3 text-lg font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="playerName"
                  value={playerName}
                  onChange={handleNameChange}
                  placeholder="Enter your name..."
                  className="w-full p-4 bg-gray-800/50 text-white border-2 border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="questionCount" className="block text-white mb-3 text-lg font-medium">
                  Number of Questions
                </label>
                <div className="relative">
                  <select
                    id="questionCount"
                    value={numberOfQuestions}
                    onChange={handleQuestionCountChange}
                    className="w-full p-4 bg-gray-800/50 text-white border-2 border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg appearance-none cursor-pointer"
                  >
                    {questionCounts.map((count) => (
                      <option key={count} value={count}>
                        {count} Questions
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Settings Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center mb-6">
              <FaGamepad className="text-purple-400 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-white">Quiz Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-white mb-3 text-lg font-medium">
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    onChange={handleCategoryChange}
                    className="w-full p-4 bg-gray-800/50 text-white border-2 border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg appearance-none cursor-pointer"
                  >
                    <option value="">Select a category...</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="level" className="block text-white mb-3 text-lg font-medium">
                  Difficulty Level
                </label>
                <div className="relative">
                  <select
                    id="level"
                    onChange={handleLevelChange}
                    className="w-full p-4 bg-gray-800/50 text-white border-2 border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg appearance-none cursor-pointer"
                  >
                    {levels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.icon} {level.label}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-white mb-3 text-lg font-medium">
                  Question Type
                </label>
                <div className="relative">
                  <select
                    id="type"
                    onChange={handleTypeChange}
                    className="w-full p-4 bg-gray-800/50 text-white border-2 border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg appearance-none cursor-pointer"
                  >
                    {types.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Configuration Preview */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Configuration Preview</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">👤</div>
              <div className="text-gray-300 text-sm">Player</div>
              <div className="text-white font-semibold">
                {playerName || "Not set"}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-gray-300 text-sm">Category</div>
              <div className="text-white font-semibold">
                {config.category?.name || "Not selected"}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-gray-300 text-sm">Difficulty</div>
              <div className="text-white font-semibold capitalize">
                {config.level || "Easy"}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-2">❓</div>
              <div className="text-gray-300 text-sm">Questions</div>
              <div className="text-white font-semibold">
                {config.numberOfQuestions || 10}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}