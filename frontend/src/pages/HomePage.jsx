import {useChatStore} from '../store/useChatStore'
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="flex items-center justify-center pt-20 px-2 sm:px-4 pb-4">
        <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-7xl h-[calc(100vh-7rem)] border border-base-300 overflow-hidden">
          <div className="flex h-full rounded-2xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
