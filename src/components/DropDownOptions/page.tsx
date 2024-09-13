
import useQuiz from "@/store/page";
import { useEffect, useState } from "react";

type CategoryType = {
  id: number;
  name: string;
};

export default function Index() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { addCategory, addLevel, addType, config } = useQuiz((state) => ({
    addCategory: state.addCategory,
    addLevel: state.addLevel,
    addType: state.addType,
    config: state.config,
  }));

  const types = ["boolean", "multiple"];
  const levels = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    async function fetchCategoryData() {
      const { trivia_categories } = await (
        await fetch("https://opentdb.com/api_category.php")
      ).json();
      setCategories(trivia_categories);
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

  return (
    <section className="flex flex-col md:flex-row justify-evenly items-center py-5 px-4">
      {/* Select Category */}
      <div className="w-full md:w-1/3 mb-4 md:mb-0 px-4">
        <label htmlFor="category" className="block text-white mb-2 text-sm font-medium">
          Select Category
        </label>
        <select
          id="category"
          className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Select Level */}
      <div className="w-full md:w-1/3 mb-4 md:mb-0 px-4">
        <label htmlFor="level" className="block text-white mb-2 text-sm font-medium">
          Select Level
        </label>
        <select
          id="level"
          className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          onChange={handleLevelChange}
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Select Type */}
      <div className="w-full md:w-1/3 px-4">
        <label htmlFor="type" className="block text-white mb-2 text-sm font-medium">
          Select Type
        </label>
        <select
          id="type"
          className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          onChange={handleTypeChange}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
