import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Index() {
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
          >
            <option value="general">General Knowledge</option>
            <option value="science">Science</option>
            <option value="history">History</option>
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
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
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
          >
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </div>
      </section>
    );
  }
  
