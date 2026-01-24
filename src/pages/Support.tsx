import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HelpButton } from '@/components/HelpButton';

const Support = () => {
  const navigate = useNavigate();

  const handleLiveChat = () => {
    // Open chat assistant or navigate to chat
    const chatButton = document.querySelector('[data-chat-trigger]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/2348058038037', '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Support</h1>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How can we help you?</h2>

        {/* Live Chat Card */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-4 shadow-sm">
          <div className="flex items-start gap-4 mb-2">
            <MessageCircle className="h-10 w-10 text-gray-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Live Chat</h3>
              <p className="text-gray-600">
                Chat with our support team directly in the app
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleLiveChat}
            className="w-full h-14 text-lg font-semibold rounded-full bg-purple-500 hover:bg-purple-600 text-white mt-4"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Start Live Chat
          </Button>

          <p className="text-gray-500 text-sm mt-4">
            Our support agents are available to assist you with any questions or issues.
          </p>
        </div>

        {/* WhatsApp Support Card */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4 mb-2">
            <MessageCircle className="h-10 w-10 text-gray-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Chat on WhatsApp</h3>
              <p className="text-gray-600">
                Chat with our support team on WhatsApp for quick assistance
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleWhatsApp}
            className="w-full h-14 text-lg font-semibold rounded-full bg-green-500 hover:bg-green-600 text-white mt-4"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat on WhatsApp
          </Button>

          <p className="text-gray-500 text-sm mt-4">
            Contact: +234 ■■ ■■■ 8037
          </p>
        </div>
      </main>

      <HelpButton />
    </div>
  );
};

export default Support;
