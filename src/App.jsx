// App.jsx
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const apiUrl = process.env.API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setSubmitSuccess(false)
    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const res = await axios.post(apiUrl, { prompt: input })
      const aiMessage = { sender: 'ai', text: res.data.reply }
      setMessages(prev => [...prev, aiMessage])
      setSubmitSuccess(true)
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, there was an error.' }])
    }
    setLoading(false)
  }

  return (
    <div className={`h-screen w-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-100 to-gray-200'
    } overflow-hidden`}>
      <div className="h-full w-full p-4 md:p-6 lg:p-8 flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4 md:mb-6 lg:mb-8">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center font-mono ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Insight</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 min-h-0">
          {/* Input Section */}
          <div className={`backdrop-blur-lg rounded-2xl p-3 md:p-4 shadow-xl flex flex-col ${
            isDarkMode ? 'bg-white/10' : 'bg-white/80'
          } lg:w-1/3 xl:w-1/4`}>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="relative w-full group">
                <label 
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    isFocused || input 
                      ? 'top-1 text-xs text-blue-400' 
                      : `top-4 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`
                  }`}
                >
                  Your Investment Question
                </label>
                <textarea
                  className={`w-full h-32 md:h-40 p-4 pt-6 rounded-xl border resize-none placeholder-transparent transition-all duration-200 group-hover:border-white/50 ${
                    isDarkMode 
                      ? 'bg-white/20 text-white border-white/30 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-white/80 text-gray-900 border-gray-300 focus:ring-blue-400 focus:border-blue-400'
                  }`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder=""
                  disabled={loading}
                />
              </div>
              <div className="mt-4 relative">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-full h-full rounded-xl ${
                      isDarkMode ? 'bg-blue-500/20' : 'bg-blue-400/20'
                    }`}>
                      <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="flex space-x-2">
                            <div className={`w-2 h-2 rounded-full animate-[bounce_1s_infinite] ${
                              isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                            }`}></div>
                            <div className={`w-2 h-2 rounded-full animate-[bounce_1s_infinite_0.2s] ${
                              isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                            }`}></div>
                            <div className={`w-2 h-2 rounded-full animate-[bounce_1s_infinite_0.4s] ${
                              isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                            }`}></div>
                          </div>
                          <div className={`w-32 h-1 rounded-full overflow-hidden ${
                            isDarkMode ? 'bg-blue-500/20' : 'bg-blue-400/20'
                          }`}>
                            <div className={`h-full rounded-full animate-[progress_2s_ease-in-out_infinite] ${
                              isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                            }`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {submitSuccess && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-full h-full rounded-xl ${
                      isDarkMode ? 'bg-green-500/20' : 'bg-green-400/20'
                    } animate-[fade-out_0.5s_ease-out_forwards]`}>
                      <div className="flex items-center justify-center h-full">
                        <svg 
                          className={`w-6 h-6 ${
                            isDarkMode ? 'text-green-400' : 'text-green-500'
                          }`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                <button 
                  type="submit" 
                  disabled={loading || !input.trim()}
                  className={`w-full px-4 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 active:translate-y-0 ${
                    loading || !input.trim()
                      ? `${
                          isDarkMode 
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`
                      : `${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700' 
                            : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600'
                        }`
                  }`}
                >
                  {loading ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>

          {/* Output Section */}
          <div className={`backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl flex flex-col flex-1 ${
            isDarkMode ? 'bg-white/10' : 'bg-white/80'
          }`}>
            <h2 className={`text-lg md:text-xl font-semibold mb-4 font-mono ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Investment Insights</h2>
            <div className="flex-1 overflow-y-auto pr-4 space-y-4">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`group relative ${
                    msg.sender === 'user' ? 'self-end' : 'self-start'
                  }`}
                >
                  <div className={`p-6 rounded-2xl shadow-lg transform transition-all duration-300 ${
                    msg.sender === 'user' 
                      ? `${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-blue-600/30 to-blue-800/30 border-blue-500/20 hover:shadow-blue-500/20' 
                            : 'bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300 hover:shadow-blue-200'
                        } ml-8 border` 
                      : `${
                          isDarkMode 
                            ? 'bg-gradient-to-r from-purple-600/30 to-purple-800/30 border-purple-500/20 hover:shadow-purple-500/20' 
                            : 'bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300 hover:shadow-purple-200'
                        } mr-8 border`
                  }`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${
                        msg.sender === 'user' 
                          ? isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                          : isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
                      }`}></div>
                      <span className={`text-sm font-semibold ${
                        msg.sender === 'user' 
                          ? isDarkMode ? 'text-blue-300' : 'text-blue-600'
                          : isDarkMode ? 'text-purple-300' : 'text-purple-600'
                      }`}>
                        {msg.sender === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`prose ${
                      isDarkMode ? 'prose-invert' : ''
                    } max-w-none`}>
                      <p className={`text-base leading-relaxed ${
                        msg.sender === 'user' 
                          ? `text-right ${isDarkMode ? 'text-white' : 'text-gray-900'}`
                          : `text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`
                      }`}>
                        {msg.text}
                      </p>
                    </div>
                    <div className={`absolute top-2 ${
                      msg.sender === 'user' ? 'right-2' : 'left-2'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                      <button className={`p-1 rounded-full ${
                        isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className={`flex items-center space-x-3 rounded-xl p-4 border shadow-lg animate-[fade-in_0.3s_ease-out] ${
                  isDarkMode 
                    ? 'bg-purple-600/20 border-purple-500/20' 
                    : 'bg-purple-100 border-purple-200'
                }`}>
                  <div className="flex space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-[bounce_1s_infinite] ${
                      isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full animate-[bounce_1s_infinite_0.2s] ${
                      isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full animate-[bounce_1s_infinite_0.4s] ${
                      isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
                    }`}></div>
                  </div>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-purple-300' : 'text-purple-600'
                  }`}>AI is thinking...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
