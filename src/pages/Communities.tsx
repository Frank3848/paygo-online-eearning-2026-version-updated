import { ArrowLeft, MessageCircle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HelpButton } from '@/components/HelpButton';

const Communities = () => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open('https://wa.me/2348000000000', '_blank');
  };

  const handleTelegram = () => {
    window.open('https://t.me/paygo_channel', '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Join Our Communities</h1>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-3">Connect With Us</h2>
          <p className="text-gray-600 text-lg">
            Join our official channels for updates and support
          </p>
        </div>

        {/* WhatsApp Card */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-4 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">WhatsApp</h3>
              <p className="text-xl font-bold text-gray-900">Channel</p>
            </div>
          </div>
          <Button 
            onClick={handleWhatsApp}
            className="w-full h-14 text-lg font-semibold rounded-full bg-green-500 hover:bg-green-600 text-white"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Join WhatsApp
          </Button>
        </div>

        {/* Telegram Card */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Send className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Telegram</h3>
              <p className="text-xl font-bold text-gray-900">Channel</p>
            </div>
          </div>
          <Button 
            onClick={handleTelegram}
            className="w-full h-14 text-lg font-semibold rounded-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send className="h-5 w-5 mr-2" />
            Join Telegram
          </Button>
        </div>
      </main>

      <HelpButton />
    </div>
  );
};

export default Communities;
