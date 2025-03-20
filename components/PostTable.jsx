// components/PostTable.js
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function PostTable({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const postsPerPage = 5;
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  const isDarkMode = mounted && theme === 'dark';
  
  return (
    <div className="w-full overflow-hidden shadow-md rounded-lg transition-colors">
      <div className="overflow-x-auto">
        <table className={`min-w-full text-xs md:text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors`}>
          <thead className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b transition-colors`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider transition-colors`}>ID</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider transition-colors`}>User ID</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider transition-colors`}>Title</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider transition-colors`}>Body</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'} transition-colors`}>
            {currentPosts.map((post) => (
              <tr key={post.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} transition-colors`}>{post.id}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} transition-colors`}>{post.userId}</td>
                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} transition-colors`}>{post.title}</td>
                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} transition-colors`}>
                  {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
                </td>
              </tr>
            ))}
            {currentPosts.length === 0 && (
              <tr>
                <td colSpan="4" className={`px-6 py-4 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} transition-colors`}>
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t sm:px-6 transition-colors`}>
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
                currentPage === 1 
                  ? isDarkMode ? 'bg-gray-700 text-gray-400 border-gray-600' : 'bg-gray-100 text-gray-400 border-gray-300'
                  : isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
                currentPage === totalPages 
                  ? isDarkMode ? 'bg-gray-700 text-gray-400 border-gray-600' : 'bg-gray-100 text-gray-400 border-gray-300'
                  : isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors`}>
                Showing <span className="font-medium">{indexOfFirstPost + 1}</span> to{' '}
                <span className="font-medium">
                  {indexOfLastPost > posts.length ? posts.length : indexOfLastPost}
                </span>{' '}
                of <span className="font-medium">{posts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? isDarkMode ? 'text-gray-500 border-gray-600' : 'text-gray-300 border-gray-300'
                      : isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                      currentPage === number
                        ? isDarkMode 
                          ? 'z-10 bg-blue-900 border-blue-800 text-blue-200' 
                          : 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium transition-colors ${
                    currentPage === totalPages || totalPages === 0
                      ? isDarkMode ? 'text-gray-500 border-gray-600' : 'text-gray-300 border-gray-300'
                      : isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}