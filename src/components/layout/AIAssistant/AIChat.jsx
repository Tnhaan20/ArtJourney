import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Menu,
  Plus,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { useAI } from "@/hooks/AI/use-ai";
import { useAIMessageForm } from "@/hooks/AI/use-ai-form";
import { useAuthStore } from "@/domains/store/use-auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { assets } from "@/assets/assets";

// Simple markdown renderer component
const MarkdownContent = ({ content }) => {
  const formatContent = (text) => {
    // Handle code blocks (```code```)
    text = text.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-green-400 p-3 rounded-md my-2 overflow-x-auto"><code>$1</code></pre>');
    
    // Handle inline code (`code`)
    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Handle bold (**text**)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic (*text*)
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Handle line breaks
    text = text.replace(/\n\n/g, '</p><p class="mb-2">');
    text = text.replace(/\n/g, '<br />');
    
    // Handle bullet points
    text = text.replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>');
    
    return text;
  };

  return (
    <div 
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ 
        __html: `<p class="mb-2">${formatContent(content)}</p>` 
      }}
    />
  );
};


export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const { isAuthenticated, user } = useAuthStore();
  const {
    sendMessageMutation,
    getSessionsQuery,
    getSessionById,
    deleteSessionMutation,
  } = useAI();

  const { form, resetForm } = useAIMessageForm();



  // Only get sessions data if user is authenticated
  const { data: sessionsData, refetch: refetchSessions } = isAuthenticated 
    ? getSessionsQuery 
    : { data: null, refetch: () => {} };

  // Always call getSessionById hook, but pass null when no session
  const { data: sessionData } = getSessionById(currentSessionId);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update form values when session changes or auth status changes
  useEffect(() => {
    form.setValue("chatSessionId", currentSessionId);
    form.setValue("includeUserProgress", isAuthenticated ? true : null);
    form.setValue("includeCurrentCourse", isAuthenticated ? true : null);
  }, [currentSessionId, isAuthenticated, form]);

  // Load session messages when sessionData changes
  useEffect(() => {
    if (currentSessionId && sessionData?.data?.messages) {
      // Map API messages to UI format
      const mappedMessages = sessionData.data.messages.map((message) => ({
        id: message.chatMessageId,
        content: message.content,
        isUser: message.role === "user", // Use role field to determine sender
        timestamp: new Date(message.timestamp),
        modelUsed: message.modelUsed,
        responseTime: message.responseTime,
      }));
      
      setMessages(mappedMessages);
    }
  }, [currentSessionId, sessionData]);

  // Handle sending message using the form
  const onSubmit = async (formData) => {
    // Add user message to UI immediately
    const userMessage = {
      id: Date.now(),
      content: formData.message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      let payload = {
        message: formData.message,
      };

      if (currentSessionId) {
        payload = {
          ...payload,
          chatSessionId: currentSessionId,
          includeUserProgress: isAuthenticated ? true : null,
          includeCurrentCourse: isAuthenticated ? true : null,
        };
      }

      const response = await sendMessageMutation.mutateAsync(payload);
      
      const aiContent = response?.data?.content || response?.content || "I received your message!";
      const sessionId = response?.data?.chatSessionId || response?.chatSessionId;
      
      const aiMessage = {
        id: Date.now() + 1,
        content: aiContent,
        isUser: false,
        timestamp: new Date(),
        modelUsed: response?.data?.modelUsed,
        responseTime: response?.data?.responseTime,
      };
      setMessages((prev) => [...prev, aiMessage]);

      if (!currentSessionId && sessionId) {
        setCurrentSessionId(sessionId);
      }

      if (isAuthenticated) {
        refetchSessions();
      }
      
      form.setValue("message", "");
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => prev.filter(msg => msg.id !== userMessage.id));
    }
  };

  // Handle session selection
  const handleSessionSelect = (session) => {
    setCurrentSessionId(session.chatSessionId);
    setShowSidebar(false);
  };

  // Handle new chat
  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setShowSidebar(false);
    resetForm();
  };

  // Handle delete session
  const handleDeleteSession = async (sessionId) => {
    try {
      await deleteSessionMutation.mutateAsync(sessionId);
      if (currentSessionId === sessionId) {
        handleNewChat();
      }
      refetchSessions();
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Today";
    } else if (diffDays === 2) {
      return "Yesterday";
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <>
      {/* Chat Button - Updated with custom image as rounded circle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 cursor-pointer rounded-full shadow-lg  z-50 bg-white flex items-center justify-center"
        >
          <img 
            src={assets.chat.aiChatIcon} 
            alt="Assistant Meowers Chat" 
            className="w-full h-full object-cover rounded-full transition-transform duration-300"
            />
        </button>
      )}

      {/* Chat Window - Fixed Layout */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[900px] md:h-[650px] bg-white md:rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          <div className="flex h-full">
            {/* Sidebar - Sessions List (Only for authenticated users) */}
            {isAuthenticated && (
              <div className={`${showSidebar ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-80 bg-gray-50 border-r border-gray-200`}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-primary-yellow to-secondary-yellow">
                  <h3 className="font-semibold text-primary-blue">Chat History</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNewChat}
                    className="text-primary-blue hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Sessions List */}
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full p-3">
                    <div className="space-y-2">
                      {sessionsData?.data?.map((session) => (
                        <div
                          key={session.chatSessionId}
                          className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            currentSessionId === session.chatSessionId
                              ? "bg-primary-yellow shadow-sm border border-secondary-yellow"
                              : "hover:bg-white hover:shadow-sm"
                          }`}
                          onClick={() => handleSessionSelect(session)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0 mr-2">
                              <p className="text-sm font-medium truncate text-gray-900 leading-tight">
                                {session.sessionTitle}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(session.createdAt)}
                              </p>
                              {session.messageCount > 0 && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {session.messageCount} messages
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSession(session.chatSessionId);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {(!sessionsData?.data || sessionsData.data.length === 0) && (
                        <div className="text-center py-12 text-gray-500">
                          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p className="text-sm font-medium">No chat history yet</p>
                          <p className="text-xs mt-1">Start your first conversation!</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-yellow to-secondary-yellow shrink-0">
                <div className="flex items-center space-x-3 min-w-0">
                  {isAuthenticated && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSidebar(!showSidebar)}
                      className="md:hidden text-primary-blue hover:bg-white/20 h-8 w-8 p-0 shrink-0"
                    >
                      <Menu className="w-4 h-4" />
                    </Button>
                  )}
                  <Bot className="w-6 h-6 text-primary-blue shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-primary-blue truncate">Assistant Meowers</h3>
                    <p className="text-xs text-primary-blue/70 truncate">
                      {isAuthenticated 
                        ? (currentSessionId ? "Continue conversation" : "Start new chat")
                        : "Guest mode - Limited features"
                      }
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-blue hover:bg-white/20 h-8 w-8 p-0 shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-hidden bg-gray-50">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {messages.length === 0 && (
                      <div className="text-center py-16">
                        <Bot className="w-20 h-20 mx-auto mb-6 text-primary-yellow" />
                        <h4 className="text-xl font-bold text-primary-blue mb-3">
                          Welcome to Assistant Meowers! 🐱
                        </h4>
                        <p className="text-gray-600 mb-2 max-w-md mx-auto">
                          Hi! I'm your AI assistant from the Midnight Meowers team.
                        </p>
                        <p className="text-gray-600 mb-6">
                          How can I help you today?
                        </p>
                        {isAuthenticated && (
                          <div className="max-w-md mx-auto p-4 bg-primary-yellow/20 rounded-xl text-sm text-primary-blue">
                            <div className="font-medium mb-1">💡 Personalized Assistant</div>
                            <div>I can access your learning progress and current course to provide tailored help!</div>
                          </div>
                        )}
                        {!isAuthenticated && (
                          <div className="max-w-md mx-auto p-4 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-700">
                            <div className="font-medium mb-1">🔓 Guest Mode</div>
                            <div>Sign in for personalized assistance and chat history!</div>
                          </div>
                        )}
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
                            message.isUser
                              ? "bg-primary-yellow text-primary-blue"
                              : "bg-white text-gray-800 border border-gray-100"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {!message.isUser && (
                              <Bot className="w-5 h-5 mt-0.5 shrink-0 text-primary-yellow" />
                            )}
                            {message.isUser && (
                              <User className="w-5 h-5 mt-0.5 shrink-0 text-primary-blue" />
                            )}
                            <div className="flex-1 min-w-0">
                              {message.isUser ? (
                                <p className="text-sm leading-relaxed break-words">{message.content}</p>
                              ) : (
                                <div className="text-sm leading-relaxed">
                                  <MarkdownContent content={message.content} />
                                </div>
                              )}
                              <div className="flex items-center justify-between mt-3 pt-2 border-t border-current/10">
                                <p className={`text-xs ${
                                  message.isUser ? "text-primary-blue/60" : "text-gray-400"
                                }`}>
                                  {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                                {!message.isUser && message.modelUsed && (
                                  <p className="text-xs text-gray-400 font-mono">
                                    Gemini 2.0 Flash
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {sendMessageMutation.isPending && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                          <div className="flex items-center space-x-3">
                            <Bot className="w-5 h-5 text-primary-yellow" />
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin text-primary-yellow" />
                              <span className="text-sm text-gray-600">Assistant Meowers is thinking...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white shrink-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-3">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Type your message..."
                              className="border-gray-300 focus:border-primary-yellow focus:ring-primary-yellow/20 rounded-xl px-4 py-3 text-sm"
                              disabled={sendMessageMutation.isPending}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  form.handleSubmit(onSubmit)();
                                }
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={sendMessageMutation.isPending || !form.watch("message")?.trim()}
                      className="bg-primary-yellow hover:bg-secondary-yellow text-primary-blue rounded-xl px-6 py-3 shrink-0 transition-colors"
                    >
                      {sendMessageMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};