const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-md text-center relative z-10 animate-fadeIn">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-gradient-to-br shadow-lg transform transition-all duration-500 hover:scale-110 ${
                i % 3 === 0 
                  ? "from-primary/20 to-primary/5 animate-float" 
                  : i % 3 === 1 
                  ? "from-secondary/20 to-secondary/5 animate-float" 
                  : "from-accent/20 to-accent/5 animate-float"
              }`}
              style={{ 
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${3 + (i % 3)}s`
              }}
            />
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-base-content/70 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
