const Header = () => {
  return (
    <header className="w-full bg-white shadow-lg border-b py-4 px-6 flex items-center justify-between">
      <div className="text-orange-600 text-xl font-bold">QuizApp</div>
      <div className="flex items-center justify-center bg-orange-500 text-white w-10 h-10 rounded-full">
        <span className="text-lg font-semibold">SY</span>
      </div>
    </header>
  );
};

export default Header;
