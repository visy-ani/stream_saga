// Loading component for the cinema experience
const Loading: React.FC = () => {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500">
          Loading Cinema Experience...
        </div>
      </div>
    );
  };
  
  export default Loading;