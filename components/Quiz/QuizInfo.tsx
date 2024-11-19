type Props = {
  onStart: (status: number) => void;
};

const QuizInfo = ({ onStart }: Props) => {
  return (
    <div className="flex flex-col w-full max-w-2xl bg-white shadow-md rounded-lg p-8 space-y-6">
      <h1 className="md:text-2xl text-lg font-bold text-orange-600">
        Quiz Bilgileri
      </h1>
      <div className="space-y-4">
        <div className="flex justify-between gap-x-8 md:text-base text-sm">
          <span className="text-gray-700">Soru Sayısı:</span>
          <span className="font-semibold text-end text-red-500">10</span>
        </div>
        <div className="flex justify-between gap-x-8 md:text-base text-sm">
          <span className="text-gray-700">Her Soru İçin Süre:</span>
          <span className="font-semibold text-end text-red-500">30 saniye</span>
        </div>
        <div className="flex justify-between gap-x-8 md:text-base text-sm">
          <span className="text-gray-700">Kategori:</span>
          <span className="font-semibold text-red-500 text-end">Genel</span>
        </div>
        <div className="flex justify-between gap-x-8 md:text-base text-sm">
          <span className="text-gray-700">Cevaplama Süresi Kısıtlaması:</span>
          <span className="font-semibold text-red-500 text-end">
            Sorulara ilk 10 saniye içinde yanıt verilemez
          </span>
        </div>
        <div className="flex justify-between gap-x-8 md:text-base text-sm">
          <span className="text-gray-700">Önceki Sorulara Dönüş:</span>
          <span className="font-semibold text-red-500 text-end">
            Önceki sorulara geri dönülemez
          </span>
        </div>
        <div className="flex justify-between gap-x-8 md:text-base text-sm">
          <span className="text-gray-700">Cevaplanmayan Sorular:</span>
          <span className="font-semibold text-blue-500 text-end">
            30 saniye sonunda otomatik işaretlenir
          </span>
        </div>
        <div className="flex justify-between gap-x-8 md:text-base text-sm">
          <span className="text-gray-700">Varsayılan Cevap:</span>
          <span className="font-semibold text-green-600 text-end">
            30 saniye sonunda seçili şık ya da boş kabul edilir
          </span>
        </div>
      </div>
      <button
        className="w-full bg-orange-500 text-white py-2 rounded-lg shadow hover:bg-orange-600 transition"
        onClick={() => onStart(0)}
      >
        Başla
      </button>
    </div>
  );
};

export default QuizInfo;
